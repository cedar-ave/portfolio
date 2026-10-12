// /api-reference: the Norway Data API's interactive reference, rendered by
// Scalar from the API's OpenAPI spec. The API, the spec, and the reference
// page's text live in the cedar-ave/norway-data-api repo; this page only
// loads Scalar and points it at the spec.
//
// This replaces the @scalar/docusaurus plugin, which loaded Scalar's 4.5 MB
// script on every page of the site, with no integrity check. Here it loads
// only on this page, and the browser refuses it if the CDN's copy doesn't
// match SCALAR_INTEGRITY. See docs/norway-data-api/overview.mdx.

import React, { useEffect, useRef } from 'react';
import Layout from '@theme/Layout';
import '../css/scalar-api-reference.css';

const SPEC_URL = 'https://api.marlasowards.com/openapi/norway-data.yaml';

// To upgrade Scalar, change both: the version in the URL, and the hash of
// that exact file (see the docs page above for the command).
const SCALAR_SRC = 'https://cdn.jsdelivr.net/npm/@scalar/api-reference@1.73.1/dist/browser/standalone.js';
const SCALAR_INTEGRITY = 'sha384-kYDGzV91Jnn3TbHINV3nt54riK2uMJDfN5Al8dAkz4FssELTBWbD8rgw32sTKfOi';

// Loads the script once per visit, however many times the page mounts.
let scalarLoaded;
function loadScalar() {
  scalarLoaded ??= new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = SCALAR_SRC;
    script.integrity = SCALAR_INTEGRITY;
    script.crossOrigin = 'anonymous';
    script.onload = () => resolve(window.Scalar);
    script.onerror = () => {
      scalarLoaded = undefined;
      reject(new Error('The API reference viewer failed to load.'));
    };
    document.body.appendChild(script);
  });
  return scalarLoaded;
}

export default function ApiReference() {
  const container = useRef(null);

  useEffect(() => {
    let app;
    let cancelled = false;
    loadScalar()
      .then((Scalar) => {
        if (cancelled || !container.current) return;
        app = Scalar.createApiReference(container.current, {
          url: SPEC_URL,
          // The page follows the site's light or dark mode instead.
          hideDarkModeToggle: true,
        });
      })
      .catch((err) => {
        if (container.current) container.current.textContent = `${err.message} Reload the page to try again.`;
      });
    return () => {
      cancelled = true;
      app?.destroy?.();
    };
  }, []);

  return (
    <Layout
      title="Norway Data API reference"
      description="Interactive reference for the Norway Data API, a public REST API with facts about Norway.">
      <div ref={container} />
    </Layout>
  );
}
