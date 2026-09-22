import clsx from 'clsx';
import Link from '@docusaurus/Link';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: 'Content engineering',
    link: '/experience/content-engineering',
    Svg: require('@site/static/img/ai_brain_icon.svg').default,
    description: (
      <>
        I build <strong>MCPs</strong> and <strong>AI agent skills</strong> that generate quality, AI-optimized content, facilitate human-in-the-loop reviews, and publish it with automated pipelines.
      </>
    ),
  },
  {
    title: 'Content development',
    link: '/experience/content-development',
    Svg: require('@site/static/img/code_icon.svg').default,
    description: (
      <>
      I've built <strong>docs-as-code</strong> ecosystems from the ground up and scaled content support across an organization with <strong>structured authoring</strong> in XML CCMS tools.
      </>
    ),
  },
  {
    title: 'Content engagement',
    link: '/experience/content-engagement',
    Svg: require('@site/static/img/bulb_icon.svg').default,
    description: (
      <>
        I create <strong>AI chatbots</strong>, <strong>help centers</strong>, and <strong>online customer communities</strong>. I build <strong>analytics dashboards</strong> that show if content is moving the needle.
      </>
    ),
  },
];

function Feature({ Svg, title, link, description }) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Link to={link}>
          <Svg className={styles.featureSvg} role="img" />
        </Link>
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3" className={styles.featureTitle}>
          <Link to={link} className={styles.featureTitleLink}>{title}</Link>
        </Heading>
        <p className={styles.featureDescription}>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
