import React, { useEffect, useState } from 'react'
import { Code, Dot, useTheme, Tooltip, useToasts } from '@zeit-ui/react'
import { getCount } from 'lib/utils'
const limit = 10000000 // 10 M

const Welcome = ({ onChange }) => {
  const theme = useTheme()
  const [count, setCount] = useState(0)
  const [, setToast] = useToasts()
  const changeHandler = event => {
    const file = event.target.files[0]
    if (file.size > limit) {
      return setToast({ text: <>Abort. Image needs to be less than <Code>10M</Code>.</> })
    }
    onChange(file)
  }
  
  useEffect(() => {
    getCount()
      .then(res => res.json())
      .then(({ count }) => setCount(count))
      .catch(e => {})
  }, [])
  
  return (
    <section>
      <div className="welcome">
        <p>
          <a>UPLOAD Images.
            <input type="file" onChange={changeHandler}
              title="upload images."
              accept=".png, .jpg, .jpeg, .gif, .webp" />
          </a>
        </p>
        <p className="intro">And Better <span>Display</span>, Better <span>Social</span> Experience.</p>
        <div className="requests">
          {count !== 0 && (
            <Tooltip placement="right" text={<><Code>{count}</Code> requests in total.</>}>
              <Dot type="success">{count} RQS</Dot>
            </Tooltip>
          )}
        </div>
      </div>
      <style jsx>{`
        .welcome {
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: ${theme.layout.pageWidth};
          z-index: 10;
          margin-top: -10vw;
          font-size: 60pt;
        }
        
        .welcome :global(.dot) {
          height: 1rem;
        }
        
        .welcome :global(.dot .label) {
          font-size: .75rem;
          line-height: 1rem;
        }
        
        .requests {
          user-select: none;
          height: 2rem;
          display: flex;
          align-items: center;
          margin-top: 2rem;
        }
        
        .requests :global(.tooltip) {
          height: 1rem;
          display: flex;
          flex-direction: column;
        }
        
        .intro {
          font-size: 22pt;
          text-transform: capitalize;
          letter-spacing: 2px;
          margin-top: 0;
        }
        
        .intro span {
          color: ${theme.palette.successLight};
          text-transform: uppercase;
          font-weight: 500;
        }
        
        .welcome a {
          color: ${theme.palette.foreground};
          position: relative;
          transition: color 200ms ease;
          font-family: ${theme.font.mono};
          user-select: none;
          display: inline-block;
          line-height: 1.2;
        }
        
        .welcome a:hover, .welcome input:hover {
          cursor: ne-resize;
          color: ${theme.palette.accents_4};
        }
        
        .welcome input {
          position: absolute;
          left: 0;
          right: 0;
          width: 100%;
          bottom: 0;
          top: 0;
          opacity: 0;
          background: transparent;
          border: none;
        }
        
        .welcome a::after {
          position: absolute;
          content: '';
          height: 3pt;
          width: 100%;
          left: 0;
          right: 0;
          bottom: -1pt;
          background-color: ${theme.palette.accents_4};
        }
      `}</style>
    </section>
  )
}

export default Welcome
