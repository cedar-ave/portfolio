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
import { SCALAR_INTEGRITY, SCALAR_SRC } from '../data/scalar.mjs';

const SPEC_URL = 'https://api.marlasowards.com/openapi/norway-data.yaml';


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
          // Scalar expands the first tag (Index) when the URL has no
          // section in it. Off, so the page opens on the Introduction.
          defaultOpenFirstTag: false,
          // Scalar's defaults contact Scalar's own servers. None of that is
          // needed here, so it's all off:
          // - Test Request goes through https://proxy.scalar.com by default.
          //   The API allows any origin, so requests go straight to it, and
          //   no third party sees visitors' requests. An empty string turns
          //   the proxy off.
          proxyUrl: '',
          // Usage telemetry to Scalar.
          telemetry: false,
          // The "Ask AI" agent, which sends the spec to Scalar's AI service.
          agent: { disabled: true },
          // Fonts from fonts.scalar.com. The site's own fonts are used
          // instead (see src/css/scalar-api-reference.css).
          withDefaultFonts: false,
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
