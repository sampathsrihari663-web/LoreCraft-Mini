/**
 * File: js/utils.js
 * Responsibility: General-purpose utility and DOM manipulation helper functions.
 * Keeps DOM queries, element creation, and URL parameter extraction clean and beginner-friendly.
 */

/**
 * Shorthand helper for document.querySelector.
 * @param {string} selector - CSS selector string.
 * @param {ParentNode} [parent=document] - Optional parent node to scope the query.
 * @returns {Element|null} The matching element or null.
 */
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}

/**
 * Shorthand helper for document.querySelectorAll returning a true Array instead of a NodeList.
 * @param {string} selector - CSS selector string.
 * @param {ParentNode} [parent=document] - Optional parent node to scope the query.
 * @returns {Element[]} Array of matched elements.
 */
export function qsa(selector, parent = document) {
  return Array.from(parent.querySelectorAll(selector));
}

/**
 * Extracts a specific query parameter value from the browser's current URL.
 * Example: if URL is "combat.html?topic=3", getUrlParam("topic") returns "3".
 * @param {string} paramName - Name of the query parameter to look for.
 * @returns {string|null} The parameter string, or null if not present in the URL.
 */
export function getUrlParam(paramName) {
  const params = new URLSearchParams(window.location.search);
  return params.get(paramName);
}

/**
 * Escapes unsafe characters in a string to prevent XSS injection when inserting text.
 * @param {string} rawString - The unescaped text.
 * @returns {string} Safe HTML string with special entities escaped.
 */
export function escapeHTML(rawString) {
  if (typeof rawString !== "string") {
    return "";
  }
  const div = document.createElement("div");
  div.textContent = rawString;
  return div.innerHTML;
}

/**
 * Debounce helper: delays invoking a function until after 'delay' milliseconds have elapsed
 * since the last time it was called. Useful for window resize or live search inputs.
 * @param {Function} func - The function to debounce.
 * @param {number} delayMs - Delay in milliseconds.
 * @returns {Function} Wrapped debounced function.
 */
export function debounce(func, delayMs = 250) {
  let timerId = null;
  return function (...args) {
    if (timerId !== null) {
      clearTimeout(timerId);
    }
    timerId = setTimeout(() => {
      func.apply(this, args);
    }, delayMs);
  };
}
