import type { ReactNode } from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import CodeBlock from '@theme/CodeBlock';
import Heading from '@theme/Heading';
import HomepageFeatures from '@site/src/components/HomepageFeatures';

import styles from './index.module.css';

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          {siteConfig.title}
        </Heading>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link className="button button--secondary button--lg" to="/docs/overview">
            Get started
          </Link>
          <Link
            className="button button--outline button--secondary button--lg"
            href="https://stackblitz.com/edit/namefully"
            target="_blank"
            rel="noreferrer"
          >
            Try it live
          </Link>
        </div>
      </div>
    </header>
  );
}

function CodeShowcase() {
  return (
    <section className={styles.showcase}>
      <div className="container">
        <div className="row">
          <div className={clsx('col col--6', styles.showcaseCopy)}>
            <Heading as="h2">Get to know names that don't fit a textbook</Heading>
            <p>
              Pass in a string, an array, a JSON object, or build it piece by piece. Once you
              have a <code>Namefully</code>, you have a stable, immutable handle on every
              shape you need to render.
            </p>
            <p>
              No surprises, no mutation, no dependencies. Just a small, well-tested API for a
              problem that is almost never as simple as it sounds.
            </p>
            <Link className="button button--primary button--lg" to="/docs/quick-start">
              Quick start →
            </Link>
          </div>
          <div className="col col--6">
            <CodeBlock language="typescript" title="What it looks like">
              {`import { Namefully } from 'namefully';

const name = new Namefully('Thomas Alva Edison');

name.short;             // 'Thomas Edison'
name.public;            // 'Thomas E'
name.initials();        // ['T', 'A', 'E']
name.format('L, f m');  // 'EDISON, Thomas Alva'
name.zip();             // 'Thomas A. E.'`}
            </CodeBlock>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Home(): ReactNode {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={siteConfig.title}
      description="Handle personal names in a particular order, way, or shape."
    >
      <HomepageHeader />
      <main>
        <HomepageFeatures />
        <CodeShowcase />
      </main>
    </Layout>
  );
}
