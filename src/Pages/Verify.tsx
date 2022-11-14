import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const Verify = () => {
  const { token } = useParams();
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState(true)
  useEffect(() => {
    setLoading(true);
    const url = `${process.env.REACT_APP_API_ENDPOINT}/pharmacist/verify/${token}`;
    axios.post(url).then((response) => {
      setStatus(response.data.success);
      setLoading(false)
    }).catch(console.log)
  }, [token])

  return (
    loading ? <div>Verifying...</div> : status ? <div>Account verified successfully!</div> : <div>An error occured while verifying your email address!</div>
  )
}

export default Verify