---
id: derived-forms
title: Derived forms
description: shorten(), flatten(), zip(), and the case-conversion helpers.
sidebar_position: 3
---

# Derived forms

A handful of methods produce useful renderings that don't fit neatly into a single token pattern.

```ts
import { Namefully } from 'namefully';
const name = new Namefully('Mr John Winston Ono Lennon');
```

## `shorten(orderedBy?)`

Reduces a name to a typical `First Last` rendering. Drops the prefix, suffix, and any middle names.

```ts
name.shorten();                  // 'John Lennon'
name.shorten('lastName');        // 'Lennon John'  (override the order)
```

For a Hispanic-style surname configured with `Surname.MOTHER`, `shorten()` honours that — you'd get `John MotherName` instead of `John FatherName`.

## `flatten({ ... })`

Collapses long names by initialising one or more parts, but only if the full name exceeds a character limit.

```ts
name.flatten({ limit: 20, by: 'middleName' });
// 'John W. O. Lennon'

name.flatten({ limit: 20, by: 'all', recursive: true });
// 'J. W. O. L.'
```

Options:

| Option | Default | Effect |
| --- | --- | --- |
| `limit` | `20` | Trigger flattening only when `full.length` exceeds this |
| `by` | `Flat.MIDDLE_NAME` | Which variant to flatten by |
| `withPeriod` | `true` | `J.` vs `J ` |
| `recursive` | `false` | Re-apply the same `by` if the result is still too long |
| `withMore` | `false` | Include additional first names in the initialisation |
| `surname` | — | Override `Config.surname` for this call |

The `by` values are `Flat.FIRST_NAME`, `Flat.MIDDLE_NAME`, `Flat.LAST_NAME`, `Flat.FIRST_MID`, `Flat.MID_LAST`, `Flat.ALL`. Each one decides which part(s) get reduced to initials.

If the name is already under the limit, `flatten()` returns `full` unchanged.

## `zip(by?, withPeriod?)`

A shorter spelling of `flatten({ by, withPeriod })` for the no-limit case.

```ts
name.zip();                       // 'John W. O. L.'   (default: MID_LAST)
name.zip('firstMid');             // 'J. W. O. Lennon'
name.zip('all', false);           // 'J W O L'
```

## Case conversions

Each of these returns a string derived from the **birth name** (no prefix, no suffix), one word per part:

```ts
name.toUpperCase();    // 'JOHN WINSTON ONO LENNON'
name.toLowerCase();    // 'john winston ono lennon'
name.toCamelCase();    // 'johnWinstonOnoLennon'
name.toPascalCase();   // 'JohnWinstonOnoLennon'
name.toSnakeCase();    // 'john_winston_ono_lennon'
name.toHyphenCase();   // 'john-winston-ono-lennon'
name.toDotCase();      // 'john.winston.ono.lennon'
name.toToggleCase();   // 'jOHN wINSTON oNO lENNON'
```

They split on whitespace, hyphens, and apostrophes — so `O'Brien` and `Smith-Jones` are handled the way you'd expect.

## `split(separator?)` and `join(separator?)`

Lower-level building blocks:

```ts
name.split();       // ['John', 'Winston', 'Ono', 'Lennon']
name.split('-');    // ['John', 'Winston', 'Ono', 'Lennon']
name.join('_');     // 'john_winston_ono_lennon'  (acts on .split() output)
```

`split` defaults to splitting on whitespace, hyphens, and apostrophes (`/[' -]/g`). `join` does the inverse — it splits with the default regex and re-joins with whatever separator you pass.

Most of the time the named case converters above are what you want; `split` and `join` are escape hatches when none of them quite fit.
