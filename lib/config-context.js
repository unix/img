import React from 'react'

export const ConfigContext = React.createContext({})

const useConfigs = () => React.useContext(ConfigContext)

export default useConfigs
