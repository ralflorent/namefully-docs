---
id: api
sidebar_label: Specs
title: API Specifications
---

:::caution
This section is a work in progress.
:::

The API specifications are the verbs `namefully` speaks.

## `getPrefix()`

**Alias:** `px()`

Gets the prefix part of the full name, if any. If no prefix was set as part of the
full name at the time of instantiating `Namefully`, the return value is an empty
string.

**Example:**

```ts
// full name with prefix
const name1 = new Namefully({
    prefix: 'Mr',
    firstname: 'Eddie',
    lastname: 'Murphy',
})
console.log(name1.getPrefix()) // => 'Mr'

// full name with prefix (and titling set as 'us')
const name2 = new Namefully(
    {
        prefix: 'Mr',
        firstname: 'Eddie',
        lastname: 'Murphy',
    },
    { titling: 'us' }
)
console.log(name2.getPrefix()) // => 'Mr.'

// full name without prefix
const name3 = new Namefully('Eddie Murphy')
console.log(name3.getPrefix()) // => ''
```

## `getFirstname(includeAll)`

**Alias:** `fn(includeAll)`

Gets the first name part of the full name.

:::tip
Recalling that `namefully` provides ready-made classes that help you to manipulate
unusual use cases for a full name, you may want to use `Firstname` to treat multiple
pieces of name as `firstname`, assuming they are not middle names.
:::

### `includeAll`

A boolean argument set to `true` by default that decides whether or not to include
all the pieces of the first name as a given name may be composed of one or more
pieces of name.

**Example:**

```ts
// full name with one piece of first name
const name1 = new Namefully('Tom Hanks')
console.log(name1.getFirstname()) // => 'Tom'

// full name with two pieces of first name
const name2 = new Namefully([
    new Firstname('Thomas', 'Jeffrey'),
    new Lastname('Hanks')
])
console.log(name2.getFirstname()) // => 'Thomas Jeffrey'
console.log(name2.getFirstname(false)) // => 'Thomas'
```

## `getMiddlenames()`

**Alias:** `mn()`

Gets the middle name part of the full name.

**Example:**

```ts
// full name with middle names
const name1 = new Namefully('Justin Pierre Trudeau')
console.log(name1.getMiddlenames()) // => ['Pierre']

const name2 = new Namefully([ 'Justin', 'Pierre James', 'Trudeau' ])
console.log(name2.getMiddlenames()) // => ['Pierre James']

// full name with no middle names
const name3 = new Namefully('Justin Trudeau')
console.log(name3.getMiddlenames()) // => []
```

:::tip
You may want to handle subparts of the middle name separately. To do so, use the
class `Name` along with the `Namon` enum to set the name type as `MIDDLE_NAME`
for each name part.
:::

**Example:**

```ts
import { Namefully, Name, Namon } from 'namefully'

const name = new Namefully([
    new Name('Justin', Namon.FIRST_NAME),
    new Name('Pierre', Namon.MIDDLE_NAME),
    new Name('James', Namon.MIDDLE_NAME),
    new Name('Trudeau', Namon.LAST_NAME),
])
console.log(name.getMiddlenames()) // => ['Pierre', 'James']
```

## `getLastname(format)`

**Alias:** `ln(format)`

Gets the last name part of the full name.

### `format`

This string argument overrides the how-to format of a surname output (previously
set in config), considering its subparts. The last name format can be of the
following:

- `father` (by default): father name only
- `mother`: mother name only
- `hyphenated`: joining both father and mother names with a hyphen
- `all`: joining both father and mother names with a space.

This parameter can be set either by an instance of a last name or during the
creation of a `Namefully` instance. To avoid ambiguity, I prioritize as source of
truth the value set as optional parameter when instantiating `Namefully`.

**Example:**

```ts
// full name with one piece of last name
const name1 = new Namefully('Ariana Grande')
console.log(name1.getLastname()) // => 'Grande'
console.log(name1.getLastname('father')) // => 'Grande'
console.log(name1.getLastname('mother')) // => '' (empty string)
console.log(name1.getLastname('hyphenated')) // => 'Grande'
console.log(name1.getLastname('all')) // => 'Grande'

// full name with two pieces of last name
const name2 = new Namefully([
    new Firstname('Ariana'),
    new Lastname('Grande', 'Butera')
], { lastnameFormat: 'hyphenated' })
console.log(name2.getLastname()) // => 'Grande-Butera'
console.log(name2.getLastname('father')) // => 'Grande'
console.log(name2.getLastname('mother')) // => 'Butera'
console.log(name2.getLastname('hyphenated')) // => 'Grande-Butera'
console.log(name2.getLastname('all')) // => 'Grande Butera'
```

## `getSuffix()`

**Alias:** `sx()`

Gets the suffix part of the full name, if any. If no suffix was set as part of the
full name at the time of instantiating `Namefully`, the return value is an empty
string.

**Example:**

```ts
// full name with suffix
const name1 = new Namefully({
    firstname: 'Fabrice',
    lastname: 'Piazza',
    suffix: 'PhD',
})
console.log(name1.getSuffix()) // => 'PhD'

// full name without suffix
const name2 = new Namefully('Fabrice Piazza')
console.log(name2.getSuffix()) // => ''
```

## `getFullname(orderedBy)`

**Alias:** `full(orderedBy)`

Gets the full name (the five name parts, if set).

### `orderedBy`

This string argument overrides the preset order of appearance of a full name: by
first name or last name. If none was set initially, `Namefully` assumes a default
order, which by first name.

**Example:**

```ts
import { Namefully, FullnameBuilder } from 'namefully'

const name1 = new Namefully('Steve Jobs')
console.log(name1.getFullname()) // => 'Steve Jobs'
console.log(name1.getFullname('lastname')) // => 'Jobs Steve'

const name2 = new Namefully('Jobs Steve', { orderedBy: 'lastname' })
console.log(name2.getFullname()) // => 'Jobs Steve'
console.log(name2.getFullname('firstname')) // => 'Steve Jobs'

const name3 = new Namefully(
    new FullnameBuilder()
        .prefix('Mr')
        .firstname('Steven', 'Paul')
        .lastname('Jobs')
        .build(),
)
console.log(name3.getFullname()) // => 'Mr Steven Paul Jobs'
console.log(name3.getFullname('lastname')) // => 'Mr Jobs Steven Paul'
```

## `getBirthname(orderedBy)`

**Alias:** `birth(orderedBy)`

Gets the birth name ordered as configured. No prefix or suffix are included.

### orderedBy

This string argument overrides the preset order of appearance of a full name: by
first name or last name. If none was set initially, `Namefully` assumes a default
order, which by first name.

**Example:**

```ts
import { Namefully, FullnameBuilder } from 'namefully'

const name1 = new Namefully('Bill Gates')
console.log(name1.getBirthname()) // => 'Bill Gates'
console.log(name1.getBirthname('lastname')) // => 'Gates Bill'

const name2 = new Namefully('Gates Bill', { orderedBy: 'lastname' })
console.log(name2.getBirthname()) // => 'Gates Bill'
console.log(name2.getBirthname('firstname')) // => 'Bill Gates'

const name3 = new Namefully(
    new FullnameBuilder()
        .firstname('William', 'Henry')
        .lastname('Gates')
        .suffix('III')
        .build(),
)
console.log(name3.getBirthname()) // => 'William Henry Gates'
console.log(name3.getBirthname('lastname')) // => 'Gates William Henry'
```
