---
id: quick-start
title: Quick start
description: Install namefully and see it working in under a minute.
sidebar_position: 2
---

# Quick start

## Install

```bash npm2yarn
npm install namefully
```

No build step, no peer dependencies, no `postinstall` hook stealing your CPU.

## Your first `Namefully`

```ts
import { Namefully } from 'namefully';

const name = new Namefully('Jane Smith');

name.full;       // 'Jane Smith'
name.first;      // 'Jane'
name.last;       // 'Smith'
name.initials(); // ['J', 'S']
```

That's the easy case — a clean first/last in the default `firstName` order. The rest of these docs are about everything that isn't easy.

## A slightly less easy case

```ts
import { Namefully, NameOrder, Separator, Title } from 'namefully';

const name = new Namefully(
  'Lic, De La Cruz, Rosanna, María',
  {
    orderedBy: NameOrder.LAST_NAME,
    separator: Separator.COMMA,
    title: Title.US,
  },
);

name.first;             // 'Rosanna'
name.middle;            // 'María'
name.last;              // 'De La Cruz'
name.full;              // 'Lic. De La Cruz Rosanna María'
name.format('f L');     // 'Rosanna DE LA CRUZ'
```

Three knobs turned: the data is comma-separated, the surname comes first, and you want US-style titles with periods. `Namefully` doesn't guess any of that — but once you tell it, the API stays the same.

## Try it without installing

The library has a [live StackBlitz](https://stackblitz.com/edit/namefully) you can poke at. No setup, just type and read the console.

## What to read next

- [Core concepts](./concepts/name-standards.md) — the name standard the library is built around, and the words it uses for the pieces.
- [Configuration](./configuration.md) — the seven knobs that change everything.
- [Creating names](./creating/from-string.md) — every supported input shape, with examples.
- [Reading & formatting](./reading/accessors.md) — once you have a `Namefully`, what can you ask of it.
