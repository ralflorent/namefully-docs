---
id: json-serialization
title: JSON serialization
description: Round-trip a Namefully through JSON.
sidebar_position: 5
---

# JSON serialization

:::info
This page covers `serialize()` / `deserialize()`. v1.3.1 accepts the hierarchical JSON shape as **input**, but it cannot serialize a `Namefully` _out_ to JSON, nor reconstruct one from JSON. If you're on v1, see [Migrating from v1](../migrating-from-v1.md).
:::

## Serializing

`name.serialize()` returns a plain object — `SerializedName` — that captures both the name parts and the active `Config`, in a structure that round-trips cleanly:

```ts
import { Namefully } from 'namefully';

const name = new Namefully('Dr Jane Marie Smith PhD', { title: 'US' });
const json = name.serialize();

JSON.stringify(json);
// {
//   "names": {
//     "prefix": "Dr.",
//     "firstName": "Jane",
//     "middleName": ["Marie"],
//     "lastName": "Smith",
//     "suffix": "PhD"
//   },
//   "config": {
//     "name": "default",
//     "orderedBy": "firstName",
//     "separator": " ",
//     "title": "US",
//     "ending": false,
//     "bypass": true,
//     "surname": "father",
//     "mono": false
//   }
// }
```

The hierarchy adapts to the data:

- A `FirstName` with additional given names serializes as `{ value, more }`.
- A `LastName` with a mother's surname serializes as `{ father, mother }`.
- A simple last name serializes as a plain string.

So the `SerializedName` shape is a faithful reflection of the actual `FullName`, not a flattened version of it.

## Deserializing

The reverse operation accepts either the `SerializedName` object or the JSON string and gives you back a `Namefully`:

```ts
import { deserialize } from 'namefully';

const restored = deserialize(json);
const sameThing = deserialize(JSON.stringify(json));

restored.equal(name); // true
```

`deserialize()` reconstructs the `Config` along with the name, so the new instance is `.equal()` to the original — same parts, same configuration.

## When this is useful

- **Persisting names** in a database column or cache where you'll need to read them back as `Namefully` instances later.
- **Passing names across process boundaries** — workers, HTTP responses, message queues.
- **Snapshot tests** that want a deterministic representation.

For one-way display purposes, you usually don't need this — the rendering accessors (`full`, `short`, `format()`) are easier.

## Caveats

- The serialized config includes the **named config name** (`config.name`). If you rebuild on the receiving side with a different named config, the multiton will treat them as distinct settings — see [Immutability & Config](../concepts/immutability-config.md).
- `Namon` and `Separator` are serialized as their string keys (`'firstName'`, `' '`). `deserialize()` handles the cast back.
- Custom `Parser` subclasses don't survive a round-trip — they were only used at construction time, and the final state is just the `FullName` and `Config`.
