import classNames from 'classnames'
import BoxProvider from './box-context'
import CodeBox from './code-box'
import Header from './components/header'
import type { IPlayground } from './types'
import useStyle from './style'

const Playground: React.FC<IPlayground> = (props) => {
  const { saveOnUrl, showHeader = true, className, style, ...rest } = props

  const styles = useStyle()

  const rootClassName = classNames(styles.playground, className)

  return (
    <BoxProvider saveOnUrl={saveOnUrl}>
      <div style={style} className={rootClassName}>
        {showHeader && <Header />}
        <CodeBox {...rest} />
      </div>
    </BoxProvider>
  )
}

export default Playground

export { Playground }

export { utoa, flattenObject } from '@/utils/transform'

export { default as OutPut } from '@/playground/components/output'