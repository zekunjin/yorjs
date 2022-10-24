# Yorjs

[![NPM version](https://img.shields.io/npm/v/@yorjs/core)](https://www.npmjs.com/package/@yorjs/core)

A DI framework for frontend.

## Installation

import package

```
# use npm
npm install @yorjs/core

# use pnpm
pnpm add @yorjs/core
```

import module

```
import { } from '@yorjs/core'
```

## Usage

### `defineProvider`

Define a injectable module.

#### Basic Usage

```
import { defineInterface, defineProvider } from '@yorjs/core'

const IP = defineInterface<{
  do: () => string
}>()

const provider = defineProvider().implements(IP).build(() => ({
  do() {
    return 'DONE'
  }
}))
```

### `defineController`

Define a controller for view.

#### Basic Usage

```
import { defineInterface, defineController } from '@yorjs/core'

const IC = defineInterface<{
  message: string
  doSth: () => void
}>()

const controller = defineController().implements(IC).inject(IP).build((p) => {
  const msg = ''

  const doSth = () => {
    return p.do()
  }

  return {
    msg,
    doSth
  }
})
```

### `defineModule`

Define a module for controller dependencies relationship.

#### Basic Usage

```
import { defineModule } from '@yorjs/core'

const module = defineModule({
  controller: controller,
  providers: [provider]
})
```

### `useModule`

Use a module implement in view.

#### Basic Usage

```
import { useModule } from '@yorjs/core'

const { message } = useModule(module)
```

### `defineGuard`

Define a guard for a controller or provider.

Basic Usage

```
import { defineGuard } from '@yorjs/core'

export const randomGuard = defineGuard(() => {
  return Math.random() <= 0.5
}).error((context) => {
  // ...
})
```

Binding guards

```
import { providerImpl } from '../'

providerImpl.useGuards(randomGuard, otherGuard)
```

### `defineInterceptor`

Define a interceptor for a controller or provider.

Basic Usage

```
import { defineInterceptor } from '@yorjs/core'

export const loggingInterceptor = defineInterceptor((context) => {
  // before...

  return () => {
    // after...
  }
})
```

Binding interceptors

```
import { providerImpl } from '../'

providerImpl.useGuards(loggingInterceptor, otherInterceptor)
```

## License
[MIT](./LICENSE)