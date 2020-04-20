import React from 'react'
import { useTheme, Link } from '@zeit-ui/react'

const Layout = ({ children }) => {
  const theme = useTheme()

  return (
    <section>
      <div className="pc">{children}</div>
      <div className="mobile">
        <h3>Sorry, the current page does not provide services for the mobile.</h3>
        <p>As a suggestion, you can buy an Apple Mac in an <Link target="_blank" pure color href="https://www.apple.com/mac/">Online Store</Link>.</p>
      </div>
      <style jsx>{`
        section {
          width: calc(${theme.layout.pageWidth} - 65px);
          margin: 0 auto;
          min-height: 100vh;
          max-width: 90vw;
          box-sizing: border-box;
          padding: calc(${theme.layout.gap} * 3) 0;
        }
        
        .mobile {
          width: 100%;
          margin: 0 auto;
          display: none;
        }
        
        @media only screen and (max-width: ${theme.layout.breakpointMobile}) {
          .pc {
            display: none;
          }
          
          .mobile {
            display: block;
          }
        }
      `}</style>
    </section>
  )
}

export default Layout
