---
id: resources
sidebar_label: Resources
title: Resources
---

`namefully` provides some ready-made recipes with some extra functionalities. They
work independently. That is to say, you don't need an instance of `namefully` to
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
 * @param capitalized which kind of capitalizations
 */
constructor(
    public namon: string,
    public type: Namon,
    capitalized?: 'initial' | 'all'
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
|*getInitials*|none|none|`string[]`|Gets the initials of the name|
|*describe*|none|none|`Summary`|Gives some descriptive statistics of the characters' distribution|
|*upper*|none|none|`string`|Returns a lowercase string representation of the namon|
|*lower*|none|none|`string`|Returns a lowercase string representation of the namon|

**Aliases:**

None

## Firstname

This class is an extended arm of `Name` and represents a given name. It can work
with more than one name part.

```ts title="constructor"
/**
 * Constructs a `Firstname`
 * @param namon a piece of string that will be defined as a namon
 * @param more additional pieces considered as a given name
 */
constructor(public namon: string, public more?: string[]);
```

**Example:**

```ts
import { Firstname } from 'namefully'

const firstname = new Firstname('Ronald')

// with more than one name part
const firstnames = new Firstname('Emilia', ['Isobel', 'Euphemia', 'Rose'])
firstnames.tostring() // => Emilia

// include all the names
firstnames.tostring(true) // => Emilia Isobel Euphemia Rose
```

An instance of this class handles separately the required namon along with the
optional other given names a person might have.

**API:**

| Methods | Arguments | Default | Returns | Description |
|---|---|---|---|---|
|*tostring*|`includeAll`|`false`|`string`|Returns a string representation of the first name|
|*getInitials*|none|none|`string[]`|Gets the initials of the first name|
|*describe*|none|none|`Summary`|Gives some descriptive statistics of the characters' distribution|

**Aliases:**

None

## Lastname

This class is an extended arm of `Name` and represents a surname. It handles
two types of surname: a father's and a mother's.

```ts title="constructor"
/**
 * Constructs a `Lastname`
 * @param father a piece of string that will be defined as a namon
 * @param mother additional pieces considered as a last name
 */
constructor(
    public father: string,
    public mother?: string,
);
```

**Example:**

```ts
import { Lastname } from 'namefully'

const lastname = new Lastname('Pitt')
lastname.tostring() // => Pitt
lastname.tostring(false) // => Pitt
lastname.tostring(true) // => '' (empty string)

// with the mother's name
const format = new Lastname('Pitt', 'Jolie')
format.tostring() // => Jolie
format.tostring(false) // => Pitt
format.tostring(true) // => Jolie
```

**API:**

|Methods|Arguments|Default|Returns|Description|
|---|---|---|---|---|
|*tostring*|`includeAll`|`false`|`string`|Returns a string representation of the last name|
|*getInitials*|none|none|`string[]`|Gets the initials of the last name|
|*describe*|none|none|`Summary`|Gives some descriptive statistics of the characters' distribution|

**Aliases:**

None

Not sure to know how to use these classes? See some [examples](examples).

## Summary

Another class, which does not seem to be very useful but is provided anyway, is:
`Summary`. It represents the statistical summary of a string representation or a
namon. The derived categorical statistics is:

- **count**: number of characters in the namon
- **top**: which character appears more frequently
- **frequency**: how many times this frequent character appears
- **unique**: how many unique characters

This is actually what the `describe()` method is doing.

**Example:**

```ts
import { Summary, Firstname } from 'namefully'

const martha = new Firstname('Martha').describe()
martha.count        // => 6
martha.top          // => A
martha.frequency    // => 2
martha.unique       // => 5

const spell = new Summary('abracadabra') // Avada Kedavra
spell.count        // => 11
spell.top          // => A
spell.frequency    // => 5
spell.unique       // => 5
```

[Back to Top](#name)
