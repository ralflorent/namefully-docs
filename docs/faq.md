---
id: faq
title: FAQ
description: Questions that come up often enough to write down.
sidebar_position: 1
---

# FAQ

The short answers. Follow the links for the long ones.

## Why doesn't `namefully` figure out my name automatically?

Because no library can do this reliably across cultures, languages, and naming traditions. A name like `Maria de la Cruz García` is ambiguous on its own — is `de la Cruz` a surname, a particle plus surname, a two-word surname? `namefully` makes you tell it. In exchange, it gives you a stable API once you have.

If you're really after auto-detection, you'd want a different tool. `namefully` is for the case where you _know_ the structure and want help shaping the output.

## Can I store a single-word name like `Plato` or `Madonna`?

Yes — with the `mono` flag. By default the constructor rejects single-token names because most apps want the safety, but you can opt in:

```ts
new Namefully('Plato', { mono: true });
```

See the [`mono` option](./configuration.md#mono) for details and caveats.

## How do I handle a Hispanic surname with both father and mother names?

Construct the `LastName` directly with both values, and pick the `Surname` format:

```ts
new Namefully(
  [new FirstName('Rosanna'), new LastName('De La Cruz', 'García')],
  { surname: Surname.HYPHENATED },
);
```

See [Compound names](./edge-cases/compound-names.md#compound-last-names-hispanic-style).

## How do I deal with a nickname inside the name (`Dwayne "The Rock" Johnson`)?

There's no nickname slot in the standard. Use `NameIndex` to declare the real slot positions and ignore the rest:

```ts
const indexing = NameIndex.only({ firstName: 0, lastName: 3 });
Namefully.tryParse('Dwayne "The Rock" Johnson', indexing);
```

See [`NameIndex`](./creating/name-index.md).

## Is `Namefully` mutable? Can I change the first name after construction?

No. Once built, a `Namefully` is read-only. If the name is wrong, throw it away and build a new one. This is by design — see [Immutability & Config](./concepts/immutability-config.md).

## Will validation reject `Müller`, `María`, or `Δημήτριος`?

When `bypass: true` (the default), nothing is rejected — names pass through whatever they are. When `bypass: false`, Latin Extended, German, Greek, Cyrillic, and Icelandic characters are all in the supported set. CJK, Arabic, Hebrew, and many other scripts are _not_ in the default validator set. See [Writing systems & validation](./edge-cases/writing-systems.md).

## How do I save a `Namefully` to a database and read it back?

In v2, use `serialize()` and `deserialize()`:

```ts
const json = name.serialize();
const restored = deserialize(json);
```

In v1.3.1 this round-trip isn't available. See [JSON serialization](./reading/json-serialization.md) and [Migrating from v1](./migrating-from-v1.md).

## Where can I see it running before I install it?

The live [StackBlitz editor](https://stackblitz.com/edit/namefully) has a working sandbox you can edit in the browser. Open the console to see the output.
