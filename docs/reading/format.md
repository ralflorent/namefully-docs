---
id: format
title: Formatting tokens
description: The format() DSL — a tiny mini-language for laying out a name.
sidebar_position: 2
---

# Formatting tokens

`format()` accepts a string pattern made of single-character tokens, each one replaced with a piece of the name. Anything that isn't a recognized token is passed through as-is (within the allowed character set).

```ts
import { Namefully } from 'namefully';

const name = new Namefully('Mr John Joe Smith PhD');

name.format('L, f m');   // 'SMITH, John Joe'
name.format('p f l s');  // 'Mr John Smith PhD'
name.format('$F.$L.');   // 'J.S.'
```

## The token table

Lowercase tokens render the part as written. Uppercase tokens render in **UPPERCASE**.

| Token | Replaces with | Uppercase variant |
| --- | --- | --- |
| `b` | birth name | `B` |
| `f` | first name | `F` |
| `m` | middle name(s) joined | `M` |
| `l` | last name | `L` |
| `p` | prefix | `P` |
| `s` | suffix | `S` |
| `o` | official format (`PREFIX LASTNAME, First Middle SUFFIX`) | `O` |

The `$`-prefixed tokens give you initials instead of full pieces:

| Token | Replaces with |
| --- | --- |
| `$f` | first letter of the first name |
| `$F` | initials of the first name and any additional given names |
| `$m` | first letter of the first middle name |
| `$M` | initials of all middle names |
| `$l` | first letter of the last name's primary part |
| `$L` | initials of every part of the last name |

## Allowed punctuation

Pattern strings can contain any of these characters _between_ tokens — they're passed through verbatim:

```
space  .  ,  _  -  (  )  [  ]  <  >  '  "
```

A character that isn't a token and isn't in the allow-list throws a `NotAllowedError`. This is intentional — silently dropping unknown characters would make typos invisible.

## Whole-pattern shortcuts

A few patterns are recognized as full strings rather than parsed token-by-token:

```ts
name.format('short');    // same as name.short
name.format('long');     // same as name.long / name.full
name.format('public');   // same as name.public
name.format('official'); // same as the 'o' token alone
```

These exist for symmetry with the accessors. If you've already built a `format()` call you want to reuse, you can pass any of these as the pattern instead of writing the equivalent token sequence.

## Patterns that come up a lot

```ts
name.format('f l');       // 'John Smith'
name.format('l, f');      // 'Smith, John'
name.format('L, f m');    // 'SMITH, John Joe'
name.format('f $L.');     // 'John S.'
name.format('$f. $l.');   // 'J. S.'
name.format('p l');       // 'Mr Smith'  (same as .salutation)
name.format('o');         // 'Mr SMITH, John Joe PhD'
```

The `o` / `O` tokens are the closest the library gets to an opinionated formal rendering — comma after the surname, surname uppercased, prefix and suffix included if they exist.

## When `format()` isn't the right answer

If you need conditional logic ("include the suffix only if the title is empty"), `format()` can't help. Read the individual accessors and assemble the string yourself. The DSL is for the regular cases.
