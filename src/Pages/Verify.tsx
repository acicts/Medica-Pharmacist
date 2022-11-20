import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { MutatingDots } from 'react-loader-spinner';
import { Link, useParams } from 'react-router-dom'
import MessageSent from '../images/message-sent 1.png'

const Verify = () => {
  const { token } = useParams();
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState(true)
  useEffect(() => {
    setLoading(true);
    const url = `${process.env.REACT_APP_API_ENDPOINT}/pharmacist/verify/${token}`;
    axios.post(url).then((response) => {
      console.log(response)
      setStatus(response.data.success);
      setLoading(false)
    }).catch(console.log)
  }, [token])

  return (
    <main className='w-full h-[100vh] bg-[#F4F4F4] flex items-center justify-center'>
      <div className='w-[90%] md:w-[70%] lg:w-1/2 p-[5px] h-[70%] md:h-[60%] lg:h-1/2 bg-white flex flex-col items-center justify-evenly'>
        {!loading ? <>
          <h1 className='font-bold text-xl text-center'>{status ? 'Verification Successful!' : 'An error occured while verifying your email!'}</h1>
          <img src={MessageSent} alt="verified-succesfully" />
          {status ? <Link to={'/login'} className='register-btn-2'>
            Login
          </Link> : <Link to={'/verify/request'} className='register-btn-2'>
            Re-send an email
          </Link>} </> : <MutatingDots
          height="100"
          width="100"
          color="#4fa94d"
          secondaryColor='#4fa94d'
          radius='12.5'
          ariaLabel="mutating-dots-loading"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />}
      </div>
    </main>
  )
}

export default Verify