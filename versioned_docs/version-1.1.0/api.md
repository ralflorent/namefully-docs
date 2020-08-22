---
id: api
sidebar_label: Specs
title: API Specifications
---

:::caution
This section is a work in progress.
:::

The API specifications are the verbs `namefully` speaks.

## `getPrefix()`

**Alias:** `px()`

Gets the prefix part of the full name, if any. If no prefix was set as part of the
full name at the time of instantiating `Namefully`, the return value is an empty
string.

**Example:**

```ts
// full name with prefix
const nameWithPrefix = new Namefully({
    prefix: 'Mr',
    firstname: 'Eddie',
    lastname: 'Murphy',
})
console.log(nameWithPrefix.getPrefix()) // => Mr

// full name without prefix
const nameWithoutPrefix = new Namefully('Eddie Murphy')
console.log(nameWithoutPrefix.getPrefix()) // => ''
```

## `getFirstname(includeAll)`

**Alias:** `fn(includeAll)`

Gets the first name part of the full name.

:::tip
Recalling that `namefully` provides ready-made classes that help you to manipulate
unusual use cases for a full name, you may want to use `Firstname` to treat multiple
pieces of name as `firstname`, assuming they are not middle names.
:::

### `includeAll`

A boolean argument set to `true` by default that decides whether or not to include
all the pieces of the first name as a given name may be composed of one or more
pieces of name.

**Example:**

```ts
// full name with one piece of first name
const name1 = new Namefully('Tom Hanks')
console.log(name1.getFirstname()) // => 'Tom'

// full name with two pieces of first name
const name2 = new Namefully([
    new Firstname('Thomas', 'Jeffrey'),
    new Lastname('Hanks')
])
console.log(name2.getFirstname()) // => 'Thomas Jeffrey'
console.log(name2.getFirstname(false)) // => 'Thomas'
```
