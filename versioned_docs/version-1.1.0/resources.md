---
id: resources
sidebar_label: Resources
title: Resources
---

`namefully` provides some ready-made recipes with some extra functionalities. They
work independently. That is to say, you don't need an instance of `Namefully` to
work with a specific name part like a first name, for example.

They are 3 basic classes:

1. `Name`
2. `Firstname`
3. `Lastname`

:::note
Some of the APIs that are available in `Namefully` are also available in these
classes. But these classes contain certain functionalities that are native.
:::

## Name

This class represents a namon (i.e., a piece of name in a string format) with
some extra capabilities, compared to a simple string utils provided by JavaScript.
This class helps to define the role of a name part (e.g., `prefix`) before anything.

```ts title="constructor"
/**
 * Constructs a `Name`
 * @param namon a piece of string that will be defined as a namon
 * @param type which namon that is
 * @param cap which kind of capitalizations
 */
constructor(
    public namon: string,
    public type: Namon,
    cap?: 'initial' | 'all'
);
```

**Example:**

```ts
import { Name, Namon } from 'namefully'

const prefix = new Name('Dr', Namon.PREFIX)
const firstname = new Name('Nick', Namon.FIRST_NAME)
const middlename = new Name('Ariana', Namon.MIDDLE_NAME)
const lastname = new Name('Clinton', Namon.LAST_NAME)
const suffix = new Name('MSc', Namon.SUFFIX)

const name = new Name('John', Namon.FIRST_NAME, 'all')
console.log(name.namon) // => JOHN
```

As you can see, the 5 types of name can be created from that class. Additionally,
you can specify which kind of capitalizations to use when manipulating that piece
of name.

**API:**

| Methods | Arguments | Default | Returns | Description |
|---|---|---|---|---|
|*tostring*|none|none|`string`|Returns a string representation of the namon|
|*capitalize*|`option`|`initial`|`self`|Capitalizes a name|
|*decapitalize*|`option`|`initial`|`self`|De-capitalizes a name|
|*normalize*|none|none|`self`|Normalizes the name as it should be|
|*reset*|none|none|`self`|Resets to the initial namon|
|*getInitials*|none|none|`string[]`|Gets the initials of the name|
|*describe*|none|none|`Summary`|Gives some descriptive statistics of the characters' distribution|
|*ascii*|`restrictions`|`[]`|`number[]`|Returns an ascii representation of each characters|
|*passwd*|none|none|`string`|Returns a password-like representation of a name|

**Aliases:**

|Methods|Aliases|
|---|---|
|*capitalize*|*cap*|
|*decapitalize*|*decap*|
|*normalize*|*norm*|
|*getInitials*|*inits*|
|*describe*|*stats*|

## Firstname

This class is an extended arm of `Name` and represents a given name. It can work
with more than one name part.

```ts title="constructor"
/**
 * Constructs a `Firstname`
 * @param namon a piece of string that will be defined as a namon
 * @param more additional pieces considered as a given name
 */
constructor(public namon: string, ...more: string[]);
```

**Example:**

```ts
import { Firstname } from 'namefully'

const firstname = new Firstname('Ronald')

// with more than one name part
const firstnames = new Firstname('Emilia', 'Isobel', 'Euphemia', 'Rose')
firstnames.tostring(false) // => Emilia

// include all the names
firstnames.tostring() // => Emilia Isobel Euphemia Rose
```

An instance of this class handles separately the required namon along with the
optional other given names a person might have.

**API:**

| Methods | Arguments | Default | Returns | Description |
|---|---|---|---|---|
|*hasMore*|none|none|`boolean`|Determines whether a first name has more name parts|
|*tostring*|`includeAll`|`true`|`string`|Returns a string representation of the first name|
|*capitalize*|`option`|`initial`|`self`|Capitalizes a first name|
|*decapitalize*|`option`|`initial`|`self`|De-capitalizes a first name|
|*normalize*|none|none|`self`|Normalizes the first name as it should be|
|*getInitials*|`includeAll`|`false`|`string[]`|Gets the initials of the first name|
|*describe*|`includeAll`|`false`|`Summary`|Gives some descriptive statistics of the characters' distribution|
|*ascii*|`restrictions`|`[]`|`number[]`|Returns an ascii representation of each characters|
|*passwd*|none|none|`string`|Returns a password-like representation of a first name|

