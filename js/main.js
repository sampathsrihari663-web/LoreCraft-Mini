/**
 * File: js/main.js
 * Responsibility: Controls the multi-language campaign map view (views/index.html).
 * Manages active world selection across all 6 languages (Python, C#, C++, HTML, CSS, JavaScript).
 * Renders tiered milestone headers (Tier 1: Foundations, Tier 2: Core, Tier 3: Advanced)
 * and alternating nodes along the winding trail, enforcing tier-based progression.
 */

import { fetchCampaignTopics, getAvailableWorlds, resetDemoProgress } from "./service/topicService.js";
import { qs, getUrlParam, escapeHTML } from "./utils.js";
import { handleApiError } from "../exception/apiException.js";

// Currently active world key
let activeWorldKey = "python";

/**
 * Roman numeral converter for chapter sequencing (e.g. Chamber I, Chamber II).
 * @param {number} num - The integer order index.
 * @returns {string} Roman numeral string.
 */
function toRomanNumeral(num) {
  const romanMap = [
    [10, "X"],
    [9, "IX"],
    [5, "V"],
    [4, "IV"],
    [1, "I"]
  ];
  let result = "";
  let remaining = num;
  for (const [val, roman] of romanMap) {
    while (remaining >= val) {
      result += roman;
      remaining -= val;
    }
  }
  return result || String(num);
}

/**
 * Creates a tier divider element on the map separating Foundations, Core, and Advanced sections.
 * @param {number} tierNumber - Tier number (1, 2, or 3).
 * @param {string} tierName - Tier label ('Foundations', 'Core', 'Advanced').
 * @param {Array<object>} tierTopics - Array of topics belonging to this tier.
 * @returns {HTMLElement} The created DOM milestone element.
 */
function createTierDividerElement(tierNumber, tierName, tierTopics) {
  const dividerEl = document.createElement("div");

  const isAllCleared = tierTopics.every((t) => t.is_completed || t.status === "completed");
  const isAnyUnlocked = tierTopics.some((t) => t.status === "unlocked" || t.is_completed);

  let stateClass = "tier-locked";
  let statusBadge = "🔒 Locked";
  let subtitleText = `Conquer Tier ${tierNumber - 1} to break the seal on these chambers.`;

  if (isAllCleared) {
    stateClass = "tier-completed";
    statusBadge = "✓ Cleared";
    subtitleText = "All trials in this tier have been mastered.";
  } else if (isAnyUnlocked || tierNumber === 1) {
    stateClass = "tier-active";
    statusBadge = "⚔️ In Progress";
    subtitleText = `Face the trials of ${tierName} to advance.`;
  }

  dividerEl.className = `tier-divider ${stateClass}`;
  dividerEl.innerHTML = `
    <div class="tier-title">
      <span>Tier ${tierNumber}: ${escapeHTML(tierName)}</span>
      <span style="font-size: 0.8rem; font-weight: 500;">[${statusBadge}]</span>
    </div>
    <div class="tier-subtitle">${subtitleText}</div>
  `;

  return dividerEl;
}

/**
 * Creates a single HTML node element along the winding fantasy campaign trail.
 * Alternates between left and right side based on its index along the path.
 * @param {object} topic - The topic data object.
 * @param {number} index - The sequence index.
 * @returns {HTMLElement} The created DOM element.
 */
