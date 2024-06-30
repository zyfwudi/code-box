import { fileNameToLanguage, atou } from "@/utils/transform";
import { getHashParams } from "@/utils/utils";
import type { IFiles, ICustomFiles, IImportMap } from "./types";
import { reactTemplateFiles, IMPORT_MAP_FILE_NAME } from "./files";

export const getFilesFromUrl = () => {
  let files: IFiles | undefined
  try {
    if (typeof window !== 'undefined') {
      const hash = getHashParams('code')
      if (hash) files = JSON.parse(atou(hash))
    }
  } catch (error) {
    console.error(error)
  }
  return files
}

const transformCustomFiles = (files: ICustomFiles) => {
  const newFiles: IFiles = {}
  Object.keys(files).forEach((key) => {
    const tempFile = files[key]
    if (typeof tempFile === 'string') {
      newFiles[key] = {
        name: key,
        language: fileNameToLanguage(key),
        value: tempFile,
      }
    } else {
      newFiles[key] = {
        name: key,
        language: fileNameToLanguage(key),
        value: tempFile.code,
        hidden: tempFile.hidden,
        active: tempFile.active,
      }
    }
  })

  return newFiles
}

export const getMergedCustomFiles = (files?: ICustomFiles, importMap?: IImportMap) => {
  if (!files) return null;

  const mergedFiles = {
    ...reactTemplateFiles,
    ...transformCustomFiles(files),
  };

  if (importMap) {
    mergedFiles[IMPORT_MAP_FILE_NAME] = {
      name: IMPORT_MAP_FILE_NAME,
      language: 'json',
      value: JSON.stringify(importMap, null, 2),
    };
  }

  return mergedFiles;
};

export const getCustomActiveFile = (files: ICustomFiles) => 
  files && Object.keys(files).find((key) => {
    const tempFile = files[key]

    if (typeof tempFile !== 'string' && tempFile.active) {
      return key
    }

    return null
  })