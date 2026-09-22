/**
 * File: js/service/lessons/cssLessons.js
 * Comprehensive teaching scrolls and targeted trial questions for World 5: CSS.
 */

export const CSS_LESSONS = {
  "css-1": {
    title: "Selectors & Specificity",
    summary: [
      "CSS (Cascading Style Sheets) styles the presentation, layout, and colors of HTML elements.",
      "When multiple conflicting rules target the same element, the browser calculates SPECIFICITY to determine which rule wins: Inline styles > ID selectors (#id) > Class/Attribute/Pseudo-class selectors (.class, [type], :hover) > Element selectors (div, p).",
      "An ID selector (#hero) has massively higher specificity than a class selector (.hero). One ID will override dozens of chained classes, which is why modern CSS relies heavily on classes to avoid specificity wars."
    ],
    keyPoints: [
      "Specificity Hierarchy: Inline (1000) > ID (100) > Class/Pseudo-class (10) > Element (1).",
      "Cascade Order: If specificity is identical, the rule declared LATER in the stylesheet wins.",
      "!important: Overrides normal specificity, but should be avoided as it breaks cascade maintainability."
    ],
    codeExample: `/* Element selector (Specificity: 0,0,0,1) */
p {
  color: #333333;
}

/* Class selector (Specificity: 0,0,1,0) - Overrides element selector */
.hero-text {
  color: #5C7A5C;
}

/* ID selector (Specificity: 0,1,0,0) - Wins over class selector! */
#legendary-scroll {
  color: #C9A24B; /* Gold wins! */
}`,
    questions: [
      "Which selector has higher specificity in CSS: an ID selector (#hero) or a class selector (.hero), and why?",
      "If two CSS rules have the exact same specificity targeting the same element, which rule does the browser apply?",
      "Why is overusing !important considered bad practice in CSS stylesheets?"
    ]
  },

  "css-2": {
    title: "The Box Model",
    summary: [
      "Every HTML element on a webpage is rendered as a rectangular box consisting of four concentric layers: Content, Padding, Border, and Margin.",
      "Content is the text or image at the center; Padding is transparent space inside the border; Border surrounds the padding; Margin is transparent space outside the border separating elements.",
      "THE ESSENTIAL FIX: By default (content-box), setting width: 200px and padding: 20px makes the box 240px wide! Setting 'box-sizing: border-box' forces padding and borders to be included INSIDE the declared width, preventing containers from breaking."
    ],
    keyPoints: [
      "Four Box Model Layers: Content -> Padding -> Border -> Margin.",
      "content-box (Default): Width only applies to content; padding and border add extra pixels onto total width.",
      "border-box (Industry Standard): Declared width includes content, padding, and border.",
      "Universal Reset: Applying * { box-sizing: border-box; } is standard in all modern web development."
    ],
    codeExample: `/* Standard modern box-sizing reset */
*, *::before, *::after {
  box-sizing: border-box;
}

.quest-card {
  width: 300px;         /* Total width remains EXACTLY 300px */
  padding: 20px;        /* Sits cleanly inside the 300px */
  border: 2px solid #C9A24B;
  margin: 15px auto;    /* Centers card with 15px external breathing room */
}`,
    questions: [
      "What are the four components of the CSS Box Model, and how does box-sizing: border-box affect element width?",
      "What is the difference between padding and margin in the CSS Box Model?",
      "Why do web developers use the universal selector * { box-sizing: border-box; } reset?"
    ]
  },

  "css-3": {
    title: "Colors & Units",
    summary: [
      "CSS supports multiple color models (hex #RRGGBB, rgb(r, g, b), hsl(h, s, l)) and measurement units.",
      "Pixels (px) are ABSOLUTE units that do not scale when a user changes their browser's default font size. Rem units are RELATIVE units based on the root font-size (<html>, typically 16px).",
      "BEST PRACTICE FOR ACCESSIBILITY: Always use 'rem' for typography and spacing. When visually impaired users increase default browser font size, rem units scale proportionally, whereas pixel values remain fixed."
    ],
    keyPoints: [
      "Pixels (px): Absolute unit (1px = 1 screen pixel). Good for thin decorative borders.",
      "Rem Units: Relative to root font size (1rem = 16px if root is 16px; 1.5rem = 24px).",
      "Em Units: Relative to the font size of the immediate parent element.",
      "HSL Colors: hsl(hue, saturation%, lightness%) makes color shading and tweaking intuitive."
    ],
    codeExample: `html {
  font-size: 16px; /* 1rem = 16px */
}

.dungeon-banner {
  /* Relative units scale with user accessibility settings */
  font-size: 1.5rem;   /* 1.5 * 16px = 24px */
  padding: 1rem 2rem;  /* 16px vertical, 32px horizontal */
  
  /* HSL Color (Hue 43 = gold, 50% saturation, 54% lightness) */
  color: hsl(43, 50%, 54%);
  border: 1px solid #C9A24B; /* 1px absolute border */
}`,
    questions: [
      "What is the difference between pixels (px) and rem units in CSS, and why are rem units preferred for typography?",
      "What is the root element that 'rem' units measure against?",
      "What is the difference between rem and em units in CSS?"
    ]
  },

  "css-4": {
    title: "Typography",
    summary: [
      "Web typography governs how written words look, read, and flow on a screen.",
      "Core properties include: font-family (defines typeface with fallbacks: font-family: 'Spectral', serif;), font-size (scale and hierarchy), font-weight (light 300 to bold 700), and line-height (vertical spacing between text lines).",
      "READABILITY RULE: Body text line-height should typically be set between 1.5 and 1.6. A line-height that is too tight crowds letters and makes reading exhausting, while proper line-height enhances reading speed."
    ],
    keyPoints: [
      "font-family Fallbacks: Always specify fallback fonts (e.g. 'Spectral', Georgia, serif).",
      "line-height: Set unitless line-height (e.g. line-height: 1.6) so it scales with font-size changes.",
      "letter-spacing: Small tracking adjustments (0.05em) give headings and badges an elegant feel."
    ],
    codeExample: `body {
  font-family: 'Work Sans', system-ui, sans-serif;
  font-size: 1rem;
  line-height: 1.6; /* Comfortable breathing room for body text */
  color: #2B2118;
}

h1, h2, h3 {
  font-family: 'Spectral', Georgia, serif;
  font-weight: 600;
  line-height: 1.25;
  letter-spacing: 0.02em;
}`,
    questions: [
      "How do font-family, font-size, and line-height work together to make text readable on a webpage?",
      "Why is setting unitless line-height (like line-height: 1.6) preferred over fixed pixel values?",
      "Why should you always provide fallback font names in font-family declarations?"
    ]
  },

  "css-5": {
    title: "Backgrounds & Borders",
    summary: [
      "Backgrounds and borders define element surfaces, visual depth, and contours.",
      "The border-radius property rounds the corners of an element. Setting border-radius: 50% on a square element (where width equals height) turns it into a perfect circle.",
      "Background properties allow solid colors (background-color), gradients (linear-gradient), and background images (background-image, background-size: cover, background-position: center)."
    ],
    keyPoints: [
      "border-radius: Curves corners. Use 50% on equal width/height for circular avatars or rune badges.",
      "box-shadow: Adds realistic depth and elevation (box-shadow: 0 4px 12px rgba(0,0,0,0.3)).",
      "background-size: cover: Scales background images to fill the element without distorting aspect ratio."
    ],
    codeExample: `/* Circular Rune Badge */
.rune-node {
  width: 50px;
  height: 50px;
  border-radius: 50%; /* Perfect circle! */
  background: radial-gradient(circle, #C9A24B, #8A6E2F);
  border: 2px solid #FAF4E8;
  box-shadow: 0 0 15px rgba(201, 162, 75, 0.6); /* Glowing aura */
}`,
    questions: [
      "How does border-radius round the corners of an element, and how do you make a square element completely circular?",
      "What are the parameters in a box-shadow property (e.g. 0 4px 12px rgba(0,0,0,0.3))?",
      "What does background-size: cover do when displaying a background image?"
    ]
  },

  "css-6": {
    title: "Flexbox",
    summary: [
      "CSS Flexbox (Flexible Box Layout) is a 1-dimensional layout model designed for aligning elements in a row or column.",
      "Activating display: flex on a parent container turns all its direct children into flex items. The MAIN AXIS runs in the direction of flex-direction (row by default). The CROSS AXIS runs perpendicular to it (vertical by default).",
      "AXIS CONTROLS: 'justify-content' aligns and distributes flex items along the MAIN axis (start, center, space-between). 'align-items' aligns items along the CROSS axis (center, stretch)."
    ],
    keyPoints: [
      "display: flex: Enables flex container layout on parent.",
      "justify-content: Controls distribution along the main axis (horizontal in row).",
      "align-items: Controls alignment along the cross axis (vertical in row).",
      "gap: Sets clean spacing between flex items without needing margin hacks."
    ],
    codeExample: `/* Centered horizontal navigation bar */
.nav-container {
  display: flex;
  flex-direction: row;
  justify-content: space-between; /* Space out items across main axis */
  align-items: center;            /* Center items vertically on cross axis */
  gap: 1.5rem;                    /* Clean spacing between items */
  padding: 1rem 2rem;
}`,
    questions: [
      "What is the difference between justify-content (main axis) and align-items (cross axis) in CSS Flexbox?",
      "What is the default flex-direction in a flex container?",
      "How does the CSS 'gap' property simplify spacing flex items compared to using margins?"
    ]
  },

  "css-7": {
    title: "Grid Layout",
    summary: [
      "CSS Grid is a 2-dimensional layout system that allows you to align content along BOTH rows and columns simultaneously.",
      "WHEN TO USE GRID VS FLEXBOX: Use Flexbox for 1-dimensional layouts (flowing along a single row or column, like navbars or button groups). Use Grid for 2-dimensional layouts where alignment in both rows and columns is needed (like photo galleries, dashboards, or full page skeletons).",
      "The 'fr' (fractional unit) represents a fraction of available free space (e.g. grid-template-columns: 1fr 2fr; creates a 1/3 and 2/3 split)."
    ],
    keyPoints: [
      "display: grid: Activates 2D grid layout on parent container.",
      "grid-template-columns: Defines column sizes (e.g. repeat(3, 1fr) for 3 equal columns).",
      "auto-fit / auto-fill: Powers responsive grids that reflow without media queries.",
      "Grid vs Flexbox: Grid is 2D (rows + columns); Flexbox is 1D (rows OR columns)."
    ],
    codeExample: `/* Responsive 3-column game inventory */
.inventory-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* 3 equal columns */
  gap: 1rem;
}

/* Responsive grid that auto-reflows on smaller screens */
.auto-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}`,
    questions: [
      "When would you choose CSS Grid over CSS Flexbox to lay out components on a page?",
      "What does the fractional unit (1fr) represent in CSS Grid?",
      "How does 'repeat(auto-fit, minmax(200px, 1fr))' create a responsive grid without media queries?"
    ]
  },

  "css-8": {
    title: "Positioning (relative / absolute / fixed)",
    summary: [
      "The CSS position property controls how an element is taken out of or kept within the document flow.",
      "position: relative: Keeps the element in normal document flow, allows offsets (top, left), and crucially establishes a coordinate boundary for absolutely positioned children.",
      "position: absolute: Removes the element completely from document flow and positions it relative to its NEAREST POSITIONED ANCESTOR (an ancestor with position other than static).",
      "position: fixed: Removes the element and anchors it relative to the BROWSER VIEWPORT so it never moves when scrolling."
    ],
    keyPoints: [
      "relative: In document flow; acts as anchor for absolute children.",
      "absolute: Out of document flow; positioned relative to nearest positioned parent.",
      "fixed: Out of document flow; anchored to the screen viewport (e.g. fixed navigation bar).",
      "z-index: Controls stacking order on the screen along the Z-axis (only works on positioned elements)."
    ],
    codeExample: `/* Parent anchor container */
.chamber-card {
  position: relative; /* Anchor point for absolute badges! */
  width: 300px;
  height: 200px;
}

/* Absolute child pinned to top-right corner of card */
.difficulty-badge {
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: #A23B3B;
  color: white;
}`,
    questions: [
      "What is the difference between position: relative, position: absolute, and position: fixed in CSS?",
      "What happens to an absolute positioned element if none of its ancestors have a position set?",
      "Why must an element have a position property set for z-index to take effect?"
    ]
  },

  "css-9": {
    title: "Responsive Design & Media Queries",
    summary: [
      "Responsive Web Design ensures that websites look and operate beautifully across all screen sizes (smartphones, tablets, laptops, desktops).",
      "Media queries (@media) apply conditional CSS rules based on device properties like viewport width (e.g. @media (max-width: 768px)).",
      "MOBILE-FIRST APPROACH: Design styles for mobile screens first by default, and use min-width queries (@media (min-width: 768px)) to progressively add desktop complexity as screen width expands."
    ],
    keyPoints: [
      "@media (max-width: 768px): Rules only apply when viewport is 768px or narrower.",
      "Mobile-First (min-width): Build for small screens first; scale up with min-width.",
      "Fluid Layouts: Use percentages and rems instead of rigid pixel widths."
    ],
    codeExample: `/* Base Mobile Styles (default for all screens) */
.campaign-layout {
  display: flex;
  flex-direction: column; /* Stacked single column on phones */
  padding: 1rem;
}

/* Tablet & Desktop Styles (Expanded width) */
@media (min-width: 768px) {
  .campaign-layout {
    flex-direction: row;  /* Switch to horizontal columns */
    padding: 2.5rem;
  }
}`,
    questions: [
      "How does a CSS @media query with (max-width: 768px) allow a website to change its layout on mobile phones?",
      "What is the difference between a mobile-first and desktop-first approach to media queries?",
      "Why is the viewport meta tag necessary for media queries to work on mobile devices?"
    ]
  },

  "css-10": {
    title: "Pseudo-classes & Pseudo-elements",
    summary: [
      "Pseudo-classes and pseudo-elements target dynamic states and structural parts of elements without adding extra HTML markup.",
      "A PSEUDO-CLASS (single colon :, like :hover, :focus, :active, :nth-child()) targets an element when it enters a specific state (such as hovering with a mouse or focusing an input).",
      "A PSEUDO-ELEMENT (double colon ::, like ::before, ::after) creates virtual elements that you can insert and style inside an element (requiring content: \"\";), commonly used for decorative badges, icons, and dividers."
    ],
    keyPoints: [
      "Pseudo-class (:): Targets state (:hover, :focus-visible, :first-child).",
      "Pseudo-element (::): Creates virtual elements (::before, ::after). Must declare content: \"\".",
      ":focus-visible: High-contrast outline for keyboard navigation without distracting mouse users."
    ],
    codeExample: `/* Pseudo-class: Hover state */
.btn-combat:hover {
  background-color: #C9A24B;
  color: #1B1F2A;
  transform: translateY(-2px);
}

/* Pseudo-element: Decorative icon injected before text */
.dungeon-heading::before {
  content: "⚔️ "; /* Required for pseudo-elements */
  margin-right: 0.5rem;
}`,
    questions: [
      "What is the difference between a pseudo-class like :hover and a pseudo-element like ::before in CSS?",
      "Why is the content: \"\" property required when creating a ::before or ::after pseudo-element?",
      "What is the purpose of the :focus-visible pseudo-class for accessibility?"
    ]
  },

  "css-11": {
    title: "CSS Variables (Custom Properties)",
    summary: [
      "CSS Variables (Custom Properties) allow you to store reusable values (colors, spacing, fonts) that can be referenced throughout your stylesheet.",
      "Variables are declared with a double-dash prefix (--accent-gold: #C9A24B;) inside the :root pseudo-class, which gives them global scope across the entire HTML document.",
      "You retrieve and apply variable values using the var() function: color: var(--accent-gold). Changing a variable in :root instantly updates every component using that variable, making theming and dark mode effortless."
    ],
    keyPoints: [
      "Declaration in :root: --variable-name: value; provides global access.",
      "Retrieval: Use var(--variable-name, fallbackValue).",
      "Dynamic Theming: Changing variables via JavaScript (element.style.setProperty) updates the page in real-time."
    ],
    codeExample: `:root {
  /* Global Design Tokens */
  --bg-dungeon: #1B1F2A;
  --panel-parchment: #E8DCC4;
  --accent-gold: #C9A24B;
  --font-body: 'Work Sans', sans-serif;
}

body {
  background-color: var(--bg-dungeon);
  font-family: var(--font-body);
}

.wax-seal {
  background-color: var(--accent-gold);
}`,
    questions: [
      "Why are CSS Variables (--my-color) declared in :root, and how do you use the var() function to apply them?",
      "How do CSS custom properties make implementing a Dark Mode / Light Mode theme switch easy?",
      "How do you provide a fallback value when using the var() function in CSS?"
    ]
  },

  "css-12": {
    title: "Animations & Transitions",
    summary: [
      "Transitions and Animations bring interfaces to life through motion.",
      "A TRANSITION smoothly interpolates property values between two states when triggered by an event (like a :hover change): transition: background-color 0.3s ease.",
      "An @keyframes ANIMATION defines a multi-step timeline with percentage keyframes (0%, 50%, 100%) that can run automatically, loop infinitely, and change complex properties without requiring user interaction."
    ],
    keyPoints: [
      "Transition: Two-state interpolation triggered by pseudo-class (:hover).",
      "@keyframes: Multi-step timeline running independently.",
      "Shorthand: animation: pulse 2s infinite ease-in-out;.",
      "Accessibility: Always wrap non-essential animations in @media (prefers-reduced-motion) for motion-sensitive users."
    ],
    codeExample: `/* 1. Smooth 2-state hover transition */
.spell-button {
  background-color: #2B2118;
  transition: background-color 0.25s ease, transform 0.25s ease;
}
.spell-button:hover {
  background-color: #C9A24B;
  transform: translateY(-3px);
}

/* 2. Self-running keyframe pulsing animation */
@keyframes runeGlow {
  0%   { opacity: 0.6; transform: scale(1); }
  50%  { opacity: 1.0; transform: scale(1.08); }
  100% { opacity: 0.6; transform: scale(1); }
}

.active-waypoint {
  animation: runeGlow 2.5s infinite ease-in-out;
}`,
    questions: [
      "What is the difference between a simple CSS transition and a multi-step @keyframes animation?",
      "What are the four components of the transition shorthand property (e.g. transition: all 0.3s ease 0.1s)?",
      "Why should web designers respect the @media (prefers-reduced-motion) media feature?"
    ]
  },

  "css-13": {
    title: "Transform",
    summary: [
      "The CSS transform property modifies the coordinate space of an element: moving (translate), scaling (scale), rotating (rotate), or skewing (skew) elements.",
      "PERFORMANCE SECRET: Animating properties like 'top' or 'margin' forces the browser's CPU to recalculate page layout and trigger expensive repaints, causing jank.",
      "The 'transform' property is processed entirely on the GPU (graphics card) via the compositor thread without triggering layout reflow, resulting in butter-smooth 60 frames-per-second animations."
    ],
    keyPoints: [
      "translate(x, y): Moves element relative to current position without altering page layout.",
      "scale(factor): Enlarge or shrink element.",
      "rotate(deg): Rotates element clockwise in degrees (e.g. rotate(45deg)).",
      "GPU Acceleration: Runs on compositor thread for peak animation performance."
    ],
    codeExample: `/* Hover effect with GPU-accelerated transforms */
.boss-node {
  transition: transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.boss-node:hover {
  /* Lift up 4px and scale up by 5% */
  transform: translateY(-4px) scale(1.05);
}

/* Centering with absolute transforms */
.modal-centered {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%); /* Pixel-perfect center! */
}`,
    questions: [
      "Why is transform: translateY(-5px) better for animation performance than changing the top or margin property?",
      "How does transform: translate(-50%, -50%) center an absolutely positioned element?",
      "What does the rotate() function do in the CSS transform property?"
    ]
  },

  "css-14": {
    title: "CSS Architecture Basics (BEM naming)",
    summary: [
      "As web projects grow, unorganized CSS leads to specificity conflicts and unexpected styling bugs.",
      "BEM (Block, Element, Modifier) is a widely adopted CSS naming convention that keeps CSS flat, predictable, and modular.",
      "STRUCTURE: Block is a standalone component (.card); Element is a dependent child part bound to the block (.card__title); Modifier is a variation or state flag (.card--featured or .card__button--disabled)."
    ],
    keyPoints: [
      "Block: Standalone entity (.menu, .card, .boss-chamber).",
      "Element: Child part designated with double underscore (.menu__item, .card__header).",
      "Modifier: State/theme designated with double hyphen (.menu--dark, .card--active).",
      "Flat Specificity: BEM uses single class selectors, eliminating deeply nested CSS selector chains."
    ],
    codeExample: `/* BEM Naming Pattern */

/* 1. Block: Standalone reusable component */
.chamber-card {
  border: 1px solid #D8CCA8;
  background-color: #E8DCC4;
}

/* 2. Element: Child part inside the block (double underscore) */
.chamber-card__title {
  font-family: 'Spectral', serif;
  font-size: 1.5rem;
}

.chamber-card__button {
  padding: 0.5rem 1rem;
}

/* 3. Modifier: Variation or state (double hyphen) */
.chamber-card--completed {
  border-color: #C9A24B;
}

.chamber-card__button--disabled {
  opacity: 0.4;
  cursor: not-allowed;
}`,
    questions: [
      "What do the Block, Element, and Modifier stand for in the BEM CSS naming convention, and why is it useful?",
      "How does BEM help keep CSS selector specificity low and maintainable?",
      "What do double underscores (__) and double hyphens (--) signify in BEM syntax?"
    ]
  }
};
