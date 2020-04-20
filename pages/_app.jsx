import Head from 'next/head'
import useDomClean from 'lib/use-dom-clean'
import React from 'react'
import { ZEITUIProvider, CSSBaseline } from '@zeit-ui/react'

const Application = ({ Component, pageProps }) => {
  useDomClean()

  return (
    <>
      <Head>
        <title>Better social image</title>
        <link rel="dns-prefetch" href="//img.unix.bio" />
        <meta name="google" value="notranslate" />
        <meta name="referrer" content="strict-origin" />
        <meta name="description" content="Transform images for better display on social site." />
        <meta property="og:site_name" content="Better social image" />
        <meta property="og:description" content="Transform images for better display on social site." />
        <meta property="og:type" content="website" />
        <meta name="generator" content="unix.bio" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="author" content="witt" />
        <meta name="twitter:creator" content="@echo_witt" />
        <meta property="og:title" content="img.unix.bio" />
        <meta property="og:url" content="img.unix.bio" />
        <meta property="og:image" content="https://img.unix.bio/assets/og-main.png" />
        <meta property="twitter:image" content="https://img.unix.bio/assets/og-main.png" />
        <meta itemProp="image" property="og:image" content="https://img.unix.bio/assets/og-main.png" />
        <meta name="viewport" content="initial-scale=1, maximum-scale=5, minimum-scale=1, viewport-fit=cover" />
      </Head>
      <ZEITUIProvider theme={{ type: 'dark' }}>
        <CSSBaseline />
        <Component {...pageProps} />
        <style global jsx>{`
          body {
            overflow-x: hidden;
          }
        `}</style>
      </ZEITUIProvider>
    </>
  )
}

export default Application
