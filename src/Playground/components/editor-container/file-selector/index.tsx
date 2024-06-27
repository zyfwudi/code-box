import { useContext } from 'react'
import { Modal, Tag, Button } from 'shineout'
import useStyle from '../style'
import { MAIN_FILE_NAME, IMPORT_MAP_FILE_NAME } from '@/playground/files'
import { BoxContext } from '@/playground/box-context'
import FileItem from './file-item'
import type { IFileSelector } from './types'
import useFileSelector from './hooks/use-file-selector'

const FileSelector = (props: IFileSelector) => {
  const { readOnly = false, onChange, onError } = props
  const { files, selectedFileName, deleteFile, addFile, updateFileName } = useContext(BoxContext)
  const styles = useStyle()

  const {
    tabs,
    creating,
    confirmVisible,
    addTab,
    handleCancel,
    handleClickTab,
    handleClickImportMap,
    handleSaveTab,
    handleValidateTab,
    setConformVisible
  } = useFileSelector({
    files,
    onChange,
    onError,
    addFile,
    updateFileName
  })

  const renderModal = () => (
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
          {'Cancel'}
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
          {'Delete'}
        </Button>,
      ]}
    >{`Confirm to delete?`}</Modal>
  )

  const renderFileItems = () => 
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

  return (
    <div className={styles.tabs}>
      {renderFileItems()}

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

      {renderModal()}
      
    </div>
  )

}

export default FileSelector