---
id: migrating-from-v1
title: Migrating from v1
description: What changed between namefully 1.3.1 and 2.2.0, and what (if anything) you need to do about it.
sidebar_position: 3
---

# Migrating from v1

Short version: **most v1.3.1 code keeps working in v2.2.0 unchanged**. The surface area is almost identical. The differences below are the entire delta you should care about.

## New in v2

### Mononyms

v2 introduces first-class support for one-word names. v1 throws if you hand it `'Plato'`.

```ts
import { Namefully } from 'namefully';

const name = new Namefully('Plato', { mono: true });
name.full;       // 'Plato'
name.initials(); // ['P']
```

The `mono` flag accepts a boolean or a `Namon` if you want to declare which slot the single token represents (e.g. `Namon.LAST_NAME`).

This goes against the library's design philosophy a little — `Namefully` is built to organize multiple name components. Treating a single token as a "full" name leaves some of the API semantically thin (`short` and `public` collapse to the same string, for example). We added it because enough people asked, but reach for `NameBuilder` if you find yourself disabling validation just to get a mononym through.

### JSON serialization

v2 can round-trip a `Namefully` through JSON:

```ts
import { Namefully, deserialize } from 'namefully';

const a = new Namefully('Jane Smith');
const json = a.serialize();    // SerializedName — preserves hierarchy + config
const b = deserialize(json);
b.equal(a); // true
```

v1.3.1 accepts the hierarchical name shape **as input** (so `new Namefully({ firstName, lastName })` works there too), but it cannot serialize a `Namefully` _out_ to that shape, nor reconstruct one from JSON.

## Behavioral changes

- **Minimum name length** is now **1 character** (was 2). Single-letter names go through.
- **Hierarchical JSON parsing** is now the default for object inputs. If you were relying on the older flat shape, the migration is mostly a no-op — flat objects still parse — but compound first/last names are now read from the hierarchical structure.
- **Error handling** got tightened up. `NameError` is now a proper hierarchy of `InputError`, `ValidationError`, `NotAllowedError`, and `UnknownError`. If you were `try`/`catch`-ing on the base class, that still works.
- **Separator casting** had a bug in late v1 where some non-string values weren't normalized correctly. v2 fixes it. If your code was working around that bug, you can remove the workaround.

## What did not change

The pieces below are present in **both** v1.3.1 and v2.2.0:

- `Namefully.parse()` (async, throwing) and `Namefully.tryParse()` (sync, `undefined` on failure) — the two static text helpers.
- `NameBuilder` with `prebuild` / `postbuild` / `preclear` / `postclear` lifecycle hooks.
- `NameIndex` for non-standard layouts.
- Custom `Parser<T>` subclasses.
- The `for..of` iterability and the `.equal()` deep-equality check.
- Every `Config` option except `mono`.

So if you don't use mononyms and you don't serialize names to JSON, you can bump the version and call it a day.
