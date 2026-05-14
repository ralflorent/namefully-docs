---
id: overview
slug: /overview
title: Overview
description: namefully is a dependency-free TypeScript utility for handling personal names — in a particular order, way, or shape.
sidebar_position: 1
---

# Overview

`namefully` is a small, opinionated TypeScript utility for handling **personal names** — formatting them, reordering them, extracting their parts, and shaping them in whatever odd way the form on row 14 of your enterprise PDF demands.

It is _not_ a full natural-language name parser. It will not magically guess that **Maria de la Cruz García** has a two-word surname or that **Edward Christopher Sheeran** prefers to go by his middle name. What it _will_ do is give you a clean, immutable API once you've told it where the pieces are.

## You may want to use this library if

- you've been repeatedly dealing with users' given names and surnames;
- you need to occasionally format a name in a particular order, way, or shape;
- you keep copy-pasting your name-related business logic for every project;
- you're curious about trying new, cool stuff.

If none of the above sound like you yet — be patient. They will eventually.

## What it gives you

- A single `Namefully` instance that exposes every common reading of a name (`full`, `short`, `public`, `birth`, `salutation`, `initials()`, and friends).
- A small format DSL: `name.format('L, f m')` → `EDISON, Thomas Alva`.
- Builders, parsers, and indexers for the names that don't fit a nice "first middle last" mold.
- Predefined validators for many writing systems — Latin extended, German, Greek, Cyrillic, Icelandic — with an escape hatch when you'd rather bypass them.
- Zero runtime dependencies.

## What it's not

- Not a guesser. You tell it the order; it does the rest.
- Not mutable. Got it wrong? Throw the instance away and build a new one.
- Not magic. It's a few hundred lines of careful TypeScript with a lot of edge cases tamed.

## A tiny taste

```ts
import { Namefully } from 'namefully';

const name = new Namefully('Thomas Alva Edison');
name.short;        // 'Thomas Edison'
name.public;       // 'Thomas E'
name.initials();   // ['T', 'A', 'E']
name.format('L, f m'); // 'EDISON, Thomas Alva'
name.zip();        // 'Thomas A. E.'
```

Head to the [Quick start](./quick-start.md) when you're ready to install and run it yourself, or skim [Core concepts](./concepts/name-standards.md) first if you'd like the mental model before the code.
