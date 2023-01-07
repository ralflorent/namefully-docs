import React from 'react'
import classnames from 'classnames'
import Layout from '@theme/Layout'
import Link from '@docusaurus/Link'
import CodeBlock from '@theme/CodeBlock'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import useBaseUrl from '@docusaurus/useBaseUrl'
import styles from './styles.module.css'

const EasyInstantiation = () => (
    <CodeBlock className="language-typescript">
        {`import { Namefully, Name } from 'namefully'

const fromString = new Namefully('Jane Doe')
const fromArray = new Namefully([ 'Jane', 'Doe' ])
const fromJson = new Namefully({
    firstName: 'Jane',
    lastName: 'Doe'
})
const fromName = new Namefully([
    Name.first('Jane'),
    Name.last('Doe')
])
`}
    </CodeBlock>
)

const FullControl = () => (
    <CodeBlock className="language-typescript">
        {`import { Namefully, NameOrder, Title } from 'namefully'

const name = new Namefully(
    'Lic, De La Cruz, Rosanna, María',
    {
        orderedBy: NameOrder.LAST_NAME,
        title: Title.US
    }
)
name.first // Rosanna
name.middle // María
name.last // De La Cruz
name.full // Lic. De La Cruz Rosanna María
name.format('f L') // Rosanna DE LA CRUZ`}
    </CodeBlock>
)

const DoItYourself = () => (
    <CodeBlock className="language-typescript">
        {`import { Config, FullName, Namefully, Parser } from 'namefully'

class SimpleParser extends Parser<string> {
    parse(options?: Partial<Config>): FullName {
        const [firstName, lastName] = this.raw.split('#')
        return FullName.parse({
            firstName,
            lastName
        }, Config.merge(options))
    }
}

const name = new Namefully(SimpleParser('Juan#Garcia'))
name.full // Juan Garcia`}
    </CodeBlock>
)

const features = [
    {
        title: <>Easy to Use</>,
        icon: '/img/json.svg',
        description: (
            <>
                Accept various name shapes and optional parameters to access advanced features and have more control
                over the outputs.
            </>
        ),
    },
    {
        title: <>Shape Names as Desired</>,
        icon: '/img/code-school.svg',
        description: (
            <>
                Provide a rich API to format different name parts (surname, given name, title, etc.) in a particular
                order, way, or shape.
            </>
        ),
    },
    {
        title: <>Related Packages</>,
        icon: '/img/react.svg',
        description: (
            <>
                Available as a wrapper in both Angular and React, with its own declaration files for TypeScript support.
            </>
        ),
    },
]

const showcases = [
    {
        title: <>Easy Instantiation</>,
        description: (
            <>
                <p>
                    Build an instance of <code>Namefully</code> using different types of raw data:
                </p>
                <ul>
                    <li>string literals</li>
                    <li>string arrays</li>
                    <li>JSON objects</li>
                    <li>predefined classes (e.g., Name).</li>
                </ul>
            </>
        ),
        codeblock: <EasyInstantiation />,
    },
    {
        title: <>Full Control and Flexibility</>,
        description: (
            <>
                <p>Access additional features with the optional parameters to have more control over the outputs:</p>
                <ul>
                    <li>alter a full name's order on the fly;</li>
                    <li>handle various parts of a surname and given name;</li>
                    <li>use punctuations to reshape prefixes and suffixes;</li>
                    <li>retrieve the names' initials.</li>
                </ul>
            </>
        ),
        codeblock: <FullControl />,
    },
    {
        title: <>Do It Yourself</>,
        description: (
            <>
                <p>Customize your own parser to indicate the full name:</p>
                <ul>
                    <li>decide whether to rely on the existing parsing methods;</li>
                    <li>use business-tailored validators as needed;</li>
                    <li>parse non-standard name cases.</li>
                </ul>
            </>
        ),
        codeblock: <DoItYourself />,
    },
]

function Section({ children }) {
    return <section className={classnames('container', styles.section)}>{children}</section>
}

function Feature({ icon, title, description }) {
    return (
        <div className={classnames('col col--4', styles.feature)}>
            <img
                src={icon}
                style={{
                    height: '120px',
                    width: '120px',
                    padding: '10px',
                }}
            />
            <h3>{title}</h3>
            <p>{description}</p>
        </div>
    )
}

function Showcase({ title, description, codeblock, position }) {
    return (
        <Section>
            <div
                className="row"
                style={{
                    display: 'flex',
                    flexDirection: position === 'left' ? 'row-reverse' : 'row',
                }}
            >
                <div className={'col col--6'}>
                    <div>
                        <h3 className={styles.showcaseTitle}>{title}</h3>
                        <p className={styles.showcaseText}>{description}</p>
                    </div>
                </div>
                <div className={'col col--6'}>{codeblock}</div>
            </div>
        </Section>
    )
}

function Home() {
    const context = useDocusaurusContext()
    const { siteConfig = {} } = context
    return (
        <Layout
            title="Docs"
            description="A JavaScript utility for handling person names in a particular order, way, or shape."
        >
            <header className={classnames('hero hero--primary', styles.heroBanner)}>
                <div className="container">
                    <img src="/img/logo.svg" />
                    <h1 className="hero__title">{siteConfig.title}</h1>
                    <p className="hero__subtitle">{siteConfig.tagline}</p>
                    <div className={styles.buttons}>
                        <Link
                            className={classnames('button button--outline button--lg', styles.heroLink)}
                            to={useBaseUrl('docs/overview')}
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
                        It is a JavaScript library written in <a href="https://www.typescriptlang.org/">TypeScript</a>{' '}
                        that manipulates people's names, including prefixes, suffixes and initials. It relies actually
                        on how you indicate each name part's role to internally perform certain operations and save you
                        some hurdles. As a matter of fact, <code>namefully</code> can be constructed using distinct raw
                        data types. That is intended to give you some flexibility so that you are not bound to a
                        particular data type.
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
                            <Showcase key={idx} {...props} position={idx % 2 ? 'left' : 'right'} />
                        ))}
                    </>
                )}
            </main>
        </Layout>
    )
}

export default Home
