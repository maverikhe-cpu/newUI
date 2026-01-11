from playwright.sync_api import sync_playwright
import time

with sync_playwright() as p:
    browser = p.chromium.launch(headless=False)
    context = browser.new_context(viewport={'width': 1920, 'height': 1080})
    page = context.new_page()

    page.goto('http://localhost:5173')
    page.wait_for_load_state('networkidle')

    fullscreen_btn = page.locator('.fullscreen-btn')
    fullscreen_btn.click()
    time.sleep(1)

    # Check content area vs padding
    check = page.evaluate("""
        () => {
            const container = document.querySelector('.dashboard-container');
            const header = document.querySelector('.header');
            const leftCol = document.querySelector('.left-column');
            const centerCol = document.querySelector('.center-column');
            const rightCol = document.querySelector('.right-column');

            const containerRect = container.getBoundingClientRect();
            const containerStyles = window.getComputedStyle(container);

            return {
                container: {
                    rect: {
                        x: containerRect.x,
                        y: containerRect.y,
                        width: containerRect.width,
                        height: containerRect.height
                    },
                    padding: containerStyles.padding,
                    paddingTop: containerStyles.paddingTop,
                    paddingBottom: containerStyles.paddingBottom,
                    gap: containerStyles.gap
                },
                header: {
                    y: header.getBoundingClientRect().y,
                    height: header.getBoundingClientRect().height
                },
                leftColumn: {
                    y: leftCol.getBoundingClientRect().y,
                    height: leftCol.getBoundingClientRect().height,
                    bottom: leftCol.getBoundingClientRect().bottom
                },
                rightColumn: {
                    y: rightCol.getBoundingClientRect().y,
                    height: rightCol.getBoundingClientRect().height,
                    bottom: rightCol.getBoundingClientRect().bottom
                },
                grid: {
                    rows: window.getComputedStyle(container).gridTemplateRows,
                    columns: window.getComputedStyle(container).gridTemplateColumns
                },
                contentFit: {
                    headerHeight: header.getBoundingClientRect().height,
                    availableHeight: containerRect.height - parseFloat(containerStyles.paddingTop) - parseFloat(containerStyles.paddingBottom) - header.getBoundingClientRect().height,
                    leftColumnFits: leftCol.getBoundingClientRect().bottom <= containerRect.bottom - parseFloat(containerStyles.paddingBottom),
                    rightColumnFits: rightCol.getBoundingClientRect().bottom <= containerRect.bottom - parseFloat(containerStyles.paddingBottom)
                }
            };
        }
    """)

    print("=== Content Area Check ===")
    print(f"Container: {check['container']['rect']['width']}x{check['container']['rect']['height']}")
    print(f"Container padding: {check['container']['padding']}")
    print(f"Header: y={check['header']['y']}, height={check['header']['height']}")
    print(f"Available height after header: {check['contentFit']['availableHeight']}")
    print(f"Left column: y={check['leftColumn']['y']}, height={check['leftColumn']['height']}, bottom={check['leftColumn']['bottom']}")
    print(f"Right column: y={check['rightColumn']['y']}, height={check['rightColumn']['height']}, bottom={check['rightColumn']['bottom']}")
    print(f"Left fits: {check['contentFit']['leftColumnFits']}")
    print(f"Right fits: {check['contentFit']['rightColumnFits']}")
    print(f"Grid rows: {check['grid']['rows']}")

    # Check bottom panel visibility
    bottom_check = page.evaluate("""
        () => {
            const leftPanels = document.querySelectorAll('.left-column .panel');
            const rightPanels = document.querySelectorAll('.right-column .panel');
            const container = document.querySelector('.dashboard-container');
            const containerRect = container.getBoundingClientRect();

            const getLastPanel = (panels) => {
                const last = panels[panels.length - 1];
                const rect = last.getBoundingClientRect();
                return {
                    bottom: rect.bottom,
                    visible: rect.bottom <= containerRect.bottom
                };
            };

            return {
                lastLeftPanel: getLastPanel(leftPanels),
                lastRightPanel: getLastPanel(rightPanels),
                containerBottom: containerRect.bottom
            };
        }
    """)

    print(f"\nLast left panel bottom: {bottom_check['lastLeftPanel']['bottom']}, container bottom: {bottom_check['containerBottom']}, visible: {bottom_check['lastLeftPanel']['visible']}")
    print(f"Last right panel bottom: {bottom_check['lastRightPanel']['bottom']}, container bottom: {bottom_check['containerBottom']}, visible: {bottom_check['lastRightPanel']['visible']}")

    # Take screenshot
    page.screenshot(path='/tmp/bottom_check.png', full_page=True)

    time.sleep(2)
    browser.close()
