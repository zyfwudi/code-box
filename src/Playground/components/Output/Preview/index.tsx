import React, { useEffect, useRef } from 'react'

import iframeRaw from './iframe.html?raw'
import { getIframeUrl } from '@/utils/utils'

import type { IPreview, IMessageData } from '../types'

const iframeUrl = getIframeUrl(iframeRaw)

export const Preview: React.FC<IPreview> = (props) => {
  const { data, iframeKey } = props
  const iframeRef = useRef<HTMLIFrameElement>(null)

  useEffect(() => {
    if (data) iframeRef.current?.contentWindow?.postMessage(data)
  }, [data])

  const handleMessage = (msg: IMessageData) => {
    const { type } = msg.data
    if (type === 'LOADED') {
      iframeRef.current?.contentWindow?.postMessage(data)
    } else if (type === 'ERROR') {

    } else {

    }
  }

  useEffect(() => {
    window.addEventListener('message', handleMessage)
    return () => {
      window.removeEventListener('message', handleMessage)
    }
  }, [])

  return (
    <iframe
      key={iframeKey}
      ref={iframeRef}
      src={iframeUrl}
      style={{
        width: '100%',
        height: '100%',
        padding: 0,
        border: 'none',
      }}
      sandbox='allow-popups-to-escape-sandbox allow-scripts allow-popups allow-forms allow-pointer-lock allow-top-navigation allow-modals allow-same-origin'
    />
  )
}
