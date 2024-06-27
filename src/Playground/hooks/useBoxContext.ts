import { useEffect, useState } from "react";
import { useStableFn } from "@shined/react-use";
import { initFiles } from "../files";
import type { IFiles } from "../types";
import { fileNameToLanguage, utoa } from "@/utils/transform";

export interface UseBoxContextProps {
  saveOnUrl: boolean
  selectedFileNameOrigin: string
}

const useBoxContext = (props: UseBoxContextProps) => {
  const { saveOnUrl, selectedFileNameOrigin } = props

  const [files, setFiles] = useState<IFiles>(initFiles)
  const [selectedFileName, setSelectedFileName] = useState<string>(selectedFileNameOrigin)

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
    let originalHash = window.location.hash;
    let hashParamsIndex = originalHash.indexOf('?');

    let baseHash = (hashParamsIndex === -1) ? originalHash : originalHash.substring(0, hashParamsIndex);
    let existingParams = (hashParamsIndex === -1) ? '' : originalHash.substring(hashParamsIndex + 1);

    let searchParams = new URLSearchParams(existingParams);

    searchParams.set('code', hash || '');

    let newHash = `${baseHash}?${searchParams.toString()}`;

    console.log('new URL:', `${window.location.pathname}${newHash}`);
    window.history.pushState({}, '', `${window.location.pathname}${newHash}`);
    
  }, [files])

  return {
    filesHash,
    files,
    selectedFileName,
    setFiles,
    addFile,
    deleteFile,
    updateFileName,
    setSelectedFileName
  }
}

export default useBoxContext