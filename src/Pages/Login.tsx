import { toast, ToastContainer } from "react-toastify";
import LoginForm from "../Components/LoginForm";
const Login = () => {
  return (
    <div className="flex w-full items-end justify-between lg:items-center h-[100vh]">
      <div className="custom-scroll-bar md:w-[49.7%] w-full lg:px-[40px] md:px-[20px] sm:px-[10%]  px-[20px] overflow-y-scroll h-[100vh]">
        <img src="/logo.png" alt="logo" className="md:mt-[45px] md:w-[200px] sm:w-[175px] w-[125px] relative left-[50%] translate-x-[-50%] mt-[25px] md:static md:left-0 md:translate-x-0 md:top-0" />
        <p className="my-[35px] text-[2rem] font-black  w-full text-left sm:text-center md:text-left text-[#1E1E1E]">Login</p>
        <LoginForm />
      </div>

      <div className="w-6/12 h-[100vh] bg-[url('https://images.unsplash.com/photo-1583088580009-2d947c3e90a6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=689&q=80')] bg-cover bg-center hidden md:block" />
      <ToastContainer data-testid="toast" position={toast.POSITION.BOTTOM_RIGHT} />

    </div>
  )
}

export default Login