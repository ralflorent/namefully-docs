---
id: compound-names
title: Hyphenated & compound names
description: How namefully handles multi-token first and last names, including Hispanic-style surnames.
sidebar_position: 1
---

# Hyphenated & compound names

The default `Namefully` parser treats whitespace and a couple of punctuation marks as boundaries between name tokens. That's the right call for most names, and the wrong call for the names where the boundaries _are part of the name_.

## Hyphenated names

`Smith-Jones`, `María-José`, `Anne-Sophie` — all genuinely single tokens despite the hyphen. The string parser preserves them as one piece:

```ts
import { Namefully } from 'namefully';

const a = new Namefully('Smith-Jones');
a.last; // 'Smith-Jones'

const b = new Namefully('Anne-Sophie Dupont');
b.first; // 'Anne-Sophie'
b.last;  // 'Dupont'
```

No special configuration needed.

## Names with apostrophes

`O'Brien`, `D'Angelo`, `de'Medici` — same story.

```ts
new Namefully("Patrick O'Brien").last; // "O'Brien"
```

The validators treat apostrophes as valid name characters by default.

## Compound first names (multiple given names)

A first name can carry additional given names. The simplest input is a plain string with whitespace:

```ts
Namefully.tryParse('Jane Marie Louise Doe')?.middle; // 'Marie'
// 'Marie' and 'Louise' both become middle names in this model
```

If you want them to live on the `FirstName` side rather than spill into middle names, use the `FirstName` constructor explicitly:

```ts
import { FirstName, Name, Namefully } from 'namefully';

const name = new Namefully([
  new FirstName('Jane', 'Marie', 'Louise'),
  Name.last('Doe'),
]);

name.first;             // 'Jane'
name.format('f $F. l'); // 'Jane J. M. L. Doe' (initials include the extras)
```

## Compound last names (Hispanic-style)

In Spanish and Portuguese naming traditions, the surname has two parts: the father's surname followed by the mother's surname. `Namefully` models this with the second positional argument of `LastName`:

```ts
import { FirstName, LastName, Namefully, Surname } from 'namefully';

const father = new LastName('De La Cruz');
const both   = new LastName('De La Cruz', 'García');

new Namefully([new FirstName('Rosanna'), father]).last;
// 'De La Cruz'

new Namefully([new FirstName('Rosanna'), both]).last;
// 'De La Cruz'   (default: Surname.FATHER — only the father shows)

new Namefully(
  [new FirstName('Rosanna'), both],
  { surname: Surname.ALL },
).last;
// 'De La Cruz García'
```

The four `Surname` formats:

| `Surname.*` | Renders | Use when |
| --- | --- | --- |
| `FATHER` (default) | `De La Cruz` | only the paternal surname matters for display |
| `MOTHER` | `García` | only the maternal surname matters |
| `HYPHENATED` | `De La Cruz-García` | joined with a hyphen (often US-style records) |
| `ALL` | `De La Cruz García` | joined with a space (more traditional rendering) |

You can also pass the format directly to the `LastName` constructor as a third argument, but the value set on `Config.surname` wins if both are present.

## Names whose internal whitespace _is_ meaningful

Some surnames contain a space and aren't really a "father + mother" pair — `De La Cruz`, `Van Der Berg`, `Le Roy`. The string parser would split these into multiple tokens and put part of the surname in the middle-name slot. To keep them intact, use the JSON or `Name` input forms:

```ts
new Namefully({ firstName: 'Maria', lastName: 'De La Cruz' });
new Namefully([Name.first('Maria'), Name.last('De La Cruz')]);
```

A raw string `'Maria De La Cruz'` would parse `De` and `La` as middle names, which is rarely what you want.
