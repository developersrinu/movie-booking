
import React, { createContext, useState } from 'react'
const selectionContext = createContext()
const ContextProvider = ({childern}) => {
    const [theater,setTtheater] = useState()
    const [tiemslot,setTiemslot] = useState()
    const [seat,setSeat] = useState()
  return (
    <selectionContext.Provider value={{theater,setTtheater,seat,setSeat,tiemslot,setTiemslot}}>{childern}</selectionContext.Provider>
  )
}

export default ContextProvider