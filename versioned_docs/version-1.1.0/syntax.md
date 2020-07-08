---
id: syntax
sidebar_label: Syntax
title: Syntax
---

`Namefully` accepts two arguments:

1. `raw`: raw data input to parse and construct the name parts

2. `options`: optional parameters to configure additional information on the
formatting of the name parts.

**Example:**

```ts
import { Namefully } from 'namefully'

const name = new Namefully(
    'Cruise Tom', /* raw data */
    { orderedBy: 'lastname' } /* optional params */
)

// The name is ordered by 'lastname'
console.log(name.full()) // => Cruise Tom

// Order the name by 'firstname' instead
console.log(name.full('fn')) // => Tom Cruise
```

> Ignore the syntax in this example for now.

## Raw data

This is the first argument and is required to build an instance of `Namefully`.
This raw data can be of the following shapes:

- `string`: string literals
- `string[]`: array of strings
- `Name[]`: array of `Name` objects
- `Nama`: JSON object with a specific signature for the name parts
- `Fullname`: JSON object with a particular signature provided by `namefully`

### `string`

This is the simplest way to create an instance of `Namefully`. However, the string
content must obey the proposed name standards in order to be efficient.

A string name gets parsed using a separator, if set, or simply using the space
character <' '> as a basis for the split.

:::important
Remember this: `[Prefix] Firstname [Middlename] Lastname [Suffix]`?
Let us assume in the following examples, the space character is used to split up
the name parts of a string content.
:::

The string content is assessed in that specific order (name standards), based on
the count of available elements. It is expected that the raw string content will
provide information between two to five name parts. Also, the order of appearance
set in the configuration influences how the parsing is carried out.

**If ordered by `firstname`, you should provide a string name such that:**

- 2 elements: `firstname lastname`
- 3 elements: `firstname middlename lastname`
- 4 elements: `prefix firstname middlename lastname`
- 5 elements: `prefix firstname middlename lastname suffix`

**If ordered by `lastname`, you should provide a string name such that:**

- 2 elements: `lastname firstname`
- 3 elements: `lastname firstname middlename`
- 4 elements: `prefix lastname firstname middlename`
- 5 elements: `prefix lastname firstname middlename suffix`

**Example:**

```ts
import { Namefully } from 'namefully'

// ordered by 'firstname'
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

// ordered by 'firstname'
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
const stringContent = new Namefully(
    'Maria, De La Cruz',
    { separator: Separator.COMMA }
)

// using only string content will throw an error
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
import { Namefully, Name, Namon } from 'namefully'

const name = new Namefully ([
    new Name('John', Namon.FIRST_NAME), // the order doesn't matter here
    new Name('Wick', Namon.LAST_NAME),
])
```

:::tip
There are two other ready-made classes that faciliate the use of this parsing mechanism:
`Firstname`, `Lastname` with many more capabilities. Read more about them in
[Resources](resources).
:::

**Alternatively:**

```ts
import { Namefully, Firstname, Lastname } from 'namefully'

const name = new Namefully ([
    new Firstname('John'), // the order doesn't matter here
    new Lastname('Wick'),
])
```

### `Nama`

This data type is a simple JSON object with the following signature:

```ts
interface Nama {
    prefix?: string;
    firstname: string;
    middlename?: string;
    lastname: string;
    suffix?: string;
}
```

where the name parts are provided as string values. This data type is to facilitate
a developer's life that holds users' info in a JSON format. In other words, you only
needs to provide similar info and the rest will follow.

```ts
import { Namefully } from 'namefully'

const name = new Namefully ({
    firstname: 'Emmanuel',
    lastname: 'Macron'
})
```

### `Fullname`

If you wonder what's really happening under the hood when using `namefully`, then
this JSON signature is its true secret (its core). If `namefully` was Google, then
this JSON would've been the search engine. Weird analogy, hehe! But you get the point.

```ts
import { Prefix, Firstname, Name, Lastname, Suffix } from 'namefully'

interface Fullname {
    firstname: Firstname;
    lastname: Lastname;
    middlename?: Name[];
    prefix?: Prefix;
    suffix?: Suffix;
}
```

