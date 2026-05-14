import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const GTAG_ID = process.env.GTAG_ID ?? 'G-XXXXXXXXXX';

const config: Config = {
  title: 'namefully',
  tagline: 'Handle personal names in a particular order, way, or shape.',
  favicon: 'img/favicon.ico',

  future: {
    v4: true,
  },

  url: 'https://namefully.netlify.app',
  baseUrl: '/',

  organizationName: 'ralflorent',
  projectName: 'namefully',

  onBrokenLinks: 'throw',
  markdown: {
    hooks: {
      onBrokenMarkdownLinks: 'warn',
    },
  },

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          editUrl: 'https://github.com/ralflorent/namefully-docs/edit/master/',
          lastVersion: 'current',
          versions: {
            current: {
              label: '2.2.0',
              path: '/',
              badge: true,
            },
            '1.3.1': {
              label: '1.3.1',
              path: '1.3.1',
              banner: 'none',
            },
          },
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
        gtag: {
          trackingID: GTAG_ID,
          anonymizeIP: true,
        },
      } satisfies Preset.Options,
    ],
  ],

  plugins: [
    [
      require.resolve('@easyops-cn/docusaurus-search-local'),
      {
        hashed: true,
        indexBlog: false,
        docsRouteBasePath: '/docs',
        highlightSearchTermsOnTargetPage: true,
        explicitSearchResultPath: true,
      },
    ],
    [
      'docusaurus-plugin-typedoc',
      {
        id: 'api-current',
        entryPoints: ['node_modules/namefully-v2/dist/esm/index.d.ts'],
        tsconfig: 'typedoc.tsconfig.json',
        out: 'docs/api',
        readme: 'none',
        cleanOutputDir: true,
        skipErrorChecking: true,
        disableSources: true,
        plugin: ['typedoc-plugin-markdown'],
        sidebar: {
          autoConfiguration: false,
        },
      },
    ],
    [
      'docusaurus-plugin-typedoc',
      {
        id: 'api-v1.3.1',
        entryPoints: ['node_modules/namefully-v1/dist/types/index.d.ts'],
        tsconfig: 'typedoc.tsconfig.json',
        out: 'versioned_docs/version-1.3.1/api',
        readme: 'none',
        cleanOutputDir: true,
        skipErrorChecking: true,
        disableSources: true,
        plugin: ['typedoc-plugin-markdown'],
        sidebar: {
          autoConfiguration: false,
        },
      },
    ],
  ],

  themeConfig: {
    image: 'img/logo.svg',
    colorMode: {
      respectPrefersColorScheme: true,
    },
    announcementBar: {
      id: 'support_us',
      content:
        '⭐ If you like <strong>namefully</strong>, give it a star on <a target="_blank" rel="noopener noreferrer" href="https://github.com/ralflorent/namefully">GitHub</a>!',
      isCloseable: true,
    },
    navbar: {
      hideOnScroll: true,
      title: 'namefully',
      logo: {
        alt: 'namefully logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'doc',
          docId: 'overview',
          position: 'left',
          label: 'Docs',
        },
        {
          to: '/docs/api/',
          label: 'API',
          position: 'left',
        },
        {
          type: 'docsVersionDropdown',
          position: 'right',
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
            { label: 'Overview', to: '/docs/overview' },
            { label: 'Quick start', to: '/docs/quick-start' },
            { label: 'API reference', to: '/docs/api' },
            { label: 'Migrating from v1', to: '/docs/migrating-from-v1' },
          ],
        },
        {
          title: 'Ecosystem',
          items: [
            { label: '@namefully/react', href: 'https://github.com/ralflorent/namefully-react' },
            { label: '@namefully/ng', href: 'https://github.com/ralflorent/namefully-ng' },
            { label: 'namefully-python', href: 'https://github.com/ralflorent/namefully-python' },
            { label: 'namefully-go', href: 'https://github.com/ralflorent/namefully-go' },
            { label: 'namefully-dart', href: 'https://github.com/ralflorent/namefully-dart' },
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
              label: 'Issues',
              href: 'https://github.com/ralflorent/namefully/issues',
            },
            {
              html: `
                <a href="https://app.netlify.com/sites/namefully/deploys" target="_blank" rel="noreferrer noopener" aria-label="Netlify deploy status">
                  <img src="https://api.netlify.com/api/v1/badges/f46ebaa4-5a2a-42d4-821e-2cfc63ce5de7/deploy-status" alt="Netlify deploy status" />
                </a>
              `,
            },
          ],
        },
        {
          title: 'Social',
          items: [
            { label: 'GitHub', href: 'https://github.com/ralflorent' },
            { label: 'LinkedIn', href: 'https://linkedin.com/in/ralflorent' },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Ralph Florent. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['bash', 'json', 'typescript'],
    },
    // Algolia DocSearch is available as a fallback if native search ever falls short.
    // Re-enable by uncommenting and removing the @easyops-cn/docusaurus-search-local plugin above.
    // algolia: {
    //   appId: process.env.ALGOLIA_APP_ID ?? '',
    //   apiKey: process.env.ALGOLIA_API_KEY ?? '',
    //   indexName: 'namefully',
    //   contextualSearch: true,
    // },
  } satisfies Preset.ThemeConfig,
};

export default config;
