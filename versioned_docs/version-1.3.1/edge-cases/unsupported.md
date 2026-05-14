---
id: unsupported
title: Unsupported cases
description: Things namefully deliberately doesn't try to handle, and what to do instead.
sidebar_position: 4
---

# Unsupported cases

`namefully` is intentionally opinionated. A few categories of name are _not_ handled by the constructor and never will be. None of these are bugs — they're decisions. Here's the list, with the workaround for each.

## Mononyms

```ts
new Namefully('Plato'); // throws
```

v1.3.1 has no support for one-token names. The constructor expects at least a first and a last name. Mononym support arrived in v2 via a `mono` config flag — see [What's new in v2](../whats-new-in-v2.md).

## Nicknames inside the name

```
Dwayne "The Rock" Johnson
```

There's no `nickname` slot. The library will treat `"The Rock"` (or whatever lives between the first and last) as a middle name. To drop it, use [`NameIndex`](../creating/name-index.md) or a [custom parser](../creating/custom-parser.md).

## Multiple prefixes or suffixes

```
Prof. Dr. Albert Einstein
Sir William Henry Smith KCB DSO
```

The `prefix` and `suffix` slots each hold a single token. The library won't accept multiples. If you need them, either:

- Pre-combine them into one string before constructing (`'Prof. Dr.'` as a single prefix).
- Build a `FullName` manually with a custom parser and put the extras somewhere your application understands.

## Non-Latin/non-European scripts (with validation on)

Names in CJK, Arabic, Hebrew, Devanagari, Thai, and others will pass through fine when `bypass: true` (the default). They'll be rejected when `bypass: false`. The library's validators don't cover those writing systems. See [Writing systems & validation](./writing-systems.md).

## Aliases and AKAs

A `Namefully` represents one person's name with one set of slots. It doesn't model "also known as", maiden names, religious names, or stage names alongside legal names. If you need that, build two `Namefully` instances and track the relationship in your own model.

## Mutating after construction

You cannot reassign `name.first = 'Mary'` — the instance is immutable. Build a new one. See [Immutability & Config](../concepts/immutability-config.md).

The one near-exception is `name.flip()`, which toggles `orderedBy` on the active config. It looks like mutation but it's mutating the `Config`, not the underlying `FullName`.

## Names with embedded punctuation other than `-` and `'`

Periods inside name tokens (`P.D.G.`), parentheses (`Smith (Jones)`), brackets, slashes, colons — the parser treats these as suspicious or as separators depending on context. If you have one, switch to a JSON input or a custom parser and place the literal value into the slot directly.

## A general escape hatch

Whenever the constructor doesn't fit your input, the order of escalation is:

1. **JSON object** — explicit slots, no parsing magic.
2. **`Name` instances** — explicit slots _and_ explicit types.
3. **`NameBuilder`** — incremental construction with hooks.
4. **`Namefully.parse()` / `tryParse()` + `NameIndex`** — lenient parsing with positional control.
5. **Custom `Parser<T>`** — anything else.

If you've worked through all five and still can't represent your name with `namefully`, that's a real edge case — open an issue and we'll see if it should become a first-class feature.
