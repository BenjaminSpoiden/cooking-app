import { Navbar } from '../components/sections/Navbar'
import Head from "next/head"
import { LandingLayout } from '../components/layouts/LandingLayout'
import { Hero } from '../components/sections/Hero'
import { OurValues } from '../components/sections/OurValues'
import { OurTeam } from '../components/sections/OurTeam'
import { OurPlans } from '../components/sections/OurPlans'
import { Footer } from '../components/sections/Footer'
import React, { useEffect, useState } from "react"
import { withUrqlClient } from 'next-urql'
import { createUrqlClient } from '../utils/createUrqlClient'

const Home = () => {

  const [scrollPos, setScrollPos] = useState(0)

  const handleScrollChange = () => {
    const currentPosition = window.scrollY
    setScrollPos(currentPosition)
  }
  
  useEffect(() => {
    window.addEventListener("scroll", handleScrollChange)
    return () => {
      window.removeEventListener("scroll", handleScrollChange)
    }
  }, [])

  return (
    <>  
      <Head>
        <title>Food @ Home</title>
      </Head>
      <Navbar scrollAmout={scrollPos} />
      <LandingLayout>
        <Hero id="home" />
        <OurValues id="valueSection" />
      </LandingLayout>
      <OurTeam id="teamSection" />
      <LandingLayout>
        <OurPlans id="aboutUsSection" />
      </LandingLayout>
      <Footer />
    </>
  )
}

export default withUrqlClient(createUrqlClient, { ssr: true })(Home)