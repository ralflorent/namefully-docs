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

Every key is optional except `firstName` and `lastName`. The valid keys are: `prefix`, `firstName`, `middleName`, `lastName`, `suffix`.

## Hierarchical first/last names

When a first or last name has multiple parts, you can use the hierarchical form:

```ts
new Namefully({
  firstName: { value: 'Jane', more: ['Marie', 'Louise'] },
  lastName:  { father: 'De La Cruz', mother: 'García' },
});
```

The shorthand still works — `firstName: 'Jane'` is equivalent to `firstName: { value: 'Jane' }`, and `lastName: 'Doe'` is equivalent to `lastName: { father: 'Doe' }`. Reach for the hierarchical form only when you actually have the extra parts.

:::info One-way only
v1.3.1 accepts this hierarchical shape **as input**, but cannot serialize a `Namefully` back out to JSON or reconstruct one from JSON. Full round-trip arrived in v2 — see [What's new in v2](../whats-new-in-v2.md).
:::

## Middle names

`middleName` is a single string. If the person has two middle names, pass them as one string with whatever separator you want them rendered with:

```ts
new Namefully({ firstName: 'John', middleName: 'Joe Allen', lastName: 'Smith' });
```

`namefully` splits this internally on whitespace and treats each part as a separate middle name. The accessor `name.middle` always returns a single string, and `name.middleName()` returns the array.
