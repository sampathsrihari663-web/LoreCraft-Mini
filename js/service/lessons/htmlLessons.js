/**
 * File: js/service/lessons/htmlLessons.js
 * Comprehensive teaching scrolls and targeted trial questions for World 4: HTML.
 */

export const HTML_LESSONS = {
  "html-1": {
    title: "Document Structure & Tags",
    summary: [
      "HTML (HyperText Markup Language) provides the skeleton and structural meaning of every website.",
      "Every HTML5 document starts with the declaration <!DOCTYPE html>, which instructs the browser to render the page following the modern HTML5 standard, avoiding legacy 'quirks mode'.",
      "The root element <html> contains two major child containers: the <head> (metadata, title, stylesheet links, viewport settings not directly visible on the page) and the <body> (all rendered visual elements visible to users)."
    ],
    keyPoints: [
      "<!DOCTYPE html>: Mandatory top declaration that activates HTML5 standard mode across all modern browsers.",
      "<head>: Contains document metadata (<title>, <meta charset=\"UTF-8\">, CSS links).",
      "<body>: Contains all visible page contents (headings, paragraphs, buttons, sections).",
      "Tag Syntax: Elements consist of opening tags (<p>), content, and closing tags (</p>)."
    ],
    codeExample: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>LoreCraft — Document Structure</title>
</head>
<body>
  <h1>Welcome to the Realm</h1>
  <p>Your journey into the web begins with clean markup.</p>
</body>
</html>`,
    questions: [
      "What is the purpose of the <!DOCTYPE html> declaration at the very top of an HTML document?",
      "What is the difference between the <head> element and the <body> element in an HTML document?",
      "Why is specifying <meta charset=\"UTF-8\"> important in the <head> section?"
    ]
  },

  "html-2": {
    title: "Headings & Text Formatting",
    summary: [
      "Text formatting tags structure written language into readable, accessible content.",
      "Headings range from <h1> (most important primary title) down to <h6> (smallest sub-heading). A webpage should generally only feature ONE <h1> per page representing the core subject. Skipping heading levels (e.g. from <h1> directly to <h4>) disrupts navigation for screen reader users.",
      "Paragraphs are wrapped in <p>. Important text is enclosed in <strong> (indicating semantic importance, bolded by default), and emphasized text is enclosed in <em> (italicized by default)."
    ],
    keyPoints: [
      "Single <h1> Rule: Maintain one primary <h1> per document for clear SEO and accessibility outline.",
      "Hierarchy: Do not skip levels; follow <h1> -> <h2> -> <h3> systematically.",
      "Semantic Formatting: Use <strong> for important text, <em> for vocal emphasis, and <p> for paragraphs."
    ],
    codeExample: `<article>
  <!-- Primary Document Title (Only one h1 per page) -->
  <h1>The Dragon's Lair Chronicles</h1>
  
  <!-- Section Sub-heading -->
  <h2>Chapter 1: The Mountain Gate</h2>
  <p>The party reached the mountain peak before twilight.</p>
  
  <p>Beware: <strong>Dragon fire</strong> cannot be extinguished with water. Speak with <em>great caution</em>.</p>
</article>`,
    questions: [
      "Why should a webpage generally only have one <h1> element, and how does heading hierarchy help accessibility?",
      "What is the difference between semantic tags like <strong> and <em> compared to purely visual tags like <b> and <i>?",
      "Why should you avoid skipping heading levels (for example, jumping straight from <h1> to <h4>)?"
    ]
  },

  "html-3": {
    title: "Lists",
    summary: [
      "Lists organize related items into readable, structured groups.",
      "Unordered lists (<ul>) format items with bullet points and are used when the order does not matter (like a list of equipment or features).",
      "Ordered lists (<ol>) format items with sequential numbers and are used when the exact order or sequence is crucial (like recipes, step-by-step quest guides, or rankings). Both types wrap each item inside an <li> (list item) tag."
    ],
    keyPoints: [
      "<ul>: Unordered bulleted list for non-sequential items.",
      "<ol>: Ordered numbered list for step-by-step sequences and rankings.",
      "<li>: List item tag that must be direct children of <ul> or <ol>.",
      "Nesting: Lists can be nested inside an <li> to create sub-menus or hierarchical outlines."
    ],
    codeExample: `<!-- Unordered list: Order is arbitrary -->
<h3>Starting Inventory:</h3>
<ul>
  <li>Wooden Shield</li>
  <li>Iron Dagger</li>
  <li>Health Potion</li>
</ul>

<!-- Ordered list: Order is sequential -->
<h3>Potion Brewing Steps:</h3>
<ol>
  <li>Boil spring water in copper cauldron.</li>
  <li>Add crushed nightshade leaves.</li>
  <li>Stir clockwise for three minutes.</li>
</ol>`,
    questions: [
      "What is the difference between an ordered list (<ol>) and an unordered list (<ul>) in HTML?",
      "What tag must be used for each individual item inside an <ol> or <ul>?",
      "When is an ordered list (<ol>) preferred over an unordered list (<ul>)?"
    ]
  },

  "html-4": {
    title: "Links & Images",
    summary: [
      "Hyperlinks (<a>) and Images (<img>) connect web pages and provide visual multimedia.",
      "The anchor tag (<a>) creates hyperlinks using the 'href' attribute to define the target URL. The target=\"_blank\" attribute opens the destination in a new browser tab (always include rel=\"noopener noreferrer\" for security).",
      "The <img> tag embeds images. It is a self-closing void element. The 'alt' attribute is MANDATORY: it provides descriptive alternative text for visually impaired screen-reader users and acts as fallback text if the image fails to load."
    ],
    keyPoints: [
      "Anchor 'href': Specifies destination URL (<a href=\"https://example.com\">Visit</a>).",
      "Image 'src' and 'alt': 'src' defines image path; 'alt' is vital for accessibility and fallback.",
      "Self-Closing: <img> tags do not have a closing tag; they are self-contained void elements."
    ],
    codeExample: `<!-- Hyperlink navigating to an external page -->
<p>
  Learn more about game lore on the 
  <a href="https://example.com/lore" target="_blank" rel="noopener noreferrer">
    Official Lore Archive
  </a>.
</p>

<!-- Image with descriptive alt text -->
<img 
  src="../images/flame_sword.png" 
  alt="Glowing runic flame sword embedded in ancient stone pedestal"
  width="400" 
  height="250"
>`,
    questions: [
      "Why is the 'alt' attribute on an <img> tag essential, and what does the 'href' attribute do on an <a> tag?",
      "What does the target=\"_blank\" attribute do on an anchor (<a>) link?",
      "Why is the <img> element called a 'void' or self-closing tag in HTML?"
    ]
  },

  "html-5": {
    title: "Tables",
    summary: [
      "HTML tables organize two-dimensional tabular data into structured rows and columns.",
      "A table is enclosed in <table>. Rows are defined by <tr> (table row). Header cells are defined by <th> (table header, bolded and centered by default), and data cells are defined by <td> (table data).",
      "Semantic tables use <thead>, <tbody>, and <tfoot> to segment the header, body, and footer rows, allowing screen readers and browser print engines to handle long tables cleanly."
    ],
    keyPoints: [
      "<th> vs <td>: <th> provides semantic headings for columns/rows; <td> stores regular data.",
      "<tr>: Represents a horizontal table row.",
      "Semantic Sections: <thead> wraps headers, <tbody> wraps data, <tfoot> wraps summary rows.",
      "Accessibility: Use the 'scope' attribute (scope=\"col\" or scope=\"row\") on <th> to clarify associations."
    ],
    codeExample: `<table>
  <caption>Champion Combat Attributes</caption>
  <thead>
    <tr>
      <th scope="col">Hero Class</th>
      <th scope="col">Armor</th>
      <th scope="col">Spell Power</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Paladin</td>
      <td>95</td>
      <td>40</td>
    </tr>
    <tr>
      <td>Sorcerer</td>
      <td>25</td>
      <td>110</td>
    </tr>
  </tbody>
</table>`,
    questions: [
      "What is the difference between a table header cell (<th>) and a regular table data cell (<td>) in HTML?",
      "What do the <thead>, <tbody>, and <tr> elements represent inside an HTML table?",
      "Why is the 'scope' attribute useful on <th> elements for accessibility?"
    ]
  },

  "html-6": {
    title: "Forms & Input Elements",
    summary: [
      "Forms (<form>) collect user input and submit data to a server or JavaScript handler.",
      "The <input> element's behavior is dictated by its 'type' attribute: type=\"text\", type=\"password\", type=\"email\", type=\"number\", type=\"checkbox\", type=\"radio\", or type=\"submit\".",
      "ACCESSIBILITY REQUIREMENT: Always pair an input with a <label> element using the matching 'for' and 'id' attributes (e.g. <label for=\"user-email\"> paired with <input id=\"user-email\">). This allows screen readers to announce the field name and lets users click the label to focus the input."
    ],
    keyPoints: [
      "The 'type' Attribute: Controls UI display and validation (e.g. checkbox vs radio vs text).",
      "<label for=\"id\">: Associates descriptive text with an input for accessibility and click-targeting.",
      "Form Attributes: 'action' defines submit URL; 'method' defines HTTP verb (GET or POST).",
      "Multilane Text: Use <textarea> for multi-line inputs; <select> and <option> for dropdown menus."
    ],
    codeExample: `<form action="/submit-character" method="POST">
  <!-- Properly associated label and input -->
  <label for="char-name">Character Name:</label>
  <input type="text" id="char-name" name="charName" required>

  <label for="char-class">Choose Class:</label>
  <select id="char-class" name="charClass">
    <option value="mage">Mage</option>
    <option value="ranger">Ranger</option>
    <option value="warrior">Warrior</option>
  </select>

  <button type="submit">Create Character</button>
</form>`,
    questions: [
      "How does the 'type' attribute on an <input> element change how it behaves (for example, text vs checkbox vs submit)?",
      "Why must every form input be paired with a <label> using matching 'for' and 'id' attributes?",
      "What is the difference between the GET and POST methods on an HTML form?"
    ]
  },

  "html-7": {
    title: "Semantic HTML5 Elements",
    summary: [
      "Semantic HTML elements clearly communicate their meaning and purpose to both browsers, developers, and assistive technologies.",
      "Key semantic landmarks include: <header> (introductory branding/nav), <nav> (navigation links), <main> (central unique content of the document), <article> (self-contained syndicatable content), <section> (thematic grouping of content), <aside> (sidebar/tangential content), and <footer> (copyright, metadata).",
      "Screen readers use these landmarks to let blind users jump directly to navigation or main content without listening to every header on every page reload."
    ],
    keyPoints: [
      "Accessibility Landmarks: Assistive tools use <nav>, <main>, and <header> for fast keyboard navigation.",
      "SEO Value: Search engines heavily index content inside <main> and <article> above generic wrappers.",
      "Avoid 'Div Soup': Replace meaningless nested <div> tags with semantic elements that describe the content."
    ],
    codeExample: `<!-- Clean semantic layout -->
<header>
  <h1>LoreCraft Realm Portal</h1>
  <nav aria-label="Main Navigation">
    <a href="/map">Campaign Map</a>
    <a href="/armory">Armory</a>
  </nav>
</header>

<main>
  <article>
    <h2>Chamber of Arithmancy</h2>
    <p>Master dynamic calculations to unlock the dungeon seals.</p>
  </article>
</main>

<footer>
  <p>&copy; 2026 LoreCraft Academy. All rights reserved.</p>
</footer>`,
    questions: [
      "Why is using semantic elements like <header>, <main>, and <nav> better than wrapping everything inside generic <div> tags?",
      "How do semantic landmarks help blind or visually impaired users navigating with screen readers?",
      "What is the difference between an <article> and a <section> element in HTML5?"
    ]
  },

  "html-8": {
    title: "Div/Span & Layout Structure",
    summary: [
      "When no semantic element appropriately describes content, HTML provides generic containers: <div> and <span>.",
      "A <div> is a BLOCK-LEVEL container. It starts on a brand-new line and stretches to fill the full available width of its parent container. It is typically used for styling and layout wrappers.",
      "A <span> is an INLINE container. It does NOT start on a new line and only occupies as much width as its enclosed text. It is used to apply styles to specific words inside a sentence."
    ],
    keyPoints: [
      "<div> (Block): New line, 100% width, accepts width/height/margin/padding styling.",
      "<span> (Inline): Flows inline with text, width matches content only, vertical margins ignored.",
      "Fallback Usage: Use <div> and <span> purely for styling when semantic elements do not apply."
    ],
    codeExample: `<!-- Block-level container (full-width wrapper) -->
<div class="card-container">
  <!-- Inline elements styling specific words inside text -->
  <p>The knight had <span class="highlight-gold">100 gold</span> and <span class="status-alive">full stamina</span>.</p>
</div>`,
    questions: [
      "What is the difference between a block-level element like <div> and an inline element like <span>?",
      "Can an inline <span> element have width and height explicitly set in standard CSS?",
      "When is it acceptable to use a <div> instead of a semantic HTML5 tag?"
    ]
  },

  "html-9": {
    title: "Multimedia (audio/video)",
    summary: [
      "HTML5 introduced native multimedia elements (<audio> and <video>) that play media directly in the browser without third-party plugins.",
      "The boolean 'controls' attribute displays the browser's built-in playback controls: play/pause buttons, a seek bar, volume sliders, and full-screen toggles.",
      "You provide fallback file formats using nested <source> tags (e.g. MP4, WebM) so the browser can play whichever format it supports."
    ],
    keyPoints: [
      "controls Attribute: Activates the native media player UI interface.",
      "<source> Elements: Allows multiple format sources for cross-browser playback.",
      "autoplay & muted: Browsers block unmuted autoplaying media; always include 'muted' if using 'autoplay'."
    ],
    codeExample: `<!-- Native HTML5 Video Player -->
<video width="640" height="360" controls poster="thumbnail.jpg">
  <source src="boss_battle.webm" type="video/webm">
  <source src="boss_battle.mp4" type="video/mp4">
  <p>Your browser does not support HTML5 video. Download the video <a href="boss_battle.mp4">here</a>.</p>
</video>`,
    questions: [
      "What does the 'controls' attribute do when added to an HTML5 <video> tag?",
      "Why is it best practice to provide multiple <source> tags inside a <video> element?",
      "Why do modern web browsers require the 'muted' attribute if you want a video to autoplay?"
    ]
  },

  "html-10": {
    title: "Meta Tags & SEO Basics",
    summary: [
      "Meta tags live in the <head> section and communicate document metadata to browsers, search engines, and social media crawlers.",
      "The Viewport meta tag (<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">) is MANDATORY for responsive design. Without it, mobile browsers assume desktop layout and zoom out awkwardly.",
      "The <meta name=\"description\"> tag provides a concise summary of the page displayed in search engine result snippets."
    ],
    keyPoints: [
      "Viewport Tag: Prevents mobile desktop-scaling and sets 1:1 pixel ratio for mobile responsiveness.",
      "Meta Description: Provides snippet summary shown under page title in Google search results.",
      "Charset UTF-8: Ensures special characters, runes, and international text render cleanly."
    ],
    codeExample: `<head>
  <meta charset="UTF-8">
  <!-- Crucial tag for mobile responsiveness! -->
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <!-- Search engine snippet description -->
  <meta name="description" content="Master coding languages in LoreCraft's RPG dungeon campaign.">
  <title>LoreCraft — RPG Coding Platform</title>
</head>`,
    questions: [
      "Why is the <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\"> tag essential for building mobile-friendly websites?",
      "What does the <meta name=\"description\"> tag do for Search Engine Optimization (SEO)?",
      "What happens on a mobile smartphone if a website omits the viewport meta tag?"
    ]
  },

  "html-11": {
    title: "Accessibility (ARIA basics)",
    summary: [
      "Web accessibility (a11y) ensures that websites are usable by everyone, including people with visual, auditory, motor, or cognitive disabilities.",
      "ARIA (Accessible Rich Internet Applications) attributes supplement HTML when standard tags cannot convey the full role, state, or label of custom widgets.",
      "Common ARIA attributes include aria-label (provides invisible label for icon buttons), aria-hidden=\"true\" (hides decorative icons from screen readers), and role=\"alert\" (announces immediate dynamic notifications)."
    ],
    keyPoints: [
      "First Rule of ARIA: Use native semantic HTML elements whenever possible instead of ARIA.",
      "aria-label: Gives text names to visual-only elements (e.g. icon buttons).",
      "aria-hidden: Hides decorative elements (like glyphs or visual dividers) from screen readers."
    ],
    codeExample: `<!-- Icon button accessible via aria-label -->
<button type="button" aria-label="Open Inventory Bag">
  <span aria-hidden="true">🎒</span>
</button>

<!-- Dynamic alert message announced immediately -->
<div role="alert" class="error-banner">
  Arbiter connection failed. Please retry your submission.
</div>`,
    questions: [
      "What is the purpose of ARIA attributes (like aria-label and role) in HTML, and when should they be used?",
      "What does aria-hidden=\"true\" do when applied to an icon or decorative element?",
      "What is the 'First Rule of ARIA' regarding native HTML elements?"
    ]
  },

  "html-12": {
    title: "Form Validation Attributes",
    summary: [
      "HTML5 provides built-in client-side form validation attributes that prevent invalid submissions without requiring a single line of JavaScript.",
      "The 'required' attribute ensures a field cannot be submitted blank. If a user tries to submit an empty required field, the browser blocks the submit event, focuses the field, and displays a localized warning tooltip.",
      "Other validation attributes include: min/max (numeric bounds), minlength/maxlength (character counts), type=\"email\" (verifies @ and domain), and pattern=\"...\" (validates regular expressions)."
    ],
    keyPoints: [
      "required: Blocks form submission if the input is empty.",
      "minlength & maxlength: Constrains character length directly in browser.",
      "pattern=\"regex\": Enforces custom validation formats (like zip codes or phone numbers).",
      "Native Tooltips: Browsers display localized error tooltips automatically."
    ],
    codeExample: `<form>
  <!-- Native HTML5 validation without JavaScript -->
  <label for="mage-name">Mage Name (3-15 runes):</label>
  <input type="text" id="mage-name" name="mageName" required minlength="3" maxlength="15">

  <label for="mana">Starting Mana (10-100):</label>
  <input type="number" id="mana" name="mana" required min="10" max="100">

  <button type="submit">Enlist Mage</button>
</form>`,
    questions: [
      "How does the HTML 'required' attribute prevent a form from submitting invalid data without using JavaScript?",
      "What do the minlength and maxlength attributes do on an <input> element?",
      "What happens in the browser when a user attempts to submit a form with an invalid email address in a type=\"email\" input?"
    ]
  },

  "html-13": {
    title: "Embedding & iframes",
    summary: [
      "The <iframe> (inline frame) tag embeds another separate HTML document, video, or third-party widget inside the current webpage.",
      "SECURITY CRITICAL: Embedding untrusted third-party sites in an iframe introduces security vulnerabilities (like clickjacking and malicious scripts).",
      "Always use the 'sandbox' attribute on iframes. The sandbox attribute isolates the embedded page and blocks scripts, popups, and parent window manipulation unless specific permissions (like allow-scripts) are explicitly granted."
    ],
    keyPoints: [
      "<iframe>: Embeds external documents or third-party media (maps, videos).",
      "sandbox Attribute: Restricts iframe permissions for critical security protection.",
      "loading=\"lazy\": Defers loading of off-screen iframes until the user scrolls near them, speeding up page load."
    ],
    codeExample: `<!-- Embedded secure sandbox frame -->
<iframe 
  src="https://example.com/interactive-map" 
  title="Interactive Dungeon Map"
  width="800" 
  height="450" 
  sandbox="allow-scripts allow-same-origin"
  loading="lazy"
></iframe>`,
    questions: [
      "What is an <iframe> used for in HTML, and why is the 'sandbox' attribute recommended for security?",
      "What does the loading=\"lazy\" attribute do on an <iframe> or <img> element?",
      "Why is including a 'title' attribute required on an <iframe> for accessibility?"
    ]
  },

  "html-14": {
    title: "HTML5 APIs Overview (Canvas, LocalStorage)",
    summary: [
      "HTML5 introduced powerful browser APIs for interactive graphics and persistent client-side data.",
      "The <canvas> element is a scriptable pixel bitmap surface that allows JavaScript to render 2D/3D shapes, real-time animations, and game visuals.",
      "The localStorage API allows web applications to store key-value string data persistently in the user's browser across page reloads and sessions without sending data over network requests."
    ],
    keyPoints: [
      "<canvas>: Drawing surface controlled via JavaScript 2D/WebGL rendering context.",
      "localStorage: Stores persistent key-value text in browser (localStorage.setItem, localStorage.getItem).",
      "Persistence: localStorage data remains even after the browser tab or window is closed."
    ],
    codeExample: `<!-- Canvas drawing element -->
<canvas id="game-canvas" width="600" height="400"></canvas>

<script>
  // 1. Drawing on Canvas
  const canvas = document.getElementById("game-canvas");
  const ctx = canvas.getContext("2d");
  ctx.fillStyle = "#C9A24B"; // Gold color
  ctx.fillRect(50, 50, 100, 100); // Draws a gold square

  // 2. Saving to browser LocalStorage
  localStorage.setItem("lorecraft_player_gold", "250");
  const savedGold = localStorage.getItem("lorecraft_player_gold");
  console.log("Retrieved Gold:", savedGold);
</script>`,
    questions: [
      "What is the difference between drawing pixels on an HTML <canvas> and storing data in browser localStorage?",
      "How do you save and retrieve data from browser localStorage in JavaScript?",
      "Does data stored in localStorage get deleted when the user closes their browser window?"
    ]
  }
};