Yeah, that is just `namefully` in a nutshell. :smile:

But you don't want to spend your time parsing, validating, and finally constructing
this yourself. After all, why would you need to use this utility when you could do
it yourself? For this reason, `namefully` provides a full name builder, `FullnameBuilder`,
that uses a chaining method to build this core JSON object.

**Example:**

```ts
import { Namefully, FullnameBuilder } from 'namefully'

const fullname = new FullnameBuilder()
    .prefix('Dr')
    .firstname('Albert')
    .lastname('Einstein')
    .build()

const name = new Namefully(fullname)
```

## Optional parameters

Below are enlisted the options supported by `namefully`.

### orderedBy

`string: 'firstname' | 'lastname'`, default: `firstname`

Indicate in what order the name parts appear when set as a raw string values or
string array values. That is, the first element/piece of the name is either the
given name (e.g., `Jon Snow`)  or the surname (e.g.,`Snow Jon`).

So, based on the order of appearance, a full name looks like this:

```text title="By firstname"
`[Prefix] Firstname [Middlename] Lastname [Suffix]`
```

```text title="By lastname"
`[Prefix] Lastname Firstname [Middlename] [Suffix]`
```

**Example:**

```ts
import { Namefully } from 'namefully'

// 'Smith' is the surname in this raw string case
const name = new Namefully(
    'Smith John Joe',
    { orderedBy: 'lastname' }
)
console.log(name.ln()) // => Smith

// 'Edison' is the surname in this string array case
const name = new Namefully(
    [ 'Edison', 'Thomas' ],
    { orderedBy: 'lastname' }
)
console.log(name.fn()) // => Thomas
```

:::tip
This option also affects all the other results of the API. In other words,
the results will prioritize the order of appearance set in the first place for
the other operations. Keep in mind that in some cases, it can be altered on the
go. See the example below.
:::

```ts
import { Namefully } from 'namefully'

// 'Smith' is the surname in this raw string case
const name = new Namefully(
    'Smith John Joe',
    { orderedBy: 'lastname' }
)
console.log(name.full()) // => Smith John Joe

// Now alter the order by choosing the given name first
console.log(name.full('firstname')) // => John Joe Smith
```

### separator

`enum: Separator`, default: `Separator.SPACE`

Only valid for raw string values, this option indicates how to split the parts of
a raw string name under the hood.

```ts
import { Namefully, Separator } from 'namefully'

const name = new Namefully(
    'Adam,Sandler',
    { separator: Separator.COMMA } // predefined tokens
)
console.log(name.full()) // => Adam Sandler
```

### titling

`string: 'uk' | 'us'`, default: `uk`

Abide by the ways the international community defines an abbreviated title.
American and Canadian English follow slightly different rules for abbreviated
titles than British and Australian English. In North American English, titles
before a name require a period: `Mr., Mrs., Ms., Dr.`. In British and Australian
English, no periods are used in these abbreviations.

```ts
import { Namefully } from 'namefully'

const name = new Namefully(
    {
        prefix: 'Mr',
        firstname: 'John',
        lastname: 'Smith'
    },
    { titling: 'us' }
)
console.log(name.full()) // => Mr. John Smith
console.log(name.px()) // => Mr.
```

### ending

`boolean`, default: `false`

Set an ending character (i.e., a comma before the suffix) after the birth name.

```ts
import { Namefully } from 'namefully'

const name = new Namefully(
    {
        prefix: 'Mr',
        firstname: 'John',
        lastname: 'Smith',
        suffix: 'PhD'
    },
    { ending: true }
)
console.log(name.full()) // => Mr John Smith, PhD
```

### lastnameFormat

`string: 'father' | 'mother' | 'hyphenated' | 'all'`, default: `father`

Defines the distinct formats to output a compound surname (e.g., Hispanic
surnames).

