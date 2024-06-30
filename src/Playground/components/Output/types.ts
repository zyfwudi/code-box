import type { ICustomFiles, IImportMap, IFiles } from "@/playground/types"

export interface IPreviewData {
  compileCode: string
  importmap: string
}

export interface IPreview {
  data?: IPreviewData
  iframeKey?: string
}

export interface IMessageData {
  data: {
    type: string
    message: string
  }
}

export interface IOutput {
  files?: ICustomFiles
  importMap?: IImportMap
  style?: React.CSSProperties
  className?: string
  importUrl?: string
}

export interface UseOutputProps {
  files: IFiles
  importUrl?: string
}