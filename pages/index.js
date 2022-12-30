import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

export default function Index() {
  const [data, setData] = useState(null)
  const [isLoading, setLoading] = useState(false)
  const router = useRouter()
  const { req } = router.query
  const [token, setToken] = useState(null);
  useEffect(() => {
    // Split the URL on the '/' character and extract the token from the resulting array
    const [, token] = window.location.href.split('/');
    // Update the state with the extracted token
    setToken(token);
  }, []);

  //retrieve data from the server using getStaticProps
  useEffect(() => {
    setLoading(true)
    //fetch data from api using a dynamic path
    try {
      fetch(`https://axldnstore.shuttleapp.rs/api/v1/users/resetpassword/${token}}`)
      console.log(req)
      .then(res => res.json())
      
      .then(data => {
        console.log(data)
        setData(data)
        setLoading(false)
      })
      
    }
    catch (error) {
      console.log(error)
    }
  }, [])

  if (isLoading) return <p>Loading...</p>
  if (!data) return <p>No profile data</p>

  return (
    <div>
      <h1>{data}</h1>
    </div>
  )
}
