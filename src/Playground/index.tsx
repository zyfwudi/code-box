import BoxProvider from './box-context'
import CodeBox from './code-box'
import Header from './components/header'
import type { IPlayground } from './types'

const Playground: React.FC<IPlayground> = (props) => (
  <BoxProvider>
    <Header />
    <CodeBox {...props} style={{ height: 'calc(100vh - 37px)' }} />
  </BoxProvider>
)

export default Playground
export { Playground }