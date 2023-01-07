---
id: syntax
sidebar_label: Syntax
title: Syntax
---

`Namefully` accepts two arguments:

1. `raw`: raw or name data input to parse and construct the name parts

2. `options`: optional parameters to configure additional information on the
formatting of the name parts.

**Example:**

```ts
import { Namefully, NameOrder } from 'namefully'

const name = new Namefully(
    'Cruise Tom', /* raw data */
    { orderedBy: NameOrder.LAST_NAME } /* optional params */
)

// The name is ordered by last name
console.log(name.full) // => Cruise Tom

// Order the name by first name instead
console.log(name.fullName(NameOrder.FIRST_NAME)) // => Tom Cruise
```

> Ignore the syntax in this example for now.

## Raw data

This is the first argument and is required to build an instance of `Namefully`.
This raw data can be of the following shapes:

- `string`: string literals
- `string[]`: array of strings
- `Name[]`: array of `Name` objects
- `JsonName`: JSON object with a specific signature for the name parts
- `Parser`: a customized parser (do it yourself)

### `string`

This is the simplest way to create an instance of `Namefully`. However, the string
content must obey the proposed name standards in order to be efficient.

A string name gets parsed using a separator, if set, or simply using the space
character <' '> as a basis for the split.

:::important
Remember this: `[Prefix] FirstName [MiddleName] LastName [Suffix]`?
Let us assume in the following examples the space character is used to split
the name parts of a string content.
:::

The string content is assessed in that specific order (name standards), based on
the count of available elements. It is expected that the raw string content will
provide information between two to five name parts. Also, the order of appearance
set in the configuration influences how the parsing is carried out.

**If ordered by `first name`, you should provide a string name such that:**

- 2 elements: `firstName lastName`
- 3 elements: `firstName middleName lastName`
- 4 elements: `prefix firstName middleName lastName`
- 5 elements: `prefix firstName middleName lastName suffix`

**If ordered by `last name`, you should provide a string name such that:**

- 2 elements: `lastName firstName`
- 3 elements: `lastName firstName middleName`
- 4 elements: `prefix lastName firstName middleName`
- 5 elements: `prefix lastName firstName middleName suffix`

**Example:**

```ts
import { Namefully } from 'namefully'

// ordered by 'first name'
const name2 = new Namefully('John Smith')
const name3 = new Namefully('John Joe Smith')
const name4 = new Namefully('Mr John Joe Smith')
const name5 = new Namefully('Mr John Joe Smith PhD')
```

### `string[]`

This data format is very similar to the plain string content. As a matter of fact,
it follows the same parsing principle to determine the name parts. Unlike the
string content, the name parts in this case are already split up (no need to be
concerned with a specified separator) for `Namefully`.

**Example:**

```ts
import { Namefully } from 'namefully'

// ordered by 'first name'
const name2 = new Namefully([ 'John', 'Smith' ])
const name3 = new Namefully([ 'John', 'Joe', 'Smith' ])
const name4 = new Namefully([ 'Mr', 'John', 'Joe', 'Smith' ])
const name5 = new Namefully([ 'Mr', 'John', 'Joe', 'Smith', 'PhD' ])
```

But in what occasion would you prefer `string[]` over a `string`? Apparently, they
have the same parsing mechanism, but in some use cases, `string[]` may reveal
itself more useful than `string`. For example, let us consider the following name:
*Maria De La Cruz*, where "De La Cruz" is the surname. It's way faster to indicate
the name parts with an array of string.

```ts
import { Namefully, Separator } from 'namefully'

// using array of string
const arrayOfString = new Namefully([ 'Maria', 'De La Cruz' ])

// using string content with explicit separator
const stringContent = new Namefully('Maria, De La Cruz', { separator: Separator.COMMA })

// using this string content will not parse as expected
const corruptedContent = new Namefully('Maria De La Cruz')
```

### `Name[]`

First off, `Name` is a class provided by this utility that represents a namon with
some extra capabilities, compared to a simple string name. This class helps to
define the role of a name part (e.g., `prefix`) beforehand, which, as a consequence, gives
more flexibility at the time of creating an instance of `Namefully`. You can read
about its full functionalities in [Resources](resources).

This data format gets parsed as an array of objects representing the `Name` class.
With this, every name part is already defined within the `namefully` domain as
the class `Name` is a ready-made recipe that saves `Namefully` the how-to parsing
for a raw data input.

In this specific case, you are expected to carefully set each name part and
submit a high-quality data as input.

**Example:**

```ts
import { Namefully, Name } from 'namefully'

// the order doesn't matter here
const name = new Namefully ([ Name.first('John'), Name.last('Wick') ])
```

:::tip
There are two other ready-made classes that faciliate the use of this parsing mechanism:
`FirstName`, `LastName` with many more capabilities. Read more about them in
[Resources](resources).
:::

**Alternatively:**

```ts
import { Namefully, FirstName, LastName } from 'namefully'

const name = new Namefully ([ new Firstname('John'), new Lastname('Wick') ])
```

### `JsonName`

This data type is a simple JSON object with the following signature:

```ts
interface JsonName {
    prefix?: string
    firstName: string
    middleName?: string[]
    lastName: string
    suffix?: string
}
```

where the name parts are provided as string values. This data type is to facilitate
a developer's life that holds users' info in a JSON format. In other words, you only
needs to provide similar info and the rest will follow.

```ts
import { Namefully } from 'namefully'

const name = new Namefully ({ firstName: 'Emmanuel', lastName: 'Macron' })
```

### `Parser`

