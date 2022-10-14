
import React, { useEffect } from 'react'
import Banner from '../../Componets/Home/Banner'
import Cards from '../../Componets/Home/Card'
import Member from '../../Componets/Home/Member'
import Tips from '../../Componets/Home/Tips'
import User_say from '../../Componets/Home/User_say'

const Home = () => {
  useEffect(() => {
  window.scroll(0,0)
  }, [])
  
  return (
   <>
    <Banner />
    <Cards />
    <Member />
    <User_say />
    <Tips />
    </>
  )
}

export default Home