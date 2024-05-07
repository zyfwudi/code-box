import classnames from 'classnames'
import React, { useState, useRef, useEffect } from 'react'

import { Button, Modal } from 'shineout';

import styles from './index.module.less'

import type { ITabsItem } from '@/Playground/types'

export const FileItem: React.FC<ITabsItem> = (props) => {
  const {
    readOnlyTabs = [''],
    value,
    actived = false,
    onOk,
    onCancel,
    onRemove,
    onClick,
    onValidate,
  } = props
  const inputRef = useRef<HTMLInputElement>(null)
  const [name, setName] = useState(value)
  const [creating, setCreating] = useState(props.creating)
  const [visible, setVisible] = useState<boolean>(false);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault()
      doneNameFile()
    } else if (event.key === 'Escape') {
      event.preventDefault()
      cancelNameFile()
    }
  }

  const cancelNameFile = () => {
    setName(value)
    setCreating(false)
    onCancel()
  }

  function doneNameFile() {
    if (!creating) return
    if (!onValidate(name, value)) return

    // 如果name没有变化且是修改状态
    if (name === value && actived) {
      setCreating(false)
      return
    }
    onOk(name)
    setCreating(false)
  }

  const handleDoubleClick = () => {
    if (readOnlyTabs.includes(name)) return
    setCreating(true)
    setTimeout(() => {
      inputRef?.current?.focus()
    }, 0)
  }

  useEffect(() => {
    inputRef?.current?.focus()
  }, [])

  return (
    <div
      className={classnames(styles['tab-item'], actived ? styles.actived : null)}
      onClick={onClick}
    >
      {creating ? (
        <>
          <input
            ref={inputRef}
            className={styles['tabs-item-input']}
            value={name}
            onChange={(e) => setName(e.target.value)}
            onBlur={doneNameFile}
            onKeyDown={handleKeyDown}
          />
          <div className={styles['input-mask']}></div>
        </>
      ) : (
        <>
          <span onDoubleClick={handleDoubleClick}>{name}</span>
          {readOnlyTabs.includes(name) ? null : (
            <span style={{ marginLeft: 5, display: 'flex' }} onClick={() => setVisible(true)}>
              <svg width='12' height='12' viewBox='0 0 24 24'>
                <line stroke='#999' x1='18' y1='6' x2='6' y2='18'></line>
                <line stroke='#999' x1='6' y1='6' x2='18' y2='18'></line>
              </svg>
            </span>
          )}
          <Modal
            width={400}
            visible={visible}
            type='error'
            onClose={() => setVisible(false)}
            title='删除'
            footer={[
              <Button
                key='cancel'
                mode='outline'
                onClick={() => {
                  setVisible(false);
                }}
              >
                {'取消'}
              </Button>,
              <Button
                key='ok'
                type='danger'
                onClick={() => {
                  onRemove(name);
                  setVisible(false);
                }}
              >
                {'删除'}
              </Button>,
            ]}
          >{`确定要删除${name}?`}</Modal>
        </>
      )}
    </div>
  )
}
