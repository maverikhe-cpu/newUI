# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a **React-based construction site monitoring dashboard** ("未来筑家 · 智慧交付大屏" - Future Home · Smart Delivery Dashboard) built with Vite. It features a futuristic/tech aesthetic with real-time monitoring visualization, interactive maps, site image marquee, and custom data widgets.

## Development Commands

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run lint     # Run ESLint
npm run preview  # Preview production build locally
```

## Architecture

### Layout Structure

The dashboard uses a **16:9 aspect ratio container** centered in the viewport. The layout uses a 3-column CSS Grid (`22% 1fr 22%`) with:

- **Header**: Title, real-time clock, fullscreen toggle button
- **Left Panel** (4 panels): Delivery capacity, personnel dynamics, safety & quality, project progress overview
- **Center**: Interactive Leaflet map + horizontal scrolling site image marquee at bottom
- **Right Panel** (4 panels): Site monitoring details, latest updates, rework rate, customer response time

### Fullscreen Support

The wrapper element supports fullscreen mode via the Fullscreen API with vendor prefixes. When entering fullscreen, the 16:9 aspect ratio constraint is removed and the dashboard fills the entire viewport.

### Key Directories

```
src/
├── components/
│   ├── Effects/
│   │   ├── MouseGlow.jsx         # Mouse-following spotlight effect
│   │   ├── ParticleBackground.jsx # Canvas particle system with connections
│   │   └── NeuralNetwork.jsx     # Animated neural network visualization
│   ├── Map/
│   │   ├── CityMap.jsx           # Leaflet map with site markers
│   │   └── CityMap.css
│   ├── Video/
│   │   ├── CameraModal.jsx       # Site camera monitoring modal
│   │   └── CameraModal.css
│   └── Widgets/
│       ├── TechCharts.jsx        # SVG data visualization components
│       └── SiteMarquee.jsx       # Horizontal scrolling image carousel
├── styles/
│   └── dashboard.css             # Main dashboard styles with CSS variables
├── App.jsx                       # Main application component
└── main.jsx                      # Entry point
```

### Visual Effects System

The dashboard implements multiple layered effects:

1. **Holographic Overlay** - Scanline patterns + rotating shimmer gradient on panels
2. **Border Energy Flow** - Pulsing border glow animation
3. **Mouse Glow** - Cursor-following spotlight with radial gradient
4. **Particle Background** - 60 particles with constellation connections and mouse repulsion
5. **Neural Network** - Animated nodes with data pulses (used in "Latest Updates" panel)

### Custom Components

**TechCharts.jsx** (SVG-based data visualizations):
- `CircularGauge`: Animated percentage ring with glow
- `TrendLine`: Line chart with glow filter and scanline effect
- `SegmentedBar`: Segmented progress bar
- `DigitalCounter`: Number display with count-up animation

**SiteMarquee.jsx**:
- Horizontal infinite scroll using CSS animation
- Displays construction site images with tech filter overlays
- Vertical label on left side ("工地实况")

### Visual Design System

```css
--bg-dark: #0B1026           # Primary background
--bg-darker: #050814         # Darker background
--primary-cyan: #00F0FF      # Primary accent
--secondary-amber: #FFD700   # Secondary accent
--alert-red: #FF3366         # Alert/warning color
--glass-bg: rgba(11, 16, 38, 0.7)  # Glass morphism background
```

Design features: dark theme, glass morphism, animated scanlines, glowing text/borders, perspective grid background, corner accent decorations.

### Map Integration

- **Leaflet** + **react-leaflet** wrapper
- Centered on Shanghai (31.2304, 121.4737)
- Custom markers with pulsing animation (amber = active, red = alert)
- CartoDB Dark Matter tile layer
- ~40 mock construction sites

### Image Assets

Construction site images are imported from:
```
/Users/mingjiehe/.gemini/antigravity/brain/77298365-c7ea-40c3-87b5-79c782fb14a1/
```

These are passed to the `SiteMarquee` component via `marqueeData` in App.jsx.

## Dependencies

- **React 19.2.0** - UI library
- **Vite 7.2.4** - Build tool
- **Leaflet 1.9.4** + **react-leaflet 5.0.0** - Map rendering
- **lucide-react** - Icon library
- **recharts 3.6.0** - Installed but unused
- **ESLint 9.x** - Flat config format with React plugins

## ESLint Configuration

Key rule: `no-unused-vars` ignores variables matching `^[A-Z_]` pattern (for React components)

## Notes

- All data is mock/generated client-side - no backend integration
- Video monitoring and site images are UI mockups
- Testing framework not configured
- Panel layouts use `flex` values for height distribution (e.g., `flex: 0.8`, `flex: 1.1`)
