---
id: from-json
title: From a JSON object
description: Pass an explicit shape when you know which piece is which.
sidebar_position: 3
---

# From a JSON object

When the data is already labelled — say, a form payload or a database row — pass it in as an object and skip the order-and-separator guessing entirely:

```ts
import { Namefully } from 'namefully';

new Namefully({
  firstName: 'Jane',
  lastName: 'Doe',
});

new Namefully({
  prefix: 'Dr',
  firstName: 'Jane',
  middleName: 'Marie',
  lastName: 'Doe',
  suffix: 'PhD',
});
```

Every key is optional except `firstName` and `lastName` (and even those are optional when `mono: true` is set). The valid keys are: `prefix`, `firstName`, `middleName`, `lastName`, `suffix`.

## Hierarchical first/last names

When a first or last name has multiple parts, you can use the hierarchical form:

```ts
new Namefully({
  firstName: { value: 'Jane', more: ['Marie', 'Louise'] },
  lastName:  { father: 'De La Cruz', mother: 'García' },
});
```

The shorthand still works — `firstName: 'Jane'` is equivalent to `firstName: { value: 'Jane' }`, and `lastName: 'Doe'` is equivalent to `lastName: { father: 'Doe' }`. Reach for the hierarchical form only when you actually have the extra parts.

## A note for v1.3.1 users

v1.3.1 accepts this hierarchical shape **as input** — so the snippet above works in v1 too. What v1 _can't_ do is serialize a `Namefully` back out to the same shape, or deserialize one from JSON. If you need the round-trip, you need v2. See [JSON serialization](../reading/json-serialization.md) and [Migrating from v1](../migrating-from-v1.md).

## Middle names

`middleName` is a single string. If the person has two middle names, pass them as one string with whatever separator you want them rendered with:

```ts
new Namefully({ firstName: 'John', middleName: 'Joe Allen', lastName: 'Smith' });
```

`namefully` splits this internally on whitespace and treats each part as a separate middle name. The accessor `name.middle` always returns a single string, and `name.middleName()` returns the array.
