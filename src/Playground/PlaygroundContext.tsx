import React, { createContext, useEffect, useState } from 'react'

import { MAIN_FILE_NAME } from './files'
import { fileName2Language, setPlaygroundTheme, utoa } from './utils'

import type { IFiles, IPlaygroundContext, ITheme } from './types'

const initialContext: Partial<IPlaygroundContext> = {
  selectedFileName: MAIN_FILE_NAME,
}

export const PlaygroundContext = createContext<IPlaygroundContext>(
  initialContext as IPlaygroundContext
)

export const PlaygroundProvider = (props: {
  children: React.ReactElement
  saveOnUrl?: boolean
}) => {
  const { children, saveOnUrl = false } = props

  const [files, setFiles] = useState<IFiles>({})
  const [theme, setTheme] = useState(initialContext.theme!)
  const [selectedFileName, setSelectedFileName] = useState(initialContext.selectedFileName!)
  const [filesHash, setFilesHash] = useState('')

  const addFile = (name: string) => {
    files[name] = {
      name,
      language: fileName2Language(name),
      value: '',
    }
    setFiles({ ...files })
  }

  const removeFile = (name: string) => {
    delete files[name]
    setFiles({ ...files })
  }

  const updateFileName = (oldFieldName: string, newFieldName: string) => {
    if (!files[oldFieldName] || newFieldName === undefined || newFieldName === null) return
    const { [oldFieldName]: value, ...rest } = files
    const newFile = {
      [newFieldName]: {
        ...value,
        language: fileName2Language(newFieldName),
        name: newFieldName,
      },
    }
    setFiles({
      ...rest,
      ...newFile,
    })
  }

  const changeTheme = (theme: ITheme) => {
    setPlaygroundTheme(theme)
    setTheme(theme)
  }

  useEffect(() => {
    const hash = utoa(JSON.stringify(files))
    if (saveOnUrl) window.location.hash = hash
    setFilesHash(hash)
  }, [files])

  return (
    <PlaygroundContext.Provider
      value={{
        theme,
        filesHash,
        files,
        selectedFileName,
        setTheme,
        changeTheme,
        setSelectedFileName,
        setFiles,
        addFile,
        removeFile,
        updateFileName,
      }}
    >
      {children}
    </PlaygroundContext.Provider>
  )
}
