import React from "react";
import classnames from "classnames";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import useBaseUrl from "@docusaurus/useBaseUrl";
import styles from "./styles.module.css";

function Home() {
  const context = useDocusaurusContext();
  const { siteConfig = {} } = context;
  return (
    <Layout
      title="Docs"
      description="Power TypeScript packages and reduce your config overhead"
    >
      <header className={classnames("hero hero--primary", styles.heroBanner)}>
        <div className="container">
          <h1 className="hero__title">{siteConfig.title}</h1>
          <p className="hero__subtitle">{siteConfig.tagline}</p>
          <div className={styles.buttons}>
            <Link
              className={classnames(
                "button button--outline button--lg",
                styles.heroLink
              )}
              to={useBaseUrl("docs/installation")}
            >
              Getting started
            </Link>
            <Link
              className={classnames(
                "button button--outline button--lg",
                styles.heroLink
              )}
              to="https://github.com/ralflorent/namefully/tree/master/usecases"
            >
              Examples
            </Link>
          </div>
        </div>
      </header>
      <main>
          <h1 style={{textAlign: 'center', marginTop: '1rem'}}>
            Under construction...
          </h1>
      </main>
    </Layout>
  );
}

export default Home;
