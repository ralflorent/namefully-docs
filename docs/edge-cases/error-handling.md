---
id: error-handling
title: Error handling
description: The NameError hierarchy and when each subclass fires.
sidebar_position: 3
---

# Error handling

`namefully` throws a small hierarchy of typed errors. All of them extend `NameError`, which extends `Error`, so you can `catch` at whichever level of specificity you want.

```text
Error
 └── NameError
      ├── InputError       (couldn't parse the input)
      ├── ValidationError  (parsed, but failed a validation rule)
      ├── NotAllowedError  (operation isn't supported for this input)
      └── UnknownError     (something else went wrong; rare)
```

## `InputError`

Thrown by the parser when the input doesn't match any of the supported shapes — neither a string, nor an array, nor a JSON object, nor a `Parser`. The classic example is passing `null` or `undefined` or a `Date`.

```ts
import { Namefully, InputError } from 'namefully';

try {
  new Namefully(undefined as any);
} catch (e) {
  if (e instanceof InputError) console.log('bad input:', e.message);
}
```

Inputs that _look_ like valid shapes but contain bad data — an empty string, an empty array — also surface here.

## `ValidationError`

Thrown when `Config.bypass` is `false` and a validation rule fails. The error carries enough context to tell you which part of the name failed and why.

```ts
import { Namefully, ValidationError } from 'namefully';

try {
  new Namefully(
    { firstName: 'John', lastName: 'Smith', suffix: 'M.Sc.' },
    { bypass: false },
  );
} catch (e) {
  if (e instanceof ValidationError) console.log('invalid:', e.message);
}
```

Validation includes both character-set checks (see [Writing systems](./writing-systems.md)) and structural checks (prefix/suffix membership, minimum length, presence of required slots).

## `NotAllowedError`

Thrown when an operation can't be performed on the current `Namefully` — usually because of a mismatch between what you asked for and what the instance contains.

The most common case is an unrecognized format token:

```ts
import { Namefully, NotAllowedError } from 'namefully';

try {
  new Namefully('John Smith').format('z l');
} catch (e) {
  if (e instanceof NotAllowedError) console.log('unsupported token:', e.message);
}
```

Other triggers: asking for the middle name when there isn't one, in contexts where the API doesn't gracefully degrade.

## `UnknownError`

Catch-all for cases that shouldn't normally happen. If you see one, it usually points to a bug — file an issue.

## Catching at the right level

For most application code, catching `NameError` is the right granularity:

```ts
import { Namefully, NameError } from 'namefully';

try {
  return new Namefully(rawInput);
} catch (e) {
  if (e instanceof NameError) return null; // or log, or fall back
  throw e;                                 // anything else is unexpected
}
```

If you want to give different feedback for "we couldn't parse what you typed" vs "what you typed isn't a real name", branch on `InputError` vs `ValidationError`. For the rest, the base class is fine.

## Working with `Namefully.tryParse()`

If you'd rather not write a try/catch at all, `Namefully.tryParse()` is the synchronous helper that returns `undefined` instead of throwing on parse and validation failures. Its async sibling `Namefully.parse()` _does_ throw — wrapped in a rejected promise. See [`parse()` and `tryParse()`](../creating/parse.md).
