import axios from 'axios';
import {
  ChangeEventHandler,
  FocusEventHandler,
  FormEventHandler,
  forwardRef,
  LegacyRef,
  RefObject,
  useState,
} from 'react';
import { Link } from 'react-router-dom';
import useInput from '../hooks/useInput';
import { toast } from 'react-toastify'
import { Circles } from 'react-loader-spinner';


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
        <label htmlFor={id} className='text-sm mb-[4px] text-[#6C6C6C]'>
          {label}
        </label>
        <input
          type={type}
          onChange={onChange}
          onBlur={onBlur}
          value={value}
          id={id}
          ref={ref}
          className='focus:border-[#5E9486] rounded-md border-2 border-[#BCBCBC] w-full min-w-[300px] h-10 px-3 text-black'
        />
        {hasError && (
          <span className='text-red-500 text-xs'>{errorMsg}</span>
        )}
      </div>
    );
  }
);

const LoginForm = () => {
  const emailValidator = useInput(
    (inputVal) => inputVal.trim().length > 0 && inputVal.includes('@')
  );

  const [uploading, setUploading] = useState(false);

  const formSubmitHandler: FormEventHandler = async (e) => {
    e.preventDefault();
    if (!emailValidator.isInputValid) return emailValidator.focusHandler();
    setUploading(true);
    const body = JSON.stringify({
      email: emailValidator.inputValue,
      host: window.location.origin
    });

    const url = `${process.env.REACT_APP_API_ENDPOINT}/pharmacist/reset/pwd/email`;

    axios
      .post(url, body, {
        headers: { 'Content-Type': 'application/json' },
      })
      .then((response) => {
        console.log(response);
        if (response.data.success) {
          toast.success(response.data.message)
        }
        else {
          toast.error(response.data.message)
        }
        emailValidator.reset();
        setUploading(false);
      })
      .catch(console.log);
  };
  return (
    <>
      <form
        onSubmit={formSubmitHandler}
        className='flex flex-col min-h-[80vh] md:min-h-[70vh] items-start justify-between w-full'
      >
        <div>
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
        </div>

        <div className=''>
          <button type='submit' className='register-btn'>
            {uploading ? <Circles
              height="20"
              width="20"
              color="#FFF"
              ariaLabel="circles-loading"
              wrapperStyle={{
                margin: 'auto',
                width: 'max-content'
              }}
              wrapperClass=""
              visible={true}
            /> : 'Request'}
          </button>
          <div className='font-light text-[#2F8D76] mb-[15px]'>
            <p className='my-[3px]'>
              Don't have an account?{' '}
              <Link to='/signup' className='underline'>
                Register
              </Link>
            </p>
            <p>
              Already have an account?{' '}
              <Link to='/login' className='underline'>
                Login
              </Link>
            </p>
          </div>
        </div>
      </form>
    </>

  );
};

const SendResetPwdEmail = () => {
  return (
    <div className="flex w-full items-end justify-between lg:items-center h-[100vh]">
      <div className="custom-scroll-bar md:w-[49.7%] w-full lg:px-[40px] md:px-[20px] sm:px-[10%]  px-[20px] overflow-y-scroll h-[100vh]">
        <img src="/logo.png" alt="logo" className="md:mt-[45px] md:w-[200px] sm:w-[175px] w-[125px] relative left-[50%] translate-x-[-50%] mt-[25px] md:static md:left-0 md:translate-x-0 md:top-0" />
        <p className="my-[35px] text-[2rem] font-black  w-full text-left sm:text-center md:text-left text-[#1E1E1E]">Reset Password</p>
        <LoginForm />
      </div>

      <div className="w-6/12 h-[100vh] bg-[url('https://images.unsplash.com/photo-1587854692152-cbe660dbde88?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8bWVkaWNpbmV8ZW58MHx8MHx8&w=1000&q=80')] bg-cover bg-center hidden md:block" />
    </div>
  )
}

export default SendResetPwdEmail
