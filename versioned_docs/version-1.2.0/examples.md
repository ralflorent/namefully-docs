---
id: examples
sidebar_label: Examples
title: Examples
---

The example below showcases a simple use case of the name: `Thomas Alva Edison`.

```ts
import { Namefully } from 'namefully'

// Gives a simple name some super power.
const name = new Namefully('Thomas Alva Edison')

// Gets the count of characters, including space.
console.log(name.length) // 18

// Gets the first name.
console.log(name.first) // Thomas

// Gets the first middle name if any.
console.log(name.middle) // Alva

// Gets the last name.
console.log(name.last) // Edison

// Controls what the public sees.
console.log(name.public) // Thomas E

// Gets all the initials.
console.log(name.initials()) // ['T', 'A', 'E']

// Formats it as desired.
console.log(name.format('L, f m')) // EDISON, Thomas Alva

// Makes it short.
console.log(name.shorten()) // Thomas Edison

// Makes it flat.
console.log(name.zip()) // Thomas A. E.

// Makes it uppercase.
console.log(name.toUpperCase()) // THOMAS ALVA EDISON
```

You may want to try it yourself on StackBlitz. There are some prebuilt projects
online, which you can use to test out the APIs.

- [namefully](https://stackblitz.com/edit/namefully)
- [@namefully/ng](https://stackblitz.com/edit/namefully-ng)
- [@namefully/react](https://stackblitz.com/edit/namefully-react)
