---
id: wrappers
title: Framework wrappers
description: Drop-in packages for Angular and React.
sidebar_position: 1
---

# Framework wrappers

If you're using a framework, there's a wrapper that gives you idiomatic bindings without writing the glue yourself.

## `@namefully/react`

A React-shaped wrapper around `namefully`. Provides hooks for accessing a `Namefully` from component code, with the immutability story preserved.

```bash npm2yarn
npm install @namefully/react
```

Source and docs: [github.com/ralflorent/namefully-react](https://github.com/ralflorent/namefully-react)

## `@namefully/ng`

An Angular wrapper with services and pipes that integrate with Angular's change-detection lifecycle. The same `Namefully` API is exposed as injectables.

```bash npm2yarn
npm install @namefully/ng
```

Source and docs: [github.com/ralflorent/namefully-ng](https://github.com/ralflorent/namefully-ng)

## Why these are separate packages

The core `namefully` package is dependency-free and framework-agnostic, so it stays light when you don't need it bound to anything. The wrappers carry their own peer dependencies on React or Angular and keep the framework-specific code out of the core's bundle. If you're using both libraries in the same monorepo, that separation matters; if you're only using one, you can ignore the other completely.

## Versioning

The wrappers track the core `namefully` package as a peer dependency. Major versions of the wrappers correspond to major versions of the core — `@namefully/react@2.x` works with `namefully@2.x`, and so on.

If you're upgrading the core from v1 to v2, the wrappers will need a matching bump. Check the wrapper repos for the relevant release.
