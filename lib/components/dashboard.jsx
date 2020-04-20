import React, { useMemo, useRef, useState } from 'react'
import { Button, Dot, Image, Spacer, Tag, useTheme, useToasts, Link } from '@zeit-ui/react'
import { getFileUrl, download, getImageBlob, toCompressed } from '../utils'
import Settings from './settings'

const Dashboard = ({ file, onBack }) => {
  const theme = useTheme()
  const [, setToast] = useToasts()
  const [loading, setLoading] = useState(false)
  const [settings, setSettings] = useState({})
  const [size, setSize] = useState({ width: 700, height: 350, bar: 40 })
  const browserRef = useRef(null)
  const imgRef = useRef(null)
  const ref = useMemo(
    () => settings.style === 'plain' ? imgRef : browserRef,
    [settings, imgRef, browserRef],
  )
  const url = useMemo(() => getFileUrl(file), [file])
  
  const clickHandler = () => {
    setLoading(true)
    getImageBlob(ref.current)
      .then(blob => toCompressed(blob))
      .then(res => res.blob())
      .then(blob => {
        setLoading(false)
        if (!blob) return setToast({ text: 'Please try again later.' })
        download(blob, file.name)
      })
      .catch(err => {
        setLoading(false)
        setToast({ text: err.message })
      })
  }
  
  return (
    <section>
      <div className="group">
        <div className="form">
          <Settings url={url} sizeChange={size => setSize(size)}
            settingsChange={val => setSettings(val)} onBack={onBack} />
        </div>
        <Spacer x={5}/>
        <div className="preview">
          {settings.style === 'plain' ? <img src={url} style={{ borderRadius: settings.radius }} /> : (
            <Image.Browser title={settings.title}
              url={settings.style === 'link' ? settings.link : null}>
              <Image src={url}/>
            </Image.Browser>
          )}
        </div>
        <div className="hidden">
          {settings.style === 'plain' ? (
            <img ref={imgRef} src={url} style={{ borderRadius: settings.radius, width: size.width, height: size.height }} />
          ) : (
            <Image.Browser ref={browserRef}
              title={settings.title}
              url={settings.style === 'link' ? settings.link : null}>
              <Image src={url} width={size.width} height={size.height} />
            </Image.Browser>
          )}
        </div>
      </div>
      <Spacer y={4.5} />
      <div className="actions">
        <Button onClick={clickHandler} loading={loading}>Download</Button>
        <Spacer y={2} />
        <span>
          <Dot type="success"/> When you download, image will be <Tag
          type="lite">compressed</Tag> automatically.
        </span>
        <Spacer />
        <span>
          Any questions?&nbsp;
          <Link target="_blank" pure href="https://github.com/unix/img/issues/new">Click here for feedback.</Link>
        </span>
      </div>
      
      <style jsx>{`
        section {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding-top: calc(${theme.layout.gap} * 5);
        }
        
        .group {
          display: flex;
        }
        
        .form {
          width: 350px;
        }
        
        .preview {
          flex: 1;
          width: 500px;
        }
        
        .hidden {
          position: fixed;
          bottom: -9999px;
          left: -9999px;
        }
        
        .preview :global(img) {
          max-height: 340px;
          min-width: 300px;
        }
        
        .preview :global(header), .hidden :global(header) {
          background-color: ${settings.invert ? theme.palette.foreground : theme.palette.background};
          border-color: ${settings.invert ? theme.palette.accents_7 : theme.palette.background};
          color: ${settings.invert ? theme.palette.background : theme.palette.foreground};
        }
        
        .preview :global(header .https), .hidden :global(header .https) {
          display: none;
        }
        
        .preview :global(.address-input), .hidden :global(.address-input) {
          background-color: ${settings.invert ? theme.palette.accents_8 : theme.palette.accents_1};
        }
        
        .preview :global(.browser), .hidden :global(.browser),
        .preview :global(.image), .hidden :global(.image) {
          background-color: ${settings.invert ? theme.palette.foreground : theme.palette.background};
        }
        
        .actions {
          width: 550px;
          max-width: 90vw;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
      `}</style>
    </section>
  )
}

export default Dashboard
