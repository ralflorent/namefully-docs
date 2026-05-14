---
id: terminology
title: Terminology
description: A glossary of the words namefully uses for the things it manipulates.
sidebar_position: 2
---

# Terminology

If you read the source you'll come across a small vocabulary of words that don't quite mean what they mean in plain English. Here's what each of them refers to.

## `Namon`

A **namon** is one of the five role slots a piece of a name can fill:

| `Namon` | Aliases | Example |
| --- | --- | --- |
| `Namon.PREFIX` | `prefix`, `px`, `p` | `Mr`, `Dr` |
| `Namon.FIRST_NAME` | `firstName`, `first`, `fn`, `f` | `John` |
| `Namon.MIDDLE_NAME` | `middleName`, `middle`, `mid`, `mn`, `m` | `Joe` |
| `Namon.LAST_NAME` | `lastName`, `last`, `ln`, `l` | `Smith` |
| `Namon.SUFFIX` | `suffix`, `sx`, `s` | `PhD`, `Jr` |

When the library asks for "which slot does this go in?", it means `Namon`.

The word is invented — it's the singular form of _nama_, below. There's no point looking it up.

## `Nama`

A **nama** is a collection of namon, the same way _criteria_ is a collection of _criterion_. Two namon (a first and a last, say) joined together form a nama. You'll see this in the source as the type of compound name input.

You will almost never need to use this word yourself. It's mostly internal vocabulary.

## `Name`

A `Name` is a class wrapping a single namon (a string) with a little extra capability — capitalization, initial extraction, equality. You construct one via the named constructors:

```ts
import { Name } from 'namefully';

Name.first('Jane');
Name.middle('Marie');
Name.last('Smith');
Name.prefix('Dr');
Name.suffix('PhD');
```

Two specialised subclasses exist: `FirstName` and `LastName`. Both can hold _additional_ values (an extra given name, a mother's surname) — see [Compound names](../edge-cases/compound-names.md).

## `FullName`

A `FullName` is all five namon — at most — composed into one object. It's the internal representation `Namefully` works against. You can construct one directly, but most of the time you'll use the `Namefully` constructor or `NameBuilder` and never see `FullName` by name.

`Mononym` is a subclass of `FullName` used when `Config.mono` is on. It represents a name with only one component.

## `Namefully`

`Namefully` is the public class. It wraps a `FullName` and exposes the formatting / accessor API the rest of these docs are about. Every `Namefully` instance is **immutable** — see [Immutability & Config](./immutability-config.md).

## Putting it together

A short cheat sheet of the relationships:

```
Namefully     — the public class you instantiate
  └── FullName  — its internal name container
        └── Name × up to 5     — one per namon (slot)
              └── Namon         — the slot tag
```

That's the whole vocabulary. Everything else is just method names.
