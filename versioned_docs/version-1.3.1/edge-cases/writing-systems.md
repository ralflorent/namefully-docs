---
id: writing-systems
title: Writing systems & validation
description: What characters and writing systems namefully accepts.
sidebar_position: 2
---

# Writing systems & validation

`namefully` ships with built-in validators that decide whether a given string is a "valid name" — meaning, a sequence of characters from one of the writing systems the library knows about.

These validators are **off by default**. The library's stance is that names are unruly and the data you actually have is probably weirder than the data your validator imagined. So unless you explicitly set `bypass: false`, you can pass through anything that looks like a name and the library won't complain.

When you _do_ turn validation on, here's what gets accepted.

## Supported writing systems

- **Latin** — `A–Z`, `a–z`
- **Latin Extended** — accented characters used across European languages (`á`, `é`, `ñ`, `ç`, `ü`, etc.)
- **German** — including `ß` and umlauted vowels
- **Greek** — capital and lowercase letters
- **Cyrillic** — capital and lowercase letters
- **Icelandic** — including `þ`, `ð`, `ý`, and accented vowels
- **Common name punctuation** — hyphens (`-`), apostrophes (`'`), spaces

So `María`, `Müller`, `Ólafur`, `Δημήτριος`, `Иванов`, and `O'Brien` all pass validation when `bypass: false`.

## What's _not_ in the supported set

The default validators don't cover:

- Chinese, Japanese, Korean characters (CJK)
- Arabic, Hebrew, Devanagari, Thai, and other non-Latin/non-European scripts
- Emoji and symbols
- Digits (some names contain numerals, but the validator treats them as suspicious)
- Multiple consecutive whitespace characters
- Mixed-script tokens (a single name token blending two unrelated scripts)

If you need to accept names from any of these systems, either leave `bypass: true` (the default) or write a custom validator. The library doesn't currently expose a public extension point for adding writing systems — it's `bypass: true` or live with the built-in set.

## Validation rules beyond character set

When `bypass: false`, the validators also check:

- **Minimum length**: each name part must be at least 2 characters.
- **Prefix shape**: a prefix has to match the known list (`Mr`, `Mrs`, `Miss`, `Ms`, `Dr`, `Prof`, etc.) up to title casing.
- **Suffix shape**: a suffix has to match the known list (`Jr`, `Sr`, `I`–`V`, `PhD`, `MD`, etc.) up to spacing and periods.
- **Structural rules**: the name must have at least a first and a last name.

Any of these failing throws a `NameError` — see [Error handling](./error-handling.md).

## A pragmatic recommendation

For consumer-facing software where names come from real humans typing into a form, **keep `bypass: true`**. Names are full of edge cases the validators don't know about — diacritics applied unusually, given names that look like ordinary words, surnames with internal whitespace, transliterations that drift across systems. Rejecting a real name is a worse user experience than accepting an odd one.

For pipelines where the input is supposed to come from a structured source — payroll, identity verification, government records — `bypass: false` will tell you when something has gone wrong upstream.
