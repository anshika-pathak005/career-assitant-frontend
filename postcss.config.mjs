// postcss.config.js
const config = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};

export default config;

/**
 * PostCSS config file:
 * Purpose:
 * - Defines how CSS is processed before being applied in the browser
 * - Enables Tailwind CSS and ensures browser compatibility
 *
 * Plugins:
 * - tailwindcss: Enables utility-first CSS classes
 * - autoprefixer: Adds browser-specific prefixes for compatibility
 *
 * Example:
 * - Input CSS:
 *   display: flex;
 *
 * - After autoprefixer:
 *   display: -webkit-box;
 *   display: -ms-flexbox;
 *   display: flex;
 *
 * This ensures the same layout works properly across different browsers.
 */