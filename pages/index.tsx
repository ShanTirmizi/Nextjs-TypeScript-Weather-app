import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { useEffect, useState } from 'react'

const Home = () => {
  // const {temp , setTemp} = useState(null)  
  // create a usestate for temparatue 
  // const [humidity , setHumidity] = useState(0);
  const [coordis, setCoordis] = useState({lng: 0 , lat: 0});
  const [humidity , setHumidity] = useState(null);
  const [status , setStatus] = useState(false);  
  const [status2 , setStatus2] = useState(false);

  const getLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      // setStatus(null);
      setCoordis({lat: position.coords.latitude, lng: position.coords.longitude});
      setStatus(true);
      // setLng(position.coords.longitude);
    })
  }

  const fetchDate = async () => {
      const response = await fetch(`https://weather-proxy.freecodecamp.rocks/api/current?lat=${coordis.lat}&lon=${coordis.lng}`);
      const data = await response.json()
      setHumidity(data.main.temp)
      if ( humidity !== null) {
        setStatus2(true)
      }
      
    }
  useEffect(() => {
    getLocation()
  },[])
  useEffect(() => {
    fetchDate()
  },[status])
  console.log(status2)
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1>Weather app</h1>
        {
          status2 && (
            <div>
              <h2>{humidity} °C</h2>

              </div>
          )
        }

       
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  )
}

export default Home
