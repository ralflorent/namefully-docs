---
id: use-cases
sidebar_label: Use Cases
title: Use Cases
---

## Name cases

Considering the diverse ways of instantiating `Namefully`, I use the following
name cases to evaluate many use cases:

```ts
import {
    Config,
    Nama,
    Name,
    Firstname,
    Lastname,
    Separator,
    Namon
} from 'namefully'

export interface NameCase {
    raw: string | string[] | Name[] | Nama
    options: Partial<Config>
}

export const NAMECASES: NameCase[] = [
    {
        raw: 'Keira Knightley',
        options: {},
    },
    {
        raw: ['George', 'Walker', 'Bush'],
        options: {},
    },
    {
        raw: [
            new Firstname('Emilia'),
            new Name('Isobel', Namon.MIDDLE_NAME),
            new Name('Euphemia', Namon.MIDDLE_NAME),
            new Name('Rose', Namon.MIDDLE_NAME),
            new Lastname('Clarke')
        ],
        options: {}
    },
    {
        raw: [
            new Firstname('Daniel', ['Michael', 'Blake']),
            new Lastname('Day-Lewis')
        ],
        options: {}
    },
    {
        raw: 'Obama Barack',
        options: {  orderedBy: 'lastname' }
    },
    {
        raw: { prefix: 'Dr', firstname: 'Albert', lastname: 'Einstein' },
        options: { titling: 'us' }
    },
    {
        raw: { firstname: 'Fabrice', lastname: 'Piazza', suffix: 'PhD' },
        options: { ending: Separator.COMMA }
    },
    {
        raw: [
            new Firstname('Shakira', ['Isabel']),
            new Lastname('Mebarak', 'Ripoll')
        ],
        options: { lastnameFormat: 'mother' }
    },
    {
        raw: {
            prefix: 'Mme',
            firstname: 'Marine',
            lastname: 'Le Pen',
            suffix: 'M.Sc.'
        },
        options: { bypass: true, ending: Separator.COMMA, titling: 'us' }
    },
]
```

Run the following command:

```bash
npm run usecases
```

Or

```bash
npm run uc
```

## Outputs

