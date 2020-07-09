---
id: react
sidebar_label: React
title: React-based Package
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Overview

If you are developing an application using the [React](https://reactjs.org)
library and want to use `namefully`, you may want to download this package directly
instead. Why? Because this package already wraps up for you what you might need
from it.

The `@namefully/react` package relies on the `namefully` core package as a
**peerDependency**. Likewise, it assumes also that `React/ReactDOM` are also
installed and ready to be exploited. If you are doubtful about it, you may want
to [try it live](https://stackblitz.com/edit/namefully-react).

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
npm i @namefully/react
```

</TabItem>
<TabItem value="yarn"
>

```sh
yarn add @namefully/react
```

</TabItem>
</Tabs>

## Usage

Import the `Namefully` React component, then use it wisely.

**Example:**

```tsx
import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { Namefully } from '@namefully/react';

const App = () => {
    return (
        <h1>
            Hello, <Namefully raw='Bruce Wayne'/>!
        </h1>
    )
};

ReactDOM.render(<App />, document.getElementById('example'));
```

## Demo

The [GitHub repository](https://github.com/ralflorent/namefully-react) contains a
demo that helps you appreciate `namefully` visually. Access the repo and do the
following:

- clone or download a copy of the repository.
- install the dependencies `npm install` or `yarn`
- finally, run `npm start` or `yarn start`

The last command will bootstrap the demo while running a local web server. Use
your browser and type the following web address `localhost:3000` to load the
content.

## API

As this is a wrapper of the core utility, visit the [API](api) to recall how
to take advantage of its cool features/functionalities.

[Back to Top](#overview)
