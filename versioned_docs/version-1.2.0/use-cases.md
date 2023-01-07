---
id: use-cases
sidebar_label: Test Cases
title: Test Cases
---

Below are some test cases describing the diverse ways to instantiate `Namefully`.

```ts
import { Namefully, NameError } from 'namefully'

describe('Namefully can be instantiated with', () => {
    test('string', () => {
        expect(new Namefully('John Smith').toString()).toBe('John Smith')
    })

    test('string[]', () => {
        expect(new Namefully(['John', 'Smith']).toString()).toBe('John Smith')
    })

    test('json', () => {
        expect(new Namefully({ firstName: 'John', lastName: 'Smith' }).toString()).toBe('John Smith')
    })

    test('Name[]', () => {
        const names = [new FirstName('John'), new LastName('Smith')]
        expect(new Namefully(names).toString()).toBe('John Smith')
        expect(new Namefully([Name.first('John'), Name.last('Smith'), Name.suffix('Ph.D')]).birth).toBe(
            'John Smith',
        )
    })

    test('Parser<T> (Custom Parser)', () => {
        expect(new Namefully(new SimpleParser('John#Smith'), Config.create('simpleParser')).toString()).toBe(
            'John Smith',
        )
    })

    test('tryParse()', () => {
        let parsed = Namefully.tryParse('John Smith')
        expect(parsed).toBeDefined()
        expect(parsed?.short).toBe('John Smith')
        expect(parsed?.first).toBe('John')
        expect(parsed?.last).toBe('Smith')
        expect(parsed?.middle).toBeUndefined()

        parsed = Namefully.tryParse('John Ben Smith')
        expect(parsed).toBeDefined()
        expect(parsed?.short).toBe('John Smith')
        expect(parsed?.first).toBe('John')
        expect(parsed?.last).toBe('Smith')
        expect(parsed?.middle).toBe('Ben')

        parsed = Namefully.tryParse('John Some Other Name Parts Smith')
        expect(parsed).toBeDefined()
        expect(parsed?.short).toBe('John Smith')
        expect(parsed?.first).toBe('John')
        expect(parsed?.last).toBe('Smith')
        expect(parsed?.middle).toBe('Some')
        expect(parsed?.middleName().join(' ')).toBe('Some Other Name Parts')

        expect(Namefully.tryParse('John')).toBeUndefined()
    })

    test('parse()', async () => {
        let parsed = await Namefully.parse('John Smith')
        expect(parsed.short).toBe('John Smith')
        expect(parsed.first).toBe('John')
        expect(parsed.last).toBe('Smith')
        expect(parsed.middle).toBeUndefined()

        parsed = await Namefully.parse('John Ben Smith')
        expect(parsed.short).toBe('John Smith')
        expect(parsed.first).toBe('John')
        expect(parsed.last).toBe('Smith')
        expect(parsed.middle).toBe('Ben')

        parsed = await Namefully.parse('John Some Other Name Parts Smith')
        expect(parsed).toBeDefined()
        expect(parsed.short).toBe('John Smith')
        expect(parsed.first).toBe('John')
        expect(parsed.last).toBe('Smith')
        expect(parsed.middle).toBe('Some')
        expect(parsed.middleName().join(' ')).toBe('Some Other Name Parts')

        await expect(Namefully.parse('John')).rejects.toThrow(NameError)
    })
})
```

Below are described more test cases on possible name cases the utility supports.

