import { createContext, useEffect, useMemo, useState } from "react";
import { useStableFn } from "@shined/react-use";
import { initFiles, MAIN_FILE_NAME } from "./files";
import type { IFiles, IBoxContext, BoxContextProps } from "./types";
import { fileNameToLanguage, utoa } from "../utils/transform";

const initialContext: Partial<IBoxContext> = {
  selectedFileName: MAIN_FILE_NAME
}

export const BoxContext = createContext<IBoxContext>(initialContext as IBoxContext);

const BoxProvider = (props: BoxContextProps) => {
  const { children, saveOnUrl = true } = props;

  const [files, setFiles] = useState<IFiles>(initFiles)
  const [selectedFileName, setSelectedFileName] = useState<string>(initialContext.selectedFileName!)

  const [filesHash, setFilesHash] = useState<string>('')

  const addFile = useStableFn((name: string) => {
    files[name] = {
      name,
      value: '',
      language: fileNameToLanguage(name)
    }
    setFiles({ ...files })
  })

  const deleteFile = useStableFn((name: string) => {
    delete files[name]
    setFiles({ ...files })
  })

  const updateFileName = useStableFn((oldFieldName: string, newFieldName: string) => {
    if (!files[oldFieldName] || newFieldName === undefined || newFieldName === null) return;
    const { [oldFieldName]: value, ...rest } = files;
    const newFile = {
      [newFieldName]: {
        ...value,
        language: fileNameToLanguage(newFieldName),
        name: newFieldName,
      },
    };
    setFiles({
      ...rest,
      ...newFile,
    });
  });

  useEffect(() => {
    const hash = utoa(JSON.stringify(files));
    setFilesHash(hash)

    if (!saveOnUrl) return
    let url = new URL(window.location.href);
    url.searchParams.set('code', hash || '');
    window.history.pushState({}, '', url.toString())
    
  }, [files])

  const value = useMemo(() => ({
    filesHash,
    files,
    selectedFileName,
    setFiles,
    addFile,
    deleteFile,
    updateFileName,
    setSelectedFileName
  }), [filesHash, files, selectedFileName])

  return (
    <BoxContext.Provider value={value}>{children}</BoxContext.Provider>
  )
}

export default BoxProvider
