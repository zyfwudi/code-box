import useStyle from '../style'
import { Tag, Input } from 'shineout'
import type { IFileItem } from './types'
import useFileItem from './hooks/use-file-item'

const FileItem = (props: IFileItem) => {
  const { value, readOnlyTabs = [''], active, onValidate, onClick, onOk, setConformVisible, onCancel } = props
  const styles = useStyle()

  const {
    name,
    creating,
    inputRef,
    handleDoubleClick,
    handleKeyDown,
    changeFileName,
    setName
  } = useFileItem({
    value,
    readOnlyTabs,
    active,
    creating: props.creating,
    onValidate,
    onOk,
    onCancel
  })

  return (
    creating ? (
      <Input
        forwardRef={inputRef}
        value={name}
        onChange={(v) => setName(v as string)}
        onBlur={changeFileName}
        onKeyDown={handleKeyDown}
        size='small'
        width={'100px'}
        style={{margin: '0 0 0 8px', minWidth: '100px'}}
      />
    ) : (
      <Tag
        color='info'
        mode={active ? 'brightOutline' : 'fill'}
        onClick={onClick}
        className={styles.tag}
        onClose={!readOnlyTabs.includes(name) && ((e) => {
          e.preventDefault()
          setConformVisible(name)
        })}
        onDoubleClick={handleDoubleClick}
      >
        {name}
      </Tag>
    )
  )

}

export default FileItem