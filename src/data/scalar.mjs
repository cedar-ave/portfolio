// The Scalar script that renders /api-reference, in one place for both
// users: the page (src/pages/api-reference.js) loads it, and the Content
// Security Policy (plugins/csp-headers-plugin.mjs) allows exactly this file
// and its source map, not the whole CDN.
//
// To upgrade Scalar, change the version and set SCALAR_INTEGRITY to the
// new file's hash. See docs/norway-data-api/overview.mdx for the command.

export const SCALAR_SRC = 'https://cdn.jsdelivr.net/npm/@scalar/api-reference@1.73.1/dist/browser/standalone.js';
export const SCALAR_INTEGRITY = 'sha384-kYDGzV91Jnn3TbHINV3nt54riK2uMJDfN5Al8dAkz4FssELTBWbD8rgw32sTKfOi';

// Browsers fetch this only when developer tools are open.
export const SCALAR_SOURCE_MAP = `${SCALAR_SRC}.map`;
