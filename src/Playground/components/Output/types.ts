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