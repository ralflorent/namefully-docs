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

**`includeAll`**: a boolean argument set to `true` by default that decides whether or not to include
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

**`format`**: this string argument overrides the how-to format of a surname output (previously
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

**`orderedBy`**: this string argument overrides the preset order of appearance of a full name: by
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

**`orderedBy`**: this string argument overrides the preset order of appearance of a full name: by
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

## `getInitials(orderedBy, withMid)`

**Alias:** `inits(orderedBy, withMid)`

Gets the initials of the full name.

- **`orderedBy`**: this string argument overrides the preset order of appearance of a full name: by
first name or last name. If none was set initially, `Namefully` assumes a default
order, which is by first name.

- **`withMid`**: this boolean argument indicates whether to include the initials of the middle names,
if that name part was set. Otherwise, by setting this parameter to `true` when
no middle name was set in the beginning, this argument will only give a warning.
By default, it's `false`.

**Example:**

```ts
import { Namefully, FullnameBuilder } from 'namefully'

const name1 = new Namefully('Hillary Clinton')
console.log(name1.getInitials()) // => ['H', 'C']
console.log(name1.getInitials('lastname')) // => ['C', 'H']
console.log(name1.getInitials('lastname', true)) // => ['C', 'H'] + warning

const name2 = new Namefully(
    new FullnameBuilder()
        .firstname('Hillary')
        .midllename('Diane', 'Rodham')
        .lastname('Clinton')
        .build(),
)
console.log(name2.getInitials()) // => ['H', 'C']
console.log(name2.getInitials('firstname', true)) // => ['H', 'D', 'R', 'C']
console.log(name2.getInitials('lastname')) // => ['C', 'H']
console.log(name2.getInitials('lastname', true)) // => ['C', 'H', 'D', 'R']
```

## `describe(nameType)`

**Alias:** `stats(nameType)`

Gives some descriptive statistics that summarize the central tendency, dispersion
and shape of the characters' distribution.

Treated as a categorical dataset, the summary of a name contains the following info:

- *count* : the number of *unrestricted* characters of the name;
- *frequency* : the highest frequency within the characters;
- *top* : the character with the highest frequency;
- *unique* : the count of unique characters of the name;
- *distribution* : the characters' distribution.

**`nameType`**: this string argument indicates which name type to use when describing a full name.
By default, the full name is described.

**Example:**

```ts
const name = new Namefully('Bob Marley')
console.log(name.describe()) // => describes the full name
console.log(name.describe('firstname')) // => describes the first name
console.log(name.describe('lastname')) // => describes the last name
console.log(name.describe('middlename')) // => null + warning
```

## `shorten(orderedBy)`

Shortens a full name to a simpler typical name, a combination of first name and
last name.

**`orderedBy`**: this string argument overrides the preset order of appearance of a full name: by
first name or last name. If none was set initially, `Namefully` assumes a default
order, which is by first name.

**Example:**

For a given name such as *Mr Keanu Charles Reeves*, shortening this name is
equivalent to making it *Keanu Reeves*.

```ts
const name = new Namefully('Mr Keanu Charles Reeves')
console.log(name.shorten()) // => Keanu Reeves
console.log(name.shorten('lastname')) // => Reeves Keanu
```

:::important
As a shortened name, the namon of the first name is favored over the other names
forming part of the entire first names, if any. Meanwhile, for the last name, the
configured `lastnameFormat` is prioritized.

For a given `Firstname Fathername Mothername`, shortening this name when the
`lastnameFormat` is set as `mother` is equivalent to making it: `Firstname Mothername`.
:::

```ts
import { Namefully, Firstname, Lastname } from 'namefully'

const name = new Namefully([
    new Firstname('Karla', 'Camila'),
    new Lastname('Cabello', 'Estrabao'),
], { lastnameFormat: 'mother' })
console.log(name.getFullname()) // => Karla Camila Estrabao
console.log(name.shorten()) // => Karla Estrabao
console.log(name.shorten('lastname')) // => Estrabao Karla
```

## `compress(limit, by, warning)`

Compresses a name, using different forms of variants. A name is *compressed* (or
shortened using its initials) when the length of the name's characters surpasses
the indicated limit. If after compressing the name, the new length of the compressed
name still surpasses the limit, the user receives a warning about it.

- **`limit`**: this number argument sets the threshold to limit the number of characters. The
default value is 20.

- **`by`**: this string argument specifies which variant to use when compressing a long birth
name. These variants are:
  - *firstname* or *fn*
  - *middlename* or *mn*
  - *lastname* or *ln*
  - *firstmid* or *fm* (combination of first name and middle name)
  - *lastmid* or *lm* (combination of middle name and last name)

By default, this method compresses the birth name using the *middlename* variant.

- **`warning`**: this boolean argument indicates whether an end-user should be warned when the set
limit is violated.

:::tip
You may want to always compress the birth names. A good tip to run this effect
silently is to use the method as follows: `compress(0, 'firstmid', false)`. Or,
you can simply use the [zip](#zipby) method.
:::

**Example:**

```ts
import { Namefully, FullnameBuilder } from 'namefully'

const limit = 20
const name = new Namefully(
    new FullnameBuilder()
        .firstname('John')
        .middlename('Winston', 'Ono')
        .lastname('Lennon')
        .build()
)
console.log(name.compress(limit, 'firstname')) // => J. Winston Ono Lennon
console.log(name.compress(limit, 'lastname')) // => John Winston Ono L.
console.log(name.compress(limit, 'middlename')) // => John W. O. Lennon
console.log(name.compress(limit, 'firstmid')) // => J. W. O. Lennon
console.log(name.compress(limit, 'midlast')) // => John W. O. L.
```

## `zip(by)`

Shortens or abbreviates parts of a birth name, using its initials. This method is
a silent wrapper of the [compress](#compresslimit-by-warning) method.

**`by`**: this string argument specifies which variant to use when compressing a long birth
name. These variants are:

- *firstname* or *fn*
- *middlename* or *mn*
- *lastname* or *ln*
- *firstmid* or *fm* (combination of first name and middle name)
- *lastmid* or *lm* (combination of middle name and last name)

**Example:**

Using the same classic examples used in the previous examples:

```ts
import { Namefully, FullnameBuilder } from 'namefully'

const name = new Namefully(
    new FullnameBuilder()
        .firstname('John')
        .middlename('Winston', 'Ono')
        .lastname('Lennon')
        .build()
)
console.log(name.zip('firstname')) // => J. Winston Ono Lennon
console.log(name.zip('lastname')) // => John Winston Ono L.
console.log(name.zip('middlename')) // => John W. O. Lennon
console.log(name.zip('firstmid')) // => J. W. O. Lennon
console.log(name.zip('midlast')) // => John W. O. L.
```
