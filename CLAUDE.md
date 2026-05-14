# namefully-docs — notes for Claude

The official documentation site for the [`namefully`](https://github.com/ralflorent/namefully)
library. Docusaurus 3 (TypeScript template), deployed to Netlify at
`https://namefully.netlify.app`.

## Versions

Two versions ship side by side and **both are actively maintained**:

- **v2.2.0** — current/latest, lives at `/`.
- **v1.3.1** — actively maintained on the library's `release/1.x` branch, lives at
  `/docs/1.3.1/`. Do **not** label it legacy, unmaintained, deprecated, or EOL.
  The Docusaurus version banner is set to `'none'` for this reason.

When a feature is v2-only, scope it to the v2 docs and surface it from the v1
side via `whats-new-in-v2.md` rather than calling v1 "missing" anything.

### v2-only material — do not duplicate into v1

- Mononym support (`Config.mono`, `Mononym` class, `MonoParser`, `isMono` accessor).
- JSON round-trip: `Namefully#serialize()`, `deserialize()`, `SerializedName`.
- The `NameError` subclass hierarchy (`InputError`, `ValidationError`,
  `NotAllowedError`, `UnknownError`). v1.3.1 has only the single `NameError`.
- Minimum name length of 1 character (v1 is 2).

v1.3.1 _does_ accept the hierarchical `JsonName` shape as **input** to the
constructor — it just can't serialize back out to it. Document accordingly.

## API contracts that bite

The two static text helpers on `Namefully` are easy to misremember:

```ts
class Namefully {
  static parse(text: string, index?: NameIndex): Promise<Namefully>;       // async, throws
  static tryParse(text: string, index?: NameIndex): Namefully | undefined; // sync, undefined on failure
}
```

`parse()` is **async and throwing**. `tryParse()` is the synchronous,
undefined-returning helper. Neither accepts arrays or JSON — only strings.

## Source map

```
docs/                              v2.2.0 content (the "current" docs)
versioned_docs/version-1.3.1/      v1.3.1 content
docusaurus.config.ts               site config — URL, versions, plugins
sidebars.ts                        v2 sidebar
versioned_sidebars/                frozen sidebars per version
src/pages/index.tsx                landing page (React)
src/components/HomepageFeatures/   feature cards on the landing page
src/css/custom.css                 theme palette (teal primary)
static/img/                        favicon, logo, feature icons
netlify.toml                       build config + 301 redirects from retired URLs
.github/workflows/build.yml        CI gate that runs `npm run build` on PRs
.nvmrc                             pinned Node version (lts/jod = 22)
```

## TypeDoc API reference

The `/docs/api/` and `/docs/1.3.1/api/` reference sections are **generated at
build time** by `docusaurus-plugin-typedoc`. They are git-ignored — never
hand-edit files under `docs/api/` or `versioned_docs/version-1.3.1/api/`,
they're overwritten on every build.

Source of truth: the npm-published `.d.ts` files of `namefully@2.2.0` and
`namefully@1.3.1`, installed as aliased dev dependencies:

```jsonc
// package.json (excerpt)
"namefully-v1": "npm:namefully@^1.3.1",
"namefully-v2": "npm:namefully@^2.2.0",
```

If JSDoc on the library's public API changes upstream, bump these and rebuild
to refresh the reference.

## Voice and style

Guides (Introduction, Configuration, Creating names, Reading & formatting,
Edge cases, FAQ, Contributing) lean **slightly conversational with a dry wink**.
Match the tone of the existing pages — second-person, occasional asides, no
emoji. The auto-generated API reference and code-style sections (format
tokens, error class names) stay neutral and reference-like; humor lives in
the connective tissue, not the spec.

When adding a page, give it real frontmatter — `id`, `title`, one-line
`description` (which shows up in search results), and `sidebar_position`.

## Build loop

```bash
nvm use            # picks up .nvmrc (Node 22)
npm ci             # or npm install for a fresh checkout
npm start          # dev server on :3000 (or pass --port)
npm run build      # production build; broken-link checking is set to throw
```

`onBrokenLinks: 'throw'` is the production setting — broken cross-references
will fail the build. Keep it that way; the value of the gate goes up as the
site grows.

## Conventions worth knowing

- **Sibling library**: `../namefully` is the canonical TypeScript source for
  v2; `release/1.x` of the same repo is the v1 source. When verifying API
  details, prefer the published `.d.ts` files in `node_modules/namefully-v*`
  over reading the source — they're what TypeDoc renders.
- **Search**: native local search via `@easyops-cn/docusaurus-search-local`.
  Algolia DocSearch credentials are kept commented in `docusaurus.config.ts`
  as a fallback.
- **Analytics**: GA4 via the `GTAG_ID` env var (set in Netlify). Locally
  the placeholder `G-XXXXXXXXXX` is fine.
- **Redirects**: every retired URL has a 301 in `netlify.toml`. When
  removing or renaming a page that previously existed, add a redirect.
- **Ports**: `namefully` has Python, Go, and Dart ports under
  `github.com/ralflorent` with feature parity that lags the TS reference.
  Link out to them, don't document them here.
