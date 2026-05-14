---
id: whats-new-in-v2
title: What's new in v2
description: The handful of features that exist in namefully v2.2.0 but not in v1.3.1.
sidebar_position: 3
---

# What's new in v2

You're reading the **v1.3.1** docs. If you're considering an upgrade, here's the entire delta you'd actually feel.

Short version: the v1.3.1 and v2.2.0 public APIs are almost identical. Most v1.3.1 code keeps working after the bump. The differences below are it.

## New features in v2

### Mononym support

v2 introduces first-class single-token names (`Plato`, `Madonna`, `Cher`) via a new `mono` config flag. v1.3.1 throws on one-word inputs.

```ts
// v2 only
new Namefully('Plato', { mono: true });
```

The `mono` flag accepts a boolean or a `Namon` for declaring which slot the single token represents.

### JSON serialization

v2 can round-trip a `Namefully` through JSON via `serialize()` / `deserialize()`:

```ts
// v2 only
const json = name.serialize();
const restored = deserialize(json);
restored.equal(name); // true
```

v1.3.1 _accepts_ the hierarchical name shape as **input** (`new Namefully({ firstName, lastName })` works here too), but it cannot serialize an instance out, nor reconstruct one from JSON. If persistence and round-tripping matter to you, that's the case for upgrading.

## Behavioural changes in v2

- **Minimum name length** drops from 2 characters to 1. Single-letter parts pass.
- **Hierarchical JSON parsing** becomes the default for object inputs. Flat objects still parse; compound first/last names are read from the hierarchical structure.
- **Error handling** got tightened up. `NameError` is now a proper hierarchy of `InputError`, `ValidationError`, `NotAllowedError`, and `UnknownError`. If you `try`/`catch` on the base class, that still works.
- **Separator casting** had a bug in late v1 where some non-string values weren't normalized correctly. v2 fixes it.

## Pieces that didn't change

The following are present in **both** v1.3.1 and v2.2.0:

- `Namefully.parse()` — the lenient parser.
- `NameBuilder` with `prebuild` / `postbuild` / `preclear` / `postclear` lifecycle hooks.
- `NameIndex` for non-standard layouts.
- Custom `Parser<T>` subclasses.
- The `for..of` iterability and the `.equal()` deep-equality check.
- Every `Config` option except `mono`.

So if you don't need mononyms or JSON round-trips, you can bump the version and call it a day.

## Where to find the v2 docs

This page is in the v1.3.1 docs. To read the v2 docs, switch versions using the dropdown in the navbar.