```ts
import { Namefully, Firstname, Lastname } from 'namefully'

const firstname = new Firstname('Jaden')
const lastname = new Lastname('Smith', 'Pinkett')
const name = new Namefully(
    [firstname, lastname],
    { lastnameFormat: 'hyphenated' }
)
console.log(name.full()) // => Jaden Smith-Pinkett
```

### bypass

`boolean`, default: `false`

Skip all the validators (i.e., validation rules, regular expressions).

```ts
import { Namefully } from 'namefully'

const name = new Namefully(
    '2Pac Shakur', // normally would fail the regex
    { bypass: true } // but this param skip the rulers
)
console.log(name.fn()) // => 2Pac
```

:::tip
This option can help to trick the utility and allow us to use it for
unsupported languages or inner contents like prefixes or suffixes. For example,
the Hindi characters will not pass the validation rules. Or, the Spanish
equivalent for `Mr` => `Sr` will raise an exception as it is not part of the
predefined prefixes.
:::

### parser

`object`, default: `null`

Customize your own parser to indicate the full name yourself.

```ts
import { Namefully, Firstname, Lastname, Parser } from 'namefully'

// Suppose you want to cover this '#' separator
class MyParser implements Parser<string> {

    constructor(public raw: string) {}

    parse() {
        const [fn, ln] = this.raw.split('#');
        return {
            firstname: new Firstname(fn),
            lastname: new Lastname(ln),
        }
    }
}

const name = new Namefully(
    null,
    { parser: new MyParser('Juan#Garcia') }
)
console.log(name.full()) // => Juan Garcia
```

### Default values

To sum up, the default values of the optional parameters are:

```json
{
    "orderedBy": "firstname",
    "separator": " ",
    "titling": "uk",
    "ending": false,
    "lastnameFormat": "father",
    "bypass": false,
    "parser": null
}
```

## Use of aliases

So far, if there's one thing you (the reader) and me (the author) can agree upon
is the fact that the names of the methods, parameters, etc. are somewhat long.
Days after I wrote this utility, I was like, "No way, I'm gonna keep typing these
long names." That's how I came up with the aliases. Use them to your convenience.

Many of the code snippets that you've read and seen so far can be rewritten in a
shorter way. That is, every time you see `firstname`, think that there's a chance
you can short-cut it to `fn`, for example. The list of aliases can be found
that [here](api-quick-reference#aliases).

Let me quickly show the beauty of the aliases for a minute. Take the name of this
awesome Bachata singer *Juan Luis Guerra* as a sample of the data originated in
a CSV (comma-separated values) format:

```text title="dataset.csv"
Title,Last Name,First Name, Middle Name
Sr,Guerra,Juan,Luis
Ms,Obama,Michelle,
Dr,Einstein,Albert,
...
```

```ts title="app.ts"
import { Namefully, Separator } from 'namefully'

// omit some actions for csv reading and parsing
const dataset: string[] = [/* your in-memory data */]

// give your string names superpowers
const dataname = dataset.map(name => {
    return new Namefully(
        name, // e.g.: 'Sr,Guerra,Juan,Luis',
        {
            separator: Separator.COMMA,
            orderedBy: 'ln', // by last name
            titling: 'us',  // add period to prefix
            bypass: true // no rules
        }
    )
})

// let's use the name sample now
const name = dataname[0]
name.px()           // => Sr.
name.fn()           // => Juan
name.mn()           // => Luis
name.ln()           // => Guerra
name.sx()           // => '' (empty string)
name.full()         // => Sr. Guerra Juan Luis
name.full('fn')     // => Sr. Juan Luis Guerra
name.birth()        // => Guerra Juan Luis
name.birth('fn')    // => Juan Luis Guerra
name.inits()        // => [ 'G', 'J' ]
name.inits('fn')    // => [ 'J', 'G' ]
name.inits('fn', true) // => ['J', 'L', 'G']
name.shorten()      // => Guerra Juan
name.shorten('fn')  // => Juan Guerra
name.format('L, f m')// => GUERRA, Juan Luis
```

Isn't it just AWESOME? :wink:
