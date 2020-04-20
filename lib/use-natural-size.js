import { useEffect, useState } from 'react'

const imageMap = {
}

const useNaturalSize = (url) => {
  const [size, setSize] = useState({ width: 0, height: 0 })
  useEffect(() => {
    if (imageMap[url]) return setSize(imageMap[url])
    const id = `image-${Math.random().toString(32).slice(2, 10)}`
    const img = document.createElement('img')
    img.src = url
    img.id = id
    img.style.cssText = 'position: fixed; bottom:-9000px; left:-9000px; width:auto; height:auto;'
    img.onload = () => {
      const width = img.naturalWidth || img.width
      const height = img.naturalHeight || img.height
      const ratio = width / 700
      const size = {
        width: 700,
        height: height / ratio,
      }
      imageMap[url] = size
      setSize(size)
      document.documentElement.removeChild(document.getElementById(id))
    }
    document.documentElement.appendChild(img)
  })
  
  return size
}

export default useNaturalSize