Customize your own parser to indicate the full name yourself. That is, a developer
may leverage `Parser` to indicate business-tailored rules if he or she wants this
utility to perform those safety checks behind the scenes.

**Example:**

```ts
import { Config, FullName, Namefully, Parser } from 'namefully'

// Suppose you want to cover this '#' separator
class MyParser extends Parser<string> {
    parse(options: Partial<Config>): FullName {
        const [firstName, lastName] = this.raw.split('#')
        return FullName.parse({ firstName, lastName }, Config.merge(options))
    }
}

const name = new Namefully(new MyParser('Juan#Garcia'));
console.log(name.full); // Juan Garcia
```

## `Config` and default values

`Config` is a single configuration to use across the other components.

The multiton pattern is used to keep one configuration across the `Namefully`
setup. This is useful for avoiding confusion when building other components such
as `FirstName`, `LastName`, or `Name` of distinct types (or `Namon`) that may
be of particular shapes.

Below are enlisted the options supported by `namefully`.

### orderedBy

`NameOrder` - default: `NameOrder.FIRST_NAME`

Indicates in what order the names appear when set as raw string values or string
array values. That is, the first element/piece of the name is either the given
name (e.g., `Jon Snow`) or the surname (e.g.,`Snow Jon`).

So, based on the order of appearance, a full name looks like this:

```text title="By first name"
[Prefix] FirstName [MiddleName] LastName [Suffix]
```

```text title="By last name"
[Prefix] LastName FirstName [MiddleName] [Suffix]
```

**Example:**

```ts
import { Namefully, NameOrder } from 'namefully'

// 'Smith' is the surname in this raw string case
const name1 = new Namefully('Smith John Joe', { orderedBy: NameOrder.LAST_NAME });
console.log(name1.last); // Smith

// 'Edison' is the surname in this string array case
const name2 = new Namefully(['Edison', 'Thomas'], { orderedBy: NameOrder.LAST_NAME });
console.log(name2.first); // Thomas
```

:::tip
This option also affects all the other results of the API. In other words,
the results will prioritize the order of appearance set in the first place for
the other operations. Keep in mind that in some cases, it can be altered on the
go. See the example below.
:::

```ts
// 'Smith' is the surname in this raw string case
const name = new Namefully('Smith John Joe', { orderedBy: NameOrder.LAST_NAME })
console.log(name.fullName()) // => Smith John Joe

// Now alter the order by choosing the given name first
console.log(name.fullName(NameOrder.FIRST_NAME)) // => John Joe Smith
```

### separator

`Separator` - default: `Separator.SPACE`

*Only valid for raw string values*, this option indicates how to split the parts
of a raw string name under the hood.

**Example:**

```ts
import { Namefully, Separator } from 'namefully'

const name = new Namefully('Adam,Sandler', { separator: Separator.COMMA })
console.log(name.full) // => Adam Sandler
```

### title

`Title` - default: `Title.UK`

Abides by the ways the international community defines an abbreviated title.
American and Canadian English follow slightly different rules for abbreviated
titles than British and Australian English. In North American English, titles
before a name require a period: `Mr., Mrs., Ms., Dr.`. In British and Australian
English, no periods are used in these abbreviations.

**Example:**

```ts
import { Namefully, Title } from 'namefully'

const name = new Namefully({
    prefix: 'Mr',
    firstName: 'John',
    lastName: 'Smith',
}, { title: Title.US });
console.log(name.full);   // => Mr. John Smith
console.log(name.prefix); // => Mr.
```

### ending

`boolean` - default: `false`

Sets an ending character after the full name (a comma before the suffix actually).

**Example:**

```ts
import { Namefully } from 'namefully'

const name = new Namefully({
    firstName: 'John',
    lastName: 'Smith',
    suffix: 'Ph.D'
}, { ending: true })
console.log(name.full) // John Smith, Ph.D
console.log(name.suffix) // Ph.D
```

### surname

`Surname` - default: `Surname.FATHER`

Defines the distinct formats to output a compound surname (e.g., Hispanic surnames).

**Example:**

```ts
import { Namefully, FirstName, LastName, Surname } from 'namefully'

const name = new Namefully(
    [new FirstName('John'), new LastName('Doe', 'Smith')],
    { surname: Surname.HYPHENATED },
)
console.log(name.full); // John Doe-Smith
```

### bypass

`boolean` - default: `true`

Skips all the validators (i.e., validation rules, regular expressions).

**Example:**

```ts
import { Namefully } from 'namefully'

const name = new Namefully(
  {
    firstName: 'John',
    lastName: 'Smith',
    suffix: 'M.Sc.', // will fail the validation rule and throw an exception.
  },
  { bypass: false, ending: true },
);
```

### Default values

To sum up, the default values of the optional parameters are:

```ts
{
    orderedBy: NameOrder.FIRST_NAME,
    separator: Separator.SPACE,
    title: Title.UK,
    ending: false,
    bypass: true,
    surname: Surname.FATHER
}
```

### Bonus

`Config` makes it easy to set up a specific configuration for `Namefully`
and reuse it through other instances or components along the way. If a new
`Config` is needed, a named configuration may be created. It is actually
advised to use named `Config.create(name)` instead as it may help mitigate issues
and avoid confusion and ambiguity in the future. Plus, a named configuration
explains its purpose.

Additionally, a configuration may be merged with or copied from an existing
configuration, prioritizing the new one's values, as shown in the example
above.

**Example:**

```ts
import { Config, Title } from 'namefully'

const defaultConfig = Config.create()
const mergedConfig = Config.merge({ name: 'other', title: Title.US })
const copyConfig = mergedConfig.copyWith({ ending: true })
```

[Back to Top](#raw-data)
