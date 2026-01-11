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

    # Check if all panels are visible
    visibility_check = page.evaluate("""
        () => {
            const container = document.querySelector('.dashboard-container');
            const containerRect = container.getBoundingClientRect();

            // Get all panels
            const leftPanels = document.querySelectorAll('.left-column .panel');
            const rightPanels = document.querySelectorAll('.right-column .panel');

            const checkPanel = (panel, side) => {
                const rect = panel.getBoundingClientRect();
                const containerRect = container.getBoundingClientRect();
                return {
                    side,
                    index: Array.from(container.querySelectorAll(`.${side}-column .panel`)).indexOf(panel),
                    top: rect.top,
                    bottom: rect.bottom,
                    height: rect.height,
                    isFullyVisible: rect.top >= containerRect.top && rect.bottom <= containerRect.bottom,
                    clippedBottom: rect.bottom > containerRect.bottom,
                    clippedTop: rect.top < containerRect.top
                };
            };

            const leftResults = Array.from(leftPanels).map(p => checkPanel(p, 'left'));
            const rightResults = Array.from(rightPanels).map(p => checkPanel(p, 'right'));

            return {
                containerRect: {
                    top: containerRect.top,
                    bottom: containerRect.bottom,
                    height: containerRect.height
                },
                leftPanels: leftResults,
                rightPanels: rightResults,
                summary: {
                    leftPanelCount: leftPanels.length,
                    rightPanelCount: rightPanels.length,
                    leftFullyVisible: leftResults.filter(p => p.isFullyVisible).length,
                    rightFullyVisible: rightResults.filter(p => p.isFullyVisible).length,
                    leftClippedBottom: leftResults.filter(p => p.clippedBottom).length,
                    rightClippedBottom: rightResults.filter(p => p.clippedBottom).length
                }
            };
        }
    """)

    print("=== Panel Visibility Check ===")
    print(f"Container: top={visibility_check['containerRect']['top']}, bottom={visibility_check['containerRect']['bottom']}, height={visibility_check['containerRect']['height']}")
    print(f"\nLeft panels: {visibility_check['summary']['leftPanelCount']} total, {visibility_check['summary']['leftFullyVisible']} fully visible, {visibility_check['summary']['leftClippedBottom']} clipped at bottom")
    print(f"Right panels: {visibility_check['summary']['rightPanelCount']} total, {visibility_check['summary']['rightFullyVisible']} fully visible, {visibility_check['summary']['rightClippedBottom']} clipped at bottom")

    for panel in visibility_check['leftPanels']:
        status = "OK" if panel['isFullyVisible'] else ("CLIPPED BOTTOM" if panel['clippedBottom'] else "CLIPPED TOP")
        print(f"  Left panel {panel['index']}: y={panel['top']:.1f}-{panel['bottom']:.1f}, height={panel['height']:.1f} [{status}]")

    for panel in visibility_check['rightPanels']:
        status = "OK" if panel['isFullyVisible'] else ("CLIPPED BOTTOM" if panel['clippedBottom'] else "CLIPPED TOP")
        print(f"  Right panel {panel['index']}: y={panel['top']:.1f}-{panel['bottom']:.1f}, height={panel['height']:.1f} [{status}]")

    # Take screenshot
    page.screenshot(path='/tmp/visibility_check.png', full_page=True)

    time.sleep(2)
    browser.close()
