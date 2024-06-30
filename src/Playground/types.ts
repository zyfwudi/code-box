import type { IReturnVoid } from "@/utils/types";

export interface IFile {
  name: string;
  value: string;
  language: string;
  active?: boolean;
  hidden?: boolean;
}

export interface IFiles {
  [key: string]: IFile;
}

export interface ISplitPane {
  children?: React.ReactNode[];
  defaultSizes?: number[];
}

export interface ICustomFiles {
  [key: string]:
    | string
    | {
        code: string;
        active?: boolean;
        hidden?: boolean;
      };
}

export type IImportMap = { imports: Record<string, string> }

export interface IPlayground {
  files?: ICustomFiles;
  importMap?: IImportMap
  saveOnUrl?: boolean;
  style?: React.CSSProperties
  className?: string
  showHeader?: boolean
  importUrl?: string
  onFilesChange?: (url: string) => void
}

export interface ICodeBox extends Omit<IPlayground, 'saveOnUrl' | 'showHeader'> {
  
}

export interface IBoxContext {
  filesHash: string
  files: IFiles
  selectedFileName: string
  setFiles: IReturnVoid<IFiles>
  addFile: IReturnVoid<string>
  deleteFile: IReturnVoid<string>
  updateFileName: IReturnVoid<string>
  setSelectedFileName: IReturnVoid<string>
}

export interface BoxContextProps {
  children: React.ReactNode;
  saveOnUrl?: boolean
}
