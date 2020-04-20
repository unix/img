import React, { useState } from 'react'
import { Input, Select, Spacer } from '@zeit-ui/react'

const Title = () => {
  const [isLink, setIsLink] = useState(false)
  const changeHandler = val => {
    setIsLink(val === 'link')
  }
  
  
  return (
    <section>
      <Spacer inline x={1} />
      <Input label="title or link" placeholder="browser title" className="title" />
  
      <style jsx>{`
        section :global(.title) {
          width: 350px;
        }
      `}</style>
    </section>
  )
}

export default Title
