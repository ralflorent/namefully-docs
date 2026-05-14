---
id: accessors
title: Accessors
description: The read-only getters on a Namefully instance.
sidebar_position: 1
---

# Accessors

Once you have a `Namefully`, the easy way to get text back out is to read a property. They're all read-only and they're all cheap (computed lazily, cached).

For all the examples below, let:

```ts
import { Namefully } from 'namefully';
const name = new Namefully('Mr John Joe Smith PhD');
```

## The basics

| Accessor | Value | Notes |
| --- | --- | --- |
| `name.prefix` | `'Mr'` | `undefined` if none |
| `name.first` | `'John'` | first name's primary token |
| `name.middle` | `'Joe'` | first middle name only |
| `name.last` | `'Smith'` | last name's primary token |
| `name.suffix` | `'PhD'` | `undefined` if none |

`prefix` and `suffix` are optional and can be `undefined`. `first`, `middle`, and `last` are always strings — `middle` is `undefined` only when there is no middle name at all.

## The renderings

| Accessor | Value | Description |
| --- | --- | --- |
| `name.full` | `'Mr John Joe Smith PhD'` | the canonical full name |
| `name.long` | `'Mr John Joe Smith PhD'` | alias for `full` |
| `name.birth` | `'John Joe Smith'` | excludes prefix and suffix |
| `name.short` | `'John Smith'` | first + last only |
| `name.public` | `'John S'` | first + last initial |
| `name.salutation` | `'Mr Smith'` | prefix + last |

These honour `Config.orderedBy`. If the instance is `LAST_NAME`-ordered, `full` reads `'Smith John Joe'` and so on.

## The slightly more useful ones

| Accessor | Value | Description |
| --- | --- | --- |
| `name.size` | `5` | number of name parts |
| `name.length` | `17` | character length of `full` |
| `name.hasMiddle` | `true` | true if a middle name exists |
| `name.config` | `Config` | the active `Config` instance |
| `name.parts` | `Iterable<Name>` | iterate the underlying `Name`s |

## Methods that look like accessors

A few callable methods feel like properties — they return computed values without changing state:

```ts
name.fullName();           // 'Mr John Joe Smith PhD' (alias for .full)
name.fullName('lastName'); // 'Smith John Joe' (override order)
name.middleName();         // ['Joe']
name.middleName(true);     // 'Joe' (joined)
name.initials();           // ['J', 'J', 'S']
name.initials({ only: 'firstName' });  // ['J']
name.initials({ asJson: true });       // { firstName: ['J'], middleName: ['J'], lastName: ['S'] }
```

For the more elaborate output forms — `format()`, `zip()`, `flatten()`, `shorten()` — see [Formatting tokens](./format.md) and [Derived forms](./derived-forms.md).