**Aliases:**

|Methods|Aliases|
|---|---|
|*capitalize*|*cap*|
|*decapitalize*|*decap*|
|*normalize*|*norm*|
|*getInitials*|*inits*|
|*describe*|*stats*|

## Lastname

This class is an extended arm of `Name` and represents a surname. It handles
two types of surname: a father's and a mother's.

```ts title="constructor"
/**
 * Constructs a `Lastname`
 * @param father a piece of string that will be defined as a namon
 * @param mother additional pieces considered as a last name
 * @param format how to output a surname considering its subparts
 */
constructor(
    public father: string,
    public mother?: string,
    private format: LastnameFormat = 'father'
);
```

Pay attention to the third argument (optional): **format**. It defines how the
surname *per se* should be output. By default, the father's name is considered.

**Example:**

```ts
import { Lastname } from 'namefully'

const lastname = new Lastname('Pitt')
lastname.tostring() // => Pitt
lastname.tostring('father') // => Pitt
lastname.tostring('mother') // => '' (empty string)
lastname.tostring('hyphenated') // => Pitt

// with the mother's name
const lastnames = new Lastname('Pitt', 'Jolie')
lastnames.tostring() // => Pitt Jolie
lastnames.tostring('father') // => Pitt
lastnames.tostring('mother') // => Jolie
lastnames.tostring('hyphenated') // => Pitt-Jolie

// with the mother's name and format
const format = new Lastname('Pitt', 'Jolie', 'mother')
format.tostring() // => Jolie
format.tostring('father') // => Pitt
format.tostring('mother') // => Jolie
format.tostring('hyphenated') // => Pitt-Jolie
```

**API:**

|Methods|Arguments|Default|Returns|Description|
|---|---|---|---|---|
|*hasMother*|none|none|`boolean`|Determines whether a 'mother' subpart was set|
|*tostring*|`format`|`null`|`string`|Returns a string representation of the last name|
|*capitalize*|`option`|`initial`|`self`|Capitalizes a last name|
|*decapitalize*|`option`|`initial`|`self`|De-capitalizes a last name|
|*normalize*|none|none|`self`|Normalizes the last name as it should be|
|*getInitials*|`format`|`null`|`string[]`|Gets the initials of the last name|
|*describe*|`format`|`null`|`Summary`|Gives some descriptive statistics of the characters' distribution|
|*ascii*|`restrictions`|`[]`|`number[]`|Returns an ascii representation of each characters|
|*passwd*|none|none|`string`|Returns a password-like representation of a last name|

**Aliases:**

|Methods|Aliases|
|---|---|
|*capitalize*|*cap*|
|*decapitalize*|*decap*|
|*normalize*|*norm*|
|*getInitials*|*inits*|
|*describe*|*stats*|

Not sure to know how to use these classes? See some [examples](examples).

## Summary

Another class, which does not seem to be very useful but is provided anyway, is:
`Summary`. It represents the statistical summary of a string representation or a
namon. The derived categorical statistics is:

- **distribution**: frequency a single character appears in the namon
- **count**: number of characters in the namon
- **top**: which character appears more frequently
- **frequency**: how many times this frequent character appears
- **unique**: how many unique characters

This is actually what the `describe()` method is doing.

**Example:**

```ts
import { Summary, Firstname } from 'namefully'

const martha = new Firstname('Martha').describe()
martha.distribution // => { M: 1, A: 2, R: 1, T: 1, H: 1 }
martha.count        // => 6
martha.top          // => A
martha.frequency    // => 2
martha.unique       // => 5

const spell = new Summary('abracadabra') // Avada Kedavra
spell.distribution // => { A: 5, B: 2, R: 2, C: 1, D: 1 }
spell.count        // => 11
spell.top          // => A
spell.frequency    // => 5
spell.unique       // => 5
```

[Back to Top](#name)
