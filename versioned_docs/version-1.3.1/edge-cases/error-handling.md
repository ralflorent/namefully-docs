---
id: error-handling
title: Error handling
description: The NameError class and when it fires.
sidebar_position: 3
---

# Error handling

`namefully` throws a single error class, `NameError`, which extends the built-in `Error`. You catch it the same way you'd catch anything else.

```ts
import { Namefully, NameError } from 'namefully';

try {
  return new Namefully(rawInput);
} catch (e) {
  if (e instanceof NameError) return null; // or log, or fall back
  throw e;                                 // anything else is unexpected
}
```

## When `NameError` is thrown

There are three broad categories:

1. **Parse failure** — the input doesn't match any of the supported shapes (`string`, `string[]`, `Name[]`, `JsonName`, or a `Parser`). Passing `null` / `undefined` / an unrelated object trips this.
2. **Validation failure** — with `Config.bypass: false`, an input passes shape checks but fails a validation rule (unsupported characters, prefix/suffix not in the known list, minimum length, missing required slots).
3. **Disallowed operation** — you asked for something the current `Namefully` can't do. The most common example is an unrecognized format token:

   ```ts
   new Namefully('John Smith').format('z l'); // throws
   ```

All three throw the same `NameError`. The message tells you which case you've hit; if you need to branch on it programmatically, parse the message or use the `Namefully.parse()` lenient path.

:::info v2 hierarchy
v2 splits `NameError` into a proper subclass hierarchy (`InputError`, `ValidationError`, `NotAllowedError`, `UnknownError`) so you can branch with `instanceof`. v1.3.1 keeps a single class. See [What's new in v2](../whats-new-in-v2.md).
:::

## Working with `Namefully.parse()`

If you'd rather not write a try/catch at all, the lenient `Namefully.parse()` returns `null` instead of throwing on parse and validation failures. See [`Namefully.parse()`](../creating/parse.md).
