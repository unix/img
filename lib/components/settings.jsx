import React, { useEffect, useMemo, useState } from 'react'
import { Button, Checkbox, Input, Select, Slider, Spacer, useInput } from '@zeit-ui/react'
import useNaturalSize from '../use-natural-size'

const Settings = ({
  url, sizeChange, settingsChange, onBack,
}) => {
  const nativeSize = useNaturalSize(url)
  const [invert, setInvert] = useState(false)
  const [radius, setRadius] = useState(5)
  const [ratio, setRatio] = useState(1)
  const [style, setStyle] = useState('title')
  const { state: title, bindings } = useInput('Demo')
  const { state: link, bindings: linkBindings } = useInput('https://img.unix.bio')
  const size = useMemo(() => ({
    width: Number.parseInt(`${nativeSize.width * ratio}`),
    height: Number.parseInt(`${nativeSize.height * ratio}`),
    bar: Number.parseInt(`${40 * ratio}`),
  }), [nativeSize, ratio])
  useEffect(() => {
    sizeChange(size)
  }, [size])
  
  useEffect(() => {
    settingsChange({ style, title, link, radius, invert })
  }, [title, link, style, radius, invert])

  return (
    <section>
      <Select value={style} onChange={val => setStyle(val)}>
        <Select.Option value="title">Browser Title</Select.Option>
        <Select.Option value="link">Browser Link</Select.Option>
        <Select.Option value="plain">Plain</Select.Option>
      </Select>
      <Spacer />
      {style === 'title' && <Input width="100%" {...bindings}>Title</Input>}
      {style === 'link' && <Input width="100%" {...linkBindings}>Link Address</Input>}
      {style === 'plain' && (
        <>
          <p>Radius</p>
          <Slider step={1} max={10} min={0} initialValue={radius} onChange={val => setRadius(val)} showMarkers />
        </>
      )}
      <Spacer />
      <p>Size {size.width > 0 && <span>{size.width} * {size.height}</span>}</p>
      <Slider step={0.2} max={2.8} min={0.4} initialValue={ratio} onChange={val => setRatio(val)} showMarkers />
      <Spacer y={1.5} />
      {style !== 'plain' && (
        <div>
          <Checkbox checked={invert}
            onChange={e => setInvert(e.target.checked)}>
            Invert Background
          </Checkbox>
        </div>
      )}
      <Spacer />
      <div className="back">
        <Button auto type="abort" onClick={onBack}>GO BACK</Button>
      </div>
      <style jsx>{`
        section {
          display: flex;
          flex-direction: column;
          position: relative;
        }
        
        .back {
          position: absolute;
          top: 0;
          left: 0;
          transform: translate(-1.25rem, -200%);
        }
      `}</style>
    </section>
  )
}

export default Settings
