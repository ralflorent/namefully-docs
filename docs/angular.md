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
instead. Why? Because this package already wraps up for you what you might
need from it.

The `@namefully/ng` package uses the `namefully` core package as a **peerDependency**.
Likewise, it assumes also that `@angular/core` is also installed and ready to be
exploited. If you are doubtful about it, you may want to
[try it live](https://stackblitz.com/edit/namefully-ng).

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

When importing the `NamefullyModule` module, you automatically have access to:

- **Component**: available via the `<ng-namefully/>` selector (HTML tag)
- **Pipe**: `namefully`

**Example:**

```ts
import { Component, NgModule, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { NamefullyModule } from '@namefully/ng';

@Component({
    selector: 'app-root',
    template: `
        <h1> Welcome to Namefully </h1>
        <a>
            <ng-namefully
                [raw]="name"
                [options]="options"
                [method]="method"
                [args]="args"
                >
            </ng-namefully>
        </a>
        <p>Hello, {{ name | namefully : options : 'fn' }}!</p>
    `
})
class AppComponent implements OnInit {
    name = 'Mr Smith John Joe PhD'
    options = { orderedBy: 'lastname' }
    method = 'shorten'
    args = ['firstname']
    ngOnInit(): void {}
}

@NgModule({
    imports: [BrowserModule, NamefullyModule],
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
