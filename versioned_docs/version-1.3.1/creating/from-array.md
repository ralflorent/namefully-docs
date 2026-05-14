---
id: from-array
title: From an array
description: Pass a string array to build a Namefully when the parts are already separated.
sidebar_position: 2
---

# From an array

Sometimes the parts are already split — they came out of a form, a CSV row, an LDAP attribute, the parts of a URL. Hand them in as a string array and skip the separator dance:

```ts
import { Namefully } from 'namefully';

new Namefully(['Jane', 'Doe']);                  // first + last
new Namefully(['Jane', 'Marie', 'Doe']);         // first + middle + last
new Namefully(['Ms', 'Jane', 'Marie', 'Doe']);   // prefix + first + middle + last
new Namefully(['Ms', 'Jane', 'Doe', 'PhD']);     // prefix + first + last + suffix
```

The array is treated positionally, biased by `orderedBy`. With the default `FIRST_NAME` order:

| Length | Mapping |
| --- | --- |
| 2 | `[first, last]` |
| 3 | `[first, middle, last]` |
| 4 | `[prefix, first, last, suffix]` or `[prefix, first, middle, last]` |
| 5 | `[prefix, first, middle, last, suffix]` |

The 4-element case is ambiguous on its face — namefully resolves it by looking at whether the first and last tokens look like a known prefix/suffix.

## Switching the order

```ts
import { Namefully, NameOrder } from 'namefully';

new Namefully(['Edison', 'Thomas'], {
  orderedBy: NameOrder.LAST_NAME,
});
// first: Thomas, last: Edison
```

## When the array shape isn't enough

If you have, say, eight strings and you want to declare which slot each one goes into, skip the positional convention and use [`NameIndex`](./name-index.md) or [`NameBuilder`](./name-builder.md).
