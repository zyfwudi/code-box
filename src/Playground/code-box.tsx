import { useContext, useEffect } from 'react';
import { setToken } from 'shineout';
import { useMount } from '@shined/react-use';
import type { ICodeBox } from './types'
import useStyles from './style';
import { BoxContext } from './box-context';
import { MAIN_FILE_NAME } from './files';
import SplitPane from './components/split-pane';
import EditorContainer from './components/editor-container';
import Output from './components/output'
import { getCustomActiveFile, getMergedCustomFiles } from './utils';

const CodeBox = (props: ICodeBox) => {
  const { files: filesProps, importMap, style, importUrl, onFilesChange } = props

  const styles = useStyles()

  const { filesHash, setFiles, setSelectedFileName } = useContext(BoxContext)

  useEffect(() => {
    if (filesProps && !filesProps?.[MAIN_FILE_NAME]) {
      throw new Error(
        `Missing required property : '${MAIN_FILE_NAME}' is a mandatory property for 'files'`,
      );
    } else if (filesProps) {
      const newFiles = getMergedCustomFiles(filesProps, importMap)

      if (newFiles) setFiles(newFiles)
      
      const selectedFileName = getCustomActiveFile(filesProps)
      
      if (selectedFileName) setSelectedFileName(selectedFileName)    
    }
  }, [filesProps])

  // useMount(() => {
  //   if (!filesProps) setFiles(initFiles)
  // })

  useEffect(() => {
    onFilesChange?.(filesHash)
  }, [filesHash])

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
        <Output importUrl={importUrl} />
      </SplitPane>
    </div>
  )
}

export default CodeBox;