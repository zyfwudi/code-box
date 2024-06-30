import { useEffect, useRef, useState } from "react"
import { useDebouncedFn, useMount } from "@shined/react-use"
import CompilerWorker from '../compiler.worker.ts?worker&inline'
import { IMPORT_MAP_FILE_NAME } from "@/playground/files"
import type { IPreviewData, UseOutputProps } from "../types"
import type { IFiles } from "@/playground/types"
import { transformImportMap } from "@/utils/transform"

export const changeImportMap = (files: IFiles, importUrl?: string) => {
  if (!files || !files[IMPORT_MAP_FILE_NAME]) return

  const newImportMap = transformImportMap(files[IMPORT_MAP_FILE_NAME].value, importUrl)

  return {
    ...files,
    [IMPORT_MAP_FILE_NAME]: {
      ...files[IMPORT_MAP_FILE_NAME],
      value: newImportMap
    }
  }
}

const useOutput = (props: UseOutputProps) => {
  const { files, importUrl } = props

  const compilerRef = useRef<Worker | null>(null)
  const [compiledFiles, setCompiledFiles] = useState<IPreviewData>()

  const sendCompiledCode = useDebouncedFn(() => compilerRef.current?.postMessage(changeImportMap(files, importUrl)), { wait: 50})

  useMount(() => {
    if (!compilerRef.current) {
      compilerRef.current = new CompilerWorker()
      compilerRef.current.addEventListener('message', ({ data }: { data: any }) => {
        if (data.type === 'UPDATE_FILES') {
          try {
            data.data.importmap = transformImportMap(files[IMPORT_MAP_FILE_NAME]?.value, importUrl)
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

  return {
    compiledFiles
  }
}

export default useOutput