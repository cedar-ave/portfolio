import React from 'react';
import styles from './styles.module.css';

/* Diagram for /portfolio/help-site-relaunch. Content is illustrative and
   describes the general shape of the Paligo-to-Zendesk publishing
   integration, not any specific company's configuration. */

function ArrowMarker({ id }) {
  return (
    <marker id={id} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
      <path d="M0,0 L10,5 L0,10 z" className={styles.arrow} />
    </marker>
  );
}

function Box({ x, y, w, h, kind = 'source', rx = 10, title, lines = [] }) {
  const cx = x + w / 2;
  const cy = y + h / 2;
  const lh = 22;
  const total = 1 + lines.length;
  const startY = cy - ((total - 1) * lh) / 2 + 5;
  const titleClass = kind === 'hub' ? styles.hubTitle : styles.title;
  const subClass = kind === 'hub' ? styles.hubSub : styles.sub;
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={rx} className={styles[kind]} />
      <text textAnchor="middle">
        <tspan x={cx} y={startY} className={titleClass}>{title}</tspan>
        {lines.map((l, i) => (
          <tspan key={i} x={cx} y={startY + lh * (i + 1)} className={subClass}>{l}</tspan>
        ))}
      </text>
    </g>
  );
}

export function IntegrationArchitecture() {
  const arrow = 'url(#pz-arrow)';

  const col1X = 40, col1W = 280;
  const frameX = 660, frameW = 280;

  const headingY = 34;

  // Paligo reuse cluster
  const topicW = 160, topicH = 56;
  const topicX = col1X + (col1W - topicW) / 2, topicY = 60;
  const guideW = 130, guideH = 56, guideY = 176;
  const guideAX = col1X + 10;
  const guideBX = col1X + col1W - guideW - 10;
  const clusterLabelY = guideY + guideH + 28;

  // Zendesk managed-article hierarchy
  const frameY = 46, frameH = 274;
  const innerX = frameX + 18, innerW = frameW - 36;
  const hBoxH = 70;
  const catY = 64, secY = 148, artY = 232;

  // Publish arrow between the two sides
  const publishFromX = col1X + col1W;
  const publishFromY = (topicY + guideY + guideH) / 2;
  const publishToX = frameX;
  const publishToY = secY + hBoxH / 2;

  const bannerY = 356, bannerH = 100;
  const bannerX = col1X, bannerW = frameX + frameW - col1X;

  const col1Mid = col1X + col1W / 2;
  const frameMid = frameX + frameW / 2;

  return (
    <figure className={styles.figure}>
      <div className={styles.scroll}>
        <svg
          className={styles.svg}
          viewBox="0 0 980 480"
          role="img"
          aria-labelledby="pz-integration-t pz-integration-d">
          <title id="pz-integration-t">How Paligo's CCMS strengths and Zendesk's CMS strengths combine</title>
          <desc id="pz-integration-d">
            Paligo is an XML component content management system: a single topic is written once and reused
            across many guides and outputs, giving structured, consistent, reusable authoring. That content
            publishes into Zendesk, which manages it as published articles organized into categories, sections,
            and articles for customers to search and browse. Together, the two systems combine the CCMS's
            strengths in structure and reuse with Zendesk's strengths in customer-facing delivery and support.
          </desc>

          <defs>
            <ArrowMarker id="pz-arrow" />
          </defs>

          <text x={col1Mid} y={headingY} textAnchor="middle" className={styles.heading}>Paligo &mdash; XML CCMS</text>
          <text x={frameMid} y={headingY} textAnchor="middle" className={styles.heading}>Zendesk &mdash; help center CMS</text>

          {/* Paligo: structured authoring and reuse */}
          <Box x={topicX} y={topicY} w={topicW} h={topicH} kind="source" rx={8} title="Shared topic" lines={['written in XML']} />
          <path d={`M${topicX + topicW * 0.3},${topicY + topicH} C${topicX + topicW * 0.3},${topicY + topicH + 30} ${guideAX + guideW / 2},${guideY - 30} ${guideAX + guideW / 2},${guideY - 2}`} className={styles.edge} markerEnd={arrow} />
          <path d={`M${topicX + topicW * 0.7},${topicY + topicH} C${topicX + topicW * 0.7},${topicY + topicH + 30} ${guideBX + guideW / 2},${guideY - 30} ${guideBX + guideW / 2},${guideY - 2}`} className={styles.edge} markerEnd={arrow} />
          <Box x={guideAX} y={guideY} w={guideW} h={guideH} kind="source" rx={8} title="Guide A" />
          <Box x={guideBX} y={guideY} w={guideW} h={guideH} kind="source" rx={8} title="Guide B" />
          <text x={col1Mid} y={clusterLabelY} textAnchor="middle" className={styles.sub}>One topic, reused across outputs</text>

          {/* Publish arrow between the two systems */}
          <path d={`M${publishFromX},${publishFromY} L${publishToX},${publishToY}`} className={styles.edge} markerEnd={arrow} />
          <text x={(publishFromX + publishToX) / 2} y={(publishFromY + publishToY) / 2 - 14} textAnchor="middle" className={styles.heading}>Publish</text>

          {/* Zendesk: manages the published articles */}
          <rect x={frameX} y={frameY} width={frameW} height={frameH} rx={12} className={styles.frame} />
          <Box x={innerX} y={catY} w={innerW} h={hBoxH} kind="target" rx={8} title="Category" lines={['Managed in Zendesk']} />
          <path d={`M${frameMid},${catY + hBoxH} L${frameMid},${secY}`} className={styles.edge} markerEnd={arrow} />
          <Box x={innerX} y={secY} w={innerW} h={hBoxH} kind="target" rx={8} title="Section" lines={['Managed in Zendesk']} />
          <path d={`M${frameMid},${secY + hBoxH} L${frameMid},${artY}`} className={styles.edge} markerEnd={arrow} />
          <Box x={innerX} y={artY} w={innerW} h={hBoxH} kind="target" rx={8} title="Article" lines={['Customer-facing']} />

          {/* The combined message */}
          <Box
            x={bannerX} y={bannerY} w={bannerW} h={bannerH} kind="note" rx={10}
            title="Two systems, two strengths"
            lines={['CCMS: structured, reusable authoring', 'CMS: customer-facing publishing and delivery']}
          />
        </svg>
      </div>
      <figcaption className={styles.caption}>
        Paligo's structured, reusable XML authoring feeds a Zendesk help center built to organize and deliver
        published articles to customers&mdash;combining the strengths of a CCMS with the strengths of a CMS.
      </figcaption>
    </figure>
  );
}
