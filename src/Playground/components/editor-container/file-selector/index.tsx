import { useContext, useEffect, useState } from 'react'
import useStyle from '../style'
import { maxSequenceTabName } from '@/utils/util'
import { IReturnVoid } from '@/utils/types'
import { MAIN_FILE_NAME, IMPORT_MAP_FILE_NAME, ENTRY_FILE_NAME } from '@/playground/files'
import { useStableFn } from '@shined/react-use'
import { BoxContext } from '@/playground/box-context'
import FileItem from './file-item'
import { Modal, Tag, Button } from 'shineout'

export interface IFileSelector {
  readOnly?: boolean
  onChange?: IReturnVoid<string>
  onError?: IReturnVoid<string>
}

const FileSelector = (props: IFileSelector) => {
  const { readOnly = false, onChange, onError } = props
  const { files, selectedFileName, deleteFile, addFile, updateFileName } = useContext(BoxContext)
  const styles = useStyle()

  const [tabs, setTabs] = useState<string[]>([''])
  const [creating, setCreating] = useState<boolean>(false)
  const [confirmVisible, setConformVisible] = useState<string>('')

  const addTab = useStableFn(() => {
    setTabs([...tabs, maxSequenceTabName(tabs)])
    setCreating(true)
  })

  const handleCancel = useStableFn(() => {
    if (!creating) return
    tabs.pop()
    setTabs([...tabs])
    setCreating(false)
  })

  const handleClickTab = useStableFn((fileName: string) => {
    if (creating) return
    onChange?.(fileName)
  })

  const handleClickImportMap = useStableFn(() => {
    onChange?.(IMPORT_MAP_FILE_NAME)
  })

  const handleSaveTab = useStableFn((val: string, item: string) => {
    if (creating) {
      addFile(val);
      setCreating(false);
    } else {
      updateFileName(item, val);
    }
    setTimeout(() => {
      handleClickTab(val);
    }, 0);
  })

  const handleValidateTab = useStableFn((name: string, prevName: string) => {
    if (!/\.(jsx|tsx|js|ts|css|json)$/.test(name)) {
      onError?.('Playground only supports *.jsx, *.js, *.css, *.json files.');
      return false;
    }

    if (tabs.includes(name) && name !== prevName) {
      onError?.('File name already exists.');
      return false;
    }

    return true;
  })

  useEffect(() => {
    setTabs(
      Object.keys(files).filter((name) => ![IMPORT_MAP_FILE_NAME, ENTRY_FILE_NAME].includes(name) && !files[name].hidden)
    )
  }, [files])


  return (
    <div className={styles.tabs}>
      {
        tabs.map((item, index) => (
          <FileItem 
            key={index + item}
            value={item}
            creating={creating}
            active={item === selectedFileName}
            onValidate={handleValidateTab}
            onOk={(name: string) => handleSaveTab(name, item)}
            onClick={() => handleClickTab(item)}
            setConformVisible={setConformVisible}
            onCancel={handleCancel}
          />
        ))
      }

      {
        !readOnly && (
         <>
           <div className={styles.add} onClick={addTab}>+</div>
           <div className={styles.importMap}>
            <Tag
              color='tangerine'
              mode={selectedFileName === IMPORT_MAP_FILE_NAME ? 'brightOutline' : 'fill'}
              onClick={handleClickImportMap}
              className={styles.tag}
            >
              {'Import Map'}
            </Tag>
           </div>
         </>
        )
      }

      <Modal
        width={400}
        visible={!!confirmVisible}
        type='error'
        onClose={() => setConformVisible('')}
        footer={[
          <Button
            key='cancel'
            mode='outline'
            onClick={() => {
              setConformVisible('');
            }}
          >
            {'取消'}
          </Button>,
          <Button
            key='ok'
            type='danger'
            onClick={() => {
              deleteFile(confirmVisible);
              handleClickTab(MAIN_FILE_NAME);
              setConformVisible('');
            }}
          >
            {'删除'}
          </Button>,
        ]}
      >{`确定要删除?`}</Modal>
    </div>
  )

}

export default FileSelector