import { useContext, useEffect, useRef, useState } from "react"
import { useDebouncedFn, useMount } from "@shined/react-use"
import { BoxContext } from "@/playground/box-context"
import CompilerWorker from './compiler.worker.ts?worker&inline'
import { IMPORT_MAP_FILE_NAME } from "@/playground/files"
import { Preview } from "./preview"
import type { IPreviewData } from "./types"

export interface IPreview {}

const Output = (props: IPreview) => {
  const {} = props

  const { files, selectedFileName } = useContext(BoxContext)

  const compilerRef = useRef<Worker | null>(null)
  const [compiledFiles, setCompiledFiles] = useState<IPreviewData>()

  const sendCompiledCode = useDebouncedFn(() => compilerRef.current?.postMessage(files), { wait: 50})

  useMount(() => {
    if (!compilerRef.current) {
      compilerRef.current = new CompilerWorker()
      compilerRef.current.addEventListener('message', ({ data }: { data: any }) => {
        if (data.type === 'UPDATE_FILES') {
          try {
            JSON.parse(files[IMPORT_MAP_FILE_NAME]?.value)
            data.data.importmap = files[IMPORT_MAP_FILE_NAME]?.value
          } catch (error) {
            console.error('importmap parse error:', error)
          }
          setCompiledFiles(data)
        } else if (data.type === 'UPDATE_FILE') {

        } else if (data.type === 'ERROR') {
          // console.log(data)
        }
      })
    }
  })

  useEffect(() => {
    sendCompiledCode()
  }, [files])

  useEffect(() => {
    if (selectedFileName === IMPORT_MAP_FILE_NAME ) return
    if (['javascript', 'typescript'].includes(files[selectedFileName]?.language)) {
      compilerRef.current?.postMessage(files[selectedFileName]?.value)
    } else {
      compilerRef.current?.postMessage('')
    }
  }, [selectedFileName])

  return (
    <Preview
      iframeKey={files[IMPORT_MAP_FILE_NAME]?.value}
      data={compiledFiles}
    />
  )
}

export default Output