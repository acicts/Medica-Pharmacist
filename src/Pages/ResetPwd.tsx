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
import { Link, useNavigate, useParams } from 'react-router-dom';
import useInput from '../hooks/useInput';
import { toast } from 'react-toastify';
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
			<div className="flex flex-col text-gray-500 focus-within:text-[#5E9486] w-full my-[15px]">
				<label htmlFor={id} className="text-sm mb-[4px] text-[#6C6C6C]">
					{label}
				</label>
				<input
					type={type}
					onChange={onChange}
					onBlur={onBlur}
					value={value}
					id={id}
					ref={ref}
					className="focus:border-[#5E9486] rounded-md border-2 border-[#BCBCBC] w-full min-w-[300px] h-10 px-3 text-black"
				/>
				{hasError && (
					<span className="text-red-500 text-xs">{errorMsg}</span>
				)}
			</div>
		);
	}
);

const Form = () => {
	const { token } = useParams();
	const pwd1Validator = useInput((inputVal) => inputVal.length >= 6);
	const pwd2Validator = useInput(
		(inputVal) => inputVal === pwd1Validator.inputValue
	);

	const [uploading, setUploading] = useState(false);

	const navigate = useNavigate();

	const formSubmitHandler: FormEventHandler = async (e) => {
		e.preventDefault();
		if (!pwd1Validator.isInputValid) return pwd1Validator.focusHandler();
		if (!pwd2Validator.isInputValid) return pwd2Validator.focusHandler();
		setUploading(true);
		const body = JSON.stringify({
			password1: pwd1Validator.inputValue,
			password2: pwd2Validator.inputValue,
		});

		const url = `${process.env.REACT_APP_API_ENDPOINT}/pharmacist/reset/pwd/${token}`;

		axios
			.post(url, body, {
				headers: { 'Content-Type': 'application/json' },
			})
			.then((response) => {
				console.log(response);
				if (response.data.success) {
					toast.success(response.data.message);
					navigate('/login');
				} else {
					toast.error(response.data.message);
				}

				setUploading(false);
			})
			.catch(console.log);
	};
	return (
		<>
			<form
				onSubmit={formSubmitHandler}
				className="flex flex-col min-h-[80vh] md:min-h-[70vh] items-start justify-between w-full"
			>
				<div>
					<Field
						hasError={pwd1Validator.hasError}
						errorMsg="Password length >= 6"
						onChange={pwd1Validator.valueChangeHandler}
						onBlur={pwd1Validator.inputBlurHandler}
						value={pwd1Validator.inputValue}
						ref={
							pwd1Validator.inputRef as RefObject<HTMLInputElement>
						}
						id="pwd1"
						type="password"
						label="Enter a password"
					/>
					<Field
						hasError={pwd2Validator.hasError}
						errorMsg="Password are not matching"
						onChange={pwd2Validator.valueChangeHandler}
						onBlur={pwd2Validator.inputBlurHandler}
						value={pwd2Validator.inputValue}
						ref={
							pwd2Validator.inputRef as RefObject<HTMLInputElement>
						}
						id="pwd2"
						type="password"
						label="Re-enter the password"
					/>
				</div>

				<div className="">
					<button type="submit" className="register-btn">
						{uploading ? (
							<Circles
								height="20"
								width="20"
								color="#FFF"
								ariaLabel="circles-loading"
								wrapperStyle={{
									margin: 'auto',
									width: 'max-content',
								}}
								wrapperClass=""
								visible={true}
							/>
						) : (
							'Request'
						)}
					</button>
					<div className="font-light text-[#2F8D76] mb-[15px]">
						<p className="my-[3px]">
							Don't have an account?{' '}
							<Link to="/signup" className="underline">
								Register
							</Link>
						</p>
						<p>
							Already have an account?{' '}
							<Link to="/login" className="underline">
								Login
							</Link>
						</p>
					</div>
				</div>
			</form>
		</>
	);
};

const ResetPWD = () => {
	return (
		<div className="flex w-full items-end justify-between lg:items-center h-[100vh]">
			<div className="custom-scroll-bar md:w-[49.7%] w-full lg:px-[40px] md:px-[20px] sm:px-[10%]  px-[20px] overflow-y-scroll h-[100vh]">
				<img
					src="/logo.png"
					alt="logo"
					className="md:mt-[45px] md:w-[200px] sm:w-[175px] w-[125px] relative left-[50%] translate-x-[-50%] mt-[25px] md:static md:left-0 md:translate-x-0 md:top-0"
				/>
				<p className="my-[35px] text-[2rem] font-black  w-full text-left sm:text-center md:text-left text-[#1E1E1E]">
					Reset Password
				</p>
				<Form />
			</div>

			<div className="w-6/12 h-[100vh] bg-[url('https://images.unsplash.com/photo-1587854692152-cbe660dbde88?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8bWVkaWNpbmV8ZW58MHx8MHx8&w=1000&q=80')] bg-cover bg-center hidden md:block" />
		</div>
	);
};

export default ResetPWD;
