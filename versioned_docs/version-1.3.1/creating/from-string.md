---
id: from-string
title: From a string
description: The most common way to construct a Namefully — pass it a string.
sidebar_position: 1
---

# From a string

The constructor's friendliest overload. Pass in a string, get a `Namefully`.

```ts
import { Namefully } from 'namefully';

new Namefully('John Smith');
new Namefully('Mr John Joe Smith PhD');
```

`namefully` splits on whitespace by default and assigns the parts to slots in left-to-right order, biased by `orderedBy`. With the default config:

| Input | first | middle | last |
| --- | --- | --- | --- |
| `'John Smith'` | `John` | — | `Smith` |
| `'John Joe Smith'` | `John` | `Joe` | `Smith` |
| `'John Joe Allen Smith'` | `John` | `Joe Allen` | `Smith` |

Any tokens between the first and last become middle names.

## Prefixes and suffixes

If the first token looks like a known prefix (`Mr`, `Dr`, `Mrs`, etc.) it gets placed in the `prefix` slot. Same for known suffixes at the end (`PhD`, `Jr`, `III`).

```ts
const name = new Namefully('Mr John Joe Smith PhD');
name.prefix; // 'Mr'   (or 'Mr.' with Title.US)
name.suffix; // 'PhD'
name.birth;  // 'John Joe Smith'
```

## Switching the order

```ts
import { Namefully, NameOrder } from 'namefully';

new Namefully('Smith John Joe', {
  orderedBy: NameOrder.LAST_NAME,
});
```

See [Name order](../configuration.md#orderedby).

## Non-space separators

Comma-separated inputs are common in CSVs and "Last, First" UI conventions:

```ts
import { Namefully, Separator } from 'namefully';

const name = new Namefully('Smith,John,Joe', {
  separator: Separator.COMMA,
  orderedBy: NameOrder.LAST_NAME,
});

name.first; // 'John'
name.last;  // 'Smith'
```

Note `separator` and `orderedBy` are independent — the separator says how to chop the string up, the order says which end is which.

## When string parsing isn't enough

If your input has a nickname in quotes, mixed separators, or your slots don't appear in a predictable order, switch to:

- [`Namefully.parse()`](./parse.md) — best-effort, returns null on failure.
- [`NameIndex`](./name-index.md) — declare exactly which positions are which.
- [Custom parser](./custom-parser.md) — full control.
