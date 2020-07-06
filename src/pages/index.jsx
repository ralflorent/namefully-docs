import React from "react";
import classnames from "classnames";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import useBaseUrl from "@docusaurus/useBaseUrl";
import { EasyInstantiation, FullControl, DoItYourself } from './codeblocks';
import styles from "./styles.module.css";


const features = [
  {
    title: <>Easy to Use</>,
    icon: '/static/img/json.svg',
    description: (
      <>
        Accept various name shapes and optional parameters in order
        to access advanced features and have more control over the outputs.
      </>
    ),
  },
  {
    title: <>Shape it as Desired</>,
    icon: '/static/img/code-school.svg',
    description: (
      <>
        Provide an easy API for handling different name parts (surname,
        given name, title, etc.) of a person in a particular order, way, or shape.
      </>
    ),
  },
  {
    title: <>Related Packages</>,
    icon: '/static/img/react.svg',
    description: (
      <>
        Available as a wrapper in both Angular and React, with its own
        declaration files for TypeScript support.
      </>
    ),
  },
];

const showcases = [
  {
    title: <>Easy Instantiation</>,
    description: (
      <>
        <p>
          Build an instance of <code>Namefully</code> using
          different types of raw data:
        </p>
        <ul>
          <li>string literal</li>
          <li>string array</li>
          <li>Name class</li>
          <li>JSON object</li>
          <li>Full name builder</li>
        </ul>
      </>
    ),
    codeblock: <EasyInstantiation />
  },
  {
    title: <>Full Control and Flexibility</>,
    description: (
      <>
        <p>
          Access more features with the optional parameters to have more control
          over the outputs:
        </p>
        <ul>
          <li>Alter the order of appearance of a name: by given name or surname</li>
          <li>Handle various subparts of a surname and given name</li>
          <li>Use punctuations to reshape prefixes and suffixes</li>
          <li>Get the initials of a name</li>
        </ul>
      </>
    ),
    codeblock: <FullControl />
  },
  {
    title: <>Do It Yourself</>,
    description: (
      <>
        <p>
            Customize your own parser to indicate the full name:
        </p>
        <ul>
          <li>Decide whether or not to use validation rules</li>
          <li>Bypass directly existing validators</li>
          <li>Define your own set of restricted characters</li>
        </ul>
      </>
    ),
    codeblock: <DoItYourself />
  },
];

function Section({ children }) {
  return (
    <section className={classnames("container", styles.section)}>
      {children}
    </section>
  );
}

function Feature({ icon, title, description }) {
  return (
    <div className={classnames("col col--4", styles.feature)}>
      <img src={icon} style={{
        height: '120px',
        width: '120px',
        padding: '10px'
       }}/>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}

function Showcase({ title, description, codeblock, position }) {
  return (
    <Section>
      <div
        className="row"
        style={{
          display: "flex",
          flexDirection: position === "left" ? "row-reverse" : "row",
        }}
      >
        <div className={"col col--6"}>
          <div>
            <h3 className={styles.showcaseTitle}>{title}</h3>
            <p className={styles.showcaseText}>{description}</p>
          </div>
        </div>
        <div className={"col col--6"}>
          {codeblock}
        </div>
      </div>
    </Section>
  );
}

function Home() {
  const context = useDocusaurusContext();
  const { siteConfig = {} } = context;
  return (
    <Layout
      title="Docs"
      description="A JavaScript utility for handling person names"
    >
      <header className={classnames("hero hero--primary", styles.heroBanner)}>
        <div className="container">
          <img src="/static/img/logo.svg" />
          <h1 className="hero__title">{siteConfig.title}</h1>
          <p className="hero__subtitle">{siteConfig.tagline}</p>
          <div className={styles.buttons}>
            <Link
              className={classnames(
                "button button--outline button--lg",
                styles.heroLink
              )}
              to={useBaseUrl("docs/overview")}
            >
              Get Started
            </Link>
          </div>
        </div>
      </header>
      <main>
        <Section>
          <h3 className={styles.sectionHeader}>What is namefully?</h3>
          <p>
            It's a JavaScript library written in {' '}
            <a href="https://www.typescriptlang.org/">TypeScript</a> for handling
            person names. It relies actually on how the developer indicates the
            roles of the name parts so that it can internally perform certain
            operations and saves the developer some hurdles. As a matter of fact,
            <code>namefully</code> can be constructed using distinct raw data shapes.
            That is intended to give some flexibility to the developer so that he or she
            is not bound to a particular data format.
          </p>
        </Section>
        {features && features.length && (
          <Section>
            <div className="container">
              <div className="row">
                {features.map((props, idx) => (
                  <Feature key={idx} {...props} />
                ))}
              </div>
            </div>
          </Section>
        )}
        {showcases && showcases.length && (
          <>
            {showcases.map((props, idx) => (
              <Showcase
                key={idx}
                {...props}
                position={idx % 2 ? "left" : "right"}
              />
            ))}
          </>
        )}
      </main>
    </Layout>
  );
}

export default Home;