function createTrailNodeElement(topic, index) {
  // Alternate left and right to form the serpentine trail
  const isLeft = index % 2 === 0;
  const alignmentClass = isLeft ? "node-left" : "node-right";

  // Determine node state: locked, completed, or unlocked
  let stateClass = "node-locked";
  let statusBadgeHtml = "<span>🔒 Locked</span>";
  let isClickable = false;

  if (topic.is_completed || topic.status === "completed") {
    stateClass = "node-completed";
    statusBadgeHtml = "<span>✓ Cleared</span>";
    isClickable = true;
  } else if (topic.status === "unlocked") {
    stateClass = "node-unlocked";
    statusBadgeHtml = "<span>⚔️ Unlocked</span>";
    isClickable = true;
  }

  const nodeEl = document.createElement("article");
  nodeEl.className = `map-node ${alignmentClass} ${stateClass}`;
  nodeEl.setAttribute("data-topic-id", topic.id);

  if (isClickable) {
    nodeEl.setAttribute("tabindex", "0");
    nodeEl.setAttribute("role", "button");
    nodeEl.setAttribute(
      "aria-label",
      `Chamber ${index + 1}: ${topic.title}. Press Enter to enter boss battle.`
    );
  } else {
    nodeEl.setAttribute("aria-disabled", "true");
    nodeEl.setAttribute(
      "aria-label",
      `Chamber ${index + 1}: ${topic.title}. Locked. Complete previous trials first.`
    );
  }

  const romanIndex = toRomanNumeral(index + 1);

  nodeEl.innerHTML = `
    <div class="node-meta">
      <span class="node-sequence">Chamber ${romanIndex} (${escapeHTML(topic.tier_name || "Tier " + topic.tier)})</span>
      <span class="node-status-badge">${statusBadgeHtml}</span>
    </div>
    <h2 class="node-title">${escapeHTML(topic.title)}</h2>
    <p class="node-description">${escapeHTML(topic.description)}</p>
  `;

  // Navigation on click or keyboard activation
  if (isClickable) {
    const navigateToTrial = () => {
      window.location.href = `combat.html?topic=${encodeURIComponent(topic.id)}&world=${encodeURIComponent(activeWorldKey)}`;
    };

    nodeEl.addEventListener("click", navigateToTrial);
    nodeEl.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        navigateToTrial();
      }
    });
  }

  return nodeEl;
}

/**
 * Renders all campaign topics grouped by tier onto the trail canvas.
 * @param {Array<object>} topics - Array of topic objects for the active world.
 */
function renderCampaignMap(topics) {
  const container = qs("#trail-nodes");
  if (!container) return;

  container.innerHTML = "";

  if (!topics || topics.length === 0) {
    container.innerHTML = `
      <div class="status-banner banner-notice">
        No chambers charted in this realm yet.
      </div>
    `;
    return;
  }

  let currentTier = null;

  topics.forEach((topic, index) => {
    // Whenever we transition to a new tier, insert a Tier Milestone Divider
    if (topic.tier !== currentTier) {
      currentTier = topic.tier;
      const tierTopics = topics.filter((t) => t.tier === currentTier);
      const dividerEl = createTierDividerElement(
        currentTier,
        topic.tier_name || `Tier ${currentTier}`,
        tierTopics
      );
      container.appendChild(dividerEl);
    }

    const nodeEl = createTrailNodeElement(topic, index);
    container.appendChild(nodeEl);
  });
}

/**
 * Updates the Campaign HUD statistics box for the current active world.
 * @param {Array<object>} topics - Array of topics in the active world.
 */
function updateCampaignHud(topics) {
  if (!topics || !Array.isArray(topics)) return;

  const totalEl = qs("#stat-total");
  const clearedEl = qs("#stat-cleared");
  const unlockedEl = qs("#stat-unlocked");
  const lockedEl = qs("#stat-locked");

  const total = topics.length;
  const cleared = topics.filter((t) => t.is_completed || t.status === "completed").length;
  const unlocked = topics.filter((t) => t.status === "unlocked" && !t.is_completed).length;
  const locked = topics.filter((t) => t.status === "locked").length;

  if (totalEl) totalEl.textContent = String(total);
  if (clearedEl) clearedEl.textContent = String(cleared);
  if (unlockedEl) unlockedEl.textContent = String(unlocked);
  if (lockedEl) lockedEl.textContent = String(locked);
}

/**
 * Updates the parchment intro card text according to the selected world.
 * @param {object} worldInfo - The world metadata.
 */
function updateParchmentIntro(worldInfo) {
  const titleEl = qs("#world-intro-title");
  const textEl = qs("#world-intro-text");

  if (titleEl) {
    titleEl.textContent = `${worldInfo.icon} ${worldInfo.subtitle} (${worldInfo.name})`;
  }
  if (textEl) {
    textEl.textContent = `Welcome to the Realm of ${worldInfo.name}. Before you lies a three-tiered campaign syllabus (Foundations → Core → Advanced). Conquer each chamber's boss trial with your written reasoning to earn Arbiter rank seals and unlock the next tier!`;
  }
}

