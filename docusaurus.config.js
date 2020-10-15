const versions = require("./versions.json");

const config = {
  title: 'namefully',
  tagline: 'A JavaScript utility for handling person names',
  url: 'https://namefully.dev',
  baseUrl: '/',
  favicon: 'img/favicon.ico',
  organizationName: 'ralflorent',
  projectName: 'namefully',
  themeConfig: {
    announcementBar: {
      id: 'supportus',
      content:
        '⭐️ If you like namefully, give it a star on <a target="_blank" rel="noopener noreferrer" href="https://github.com/ralflorent/namefully">GitHub</a>! ⭐️',
      },
    prism: {
      theme: require('prism-react-renderer/themes/github'),
      darkTheme: require('prism-react-renderer/themes/dracula'),
    },
    gtag: {
        trackingID: 'UA-131799063-2',
    },
    algolia: {
      apiKey: 'efbb6e00899839b667fb5be2b0ba5902',
      indexName: 'namefully',
    },
    navbar: {
      hideOnScroll: true,
      title: 'namefully',
      logo: {
        alt: "logo",
        src: "img/logo.svg",
      },
      links: [
        {
          to: 'docs/overview',
          activeBasePath: 'docs',
          label: 'Docs',
          position: 'left',
          items: [
            {
              label: `${versions[0]} (latest)`,
              to: 'docs/installation',
            },
            ...versions.slice(1).map((version) => ({
                label: version,
                to: `docs/${version}/installation`,
            })),
          ]
        },
        {
          href: 'https://github.com/ralflorent/namefully',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: "Get Started",
              to: "docs/overview",
            },
            {
              label: "API Quick Reference",
              to: "docs/api-quick-reference",
            },
            {
              label: "Examples",
              to: "docs/examples",
            },
            {
              label: "Use Cases",
              to: "docs/use-cases",
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Stack Overflow',
              href: 'https://stackoverflow.com/questions/tagged/namefully',
            },
            {
              label: 'Feedback',
              href: 'https://github.com/ralflorent/namefully/issues',
            },
            {
            html: `
                <a href="https://www.netlify.com" target="_blank" rel="noreferrer noopener" aria-label="Deploys by Netlify">
                <img src="https://www.netlify.com/img/global/badges/netlify-color-accent.svg" alt="Deploys by Netlify" />
                </a>
            `,
            },
          ],
        },
        {
          title: 'Social',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/ralflorent',
            },
            {
              label: 'Twitter',
              href: 'https://twitter.com/ralflorent',
            },
            {
              label: 'Portfolio',
              href: 'https://ralflorent.com',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Ralph Florent. Built with Docusaurus.`,
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl:
            'https://github.com/ralflorent/namefully-docs/edit/master/',
        },
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl:
              'https://github.com/ralflorent/namefully-docs/edit/master/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};

module.exports = config;
