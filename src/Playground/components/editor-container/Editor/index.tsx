import MonacoEditor, { Monaco } from '@monaco-editor/react'
import { editor } from 'monaco-editor'
import React, { useEffect, useRef, useContext } from 'react'

import { monacoEditorConfig } from './monacoConfig'
import { useEditor } from './useEditor'
import { useTypesProgress } from './useProgress'

// import { Loading } from '@/Playground/components/Loading'
import { BoxContext } from '../../../box-context'
import type { IFile } from '../../../types'
import { fileNameToLanguage } from '@/utils/transform'
import useStyle from './style'
import './useEditorWoker'

interface Props {
  file: IFile
  onChange?: (code: string | undefined) => void
  options?: IEditorOptions
}

export type IEditorOptions = editor.IStandaloneEditorConstructionOptions & any

export const Editor: React.FC<Props> = (props) => {
  const { file, onChange, options } = props
  const { files, setSelectedFileName } = useContext(BoxContext)
  const editorRef = useRef<any>(null)
  const { doOpenEditor, loadJsxSyntaxHighlight, autoLoadExtraLib } = useEditor()
  const jsxSyntaxHighlightRef = useRef<any>({ highlighter: null, dispose: null })
  const { onWatch } = useTypesProgress()

  const styles = useStyle()

  const handleEditorDidMount = async (editor: any, monaco: Monaco) => {
    editorRef.current = editor
    // ignore save event
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS, () => {
      editor.getAction('editor.action.formatDocument').run()
    })

    monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
      target: monaco.languages.typescript.ScriptTarget.Latest,
      allowNonTsExtensions: true,
      moduleResolution: monaco.languages.typescript.ModuleResolutionKind.NodeJs,
      module: monaco.languages.typescript.ModuleKind.CommonJS,
      noEmit: true,
      esModuleInterop: true,
      jsx: monaco.languages.typescript.JsxEmit.Preserve,
      reactNamespace: 'React',
      allowJs: true,
      typeRoots: ['node_modules/@types']
    })

    // 初始化自定义文件model
    Object.entries(files).forEach(([key]) => {
      if (!monaco?.editor?.getModel(monaco.Uri.parse(`file:///${key}`))) {
        monaco?.editor?.createModel(
          files[key].value,
          fileNameToLanguage(key),
          monaco.Uri.parse(`file:///${key}`)
        )
      }
    })

    // 覆盖原点击变量跳转方法
    editor._codeEditorService.doOpenEditor = function (editor: any, input: any) {
      const path = input.resource.path
      if (!path.startsWith('/node_modules/')) {
        setSelectedFileName(path.replace('/', ''))
        doOpenEditor(editor, input)
      }
    }
    // 加载jsx高亮
    jsxSyntaxHighlightRef.current = loadJsxSyntaxHighlight(editor, monaco)

    // 加载类型定义文件
    autoLoadExtraLib(editor, monaco, file?.value, onWatch)
  }

  useEffect(() => {
    editorRef.current?.focus()
    jsxSyntaxHighlightRef?.current?.highlighter?.()
  }, [file?.name])

  return (
    <>
      <MonacoEditor
        className={styles.editor}
        height='100%'
        theme={`vs-dark`}
        path={file?.name}
        language={file?.language}
        value={file?.value}
        onChange={onChange}
        onMount={handleEditorDidMount}
        options={{
          ...monacoEditorConfig,
          ...{
            ...options,
            theme: undefined,
          },
        }}
      />
      {/* <div className='react-playground-editor-types-loading'>
        {total > 0 ? <Loading finished={finished}></Loading> : null}
      </div> */}
    </>
  )
}