```ts
import {
    Config,
    FullName,
    FirstName,
    LastName,
    JsonName,
    Name,
    Namefully,
    NameOrder,
    Parser,
    Separator,
    Surname,
    Title,
} from 'namefully'

class SimpleParser extends Parser<string> {
    parse(options: Partial<Config>): FullName {
        const [firstName, lastName] = this.raw.split('#')
        return FullName.parse({ firstName, lastName }, Config.merge(options))
    }
}

function findNameCase(name: string): Namefully {
    const nameCase = NAME_CASES[name]
    return new Namefully(nameCase.name, nameCase.options)
}

interface NameCase {
    name: string | string[] | Name[] | JsonName
    options: Partial<Config>
}

const NAME_CASES: { [key: string]: NameCase } = {
    simpleName: { name: 'John Smith', options: Config.create('simpleName') },
    byLastName: { name: 'Obama Barack', options: Config.merge({ name: 'byLastName', orderedBy: NameOrder.LAST_NAME }) },
    manyFirstNames: {
        name: [new FirstName('Daniel', 'Michael', 'Blake'), new LastName('Day-Lewis')],
        options: Config.create('manyFirstNames'),
    },
    manyMiddleNames: {
        name: [
            new FirstName('Emilia'),
            Name.middle('Isobel'),
            Name.middle('Euphemia'),
            Name.middle('Rose'),
            new LastName('Clarke'),
        ],
        options: Config.create('manyMiddleNames'),
    },
    manyLastNames: {
        name: [new FirstName('Shakira', 'Isabel'), new LastName('Mebarak', 'Ripoll')],
        options: Config.merge({ name: 'manyLastNames', surname: Surname.MOTHER }),
    },
    withTitle: {
        name: { prefix: 'Dr', firstName: 'Albert', lastName: 'Einstein' },
        options: Config.merge({ name: 'withTitle', title: Title.US }),
    },
    withEnding: {
        name: { firstName: 'Fabrice', lastName: 'Piazza', suffix: 'Ph.D' },
        options: Config.merge({ name: 'withEnding', ending: true }),
    },
    withSeparator: {
        name: 'Thiago, Da Silva',
        options: Config.merge({ name: 'withSeparator', separator: Separator.COMMA }),
    },
    noBypass: {
        name: {
            prefix: 'Mme',
            firstName: 'Marine',
            lastName: 'Le Pen',
            suffix: 'M.Sc.',
        },
        options: Config.merge({
            name: 'noBypass',
            bypass: false,
            ending: true,
            title: Title.US,
        }),
    },
}

describe('Namefully can be built with a name', () => {
    test('ordered by lastName', () => {
        const name = findNameCase('byLastName')
        expect(name.toString()).toBe('Obama Barack')
        expect(name.firstName()).toBe('Barack')
        expect(name.lastName()).toBe('Obama')
    })

    test('containing many first names', () => {
        const name = findNameCase('manyFirstNames')
        expect(name.toString()).toBe('Daniel Michael Blake Day-Lewis')
        expect(name.firstName(false)).toBe('Daniel')
        expect(name.firstName()).toBe('Daniel Michael Blake')
        expect(name.hasMiddle).toBe(false)
    })

    test('containing many middle names', () => {
        const name = findNameCase('manyMiddleNames')
        expect(name.toString()).toBe('Emilia Isobel Euphemia Rose Clarke')
        expect(name.hasMiddle).toBe(true)
        expect(name.middleName()).toStrictEqual(['Isobel', 'Euphemia', 'Rose'])
    })

    test('containing many last names', () => {
        const name = findNameCase('manyLastNames')
        expect(name.toString()).toBe('Shakira Isabel Ripoll')
        expect(name.lastName()).toBe('Ripoll')
        expect(name.lastName(Surname.ALL)).toBe('Mebarak Ripoll')
    })

    test('containing a US title', () => {
        const name = findNameCase('withTitle')
        expect(name.toString()).toBe('Dr. Albert Einstein')
        expect(name.prefix).toBe('Dr.')
    })

    test('separated by commas', () => {
        const name = findNameCase('withSeparator')
        expect(name.toString()).toBe('Thiago Da Silva')
        expect(name.lastName()).toBe('Da Silva')
    })

    test('containing a suffix', () => {
        const name = findNameCase('withEnding')
        expect(name.toString()).toBe('Fabrice Piazza, Ph.D')
        expect(name.birthName()).toBe('Fabrice Piazza')
        expect(name.suffix).toBe('Ph.D')
    })

    test('with validation rules', () => {
        expect(() => findNameCase('noBypass')).toThrow(NameError)
        expect(() => new Namefully('Mr John Joe Sm1th', Config.create('noBypass'))).toThrow(NameError)
        expect(() => new Namefully('Mr John Joe Smith Ph+', Config.create('noBypass'))).toThrow(NameError)
    })
})
```