/**
 * Displays a friendly banner at the top of the map if in demo mode or if an error occurred.
 * @param {string} message - Banner text.
 * @param {'notice'|'error'} [type='notice'] - Visual type.
 */
function displayStatusBanner(message, type = "notice") {
  const statusContainer = qs("#status-container");
  if (!statusContainer) return;

  const bannerClass = type === "error" ? "banner-error" : "banner-notice";
  statusContainer.innerHTML = `
    <div class="status-banner ${bannerClass}">
      ${escapeHTML(message)}
    </div>
  `;
}

/**
 * Loads and renders the campaign topics for a selected world.
 * @param {string} worldKey - The world identifier to load.
 */
async function switchWorld(worldKey) {
  activeWorldKey = worldKey;
  localStorage.setItem("lorecraft_active_world", worldKey);

  // Update URL parameter without full page reload
  const newUrl = `${window.location.pathname}?world=${encodeURIComponent(worldKey)}`;
  window.history.replaceState({ world: worldKey }, "", newUrl);

  const worlds = getAvailableWorlds();
  const currentWorld = worlds.find((w) => w.id === worldKey) || worlds[0];
  updateParchmentIntro(currentWorld);

  // Highlight active tab
  const tabs = document.querySelectorAll(".world-tab");
  tabs.forEach((tab) => {
    const tabWorld = tab.getAttribute("data-world");
    if (tabWorld === worldKey) {
      tab.classList.add("active");
      tab.setAttribute("aria-selected", "true");
    } else {
      tab.classList.remove("active");
      tab.setAttribute("aria-selected", "false");
    }
  });

  try {
    const topics = await fetchCampaignTopics(worldKey);
    renderCampaignMap(topics);
    updateCampaignHud(topics);
  } catch (rawError) {
    const apiError = handleApiError(
      rawError,
      `Failed to load the campaign map for ${currentWorld.name}.`
    );
    displayStatusBanner(apiError.userFriendlyMessage, "error");
  }
}

/**
 * Renders the World Selector navigation tabs.
 */
function renderWorldSelector() {
  const container = qs("#world-selector");
  if (!container) return;

  container.innerHTML = "";
  const worlds = getAvailableWorlds();

  worlds.forEach((world) => {
    const tabBtn = document.createElement("button");
    tabBtn.type = "button";
    tabBtn.className = `world-tab ${world.id === activeWorldKey ? "active" : ""}`;
    tabBtn.setAttribute("data-world", world.id);
    tabBtn.setAttribute("role", "tab");
    tabBtn.setAttribute("aria-selected", String(world.id === activeWorldKey));
    tabBtn.innerHTML = `<span>${world.icon}</span> <span>${escapeHTML(world.name)}</span>`;

    tabBtn.addEventListener("click", () => {
      switchWorld(world.id);
    });

    container.appendChild(tabBtn);
  });
}

/**
 * Entry point function that initializes the map screen.
 */
async function initializeMap() {
  // Determine active world from URL parameter or localStorage
  const urlWorld = getUrlParam("world");
  const storedWorld = localStorage.getItem("lorecraft_active_world");
  const available = getAvailableWorlds().map((w) => w.id);

  if (urlWorld && available.includes(urlWorld.toLowerCase())) {
    activeWorldKey = urlWorld.toLowerCase();
  } else if (storedWorld && available.includes(storedWorld.toLowerCase())) {
    activeWorldKey = storedWorld.toLowerCase();
  } else {
    activeWorldKey = "python";
  }

  // Render world navigation tabs
  renderWorldSelector();

  // Reset button event listener
  const resetBtn = qs("#btn-reset-progress");
  if (resetBtn) {
    resetBtn.addEventListener("click", () => {
      const confirmed = window.confirm(
        `Reset your campaign progress for the ${activeWorldKey.toUpperCase()} realm back to Chamber I?`
      );
      if (confirmed) {
        resetDemoProgress(activeWorldKey);
        window.location.reload();
      }
    });
  }

  // Load the active world topics
  await switchWorld(activeWorldKey);
}

// Kick off map initialization once DOM content has fully loaded
document.addEventListener("DOMContentLoaded", initializeMap);
