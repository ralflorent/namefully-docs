---
id: parse
title: Namefully.parse() (lenient)
description: The forgiving parser — best effort, returns null on failure.
sidebar_position: 5
---

# `Namefully.parse()` — the lenient parser

The `Namefully` constructor is strict. If the input doesn't fit a recognized shape it throws. That's the right default for application code where you want the bad-data signal — but it's the wrong default for, say, importing a CSV of dirty user submissions where you'd rather skip the bad rows.

For that case there's `Namefully.parse()`:

```ts
import { Namefully } from 'namefully';

const a = Namefully.parse('Jane Smith');                // Namefully
const b = Namefully.parse('Mr John Joe Smith PhD');     // Namefully
const c = Namefully.parse('???');                       // null
```

It returns a `Namefully` if it can make sense of the input and `null` if it can't. No throwing. You decide what to do with the null.

## The forgiving bits

`parse()` is a little more relaxed than the constructor:

- It tolerates extra whitespace and trailing punctuation.
- It accepts inputs that the constructor's validators would reject when `bypass: false`.
- It's the entry point for parsing through a custom indexing strategy (see [`NameIndex`](./name-index.md)).

What it does _not_ do is guess where slots are — it still relies on the order of appearance. If you need positional control, combine `parse()` with a `NameIndex`:

```ts
import { Namefully, NameIndex } from 'namefully';

const indexing = NameIndex.only({ firstName: 0, lastName: 3 });
const name = Namefully.tryParse('Dwayne "The Rock" Johnson', indexing);
name?.full; // 'Dwayne Johnson'
```

`tryParse()` is the same idea — never throws — but also accepts a `NameIndex` to declare _which positions in the input correspond to which slots_, so the nickname in the middle gets quietly ignored.

## When to use which

| You have | Use |
| --- | --- |
| Clean, well-shaped input | `new Namefully(...)` |
| Possibly-dirty user input | `Namefully.parse(...)` |
| Input with known positions | `Namefully.tryParse(..., NameIndex.only({...}))` |
| Anything truly bespoke | A [custom parser](./custom-parser.md) |
