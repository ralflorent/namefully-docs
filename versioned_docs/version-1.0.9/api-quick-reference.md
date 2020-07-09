---
id: api-quick-reference
sidebar_label: Quick Reference
title: API Quick Reference
---

| Name | Arguments | Default | Returns | Description |
|---|---|---|---|---|
|*getPrefix*|none|none|`string`|Gets the prefix part of the full name, if any|
|*getFirstname*|none|none|`string`|Gets the first name part of the full name|
|*getMiddlenames*|none|none|`string[]`|Gets the middle name part of the full name, if any|
|*getLastname*|`format`|`null`|`string`|Gets the last name part of the full name|
|*getSuffix*|none|none|`string`|Gets the suffix part of the full name, if any|
|*getFullname*|`orderedBy`|`null`|`string`|Gets the full name|
|*getInitials*|`orderedBy`, `withMid`|`null`, `false`|`string`|Gets the initials of the first and last name|
|*describe*|`what`|`fullname`|`Summary`|Gives some descriptive statistics of the characters' distribution.|
|*shorten*|`orderedBy`|`null`|`string`|Returns a typical name (e.g. first and last name)|
|*compress*|`limit`, `by`|`20`, `middlename`|`string`|Compresses a name by using different forms of variants|
|*username*|none|none|`string[]`|Suggests possible (randomly) usernames closest to the name|
|*format*|`how`|`null`|`string`|Formats the name as desired|
|*zip*|`by`|`null`|`string`|Shortens a full name|

## Aliases

Some methods are also accessible via aliases:

|Methods|Aliases|
|---|---|
|*getPrefix*|*px*|
|*getSuffix*|*sx*|
|*getFirstname*|*fn*|
|*getLastname*|*ln*|
|*getMiddlenames*|*mn*|
|*getFullname*|*full*|
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
