---
id: iteration-equality
title: Iteration & equality
description: Walking the parts of a name and comparing two Namefully instances.
sidebar_position: 4
---

# Iteration & equality

## Iterating

A `Namefully` is iterable. The iterator yields each `Name` it contains, in the order they appear:

```ts
import { Namefully } from 'namefully';

const name = new Namefully('Mr John Joe Smith PhD');

for (const part of name) {
  console.log(part.toString());
}
// Mr
// John
// Joe
// Smith
// PhD
```

`name.parts` gives you the same iterable explicitly if you'd rather destructure or pass it to `Array.from()`:

```ts
const parts = Array.from(name.parts);
// [Name(prefix=Mr), FirstName(John), Name(middleName=Joe), LastName(Smith), Name(suffix=PhD)]
```

Each element is a `Name` (or `FirstName` / `LastName` for those slots). They carry their own `Namon` so you can branch on slot:

```ts
import { Namon } from 'namefully';

for (const part of name.parts) {
  if (part.type.equal(Namon.MIDDLE_NAME)) console.log('middle:', part.value);
}
```

## `get(key)`

If you need one specific slot rather than the whole iteration:

```ts
name.get(Namon.FIRST_NAME);       // Name | Name[] | null
name.get('lastName');             // accepts string aliases too
name.get('f');                    // 'f' is a valid alias for FIRST_NAME
```

The alias table is the same one documented in [Terminology](../concepts/terminology.md#namon).

## `has(namon)`

Check whether a slot is populated:

```ts
name.has(Namon.PREFIX); // true
name.has('suffix');     // true
name.has('m');          // true (middle exists)
```

## Equality

`Namefully` provides a `.equal()` and `.deepEqual()` check:

```ts
const a = new Namefully('John Ben Smith');
const b = new Namefully([new FirstName('John', 'Ben'), new LastName('Smith')]);
const c = new Namefully([Name.first('John'), Name.middle('Ben'), Name.last('Smith')]);

a.equal(b);     // true
a.deepEqual(b); // false
a.equal(c);     // true
a.deepEqual(c); // true
a === b;        // false — different instances
```

Two instances are equal when:

1. their underlying `FullName` parts match (same values in the same slots), and
2. their effective `Config` is the same.

If you want to compare _just_ the name and ignore configuration, compare the renderings directly: `a.full === b.full`.

For a single `Name`, the same idea works at that level — `Name#equal(other)` compares the value and the `Namon` slot.
