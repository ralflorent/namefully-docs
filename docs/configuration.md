---
id: configuration
title: Configuration
description: Every Config option, with defaults and examples.
sidebar_position: 1
---

# Configuration

`Config` is a small bag of options that controls how `Namefully` reads its inputs and how it renders its outputs. All seven knobs have sensible defaults, so you can construct a `Namefully` without any options at all — but the moment you hit a non-English name, a comma-separated input, or a Hispanic surname, this page is where you'll come.

## Defaults at a glance

```ts
{
  orderedBy: NameOrder.FIRST_NAME,
  separator: Separator.SPACE,
  title:    Title.UK,
  ending:   false,
  bypass:   true,
  surname:  Surname.FATHER,
  mono:     false,
}
```

That's the configuration you get if you pass no options. The rest of this page walks through each one.

---

## `orderedBy`

**Type:** `NameOrder` &middot; **Default:** `NameOrder.FIRST_NAME`

Tells `Namefully` which side of a string or array input is the given name. The first element of `'Smith John'` is the first name unless you say otherwise.

```ts
import { Namefully, NameOrder } from 'namefully';

const name1 = new Namefully('Smith John Joe', { orderedBy: NameOrder.LAST_NAME });
name1.last; // 'Smith'

const name2 = new Namefully(['Edison', 'Thomas'], { orderedBy: NameOrder.LAST_NAME });
name2.first; // 'Thomas'
```

This option is **sticky**: it doesn't just affect parsing, it also affects how the instance _renders_ itself by default. So `name1.fullName()` will produce `Smith John Joe`, not `John Joe Smith`. You can ask for a different order on the fly though:

```ts
const name = new Namefully('Smith John Joe', { orderedBy: NameOrder.LAST_NAME });
name.fullName(NameOrder.FIRST_NAME); // 'John Joe Smith'
```

Or flip the instance's default in place (one of the few mutating calls in the API):

```ts
name.flip(); // now orderedBy is FIRST_NAME for this instance
```

---

## `separator`

**Type:** `Separator` &middot; **Default:** `Separator.SPACE`

Only relevant for raw **string** inputs. Tells `Namefully` how to split a single string into parts.

```ts
import { Namefully, Separator } from 'namefully';

const name = new Namefully('John,Smith', { separator: Separator.COMMA });
name.full; // 'John Smith'
```

The built-in separators are: `SPACE`, `COMMA`, `COLON`, `SEMI_COLON`, `PERIOD`, `HYPHEN`, `UNDERSCORE`, `SINGLE_QUOTE`, `DOUBLE_QUOTE`, `EMPTY`. They map to exactly the characters you'd guess.

For arrays and objects this option is ignored — those inputs already declare their boundaries.

---

## `title`

**Type:** `Title` &middot; **Default:** `Title.UK`

Controls whether prefixes are abbreviated with a trailing period. North American English conventionally uses periods (`Mr.`, `Dr.`); British and Australian English omit them (`Mr`, `Dr`).

```ts
import { Namefully, Title } from 'namefully';

const name = new Namefully(
  { prefix: 'Mr', firstName: 'John', lastName: 'Smith' },
  { title: Title.US },
);

name.full;   // 'Mr. John Smith'
name.prefix; // 'Mr.'
```

If you don't pass a prefix, this option is moot.

---

## `ending`

**Type:** `boolean` &middot; **Default:** `false`

Insert a comma between the last name and the suffix.

```ts
import { Namefully } from 'namefully';

const name = new Namefully(
  { firstName: 'John', lastName: 'Smith', suffix: 'Ph.D' },
  { ending: true },
);

name.full;   // 'John Smith, Ph.D'
name.suffix; // 'Ph.D'
```

Off, you get `John Smith Ph.D`. On, you get the comma. It is a small thing and it lives here.

---

## `bypass`

**Type:** `boolean` &middot; **Default:** `true`

Skip the built-in validators. The defaults are designed to **let things through** rather than reject them — names are unruly and your data is probably weirder than your test fixtures.

Turn it off when you want strict input checking:

```ts
import { Namefully } from 'namefully';

const name = new Namefully(
  {
    firstName: 'John',
    lastName: 'Smith',
    suffix: 'M.Sc.', // would fail the validator rule
  },
  { bypass: false, ending: true },
);
// throws a ValidationError
```

The validators check things like supported writing systems, allowed characters in prefixes and suffixes, and minimum length. With `bypass: true` (the default) you can shove almost anything through; with `bypass: false` you get the safety rails. There is no middle setting — it's all or nothing.

---

## `surname`

**Type:** `Surname` &middot; **Default:** `Surname.FATHER`

How to render a compound (Hispanic-style) surname when one is supplied.

The four options:

| Value | Renders as |
| --- | --- |
| `Surname.FATHER` | father's surname only (`Doe`) |
| `Surname.MOTHER` | mother's surname only (`Smith`) |
| `Surname.HYPHENATED` | both joined with `-` (`Doe-Smith`) |
| `Surname.ALL` | both joined with space (`Doe Smith`) |

```ts
import { FirstName, LastName, Namefully, Surname } from 'namefully';

const name = new Namefully(
  [new FirstName('John'), new LastName('Doe', 'Smith')],
  { surname: Surname.HYPHENATED },
);

name.full; // 'John Doe-Smith'
```

This option only matters when the `LastName` has both a father and a mother set. If the surname is just `'Doe'`, the choice is invisible.

You can also pass `Surname.*` directly to a `LastName` constructor; the value set on `Config` wins if both are present.

---

## `mono`

**Type:** `boolean | Namon` &middot; **Default:** `false`

Allow a single-token mononym (`Plato`, `Madonna`) through. Without this flag, `Namefully` throws on one-word inputs.

```ts
import { Namefully, Namon } from 'namefully';

const a = new Namefully('Plato', { mono: true });
a.full;       // 'Plato'
a.initials(); // ['P']

// Or be explicit about which slot the single token represents:
const b = new Namefully('Cher', { mono: Namon.LAST_NAME });
b.last; // 'Cher'
```

A note from the library: this option goes against the original design philosophy a little. `Namefully` is built around shaping _multiple_ components, and a one-token name leaves the API semantically thin — `short` and `public` collapse to the same string, `salutation` needs help, `format('f m l')` is mostly placeholders. It's available because enough people asked, but if you find yourself relying on it heavily, [`NameBuilder`](./creating/name-builder.md) may give you a cleaner construction path.

This option is **v2-only**. v1.3.1 cannot represent mononyms — see [Migrating from v1](./migrating-from-v1.md).

---

## The `name` option (config naming)

There's also an eighth knob — `name` — that you'll see in the type but rarely set. It's the **name of the configuration**, not the person.

```ts
new Namefully('Jane Smith', { name: 'us-payroll', title: Title.US });
```

`Config` is a [multiton](./concepts/immutability-config.md#config-is-multiton); each named config is independent. Passing no `name` gets you the `default` config; passing options without a name forks off an anonymous one. You only need to set this explicitly if you're maintaining several distinct configurations in the same process and want them clearly separable.
