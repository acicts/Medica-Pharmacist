import axios from 'axios';
import React, { ChangeEventHandler, FocusEventHandler, FormEventHandler, forwardRef, LegacyRef, RefObject, useEffect, useState } from 'react'
import { MutatingDots } from 'react-loader-spinner';
import { Link } from 'react-router-dom'
import useInput from '../hooks/useInput';
import MessageSent from '../images/message-sent 1.png'

const Field = forwardRef(
  (
    {
      onChange,
      onBlur,
      value,
      hasError,
      errorMsg,
      label,
      id,
      type,
    }: {
      type: string;
      onChange: ChangeEventHandler<HTMLInputElement>;
      onBlur: FocusEventHandler<HTMLInputElement>;
      value: string | number;
      hasError: boolean;
      errorMsg: string;
      label: string;
      id: string;
    },
    ref: LegacyRef<HTMLInputElement>
  ) => {
    return (
      <div className='flex flex-col text-gray-500 focus-within:text-[#5E9486] w-full my-[15px]'>
        <label htmlFor={id} className='text-sm mb-[4px] text-[#5E9486]'>
          {label}
        </label>
        <input
          type={type}
          onChange={onChange}
          onBlur={onBlur}
          value={value}
          id={id}
          ref={ref}
          className='focus:border-[#5E9486] rounded-md border-2 border-[#BCBCBC] w-full h-10 px-3 text-black'
        />
        {hasError && (
          <span className='text-red-500 text-xs'>{errorMsg}</span>
        )}
      </div>
    );
  }
);

const Verify = () => {
  const [uploading, setUploading] = useState(false);
  const [status, setStatus] = useState(false)

  const emailValidator = useInput(inputVal => inputVal.includes('@'));

  const submitFormHandler: FormEventHandler = (e) => {
    e.preventDefault();
    if (!emailValidator.isInputValid) return emailValidator.focusHandler();
    setUploading(true);
    const url = `${process.env.REACT_APP_API_ENDPOINT}/pharmacist/verify/email`;
    const body = JSON.stringify({ email: emailValidator.inputValue, host: window.location.origin })

    axios
      .post(url, body, {
        headers: { 'Content-Type': 'application/json' },
      })
      .then((response) => {
        console.log(response)
        setStatus(true)
        setUploading(false);
      })
      .catch(console.log);
  }

  return (
    <main className='w-full h-[100vh] bg-[#F4F4F4] flex flex-col items-center justify-evenly'>
      <div className='text-center'>
        <h1 className='font-black text-2xl'>Verify Your Email</h1>
        <p className='font-light'>Please Verify your email address to complete registration</p>
      </div>
      <div className='w-[90%] md:w-[70%] lg:w-1/2 p-[5px] h-[70%] md:h-[60%] bg-white flex flex-col items-center justify-evenly'>
        {/* {!loading ? <>
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
        />} */}
        {
          uploading ? <MutatingDots
            height="100"
            width="100"
            color="#4fa94d"
            secondaryColor='#4fa94d'
            radius='12.5'
            ariaLabel="mutating-dots-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          /> : status ? <><h1 className='font-bold text-xl text-center'>A Verification Link has been sent!</h1>
            <img src={MessageSent} alt="verified-succesfully" />
            <div>
              <p className='font-light text-[#6C6C6C] text-center'>No email recieved?</p>
              <p className='font-light text-[#6C6C6C] text-center'>Please check the spam folder or re-check the email before entering</p>
              <p className='text-sm text-center mt-[3px]'>
                Didn't recieved an email?{' '}
                <span className='underline cursor-pointer' onClick={() => setStatus(false)}>
                  Re-try
                </span>
              </p>
            </div></> : <><h1 className='font-bold text-xl text-center'>Please enter your email address!</h1>
            <form className='lg:w-[50%] md:w-[70%] w-[90%]' onSubmit={submitFormHandler}>
              <Field
                hasError={emailValidator.hasError}
                errorMsg='Enter a valid email address'
                onChange={emailValidator.valueChangeHandler}
                onBlur={emailValidator.inputBlurHandler}
                value={emailValidator.inputValue}
                ref={emailValidator.inputRef as RefObject<HTMLInputElement>}
                id='email'
                type='text'
                label='Email'
              />
              <button className='register-btn-2 w-full'>Submit</button>
            </form>
            <div className='lg:w-[50%] md:w-[70%] w-[90%] text-center'>
              <p className='font-light text-[#6C6C6C] text-center'>We will send a verification link to this email address</p>
              <p className='my-[3px] text-sm'>
                Don't have an account?{' '}
                <Link to='/signup' className='underline'>
                  Register
                </Link>
              </p>
              <p className='text-sm'>
                Already have an account?{' '}
                <Link to='/login' className='underline'>
                  Login
                </Link>
              </p></div></>
        }


      </div>
    </main>
  )
}

export default Verify