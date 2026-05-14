---
id: from-name-instances
title: From Name instances
description: Build a Namefully from explicit Name, FirstName, and LastName objects.
sidebar_position: 4
---

# From `Name` instances

For the most explicit possible input, hand `Namefully` an array of `Name` objects. Each one carries its own slot tag, so order in the array doesn't matter and there's nothing for the parser to guess.

```ts
import { Name, Namefully } from 'namefully';

new Namefully([
  Name.first('Jane'),
  Name.last('Doe'),
]);

new Namefully([
  Name.prefix('Dr'),
  Name.first('Jane'),
  Name.middle('Marie'),
  Name.last('Doe'),
  Name.suffix('PhD'),
]);
```

The five named constructors are `Name.prefix()`, `Name.first()`, `Name.middle()`, `Name.last()`, and `Name.suffix()`. They return ordinary `Name` instances tagged with the appropriate `Namon`.

## `FirstName` and `LastName`

The two specialised subclasses let you express **multi-token** first or last names without falling back to a string:

```ts
import { FirstName, LastName, Namefully } from 'namefully';

new Namefully([
  new FirstName('Jane', 'Marie', 'Louise'),
  new LastName('De La Cruz', 'García'),
]);
```

- `new FirstName(value, ...more)` — first name plus zero or more additional given names.
- `new LastName(father, mother?, surnameFormat?)` — father's surname, optionally a mother's surname, optionally a `Surname` format.

You can also construct them via the `Name.first()` / `Name.last()` shorthands, but those don't give you the compound forms. For a non-trivial Hispanic-style surname, instantiate `LastName` directly.

```ts
import { FirstName, LastName, Namefully, Surname } from 'namefully';

const name = new Namefully(
  [new FirstName('John'), new LastName('Doe', 'Smith')],
  { surname: Surname.HYPHENATED },
);

name.full; // 'John Doe-Smith'
```

## When this is the right input shape

Reach for `Name` instances when:

- the data has compound first or last names and you want to keep the parts distinct;
- you're constructing names in a builder-style loop and want strong typing;
- you'd like the `Surname` format attached to the `LastName` itself rather than living in the config.

For simpler cases, plain strings or JSON are less ceremony.

## See also

- [`NameBuilder`](./name-builder.md) — same idea, but with lifecycle hooks and a fluent add-then-build interface.
- [Compound names](../edge-cases/compound-names.md) — what each `Surname` format actually renders.
