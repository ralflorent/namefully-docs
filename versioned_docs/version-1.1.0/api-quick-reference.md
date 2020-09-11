---
id: api-quick-reference
sidebar_label: Quick Reference
title: API Quick Reference
---

## Quick Peek

| Methods | Arguments | Default | Returns | Description |
|---|---|---|---|---|
|*getPrefix*|none|none|`string`|Gets the prefix part of the full name, if any|
|*getFirstname*|`includeAll`|`true`|`string`|Gets the first name part of the full name|
|*getMiddlenames*|none|none|`string[]`|Gets the middle name part of the full name, if any|
|*getLastname*|`format`|`null`|`string`|Gets the last name part of the full name|
|*getSuffix*|none|none|`string`|Gets the suffix part of the full name, if any|
|*getFullname*|`orderedBy`|`null`|`string`|Gets the full name|
|*getBirthname*|`orderedBy`|`null`|`string`|Gets the birth name, no prefix or suffix|
|*getInitials*|`orderedBy`, `withMid`|`null`, `false`|`string`|Gets the initials of the first and last names|
|*describe*|`nameType`|`null`|`Summary`|Gives some descriptive statistics of the characters' distribution|
|*shorten*|`orderedBy`|`null`|`string`|Returns a typical name (e.g. first and last name)|
|*compress*|`limit`, `by`, `warning`|`20`, `middlename`, `true`|`string`|Compresses a name using different forms of variants|
|*username*|none|none|`string[]`|Suggests possible (randomly) usernames closest to the name|
|*format*|`how`|`null`|`string`|Formats the name as desired|
|*zip*|`by`|`middlename`|`string`|Shortens a full name|
|*size*|none|none|`number`|Returns the count of characters of the birth name, excluding punctuations|
|*ascii*|`options`|`{}`|`number[]`|Returns an ascii representation of each characters|
|*to*|`case`|none|`string`|Transforms a birth name to a specific title case|
|*passwd*|`nameType`|`null`|`string`|Returns a password-like representation of a name|

## Aliases

Some methods are also accessible via aliases:

|Methods|Aliases|
|---|---|
|*getPrefix*|*px*|
|*getFirstname*|*fn*|
|*getMiddlenames*|*mn*|
|*getLastname*|*ln*|
|*getSuffix*|*sx*|
|*getFullname*|*full*|
|*getBirthname*|*birth*|
|*getInitials*|*inits*|
|*describe*|*stats*|

**Example:**

```ts
import { Namefully } from 'namefully'

const name = new Namefully('Angela Merkel')

// Retrieve the last name part
console.log(name.getLastname()) // => Merkel

// or using an alias
console.log(name.ln()) // => Merkel
```
