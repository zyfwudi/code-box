import type { IReturnVoid } from '@/utils/types'
import type { IFiles } from '@/playground/types'

export interface IFileItem {
  value: string
  readOnlyTabs?: string[]
  creating: boolean
  active: boolean
  onValidate: (name: string, prevName: string) => boolean
  onClick: () => void
  onOk: IReturnVoid<string>
  setConformVisible: IReturnVoid<string>
  onCancel: () => void
}

export type UseFileItemProps = Omit<IFileItem, 'setConformVisible' | 'onClick'>

export interface IFileSelector {
  readOnly?: boolean
  onChange?: IReturnVoid<string>
  onError?: IReturnVoid<string>
}

export interface UseFileSelectorProps extends Omit<IFileSelector, 'readOnly'> {
  files: IFiles
  addFile: IReturnVoid<string>
  updateFileName: IReturnVoid<string>
}