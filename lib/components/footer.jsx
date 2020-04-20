import React from 'react'
import { Code, Link, Spacer, useTheme } from '@zeit-ui/react'

const Footer = () => {
  const theme = useTheme()
  
  return (
    <footer>
      <Link pure>view source code</Link>
      <Spacer y={.5} />
      <Link pure>Built on&nbsp;<Code>@zeit-ui/react</Code></Link>
      <style jsx>{`
        footer {
          position: fixed;
          left: 50%;
          bottom: 2vw;
          transform: translateX(-50%);
          width: ${theme.layout.pageWidth};
          z-index: 10;
          text-transform: uppercase;
          font-size: .75rem;
        }
        
        footer :global(a:hover) {
          opacity: .7;
        }
      `}</style>
    </footer>
  )
}

export default Footer
