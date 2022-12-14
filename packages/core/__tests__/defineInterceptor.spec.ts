import { defineInterceptor, defineInterface, defineProvider, useProvider } from '../index'

describe('define interactor', () => {
  it('should log in console before and after event', async () => {
    const arr: string[] = []

    const logging = defineInterceptor(() => {
      arr.push('Before...')

      return () => {
        arr.push('After...')
      }
    })

    const IProvider = defineInterface<{
      do: () => Promise<void>
    }>()

    const provider = defineProvider().implements(IProvider).setup(() => ({
      do() {
        arr.push('Doing')

        return new Promise((resolve) => {
          setTimeout(() => {
            arr.push('Done')
            resolve()
          }, 3000)
        })
      }
    })).useInterceptors(logging)

    const events = useProvider(provider)

    await events.do()

    expect(arr.includes('Done')).toBe(true)
  })
})
