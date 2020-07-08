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
|*capitalize*|`option`|`initial,all`|`self`|Capitalizes a name|
|*decapitalize*|`option`|`initial,all`|`self`|De-capitalizes a name|
|*normalize*|none|none|`self`|Normalizes the name as it should be|
|*reset*|none|none|`self`|Resets to the initial namon|
|*getInitials*|none|none|`string[]`|Gets the initials of the first and last names|
|*describe*|none|none|`Summary`|Gives some descriptive statistics of the characters' distribution|
|*ascii*|`restrictions`|`[]`|`number[]`|Returns an ascii representation of each characters|
|*passwd*|`nameType`|`null`|`string`|Returns a password-like representation of a name|

**Aliases:**

|Methods|Aliases|
|---|---|
|*capitalize*|*cap*|
|*decapitalize*|*decap*|
|*normalize*|*norm*|
|*getInitials*|*inits*|
|*describe*|*stats*|

Not sure to know how to use this class? See some [examples](examples).

## Firstname

## Lastname
