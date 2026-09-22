import React, {useState, useRef, useEffect} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import {useCollapsible, Collapsible} from '@docusaurus/theme-common';

// A navbar dropdown item that itself contains a sub-dropdown of links.
// Docusaurus's built-in `dropdown` navbar item type doesn't allow nesting,
// so this is a custom item (registered via type "custom-nestedDropdown" in
// src/theme/NavbarItem/ComponentTypes.js) that renders a parent link plus a
// flyout submenu on desktop, or a collapsible sub-list on mobile.

// Grace period between the pointer leaving the flyout and it actually
// closing, so crossing the small gap to the offset submenu (or approaching
// it on a diagonal) doesn't slam the menu shut. Pure CSS :hover has no such
// tolerance, which is what made this feel like it closed "at random".
const CLOSE_DELAY_MS = 300;

function NestedDropdownDesktop({label, to, href, items, position, className}) {
  const dropdownRef = useRef(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const closeTimeoutRef = useRef(null);

  const clearCloseTimeout = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
  };

  const openDropdown = () => {
    clearCloseTimeout();
    setShowDropdown(true);
  };

  const scheduleClose = () => {
    clearCloseTimeout();
    closeTimeoutRef.current = setTimeout(() => {
      setShowDropdown(false);
    }, CLOSE_DELAY_MS);
  };

  useEffect(() => clearCloseTimeout, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!dropdownRef.current || dropdownRef.current.contains(event.target)) {
        return;
      }
      clearCloseTimeout();
      setShowDropdown(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    document.addEventListener('focusin', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
      document.removeEventListener('focusin', handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <li
      ref={dropdownRef}
      onMouseEnter={openDropdown}
      onMouseLeave={scheduleClose}
      className={clsx('dropdown', 'dropdown--hoverable', {
        'dropdown--right': position === 'right',
        'dropdown--show': showDropdown,
      })}>
      <Link
        to={to}
        href={href}
        className={clsx('dropdown__link', className)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            setShowDropdown(!showDropdown);
          }
        }}>
        {label}
      </Link>
      <ul className="dropdown__menu">
        {items.map((childItemProps, i) => (
          <li key={i}>
            <Link
              to={childItemProps.to}
              href={childItemProps.href}
              className="dropdown__link">
              {childItemProps.label}
            </Link>
          </li>
        ))}
      </ul>
    </li>
  );
}

function CollapseButton({collapsed, onClick}) {
  return (
    <button
      aria-label={collapsed ? 'Expand the dropdown' : 'Collapse the dropdown'}
      aria-expanded={!collapsed}
      type="button"
      className="clean-btn menu__caret"
      onClick={onClick}
    />
  );
}

function NestedDropdownMobile({label, to, href, items, className}) {
  const {collapsed, toggleCollapsed} = useCollapsible({initialState: true});
  return (
    <li className={clsx('menu__list-item', {'menu__list-item--collapsed': collapsed})}>
      <div className="menu__list-item-collapsible">
        <Link
          to={to}
          href={href}
          className={clsx('menu__link menu__link--sublist menu__link--sublist-caret', className)}
          onClick={(e) => {
            e.preventDefault();
            toggleCollapsed();
          }}>
          {label}
        </Link>
        <CollapseButton
          collapsed={collapsed}
          onClick={(e) => {
            e.preventDefault();
            toggleCollapsed();
          }}
        />
      </div>
      <Collapsible lazy as="ul" className="menu__list" collapsed={collapsed}>
        {items.map((childItemProps, i) => (
          <li className="menu__list-item" key={i}>
            <Link
              to={childItemProps.to}
              href={childItemProps.href}
              className="menu__link">
              {childItemProps.label}
            </Link>
          </li>
        ))}
      </Collapsible>
    </li>
  );
}

export default function NestedDropdownNavbarItem({mobile = false, ...props}) {
  const Comp = mobile ? NestedDropdownMobile : NestedDropdownDesktop;
  return <Comp {...props} />;
}
