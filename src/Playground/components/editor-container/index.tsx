import { useContext, useMemo } from 'react'
import useStyle from './style'
import { BoxContext } from '@/playground/box-context'
import { useDebouncedFn, useStableFn } from '@shined/react-use'
import FileSelector from './file-selector'
import { Editor } from './Editor'

export interface IEditorContainer {
  showFileSelector?: boolean
}

const EditorContainer = (props: IEditorContainer) => {
  const { showFileSelector = true } = props
  const { files, selectedFileName, setFiles, setSelectedFileName } = useContext(BoxContext)

  const file = useMemo(() => files[selectedFileName], [files, selectedFileName])

  // const [error, setError] = useState<string>('')

  const styles = useStyle()

  const handleEditorChange = useDebouncedFn((value?: string) => {
    if (!value) return
    files[file.name].value = value
    setFiles({...files})
  }, { wait: 500 })

  const handleTabsChange = useStableFn((fileName: string) => setSelectedFileName(fileName))

  // const handleTabsError = useStableFn((error: string) => setError(error))

  return (
    <div className={styles.container}>
      {
        showFileSelector && <FileSelector onChange={handleTabsChange} />
      }
      <Editor onChange={handleEditorChange} file={file} />
    </div>
  )
}


export default EditorContainer