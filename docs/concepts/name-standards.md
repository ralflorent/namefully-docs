---
id: name-standards
title: Name standards
description: The naming model namefully is built around — and where it borrows it from.
sidebar_position: 1
---

# Name standards

`namefully` is built around a single canonical name shape:

```text
[prefix] firstName [middleName] lastName [suffix]
```

The brackets mean the part is optional. The most basic case is therefore `John Smith`, where `John` is the `firstName` and `Smith` the `lastName`.

The model is borrowed from this [UK naming-practice guide][uk-guide] — the same one the library has cited since v1. It's not perfect (no name standard is), but it covers the overwhelming majority of name shapes you'll encounter in everyday software, and it gives the API a clean vocabulary to work with.

## A worked example

Take `Mr John Joe Smith PhD` and `namefully` will read it as:

| Slot | Value |
| --- | --- |
| `prefix` | `Mr` |
| `first` | `John` |
| `middle` | `Joe` |
| `last` | `Smith` |
| `suffix` | `PhD` |
| `full` | `Mr John Joe Smith PhD` |
| `birth` | `John Joe Smith` |
| `short` | `John Smith` |
| `public` | `John S` |
| `salutation` | `Mr Smith` |
| `initials()` | `['J', 'J', 'S']` |

If a slot is empty (no prefix, no middle name, no suffix), `Namefully` simply skips it in the renderings that care.

## Order of appearance matters

By default `Namefully` reads a string in **first-name-first** order — so `'John Smith'` becomes `first = John`, `last = Smith`. That can be flipped per-instance:

```ts
import { Namefully, NameOrder } from 'namefully';

const name = new Namefully('Smith John Joe', {
  orderedBy: NameOrder.LAST_NAME,
});

name.last;  // 'Smith'
name.first; // 'John'
```

The order you pick when constructing an instance is the default for **every** output of that instance. You can override it on a single call (`name.fullName(NameOrder.FIRST_NAME)`) but the configured order is the source of truth for everything else.

See [Name order](../configuration.md#orderedby) in the Configuration page for the full story.

## What the standard doesn't cover

A few common shapes the standard intentionally doesn't try to model:

- **Mononyms** (`Plato`, `Madonna`) — supported, but opt-in via `Config.mono`. See [Mononyms](../configuration.md#mono).
- **Nicknames** in the middle (`Dwayne "The Rock" Johnson`) — not directly modelled. Use [NameIndex](../creating/name-index.md) or a [custom parser](../creating/custom-parser.md).
- **Multiple prefixes or suffixes** (`Prof. Dr. Einstein`) — not supported. Fold the extras into the single prefix/suffix slot or hide them outside the library.

The library leans on the standard hard enough that bending it usually means reaching for `NameBuilder`, `NameIndex`, or a custom `Parser` rather than overloading the basic constructor.

[uk-guide]: https://www.fbiic.gov/public/2008/nov/Naming_practice_guide_UK_2006.pdf
