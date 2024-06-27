import { useContext, useEffect } from 'react';
import { setToken } from 'shineout';
import { useMount } from '@shined/react-use';
import type { ICodeBox } from './types'
import useStyles from './style';
import { BoxContext } from './box-context';
import { initFiles, MAIN_FILE_NAME } from './files';
import SplitPane from './components/split-pane';
import EditorContainer from './components/editor-container';
import Output from './components/output'

const CodeBox = (props: ICodeBox) => {
  const styles = useStyles()

  const { files: filesProps, style } = props

  const { filesHash, setFiles } = useContext(BoxContext)

  useEffect(() => {
    if (filesProps && !filesProps?.[MAIN_FILE_NAME]) {
      throw new Error(
        `Missing required property : '${MAIN_FILE_NAME}' is a mandatory property for 'files'`,
      );
    } else if (filesProps) {

     }
  }, [filesProps])

  // useMount(() => {
  //   if (!filesProps) setFiles(initFiles)
  // })

  useEffect(() => {}, [filesHash])

  useMount(() => {
    setToken({
      selector: '#code-box-wrapper',
      tokenName: 'data-theme'
    })
  })

  return (
    <div className={styles.wrapper} id='code-box-wrapper' style={style}>
      <SplitPane>
        <EditorContainer />
        <Output />
      </SplitPane>
    </div>
  )
}

export default CodeBox;