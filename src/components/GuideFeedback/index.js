import { useLocation } from '@docusaurus/router';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

// The feedback line at the end of each Norway Data API guide. It links to
// the API repo's "Docs feedback" issue form (.github/ISSUE_TEMPLATE/docs.yml
// in cedar-ave/norway-data-api), with the page's URL filled in. The `page`
// query parameter must match the form's `page` field id.
const NEW_ISSUE = 'https://github.com/cedar-ave/norway-data-api/issues/new';

export default function GuideFeedback() {
  const { siteConfig } = useDocusaurusContext();
  const { pathname } = useLocation();
  const params = new URLSearchParams({ template: 'docs.yml', page: `${siteConfig.url}${pathname}` });
  return (
    <p>
      Was something unclear, wrong, or missing? <a href={`${NEW_ISSUE}?${params}`}>Open a docs feedback issue</a> on
      GitHub. The page's address is filled in for you.
    </p>
  );
}
