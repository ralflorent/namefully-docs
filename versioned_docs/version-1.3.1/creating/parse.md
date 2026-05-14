---
id: parse
title: parse() and tryParse()
description: Two static methods for parsing a plain string into a Namefully — one async + throwing, one sync + null-returning.
sidebar_position: 5
---

# `Namefully.parse()` and `Namefully.tryParse()`

The `Namefully` constructor is strict and synchronous. It takes a string, an array, a JSON object, or a `Parser`, and throws if any of them is malformed.

For the specific case of "I have a plain string and I want a `Namefully`", there are two static helpers with slightly different ergonomics:

```ts
class Namefully {
  static parse(text: string, index?: NameIndex): Promise<Namefully>;
  static tryParse(text: string, index?: NameIndex): Namefully | undefined;
}
```

Both accept a string and an optional [`NameIndex`](./name-index.md). They differ in **how they handle failure** and **whether they run synchronously**.

## `Namefully.parse(text, index?)`

Async. Returns a `Promise<Namefully>`. **Throws** a `NameError` (rejecting the promise) if the text can't be parsed.

```ts
import { Namefully } from 'namefully';

const name = await Namefully.parse('John Winston Ono Lennon');
name.full; // 'John Winston Ono Lennon'

try {
  await Namefully.parse('???');
} catch (e) {
  // NameError — the failure carries a stack trace and the original input.
}
```

The reason `parse()` is async isn't that it does I/O — it doesn't — but that running the parsing inside a promise gives you a clean error stack at the catch site. If you're in an `async` function and you'd rather work with a real exception than a sentinel return value, this is the right helper.

A few details worth knowing:

- The input is a **single string only**. Arrays and JSON objects go through the constructor directly.
- The parser expects a **two-or-more-piece name**: `John Lennon`, `John Winston Ono Lennon`. Single-token strings fall outside this method's contract — v1.3.1 has no mononym support at all (see [What's new in v2](../whats-new-in-v2.md)).
- **Prefix and suffix are not considered** during parsing. If you have `Mr John Smith PhD`, the `Mr` and `PhD` will be folded into the name parts, not promoted to their own slots. Reach for the constructor when prefixes and suffixes matter.

## `Namefully.tryParse(text, index?)`

Synchronous. Returns the `Namefully` if parsing succeeded, `undefined` if it didn't. Never throws.

```ts
import { Namefully } from 'namefully';

const a = Namefully.tryParse('Jane Smith');                // Namefully
const b = Namefully.tryParse('???');                       // undefined
const c = Namefully.tryParse('Dwayne "The Rock" Johnson'); // undefined (default parser can't make sense of the quoted nickname)
```

This is the right helper for bulk processing — importing a CSV of dirty user submissions, batch-cleaning records, anywhere you'd rather skip the bad rows than write try/catches around each one.

## Combining with `NameIndex`

Both methods accept an optional `NameIndex` for declaring which token positions correspond to which slots. This lets you handle strings whose tokens don't sit in the standard `[prefix] first [middle] last [suffix]` order, or where you want to drop certain tokens entirely:

```ts
import { Namefully, NameIndex } from 'namefully';

const indexing = NameIndex.only({ firstName: 0, lastName: 3 });
const name = Namefully.tryParse('Dwayne "The Rock" Johnson', indexing);
name?.full; // 'Dwayne Johnson'
```

See [`NameIndex`](./name-index.md) for the full positional API.

## When to use which

| You have | Reach for |
| --- | --- |
| Clean, well-shaped input where failure is a real bug | `new Namefully(...)` |
| A string you want as a `Namefully` inside an async flow | `await Namefully.parse(text)` |
| A string and you'd rather get `undefined` than an exception | `Namefully.tryParse(text)` |
| A string with non-standard token positions | either, plus a `NameIndex` |
| Anything truly bespoke | A [custom parser](./custom-parser.md) |
