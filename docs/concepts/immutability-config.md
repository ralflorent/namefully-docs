---
id: immutability-config
title: Immutability & Config
description: Why Namefully instances can't be edited, and why Config is multiton instead of singleton.
sidebar_position: 3
---

# Immutability & Config

Two design decisions shape how you use the library day-to-day. Both are worth knowing up front.

## Names are immutable

A `Namefully` instance, once constructed, doesn't change. You can't reassign its first name or fix a typo. If the name is wrong, you build a new one.

```ts
const name = new Namefully('Jane Doe');
// name.first = 'Mary'; // TypeError — there is no setter.
```

The accessors are read-only by design. A few methods (`flip()`, the `to*Case()` helpers) _appear_ to mutate, but they're either returning a new string or twiddling the instance's `Config` — they never rewrite the underlying name parts.

Why? Because most bugs around names come from "I formatted this, then mutated it, then formatted it again". An immutable instance is one less moving part.

If you find yourself wanting mutation, you usually want [`NameBuilder`](../creating/name-builder.md) instead — a separate object whose whole job is to accumulate parts and then produce one final, immutable `Namefully`.

## `Config` is multiton

The library uses a **multiton pattern** for configuration. Each `Config` is identified by a name (string), and there's a registry under the hood that keeps each named config independent.

What this means in practice:

```ts
import { Namefully, Title } from 'namefully';

// These two instances have unrelated configuration.
const usName = new Namefully('Jane Smith', { name: 'us', title: Title.US });
const ukName = new Namefully('Jane Smith', { name: 'uk', title: Title.UK });
```

The `name` field on the options object is the **config name**, not the person's name. You rarely need to set it explicitly — passing no options gets you the `default` config, and passing options without a name forks off an anonymous one.

### Why bother with multiton instead of singleton?

Because the inner pieces of a name — `FirstName`, `LastName`, `Name` — sometimes need configuration that isn't the same as the parent `Namefully`. A `LastName` constructed with `Surname.HYPHENATED` should keep behaving like a hyphenated surname even if the `Namefully` it ends up inside is configured differently. The multiton lets each piece carry its own settings without stomping on the others.

You'll feel this most if you build names piece by piece with `NameBuilder` or compose them out of `FirstName` / `LastName` instances directly. If you only ever pass strings or JSON to `new Namefully(...)`, the multiton is invisible plumbing.

## Practical consequences

- Throwing away a `Namefully` and rebuilding is the normal way to "edit" a name.
- Two `Namefully` instances built from identical data with identical config are `.equal()` — see [Iteration & equality](../reading/iteration-equality.md) — but they are not `===`.
- You can build a `Namefully` once at the edge of your system and pass it around freely. It will not change under you.
