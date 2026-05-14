---
id: name-builder
title: NameBuilder
description: Construct a Namefully incrementally, with lifecycle hooks.
sidebar_position: 6
---

# `NameBuilder`

`NameBuilder` is the **add-then-build** way to construct a name. You queue up `Name` instances, optionally hook into lifecycle events, and call `.build()` when you're ready. The output is an ordinary immutable `Namefully`.

It's useful when:

- you don't know all the parts up front (you're walking a form, an API response, an LDAP query);
- you want to validate or log around construction;
- you'd like to keep an active builder around to clear and re-fill, repeatedly.

## The simple case

```ts
import { Name, NameBuilder } from 'namefully';

const builder = NameBuilder.of(Name.first('Nikola'));
builder.add(Name.last('Tesla'));
builder.add(Name.prefix('Mr'));

const name = builder.build();
name.full; // 'Mr Nikola Tesla'
```

Three constructors get you started:

```ts
NameBuilder.create();           // empty builder
NameBuilder.create(name);       // builder with one Name
NameBuilder.of(...names);       // builder with several
NameBuilder.use({ names, ... }); // builder with names and hooks
```

The queue is ordered, but the **slot of each `Name` is what determines its role** in the final `Namefully`, not its position in the queue. You can add a prefix last and the renderer will still place it first.

## The queue API

```ts
builder.add(...names);   // append
builder.addFirst(name);  // prepend
builder.addLast(name);   // append (same as add for one)
builder.remove(name);    // remove a specific Name
builder.removeFirst();   // shift
builder.removeLast();    // pop
builder.removeWhere(fn); // remove all matching
builder.retainWhere(fn); // keep only matching
builder.clear();         // empty
builder.size;            // current count
```

After `.build()`, the resulting `Namefully` is cached on `builder.instance`. Calling `.build()` again re-runs the lifecycle and returns a fresh `Namefully` from the current queue.

## Lifecycle hooks

Use `NameBuilder.use({...})` to attach callbacks around build and clear:

```ts
import { Name, NameBuilder } from 'namefully';

const builder = NameBuilder.use({
  names: [Name.first('Marie'), Name.last('Curie')],

  prebuild: () => console.log('about to build'),
  postbuild: (instance) => console.log(`built: ${instance.full}`),
  preclear: (instance) => console.log(`clearing: ${instance.full}`),
  postclear: () => console.log('cleared'),
});

builder.build();
// about to build
// built: Marie Curie

builder.clear();
// clearing: Marie Curie
// cleared
```

| Hook | When it fires | Argument |
| --- | --- | --- |
| `prebuild` | before validation and instance creation | — |
| `postbuild` | after a successful `.build()` | the new `Namefully` |
| `preclear` | before `.clear()` (only if there's an instance) | the previous `Namefully` |
| `postclear` | after `.clear()` | — |

These are plain function callbacks — no async support. If you need to do async work, do it outside the builder and pass the result back in.

## Validation

`.build()` runs the array validator before constructing the `Namefully`. So a builder with no `LastName` will throw at build time — and that's intentional, since silently producing a `Namefully` with missing required parts is worse than telling you to add it.
