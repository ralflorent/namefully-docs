import React from "react";
import CodeBlock from '@theme/CodeBlock';

export const EasyInstantiation = () =>
<CodeBlock className="language-typescript">{
`import {
    Namefully,
    Firstname, Lastname, FullnameBuilder
} from 'namefully'

const fromString = new Namefully('Jane Doe')
const fromArray = new Namefully([ 'Jane', 'Doe' ])
const fromJSON = new Namefully({
    firstname: 'Jane',
    lastname: 'Doe'
})
const fromName = new Namefully([
    new Firstname('Jane'),
    new Lastname('Doe')
])
const fromBuilder = new Namefully(
    new FullnameBuilder()
        .firstname('Jane')
        .lastname('Doe')
        .build()
)`}
</CodeBlock>


export const FullControl = () =>
<CodeBlock className="language-typescript">{
`import { Namefully, Separator } from 'namefully'

const name = new Namefully(
    'Lic, De La Cruz, Rosanna, María',
    {
        orderedBy: 'lastname',
        separator: Separator.COMMA,
        titling: 'us',
        bypass: true
    }
)
name.fn() // Rosanna
name.mn() // María
name.ln() // De La Cruz
name.full() // Lic. De La Cruz Rosanna María
name.format('f L') //Rosanna DE LA CRUZ
name.zip('firstmid') // De La Cruz R. M.`}
</CodeBlock>

export const DoItYourself = () =>
<CodeBlock className="language-typescript">{
`import {
    Namefully, Firstname, Lastname,
    Parser
} from 'namefully'

class MyParser implements Parser<string> {
    constructor(public raw: string) {}
    parse() {
        const [fn, ln] = this.raw.split('#')
        return {
            firstname: new Firstname(fn.trim()),
            lastname: new Lastname(ln.trim()),
        }
    }
}
const name = new Namefully(null, {
    parser: new MyParser('John # Smith')
})
name.to('dot') // john.smith`}
</CodeBlock>