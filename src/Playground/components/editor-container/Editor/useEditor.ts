import { Monaco } from '@monaco-editor/react'
import { getWorker, MonacoJsxSyntaxHighlight } from 'monaco-jsx-syntax-highlight'

import { createATA } from './ata'

export const useEditor = () => {
  // 点击变量跳转
  const doOpenEditor = (editor: any, input: any) => {
    const selection = input.options ? input.options.selection : null
    if (selection) {
      if (typeof selection.endLineNumber === 'number' && typeof selection.endColumn === 'number') {
        editor.setSelection(selection)
        editor.revealRangeInCenter(selection, 1 /* Immediate */)
      } else {
        const pos = {
          lineNumber: selection.startLineNumber,
          column: selection.startColumn,
        }
        editor.setPosition(pos)
        editor.revealPositionInCenter(pos, 1 /* Immediate */)
      }
    }
    console.log('触发鼠标+command点击', input.resource, selection)
  }

  // 加载jsx高亮
  const loadJsxSyntaxHighlight = (editor: any, monaco: Monaco) => {
    const monacoJsxSyntaxHighlight = new MonacoJsxSyntaxHighlight(getWorker(), monaco)
    const { highlighter, dispose } = monacoJsxSyntaxHighlight.highlighterBuilder({
      editor,
    })

    editor.onDidChangeModelContent(() => {
      highlighter()
    })

    highlighter()

    return { highlighter, dispose }
  }

  /**
   * 自动加载types文件
   * @param editor 编辑器
   * @param monaco monaco实例
   * @param defaultValue 默认代码（初始化后现加载默认代码中import包的types文件）
   * @param onWatch 开始监听下载进度
   */
  const autoLoadExtraLib = async (editor: any, monaco: any, defaultValue: string, onWatch: any) => {
    // 自动加载第三方包的类型定义文件
    const typeHelper = await createATA()
    // 开始监听下载进度
    onWatch(typeHelper)

    editor.onDidChangeModelContent(() => {
      typeHelper.acquireType(editor.getValue())
    })

    const addLibraryToRuntime = (code: string, path: string) => {
      monaco.languages.typescript.typescriptDefaults.addExtraLib(code, `file://${path}`)
    }

    typeHelper.addListener('receivedFile', addLibraryToRuntime)
    typeHelper.acquireType(defaultValue)

    return typeHelper
  }

  return {
    autoLoadExtraLib,
    doOpenEditor,
    loadJsxSyntaxHighlight,
  }
}
