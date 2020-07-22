---
id: angular
sidebar_label: Angular
title: Angular-based Package
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Overview

If you are developing an application using the [Angular](https://angular.io)
framework and want to use `namefully`, you may want to download this package directly
instead. Why? Because this package already wraps up for you what you might need
to stay in the Angular semantics.

The `@namefully/ng` package uses the `namefully` core package as a **peerDependency**.
Likewise, it assumes also that `@angular/core` is also installed and ready to be
exploited.

If you are doubtful about using `@namefully/ng`, you may want to
[try it live](https://stackblitz.com/edit/namefully-ng) first.

## Installation

<Tabs
defaultValue="npm"
values={[
{ label: 'npm', value: 'npm', },
{ label: 'Yarn', value: 'yarn', },
]
}>
<TabItem
    value="npm">

```sh
npm i @namefully/ng
```

</TabItem>
<TabItem value="yarn"
>

```sh
yarn add @namefully/ng
```

</TabItem>
</Tabs>

## Usage

Once you import the `NamefullyModule` module, you automatically have access to:

- **Component**: `<ngx-namefully ...></ngx-namefully>`
- **Service**: `NamefullyService`
- **Directive**: `ngxNamefully`
- **Pipe**: `| namefully`

**Example:**

```ts
import { Component, NgModule, OnInit } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

import { NamefullyModule, NamefullyService } from '@namefully/ng'
import { Namefully } from 'namefully'

@Component({
    selector: 'app-root',
    template: `
        <h1> How to use @namefully/ng </h1>
        <p>
            Using component: Hello,
            <ngx-namefully
                [raw]="name"
                [options]="{ orderedBy: 'ln' }"
                [method]="'shorten'"
                >!
            </ngx-namefully>!
        </p>
        <p>Using pipe: Hello,
            {{ name | namefully : { orderedBy:'ln' } : 'shorten' }}!
        </p>
        <p>Using service: Hello, {{ superName.shorten() }}!</p>
        <p>Using directive: Hello,
            <span
                [ngxNamefully]="name"
                [nfOptions]="{ orderedBy: 'ln' }"
                nfMethod="shorten"
            >
            </span>!
        </p>
    `
})
class AppComponent implements OnInit {
    name: string
    superName: Namefully

    constructor(private service: NamefullyService) {}

    ngOnInit(): void {
        this.name = 'Mr Smith John Joe PhD'
        this.superName = this.service.build(
            this.name,
            /* override forRoot config here if you want */
        )
    }
}

@NgModule({
    imports: [
        BrowserModule,
        NamefullyModule.forRoot({ orderedBy: 'lastname' })
    ],
    declarations: [AppComponent],
    bootstrap: [AppComponent]
})
export class AppModule {}
```

## Demo

The [GitHub repository](https://github.com/ralflorent/namefully-ng) contains a
demo that helps you appreciate `namefully` visually. Access the repo and do the
following:

- clone or download a copy of the repository.
- install the dependencies `npm install` or `yarn`
- finally, run `npm start` or `yarn start`

The last command will bootstrap the demo while running a local web server. Use
your browser and type the following web address `localhost:4200` to load the
content.

## API

As this is a wrapper of the core utility, visit the [API](api-quick-reference) to recall how
to take advantage of its cool features/functionalities.

[Back to Top](#overview)
