import Layout from 'lib/components/layout'
import Dashboard from 'lib/components/dashboard'
import Welcome from 'lib/components/welcome'
import Footer from 'lib/components/footer'
import { useState } from 'react'

const Index = () => {
  const [file, setFile] = useState(null)
  
  return (
    <Layout>
      {file ? (
        <Dashboard file={file} onBack={() => setFile(null)} />
      ) : <Welcome onChange={file => setFile(file)} />}
      <Footer />
    </Layout>
  )
}

export default Index
