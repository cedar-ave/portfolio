import clsx from 'clsx';
import Link from '@docusaurus/Link';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: 'AI-powered content engineering',
    link: '/experience/content-engineering',
    Svg: require('@site/static/img/ai_brain_icon.svg').default,
    description: (
      <>
        Custom MCPs • AI agent skills for ingesting source material, authoring, validating, optimizing, facilitating human-in-the-loop reviews, publishing, and managing the content lifecycle • AI-assisted pipelines
      </>
    ),
  },
  {
    title: 'Scalable content development',
    link: '/experience/content-development',
    Svg: require('@site/static/img/code_icon.svg').default,
    description: (
      <>
     Docs-as-code • Structured authoring in XML CCMS tools • Content lifecycle management • Taxomony-informed information architecture • Knowledge management strategy
      </>
    ),
  },
  {
    title: 'Outcomes-driven content engagement',
    link: '/experience/content-engagement',
    Svg: require('@site/static/img/bulb_icon.svg').default,
    description: (
      <>
        AI chatbots • Help centers • Online customer communities • Analytics reporting • Executive priority alignment
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
