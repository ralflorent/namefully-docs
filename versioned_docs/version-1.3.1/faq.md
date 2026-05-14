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

Not in v1.3.1 — the constructor rejects single-token names. Mononym support arrived in v2 via a `mono` config flag. If you need it, that's the case for upgrading. See [What's new in v2](./whats-new-in-v2.md).

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

v1.3.1 doesn't ship a JSON round-trip out of the box. You can persist the raw input you used to construct the instance (a string, a `JsonName` object) and rebuild from that on read, or implement your own serialization on top of the accessors.

Full `serialize()` / `deserialize()` arrived in v2 — see [What's new in v2](./whats-new-in-v2.md).

## Where can I see it running before I install it?

The live [StackBlitz editor](https://stackblitz.com/edit/namefully) has a working sandbox you can edit in the browser. Open the console to see the output.
