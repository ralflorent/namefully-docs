module.exports = {
  title: 'namefully',
  tagline: 'A JavaScript utility for handling person names',
  url: 'https://ralflorent.github.io/namefully',
  baseUrl: '/',
  favicon: 'img/favicon.ico',
  organizationName: 'ralflorent', // Usually your GitHub org/user name.
  projectName: 'namefully', // Usually your repo name.
  themeConfig: {
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
        },
        { to: 'docs/help', label: 'Help', position: 'left' },
        {
          href: 'https://github.com/ralflorent/namefully',
          label: 'v1.0.8',
          position: 'right'
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
              label: "Getting Started",
              to: "docs/overview",
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Stack Overflow',
              href: 'https://stackoverflow.com/questions/tagged/namefully',
            }
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
