import { useState, useRef, useEffect } from 'react'
import { useStableFn } from '@shined/react-use'
import type { UseFileItemProps } from '../types'

const useFileItem = (props: UseFileItemProps) => {
  const {  
    value,
    readOnlyTabs = [''],
    active,
    onValidate,
    onOk,
    onCancel
  } = props

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

  return {
    name,
    creating,
    inputRef,
    handleDoubleClick,
    handleKeyDown,
    changeFileName,
    setName
  }
}

export default useFileItem