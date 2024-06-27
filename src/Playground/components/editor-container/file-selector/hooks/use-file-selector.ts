import { useEffect, useState } from 'react'
import { useStableFn } from '@shined/react-use'
import { maxSequenceTabName } from '@/utils/util'
import { IMPORT_MAP_FILE_NAME, ENTRY_FILE_NAME } from '@/playground/files'
import type { UseFileSelectorProps } from '../types'


const useFileSelector = (props: UseFileSelectorProps) => {
  const { files, onChange, onError, addFile, updateFileName } = props

  const [tabs, setTabs] = useState<string[]>([''])
  const [creating, setCreating] = useState<boolean>(false)
  const [confirmVisible, setConformVisible] = useState<string>('')

  const addTab = useStableFn(() => {
    setTabs([...tabs, maxSequenceTabName(tabs)])
    setCreating(true)
  })

  const handleCancel = useStableFn(() => {
    if (!creating) return
    tabs.pop()
    setTabs([...tabs])
    setCreating(false)
  })

  const handleClickTab = useStableFn((fileName: string) => {
    if (creating) return
    onChange?.(fileName)
  })

  const handleClickImportMap = useStableFn(() => {
    onChange?.(IMPORT_MAP_FILE_NAME)
  })

  const handleSaveTab = useStableFn((val: string, item: string) => {
    if (creating) {
      addFile(val);
      setCreating(false);
    } else {
      updateFileName(item, val);
    }
    setTimeout(() => {
      handleClickTab(val);
    }, 0);
  })

  const handleValidateTab = useStableFn((name: string, prevName: string) => {
    if (!/\.(jsx|tsx|js|ts|css|json)$/.test(name)) {
      onError?.('Playground only supports *.jsx, *.js, *.css, *.json files.');
      return false;
    }

    if (tabs.includes(name) && name !== prevName) {
      onError?.('File name already exists.');
      return false;
    }

    return true;
  })

  useEffect(() => {
    setTabs(
      Object.keys(files).filter((name) => ![IMPORT_MAP_FILE_NAME, ENTRY_FILE_NAME].includes(name) && !files[name].hidden)
    )
  }, [files])

  return {
    tabs,
    creating,
    confirmVisible,
    addTab,
    handleCancel,
    handleClickTab,
    handleClickImportMap,
    handleSaveTab,
    handleValidateTab,
    setConformVisible
  }
}

export default useFileSelector