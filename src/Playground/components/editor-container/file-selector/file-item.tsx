import { useState, useRef, useEffect } from 'react'
import useStyle from '../style'
import { IReturnVoid } from '@/utils/types'
import { Tag, Input } from 'shineout'
import { useStableFn } from '@shined/react-use'

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

const FileItem = (props: IFileItem) => {
  const { value, readOnlyTabs = [''], active, onValidate, onClick, onOk, setConformVisible, onCancel } = props
  const styles = useStyle()

  const [name, setName] = useState<string>(value)
  const [creating, setCreating] = useState<boolean>(props.creating)
  const inputRef = useRef<HTMLInputElement>(null);

  const cancelFileName = useStableFn(() => {
    setName(value)
    setCreating(false)
    onCancel()
  })

  const changeFileName = useStableFn(() => {
    if (!creating) return
    if (!onValidate(name, value)) return

    if (name === value && active) {
      setCreating(false)
      return
    }
    onOk(name)

    setCreating(false)
  })

  const handleDoubleClick = useStableFn(() => {
    if (readOnlyTabs.includes(name)) return;
    setCreating(true);
    setTimeout(() => {
      inputRef?.current?.focus();
    }, 0);
  });

  const handleKeyDown = useStableFn((event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      changeFileName();
    } else if (event.key === 'Escape') {
      event.preventDefault();
      cancelFileName();
    }
  })

  useEffect(() => {
    inputRef?.current?.focus();
  }, [])

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