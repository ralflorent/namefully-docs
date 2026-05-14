---
id: name-index
title: NameIndex for non-standard layouts
description: Declare exactly which token index maps to which slot.
sidebar_position: 8
---

# `NameIndex` — when the slots aren't in the usual places

Sometimes a name string has the right pieces in the wrong order — or extra pieces you'd like to ignore. The classic example is a nickname tucked between the first and last names:

```
Dwayne "The Rock" Johnson
```

The default parser would call `"The Rock"` a middle name. You and I both know that's not what's going on.

`NameIndex` lets you tell `Namefully` exactly which token positions to read for each slot:

```ts
import { Namefully, NameIndex } from 'namefully';

const indexing = NameIndex.only({ firstName: 0, lastName: 3 });
const name = Namefully.tryParse('Dwayne "The Rock" Johnson', indexing);

name?.full; // 'Dwayne Johnson'
```

`NameIndex.only({...})` builds an index that mentions only the slots you specify. Token at position `0` is the first name, position `3` is the last name. The other tokens — including `"The` and `Rock"` — get dropped.

## The available slots

The index keys mirror the `Namon` enum:

```ts
NameIndex.only({
  prefix: 0,
  firstName: 1,
  middleName: 2,
  lastName: 3,
  suffix: 4,
});
```

Each value is a **zero-based token index** into the input. Tokens that no slot points to are silently ignored.

## Use with `parse()` or `tryParse()`

`NameIndex` plugs into the static text helpers, not the strict constructor:

```ts
Namefully.tryParse(raw, indexing);       // Namefully | undefined (sync)
await Namefully.parse(raw, indexing);    // Promise<Namefully> (rejects on failure)
```

If you need positional control at construction time and don't want either contract, write a [custom parser](./custom-parser.md) instead — that's the more flexible long-term answer.

## When to reach for `NameIndex`

- Single-string inputs where the slot positions are stable but unusual.
- Names containing decorations you want to drop (quoted nicknames, parenthetical aliases).
- Quick prototyping before deciding whether to write a full custom parser.

For more elaborate cleaning — multi-line inputs, conditional logic, async lookups — a [custom parser](./custom-parser.md) gives you the keyboard.
