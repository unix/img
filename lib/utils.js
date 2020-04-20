export const getFileUrl = file => {
  if (typeof window.createObjectURL !== 'undefined') {
    return window.createObjectURL(file)
  }
  
  if (typeof window.URL !== 'undefined') {
    return window.URL.createObjectURL(file)
  }
  
  if (typeof window.webkitURL !== 'undefined') {
    return window.webkitURL.createObjectURL(file)
  }
  
  return null
}

export const toBlob = (data, type) => {
  const bytes = window.atob(data)
  let n = bytes.length
  const u8arr = new Uint8Array(n)
  while (n--) u8arr[n] = bytes.charCodeAt(n)
  return new Blob([u8arr], { type })
}

export const getImageBlob = async (el) => {
  const { default: html2canvas } = await import('html2canvas')
  const canvas = await html2canvas(el, {
    allowTaint: true,
    scale: 1,
    backgroundColor: null,
  })
  const base64 = canvas.toDataURL('image/png', 1)
  const data = base64.split('base64,').pop()
  return toBlob(data, 'image/png')
}

export const toCompressed = async blob => {
  return fetch('https://min.unix.bio/api/png', {
    method: 'POST',
    mode: 'cors',
    headers: { 'Content-Type': 'image/png' },
    body: blob,
  })
}

export const getCount = async () => {
  return fetch('https://min.unix.bio/api/count', {
    method: 'GET',
    mode: 'cors',
  })
}

export const download = (blob, name = 'display.png') => {
  const suffix = name.split('.').reverse()[0]
  const filename = name.replace(`.${suffix}`, '')
  const reader = new FileReader()
  reader.readAsDataURL(blob)
  reader.onloadend = () => {
    const a = document.createElement('a')
    a.href = reader.result
    a.download = `${filename}.png`
    a.click()
  }
}
