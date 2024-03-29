---
id: overview
sidebar_label: How It Works
title: How It Works
description: namefully is a JavaScript utility for handling person names, including name titles and initials, in distinct formats.
---

## Disclaimer

`namefully` does **not** magically guess which part of a person's name is what.
It relies actually on how you indicate the name parts' roles so that it can do its
magic and save you some quality of time.

**You may want to use this library if:**

- you've been repeatedly dealing with users' given names and surnames
- you need to occasionally format a name in a particular order, way, or shape
- you keep copy-pasting your name-related business logic for every project
- you're curious about trying new, cool stuff.

## A little bit of history

At work, the development team deals with many awesome projects that share some
commonalities. To increase development speed and productivity, we build some utilities
that can later be exported and reused across other modules or projects
(*Well, you might have been doing the same too at your workplace*).

At some point, I got tasked with doing some workarounds with people's names. That was
quite fun. Then, I realized that every time I switch projects and want to sort of
do the same, I feel very tempted to copy-paste from my past codebase. I was like,
"nahhh! Let me just make it a utility." And voilà! Thus has **namefully** seen the
day.

## Good to know

`namefully` is written in [TypeScript](https://www.typescriptlang.org/) although
it targets a JavaScript audience. Using TypeScript makes the codebase quite intuitive
and easy to scale and maintain. Moreover, it is intended to give you some flexibility
in terms of data format/type. You'll discover more about it as you go along with
the APIs.

`namefully` works like a trapdoor. Once a raw data is provided (and validated, if
needed), you only focus on shaping the name as you desire. If the name is mistaken,
a new instance must be created to continue. In other words, namefully is immutable; **no editing** is possible. Remember, this utility's primary objective is to help you **handle** a
person's name.

## Name standards

The name standards used for this library are as follows:

```text
[Prefix] Firstname [Middlename] Lastname [Suffix]
```

The opening `[` and closing `]` brackets mean that these name parts are optional.
In other words, the most basic/typical name case is a name that looks like
this: `John Smith`, where `John` is the first name and `Smith`, the last name.
Visit [this link](https://departments.weber.edu/qsupport&training/Data_Standards/Name.htm)
for more details on name standards.

:::important
Keep in mind that the order of appearance matters and can be
altered through configured parameters, which you will be seeing later on. By
default, the order of appearance is as shown above and will be used as a basis
for future examples and use cases.
:::

Once imported, all that is required to do is to basically create an instance of
 `Namefully` and the rest will follow.

```ts
import { Namefully } from 'namefully'

const strName = 'FirstName LastName' // your name as a simple string
const superName = new Namefully(strName) // still the same name, but with superpowers
```

## Terminologies

As a developer, you might be curious and want to have a look at the core
implementation of this library. It is likely that you come across some terminologies
that might not make sense to you in the first place. Some of them are:

- `Namon`: a type of name. There are 5 types:
  - *prefix*
  - *firstName*
  - *middleName*
  - *lastName*
  - *suffix*
- `Nama`: refers to a group of *Namon*, which I denominate **nama** (just like in
criterion/criteria). For example, joining both *firstname* and  *lastname* is called a *Nama*.
- `Name`: is a class representing a namon (a piece of name as string) with some
extra capabilities. For example, you can capitalize a namon, extract its initials, and more.
- `FullName`: refers to all the 5 name parts (*Namon*) combined together. Know that
all of them may not be defined in some cases.

It may look confusing to you in the beginning, but once you start using it,
it'll make sense to you. You can trust me on that.

Ready to embark on this new journey? Buckle up, a great adventure awaits you.
Happy name handling :smile:!
