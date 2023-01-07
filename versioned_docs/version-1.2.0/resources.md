---
id: resources
sidebar_label: Resources
title: Resources
---

`namefully` provides some ready-made recipes with extra functionality. They
work independently. That is, you don't need an instance of `Namefully` to
work with a specific name part like a first name, for example.

They are 3 basic classes:

1. `Name`
2. `FirstName`
3. `LastName`

<!-- :::note
Some of the APIs that are available in `Namefully` are also available in these
classes. But these classes contain certain functionalities that are native.
::: -->

## Name

This class represents a piece of name in a string format with
some extra capabilities, compared to a simple string utils provided by JavaScript.
This class helps to define the role of a name part (e.g., `prefix`) before anything.

```ts title="constructor"
/**
 * Creates augmented names by adding extra functionality to a string name.
 * @param type must be indicated to categorize the name so it can be
 * treated accordingly.
 * @param capsRange determines how the name should be capitalized initially.
 */
constructor(value: string, readonly type: Namon, capsRange?: CapsRange)
```

**Example:**

```ts
import { Name, Namon, CapsRange } from 'namefully'

const prefix = new Name('Dr', Namon.PREFIX)
const firstname = new Name('Nick', Namon.FIRST_NAME)
const middlename = new Name('Ariana', Namon.MIDDLE_NAME)
const lastname = new Name('Clinton', Namon.LAST_NAME)
const suffix = new Name('MSc', Namon.SUFFIX)

const name = new Name('John', Namon.FIRST_NAME, CapsRange.ALL)
console.log(name.value) // => JOHN
```

**Alternatively:**

```ts
import { Name } from 'namefully'

const prefix = Name.prefix('Dr')
const firstName = Name.first('Nick')
const middleName = Name.middle('Ariana')
const lastName = Name.last('Clinton')
const suffix = Name.suffix('MSc')
```

As you can see, the 5 types of name can be created from that class. Additionally,
you can specify which kind of capitalizations to use when manipulating that piece
of name.

**API:**

| Properties | Type | Modifier | Description |
|---|---|---|---|
|*value*|`string`|read/write|The piece of string treated as a name.|
|*length*|`number`|read-only|The length of the name.|
|*isPrefix*|`boolean`|read-only|Whether the name is a prefix.|
|*isFirstName*|`boolean`|read-only|Whether the name is a first name.|
|*isMiddleName*|`boolean`|read-only|Whether the name is a middle name.|
|*isLastName*|`boolean`|read-only|Whether the name is a last name.|
|*isSuffix*|`boolean`|read-only|Whether the name is a suffix.|

| Methods | Returns | Description |
|---|---|---|
|*toString()*|`string`|Returns a string representation of the namon.|
|*initials()*|`string[]`|Gets the initials (first character) of this name.|
|*equal(Name)*|`boolean`|Returns true if the other is equal to this name.|
|*caps(CapsRange)*|`Name`|Capitalizes a name.|
|*decaps(CapsRange)*|`Name`|De-capitalizes a name.|

## FirstName

This class is an extension of `Name` and represents a given name. It can work
with more than one name part.

```ts title="constructor"
/**
 * Creates an extended version of `Name` and flags it as a first name `type`.
 *
 * Some may consider `more` additional name parts of a given name as their
 * first names, but not as their middle names. Though, it may mean the same,
 * `more` provides the freedom to do it as it pleases.
 */
constructor(value: string, ...more: string[])
```

**Example:**

```ts
import { FirstName } from 'namefully'

const firstName = new FirstName('Emilia', 'Isobel', 'Euphemia', 'Rose')
firstName.toString() // => Emilia
firstName.tostring(true) // => Emilia Isobel Euphemia Rose
```

An instance of this class handles separately the required name piece along with the
optional other given names a person might have.

**API:**

| Properties | Type | Modifier | Description |
|---|---|---|---|
|*hasMore*|`boolean`|read-only|Determines whether a first name has `more` name parts.|
|*more*|`string[]`|read-only|The additional name parts of the first name.|
|*asNames*|`Name[]`|read-only|The combined version of the `value` and `more` if any.|

| Methods | Returns | Description |
|---|---|---|
|*toString(boolean)*|`string`|Returns a string representation of the namon.|
|*initials(boolean)*|`string[]`|Gets the initials (first character) of this name.|
|*copyWith({ first?: string; more?: string[] })*|`FirstName`|Makes a copy of the current name.|

## LastName

This class is an extended arm of `Name` and represents a surname. It handles
two types of surname: a father's and a mother's.

```ts title="constructor"
/**
 * Creates an extended version of `Name` and flags it as a last name `type`.
 *
 * Some people may keep their `mother`'s surname and want to keep a clear cut
 * from their `father`'s surname. However, there are no clear rules about it.
 */
constructor(father: string, mother?: string, readonly format = Surname.FATHER)
```

Pay attention to the third argument (optional): **format**. It defines how the
surname *per se* should be output. By default, the father's name is considered.

**Example:**

```ts
import { LastName, Surname } from 'namefully'

const lastName = new LastName('Pitt')
lastName.toString() // => Pitt
lastName.toString(Surname.FATHER) // => Pitt
lastName.toString(Surname.MOTHER) // => '' (empty string)
lastName.toString(Surname.HYPHENATED) // => Pitt

// with the mother's name
const lastnames = new LastName('Pitt', 'Jolie')
lastNames.tostring() // => Pitt Jolie
lastNames.tostring(Surname.FATHER) // => Pitt
lastNames.tostring(Surname.MOTHER) // => Jolie
lastNames.tostring(Surname.HYPHENATED) // => Pitt-Jolie

// with the mother's name and format
const format = new LastName('Pitt', 'Jolie', 'mother')
format.toString() // => Jolie
format.toString(Surname.FATHER) // => Pitt
format.toString(Surname.MOTHER) // => Jolie
format.toString(Surname.HYPHENATED) // => Pitt-Jolie
```

**API:**

| Properties | Type | Modifier | Description |
|---|---|---|---|
|*hasMother*|`boolean`|read-only|Returns `true` if the mother's surname is defined.|
|*father*|`string[]`|read-only|The surname inherited from a father side.|
|*mother*|`string[]`|read-only|The surname inherited from a mother side.|
|*asNames*|`Name[]`|read-only|The combined version of the `father` and `mother` if any.|

| Methods | Returns | Description |
|---|---|---|
|*toString(Surname)*|`string`|Returns a string representation of the namon.|
|*initials(Surname)*|`string[]`|Gets the initials (first character) of this name.|
|*copyWith({ father?: string; mother?: string; format?: Surname })*|`LastName`|Makes a copy of the current name.|

Not sure to know how to use these classes? See some [examples](examples).

[Back to Top](#name)
