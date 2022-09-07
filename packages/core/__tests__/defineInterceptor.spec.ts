import { defineInterceptor } from '../defineInterceptor'
import { defineProvider, Provider } from '../defineProvider'
import { useProvider } from '../useProvider'

describe('define interactor', () => {
  it('should has a instance', () => {
    const logging = defineInterceptor((context: Provider<any>) => {
      console.log('Before...')
      console.log('context: ' + context)

      return () => {
        console.log('After..')
        console.log('context: ' + context)
      }
    })

    const provider = defineProvider(() => ({
      do() {
        console.log('Doing')
      }
    })).useInterceptors(logging)

    const events = useProvider(provider)

    events.do()
  })
})