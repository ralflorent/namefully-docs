---
id: contributing
title: Contributing
description: How to run the docs locally and where the canonical contribution guides live.
sidebar_position: 1
---

# Contributing

Pull requests are welcome — on both the library and these docs. This page covers the docs-site dev loop. For contributing to the library itself, the canonical guides live in the library repo:

- [namefully `CONTRIBUTING.md`](https://github.com/ralflorent/namefully/blob/main/CONTRIBUTING.md)
- [namefully `CODE_OF_CONDUCT.md`](https://github.com/ralflorent/namefully/blob/main/CODE_OF_CONDUCT.md)

## Running the docs locally

The site is a [Docusaurus 3](https://docusaurus.io) project. Node 20 or newer is required; an `.nvmrc` is checked in.

```bash
git clone https://github.com/ralflorent/namefully-docs.git
cd namefully-docs
nvm use            # picks up the .nvmrc
npm install
npm start          # dev server with hot reload
```

The dev server runs at `http://localhost:3000`. Most changes are reflected live.

## Building for production

```bash
npm run build
npm run serve      # serve the built site locally
```

Broken-link checking runs as part of `build`. The build will fail loudly if a doc points at a path that doesn't exist.

## Where things live

| Path | What's in it |
| --- | --- |
| `docs/` | The latest (v2.x) docs |
| `versioned_docs/` | Frozen versions (v1.3.1 today) |
| `sidebars.ts` | Sidebar layout for the current version |
| `versioned_sidebars/` | Sidebar layouts per frozen version |
| `docusaurus.config.ts` | Site config — URL, plugins, theme |
| `src/pages/` | Custom React pages (the landing page lives here) |
| `src/css/custom.css` | Theme overrides |
| `static/img/` | Images and favicons |

## Editing content

Pages are MDX. Standard markdown plus the Docusaurus components (`Tabs`, `TabItem`, admonitions) are available. Code blocks support a `npm2yarn` magic comment that renders npm and yarn variants side-by-side.

Each page should have frontmatter:

```yaml
---
id: my-page
title: My page
description: One-line summary that shows up in search results.
sidebar_position: 1
---
```

## Cutting a new docs version

When the library releases a new version that warrants a frozen docs snapshot:

```bash
npm run docusaurus docs:version 2.3.0
```

This copies `docs/` into `versioned_docs/version-2.3.0/`, freezes the sidebar, and updates `versions.json`. Then continue editing `docs/` as the next "current" version.

## Filing an issue against the docs

If you find a typo, an out-of-date example, or a missing topic, the [docs issue tracker](https://github.com/ralflorent/namefully-docs/issues) is the place. PRs are welcome — small fixes don't need an issue first.

## Style notes

A few preferences that keep the docs feeling consistent:

- **Be specific.** "It's faster" → "no validation, no allocation, no copy".
- **Show, then explain.** Code first when possible; prose to explain the surprising bits.
- **One-line description in frontmatter.** It shows up in search results — make it useful.
- **Honour the existing voice.** The docs lean slightly conversational and occasionally dry-funny. Match the tone of the surrounding pages rather than introducing a new register.