```text
+==============================================================================+
| USE CASE: Describe the full name                                             |
+==============================================================================+
Descriptive statistics for "Keira Knightley"
count    : 14
frequency: 2
top      : I
unique   : 11
----------------------------------------------------------------------------
Descriptive statistics for "George Walker Bush"
count    : 16
frequency: 3
top      : E
unique   : 12
----------------------------------------------------------------------------
Descriptive statistics for "Emilia Isobel Euphemia Rose Clarke"
count    : 30
frequency: 6
top      : E
unique   : 14
----------------------------------------------------------------------------
Descriptive statistics for "Daniel Day-Lewis"
count    : 15
frequency: 2
top      : L
unique   : 10
----------------------------------------------------------------------------
Descriptive statistics for "Obama Barack "
count    : 11
frequency: 4
top      : A
unique   : 7
----------------------------------------------------------------------------
Descriptive statistics for "Dr. Albert Einstein"
count    : 17
frequency: 3
top      : E
unique   : 11
----------------------------------------------------------------------------
Descriptive statistics for "Fabrice Piazza, PhD"
count    : 17
frequency: 3
top      : A
unique   : 12
----------------------------------------------------------------------------
Descriptive statistics for "Shakira Ripoll"
count    : 13
frequency: 2
top      : L
unique   : 9
----------------------------------------------------------------------------
Descriptive statistics for "Mme. Marine Le Pen, M.Sc."
count    : 21
frequency: 4
top      : E
unique   : 12
----------------------------------------------------------------------------

+==============================================================================+
| USE CASE: Describe the first name                                            |
+==============================================================================+
Descriptive statistics for "Keira Knightley"
count    : 14
frequency: 2
top      : I
unique   : 11
----------------------------------------------------------------------------
Descriptive statistics for "George Walker Bush"
count    : 16
frequency: 3
top      : E
unique   : 12
----------------------------------------------------------------------------
Descriptive statistics for "Emilia Isobel Euphemia Rose Clarke"
count    : 30
frequency: 6
top      : E
unique   : 14
----------------------------------------------------------------------------
Descriptive statistics for "Daniel Day-Lewis"
count    : 15
frequency: 2
top      : L
unique   : 10
----------------------------------------------------------------------------
Descriptive statistics for "Obama Barack "
count    : 11
frequency: 4
top      : A
unique   : 7
----------------------------------------------------------------------------
Descriptive statistics for "Dr. Albert Einstein"
count    : 17
frequency: 3
top      : E
unique   : 11
----------------------------------------------------------------------------
Descriptive statistics for "Fabrice Piazza, PhD"
count    : 17
frequency: 3
top      : A
unique   : 12
----------------------------------------------------------------------------
Descriptive statistics for "Shakira Ripoll"
count    : 13
frequency: 2
top      : L
unique   : 9
----------------------------------------------------------------------------
Descriptive statistics for "Mme. Marine Le Pen, M.Sc."
count    : 21
frequency: 4
top      : E
unique   : 12
----------------------------------------------------------------------------

+==============================================================================+
| USE CASE: Describe the middle name                                             |
+==============================================================================+
Descriptive statistics for "Keira Knightley"
count    : 14
frequency: 2
top      : I
unique   : 11
----------------------------------------------------------------------------
Descriptive statistics for "George Walker Bush"
count    : 16
frequency: 3
top      : E
unique   : 12
----------------------------------------------------------------------------
Descriptive statistics for "Emilia Isobel Euphemia Rose Clarke"
count    : 30
frequency: 6
top      : E
unique   : 14
----------------------------------------------------------------------------
Descriptive statistics for "Daniel Day-Lewis"
count    : 15
frequency: 2
top      : L
unique   : 10
----------------------------------------------------------------------------
Descriptive statistics for "Obama Barack "
count    : 11
frequency: 4
top      : A
unique   : 7
----------------------------------------------------------------------------
Descriptive statistics for "Dr. Albert Einstein"
count    : 17
frequency: 3
top      : E
unique   : 11
----------------------------------------------------------------------------
Descriptive statistics for "Fabrice Piazza, PhD"
count    : 17
frequency: 3
top      : A
unique   : 12
----------------------------------------------------------------------------
Descriptive statistics for "Shakira Ripoll"
count    : 13
frequency: 2
top      : L
unique   : 9
----------------------------------------------------------------------------
Descriptive statistics for "Mme. Marine Le Pen, M.Sc."
count    : 21
frequency: 4
top      : E
unique   : 12
----------------------------------------------------------------------------

+==============================================================================+
| USE CASE: Describe the last name                                             |
+==============================================================================+
Descriptive statistics for "Keira Knightley"
count    : 14
frequency: 2
top      : I
unique   : 11
----------------------------------------------------------------------------
Descriptive statistics for "George Walker Bush"
count    : 16
frequency: 3
top      : E
unique   : 12
----------------------------------------------------------------------------
Descriptive statistics for "Emilia Isobel Euphemia Rose Clarke"
count    : 30
frequency: 6
top      : E
unique   : 14
----------------------------------------------------------------------------
Descriptive statistics for "Daniel Day-Lewis"
count    : 15
frequency: 2
top      : L
unique   : 10
----------------------------------------------------------------------------
Descriptive statistics for "Obama Barack "
count    : 11
frequency: 4
top      : A
unique   : 7
----------------------------------------------------------------------------
Descriptive statistics for "Dr. Albert Einstein"
count    : 17
frequency: 3
top      : E
unique   : 11
----------------------------------------------------------------------------
Descriptive statistics for "Fabrice Piazza, PhD"
count    : 17
frequency: 3
top      : A
unique   : 12
----------------------------------------------------------------------------
Descriptive statistics for "Shakira Ripoll"
count    : 13
frequency: 2
top      : L
unique   : 9
----------------------------------------------------------------------------
Descriptive statistics for "Mme. Marine Le Pen, M.Sc."
count    : 21
frequency: 4
top      : E
unique   : 12
----------------------------------------------------------------------------

+==============================================================================+
| USE CASE: shorten the full name                                              |
+==============================================================================+
full name       : Keira Knightley
typical name    : Keira Knightley
----------------------------------------------------------------------------
full name       : George Walker Bush
typical name    : George Bush
----------------------------------------------------------------------------
full name       : Emilia Isobel Euphemia Rose Clarke
typical name    : Emilia Clarke
----------------------------------------------------------------------------
full name       : Daniel Day-Lewis
typical name    : Daniel Day-Lewis
----------------------------------------------------------------------------
full name       : Obama Barack
typical name    : Obama Barack
----------------------------------------------------------------------------
full name       : Dr. Albert Einstein
typical name    : Albert Einstein
----------------------------------------------------------------------------
full name       : Fabrice Piazza, PhD
typical name    : Fabrice Piazza
----------------------------------------------------------------------------
full name       : Shakira Ripoll
typical name    : Shakira Mebarak
----------------------------------------------------------------------------
full name       : Mme. Marine Le Pen, M.Sc.
typical name    : Marine Le Pen
----------------------------------------------------------------------------

The compressed name <E Isobel Euphemia Rose Clarke> still surpasses the set limit 20
The compressed name <Emilia Isobel Euphemia Rose C> still surpasses the set limit 20
+==============================================================================+
| USE CASE: compress the full name using different variants                    |
+==============================================================================+
full name    : Keira Knightley
by default   : Keira Knightley
by limit 20  : Keira Knightley
by firstname : Keira Knightley
by lastname  : Keira Knightley
by middlename: Keira Knightley
by firstmid  : Keira Knightley
by midlast   : Keira Knightley
----------------------------------------------------------------------------
full name    : George Walker Bush
by default   : George Walker Bush
by limit 20  : George Walker Bush
by firstname : George Walker Bush
by lastname  : George Walker Bush
by middlename: George Walker Bush
by firstmid  : George Walker Bush
by midlast   : George Walker Bush
----------------------------------------------------------------------------
full name    : Emilia Isobel Euphemia Rose Clarke
by default   : Emilia IER Clarke
by limit 20  : Emilia IER Clarke
by firstname : E Isobel Euphemia Rose Clarke
by lastname  : Emilia Isobel Euphemia Rose C
by middlename: Emilia IER Clarke
by firstmid  : E IER Clarke
by midlast   : Emilia IER C
----------------------------------------------------------------------------
full name    : Daniel Day-Lewis
by default   : Daniel Day-Lewis
by limit 20  : Daniel Day-Lewis
by firstname : Daniel Day-Lewis
by lastname  : Daniel Day-Lewis
by middlename: Daniel Day-Lewis
by firstmid  : Daniel Day-Lewis
by midlast   : Daniel Day-Lewis
----------------------------------------------------------------------------
full name    : Obama Barack
by default   : Obama Barack
by limit 20  : Obama Barack
by firstname : Obama Barack
by lastname  : Obama Barack
by middlename: Obama Barack
by firstmid  : Obama Barack
by midlast   : Obama Barack
----------------------------------------------------------------------------
full name    : Dr. Albert Einstein
by default   : Dr. Albert Einstein
by limit 20  : Dr. Albert Einstein
by firstname : Dr. Albert Einstein
by lastname  : Dr. Albert Einstein
by middlename: Dr. Albert Einstein
by firstmid  : Dr. Albert Einstein
by midlast   : Dr. Albert Einstein
----------------------------------------------------------------------------
full name    : Fabrice Piazza, PhD
by default   : Fabrice Piazza, PhD
by limit 20  : Fabrice Piazza, PhD
by firstname : Fabrice Piazza, PhD
by lastname  : Fabrice Piazza, PhD
by middlename: Fabrice Piazza, PhD
by firstmid  : Fabrice Piazza, PhD
by midlast   : Fabrice Piazza, PhD
----------------------------------------------------------------------------
full name    : Shakira Ripoll
by default   : Shakira Ripoll
by limit 20  : Shakira Ripoll
by firstname : Shakira Ripoll
by lastname  : Shakira Ripoll
by middlename: Shakira Ripoll
by firstmid  : Shakira Ripoll
by midlast   : Shakira Ripoll
----------------------------------------------------------------------------
full name    : Mme. Marine Le Pen, M.Sc.
by default   : Marine Le Pen
by limit 20  : Marine Le Pen
by firstname : M. Le Pen
by lastname  : Marine L.
by middlename: Marine Le Pen
by firstmid  : M. Le Pen
by midlast   : Marine L.
----------------------------------------------------------------------------

+==============================================================================+
| USE CASE: zip the full name using different variants                    |
+==============================================================================+
full name    : Keira Knightley
by default   : Keira Knightley
by firstname : K Knightley
by lastname  : Keira K
by middlename: Keira Knightley
by firstmid  : K Knightley
by midlast   : Keira K
----------------------------------------------------------------------------
full name    : George Walker Bush
by default   : George W Bush
by firstname : G Walker Bush
by lastname  : George Walker B
by middlename: George W Bush
by firstmid  : G W Bush
by midlast   : George W B
----------------------------------------------------------------------------
full name    : Emilia Isobel Euphemia Rose Clarke
by default   : Emilia IER Clarke
by firstname : E Isobel Euphemia Rose Clarke
by lastname  : Emilia Isobel Euphemia Rose C
by middlename: Emilia IER Clarke
by firstmid  : E IER Clarke
by midlast   : Emilia IER C
----------------------------------------------------------------------------
full name    : Daniel Day-Lewis
by default   : Daniel Day-Lewis
by firstname : D Day-Lewis
by lastname  : Daniel D
by middlename: Daniel Day-Lewis
by firstmid  : D Day-Lewis
by midlast   : Daniel D
----------------------------------------------------------------------------
full name    : Obama Barack
by default   : Obama Barack
by firstname : Obama B
by lastname  : O Barack
by middlename: Obama Barack
by firstmid  : Obama B
by midlast   : O Barack
----------------------------------------------------------------------------
full name    : Dr. Albert Einstein
by default   : Albert Einstein
by firstname : A. Einstein
by lastname  : Albert E.
by middlename: Albert Einstein
by firstmid  : A. Einstein
by midlast   : Albert E.
----------------------------------------------------------------------------
full name    : Fabrice Piazza, PhD
by default   : Fabrice Piazza
by firstname : F Piazza
by lastname  : Fabrice P
by middlename: Fabrice Piazza
by firstmid  : F Piazza
by midlast   : Fabrice P
----------------------------------------------------------------------------
full name    : Shakira Ripoll
by default   : Shakira Ripoll
by firstname : S Ripoll
by lastname  : Shakira R
by middlename: Shakira Ripoll
by firstmid  : S Ripoll
by midlast   : Shakira R
----------------------------------------------------------------------------
full name    : Mme. Marine Le Pen, M.Sc.
by default   : Marine Le Pen
by firstname : M. Le Pen
by lastname  : Marine L.
by middlename: Marine Le Pen
by firstmid  : M. Le Pen
by midlast   : Marine L.
----------------------------------------------------------------------------

+==============================================================================+
| USE CASE: format the name as desired                                         |
+==============================================================================+
full name     : Keira Knightley
by default    : Keira Knightley
[fn] [ln]     : Keira Knightley
[LN], [fn]    : KNIGHTLEY, Keira
[ln]_[mn]_[fn]: Keira__Knightley
[LN]-[MN] [FN]: KEIRA- KNIGHTLEY
----------------------------------------------------------------------------
full name     : George Walker Bush
by default    : George Walker Bush
[fn] [ln]     : George Bush
[LN], [fn]    : BUSH, George
[ln]_[mn]_[fn]: George_Walker_Bush
[LN]-[MN] [FN]: GEORGE-WALKER BUSH
----------------------------------------------------------------------------
full name     : Emilia Isobel Euphemia Rose Clarke
by default    : Emilia Isobel Euphemia Rose Clarke
[fn] [ln]     : Emilia Clarke
[LN], [fn]    : CLARKE, Emilia
[ln]_[mn]_[fn]: Emilia_Isobel Euphemia Rose_Clarke
[LN]-[MN] [FN]: EMILIA-ISOBEL EUPHEMIA ROSE CLARKE
----------------------------------------------------------------------------
full name     : Daniel Day-Lewis
by default    : Daniel Day-Lewis
[fn] [ln]     : Daniel Day-Lewis
[LN], [fn]    : DAY-LEWIS, Daniel
[ln]_[mn]_[fn]: Daniel__Day-Lewis
[LN]-[MN] [FN]: DANIEL- DAY-LEWIS
----------------------------------------------------------------------------
full name     : Obama Barack
by default    : Obama Barack
[fn] [ln]     : Barack Obama
[LN], [fn]    : OBAMA, Barack
[ln]_[mn]_[fn]: Barack__Obama
[LN]-[MN] [FN]: BARACK- OBAMA
----------------------------------------------------------------------------
full name     : Dr. Albert Einstein
by default    : Dr. Albert Einstein
[fn] [ln]     : Albert Einstein
[LN], [fn]    : EINSTEIN, Albert
[ln]_[mn]_[fn]: Albert__Einstein
[LN]-[MN] [FN]: ALBERT- EINSTEIN
----------------------------------------------------------------------------
full name     : Fabrice Piazza, PhD
by default    : Fabrice Piazza, PhD
[fn] [ln]     : Fabrice Piazza
[LN], [fn]    : PIAZZA, Fabrice
[ln]_[mn]_[fn]: Fabrice__Piazza
[LN]-[MN] [FN]: FABRICE- PIAZZA
----------------------------------------------------------------------------
full name     : Shakira Ripoll
by default    : Shakira Ripoll
[fn] [ln]     : Shakira Mebarak
[LN], [fn]    : MEBARAK, Shakira
[ln]_[mn]_[fn]: Shakira__Mebarak
[LN]-[MN] [FN]: SHAKIRA- MEBARAK
----------------------------------------------------------------------------
full name     : Mme. Marine Le Pen, M.Sc.
by default    : Mme. Marine Le Pen, M.Sc.
[fn] [ln]     : Marine Le Pen
[LN], [fn]    : LE PEN, Marine
[ln]_[mn]_[fn]: Marine__Le Pen
[LN]-[MN] [FN]: MARINE- LE PEN
----------------------------------------------------------------------------
```

[Back to Top](#name-cases)
