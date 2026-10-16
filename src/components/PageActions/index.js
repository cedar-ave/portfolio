import React, { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import Head from '@docusaurus/Head';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { hasMarkdown, markdownPath } from '@site/src/data/llms.mjs';
import styles from './styles.module.css';

// The "Copy page" menu for AI tools, on docs, samples, blog posts, and
// standalone pages (see src/theme/DocBreadcrumbs,
// src/theme/BlogPostItem/Header, and src/theme/MDXPage). It links to the
// page's Markdown copy, which plugins/llms-txt-plugin.mjs writes at build
// time, and adds a <link rel="alternate" type="text/markdown"> to the
// page's <head>.
//
// - Links to .md files are plain <a href>, not <Link>: they
//   aren't Docusaurus routes, so <Link> would fail the broken-link check.
// - The menu's items are only rendered while it's open, so link checkers
//   (and Manni) don't follow links that are hidden.
// - The menu follows the ARIA menu button pattern: Enter, Space, or Down
//   opens it; arrow keys, Home, and End move between items; Escape or Tab
//   closes it.
// - The page-actions class keeps the bar out of the search index (see
//   ignoreCssSelectors in docusaurus.config.js). It's hidden when printing.
// - The .md files only exist in production builds, so in `npm start`,
//   "Copy page" says so instead of copying.

const PROMPT = (url) => `Read ${url} so I can ask questions about it.`;

// menuAlign: "start" opens the menu from the button's left edge, "end" from
// its right edge (for a bar at the right of a row).
export default function PageActions({ permalink, menuAlign = 'start', className }) {
  const { siteConfig } = useDocusaurusContext();
  if (!permalink || !hasMarkdown(permalink)) return null;
  const mdPath = markdownPath(permalink);
  const mdUrl = `${siteConfig.url}${mdPath}`;
  return (
    <>
      <Head>
        <link rel="alternate" type="text/markdown" href={mdUrl} />
      </Head>
      <ActionMenu mdPath={mdPath} mdUrl={mdUrl} menuAlign={menuAlign} className={className} />
    </>
  );
}

// Copies the page's Markdown. ClipboardItem with a promise keeps Safari's
// "user gesture" intact while the file downloads; writeText is the fallback.
async function copyMarkdown(mdPath) {
  const text = fetch(mdPath).then(async (response) => {
    const body = await response.text();
    // The dev server answers a missing .md with its HTML app shell.
    if (!response.ok || body.trimStart().startsWith('<')) throw new Error('unavailable');
    return body;
  });
  if (typeof ClipboardItem !== 'undefined' && navigator.clipboard?.write) {
    await navigator.clipboard.write([
      new ClipboardItem({ 'text/plain': text.then((body) => new Blob([body], { type: 'text/plain' })) }),
    ]);
  } else {
    await navigator.clipboard.writeText(await text);
  }
}

function ActionMenu({ mdPath, mdUrl, menuAlign, className }) {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState('');
  const buttonRef = useRef(null);
  const menuRef = useRef(null);
  const focusOnOpen = useRef(0);
  const menuId = 'page-actions-menu';

  const items = () => [...(menuRef.current?.querySelectorAll('[role="menuitem"]') ?? [])];

  const close = ({ focusButton = true } = {}) => {
    setOpen(false);
    if (focusButton) buttonRef.current?.focus();
  };

  // Focus the first (or last) item once the menu is rendered.
  useEffect(() => {
    if (!open) return undefined;
    const list = items();
    list.at(focusOnOpen.current)?.focus();
    const onPointerDown = (event) => {
      if (!menuRef.current?.contains(event.target) && !buttonRef.current?.contains(event.target)) {
        close({ focusButton: false });
      }
    };
    document.addEventListener('pointerdown', onPointerDown);
    return () => document.removeEventListener('pointerdown', onPointerDown);
  }, [open]);

  useEffect(() => {
    if (!status) return undefined;
    const timer = setTimeout(() => setStatus(''), 4000);
    return () => clearTimeout(timer);
  }, [status]);

  const openMenu = (index) => {
    focusOnOpen.current = index;
    setOpen(true);
  };

  const onButtonKeyDown = (event) => {
    if (event.key === 'ArrowDown' || event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      openMenu(0);
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      openMenu(-1);
    }
  };

  const onMenuKeyDown = (event) => {
    const list = items();
    const index = list.indexOf(document.activeElement);
    const move = { ArrowDown: index + 1, ArrowUp: index - 1, Home: 0, End: list.length - 1 }[event.key];
    if (move !== undefined) {
      event.preventDefault();
      list[(move + list.length) % list.length]?.focus();
    } else if (event.key === 'Escape') {
      event.preventDefault();
      close();
    } else if (event.key === 'Tab') {
      close({ focusButton: false });
    }
  };

  const onCopy = async () => {
    close();
    try {
      await copyMarkdown(mdPath);
      setStatus('Copied the page as Markdown');
    } catch (error) {
      setStatus(error.message === 'unavailable'
        ? 'Markdown copies are only available in production builds'
        : "Couldn't copy. Use View as Markdown instead");
    }
  };

  const prompt = encodeURIComponent(PROMPT(mdUrl));

  return (
    <div className={clsx('page-actions', styles.bar, className)}>
      <div className={styles.menuWrapper}>
        <button
          ref={buttonRef}
          type="button"
          className={clsx('button button--sm button--outline button--secondary', styles.button)}
          aria-haspopup="menu"
          aria-expanded={open}
          aria-controls={open ? menuId : undefined}
          onClick={() => (open ? close() : openMenu(0))}
          onKeyDown={onButtonKeyDown}>
          Copy page <FontAwesomeIcon icon={faChevronDown} className={styles.caret} />
        </button>
        {open && (
          <ul ref={menuRef} id={menuId} role="menu" aria-label="Page actions" className={clsx(styles.menu, menuAlign === 'end' ? styles.menuEnd : styles.menuStart)} onKeyDown={onMenuKeyDown}>
            <li role="none">
              <button type="button" role="menuitem" tabIndex={-1} className={styles.item} onClick={onCopy}>
                <span className={styles.itemTitle}>Copy page</span>
                <span className={styles.itemDescription}>Copy this page as Markdown for AI tools</span>
              </button>
            </li>
            <li role="none">
              <a role="menuitem" tabIndex={-1} className={styles.item} href={mdPath} onClick={() => close({ focusButton: false })}>
                <span className={styles.itemTitle}>View as Markdown</span>
                <span className={styles.itemDescription}>Open this page as plain text</span>
              </a>
            </li>
            <li role="none">
              <a role="menuitem" tabIndex={-1} className={styles.item} href={`https://claude.ai/new?q=${prompt}`} target="_blank" rel="noopener noreferrer" onClick={() => close({ focusButton: false })}>
                <span className={styles.itemTitle}>Open in Claude</span>
                <span className={styles.itemDescription}>Ask questions about this page</span>
              </a>
            </li>
            <li role="none">
              <a role="menuitem" tabIndex={-1} className={styles.item} href={`https://chatgpt.com/?q=${prompt}`} target="_blank" rel="noopener noreferrer" onClick={() => close({ focusButton: false })}>
                <span className={styles.itemTitle}>Open in ChatGPT</span>
                <span className={styles.itemDescription}>Ask questions about this page</span>
              </a>
            </li>
          </ul>
        )}
      </div>
      <span role="status" className={styles.status}>{status}</span>
    </div>
  );
}
