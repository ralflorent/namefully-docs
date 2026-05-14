---
id: custom-parser
title: "Custom Parser<T>"
description: Subclass Parser to teach Namefully any input shape you like.
sidebar_position: 7
---

# Custom `Parser<T>`

Sometimes none of the built-in input shapes fit. Your data uses a `#` as separator, or comes wrapped in an envelope, or contains a nickname you want to drop on the floor. For those cases, write a `Parser`.

A `Parser<T>` is an abstract class with one method: `parse(options): FullName`. You subclass it, give it whatever raw type you like via the type parameter, and hand an instance to the `Namefully` constructor.

## A minimal example

```ts
import { Config, FullName, Namefully, Parser } from 'namefully';

class HashParser extends Parser<string> {
  parse(options: Partial<Config>): FullName {
    const [fn, ln] = this.raw.split('#', 2);
    return new FullName(options)
      .setFirstName(fn.trim())
      .setLastName(ln.trim());
  }
}

const name = new Namefully(new HashParser('Juan#Garcia'));
name.full; // 'Juan Garcia'
```

`this.raw` is the value you passed to the parser constructor. `parse()` receives the merged `Config` for the `Namefully` being built, so you can respect `orderedBy`, `separator`, and friends.

## Building a `FullName`

The `FullName` builder API is small:

```ts
new FullName(options)
  .setPrefix('Mr')
  .setFirstName('Jane')
  .setMiddleName('Marie')
  .setLastName('Doe')
  .setSuffix('PhD');
```

Each setter accepts either a string or a `Name` instance. For compound parts:

```ts
import { FirstName, FullName, LastName } from 'namefully';

new FullName(options)
  .setFirstName(new FirstName('Jane', 'Marie'))
  .setLastName(new LastName('De La Cruz', 'García'));
```

## Built-in parser subclasses

For reference, the library ships these parser classes — the constructor uses them internally:

| Class | Accepts |
| --- | --- |
| `StringParser` | a raw `string` |
| `ArrayStringParser` | `string[]` |
| `ArrayNameParser` | `Name[]` |
| `NamaParser` | a `JsonName` object |

Subclassing `Parser` directly is the right call when your input type isn't one of those four.

## Why bother

The constructor's automatic parser selection handles the four common cases (string / array / array-of-Name / object). The moment you want anything else — a custom envelope, a domain-specific separator, a pre-cleaning step — extending `Parser` is cheaper than retrofitting it onto your input shape before calling `Namefully`. It also keeps your parsing logic in one named, testable place.
