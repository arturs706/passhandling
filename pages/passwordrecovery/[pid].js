import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

export default function Home() {
  const [dataretrvieved, setDataretrvieved] = useState(null)
  const [isLoading, setLoading] = useState(false)
  const { query } = useRouter();
  const [password, setPassword] = useState("");
  const { pid } = query;
  const [responseData, setResponseData] = useState("");
  console.log(pid)

  //retrieve the token response from the server only once
  useEffect(() => {
    setLoading(true)
    //fetch data from api using a dynamic path

      fetch(`https://axldnstore.shuttleapp.rs/api/v1/users/resetpassword/${pid}`)
      .then(res => res.json())
      .then(data => {
        setDataretrvieved(data)
        setLoading(false)
      })
    

  }, [pid]) 
  



  if (isLoading) return <p>Loading...</p>
  if (!dataretrvieved) return <p>No profile data</p>

  return (
    dataretrvieved.status === "success" ? (
      <div>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button onClick={() => {
          fetch(`https://axldnstore.shuttleapp.rs/api/v1/users/forgotpassrecover`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ 
              token: pid,
              passwd: password
             }),
          })
            .then((response) => response.json())
            .then((data) => {
              setResponseData(data);
            });

        }
        }>Change password</button>
        <div>{responseData.message}</div>
      </div>
    ) : (
      <div>
        <h1>{dataretrvieved.message}</h1>
      </div>
    )
  )
}
