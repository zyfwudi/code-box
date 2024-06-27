import { fileNameToLanguage } from "@/utils/transform";
import type { IFiles } from "./types";
import { atou } from "@/utils/transform";
import Index from '@/templates/index?raw'
import ImportMap from '@/templates/import-map?raw'
import main from '@/templates/main?raw'

export const  MAIN_FILE_NAME = 'index.tsx'

export const IMPORT_MAP_FILE_NAME = 'import-map.json';

export const ENTRY_FILE_NAME = 'main.tsx'

export const getFilesFromUrl = () => {
  let files: IFiles | undefined
  try {
    if (typeof window !== 'undefined') {
      const hash = new URL(window.location.href).searchParams.get('code')
      if (hash) files = JSON.parse(atou(hash))
    }
  } catch (error) {
    console.error(error)
  }
  return files
}

export const initFiles: IFiles = getFilesFromUrl() || {
  [ENTRY_FILE_NAME]: {
    name: ENTRY_FILE_NAME,
    language: fileNameToLanguage(ENTRY_FILE_NAME),
    value: main,
  },
  [MAIN_FILE_NAME]: {
    name: MAIN_FILE_NAME,
    value: Index,
    language: fileNameToLanguage(MAIN_FILE_NAME),
  },
  [IMPORT_MAP_FILE_NAME]: {
    name: IMPORT_MAP_FILE_NAME,
    value: ImportMap,
    language: fileNameToLanguage(IMPORT_MAP_FILE_NAME),
  }
}