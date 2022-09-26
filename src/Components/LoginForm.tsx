import {
	ChangeEventHandler,
	FocusEventHandler,
	FormEventHandler,
	forwardRef,
	LegacyRef,
	RefObject,
	useContext,
	useState,
} from 'react';
import { Link } from 'react-router-dom';
import { authContext } from '../Context/authContext';
import useInput from '../hooks/useInput';

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
	const pwdValidator = useInput((inputVal) => inputVal.length >= 6);

	const [uploading, setUploading] = useState(false);
	const authCtx = useContext(authContext);

	const formSubmitHandler: FormEventHandler = async (e) => {
		e.preventDefault();
		setUploading(true);
		// if (!emailValidator.isInputValid) return emailValidator.focusHandler();
		// if (!pwdValidator.isInputValid) return pwdValidator.focusHandler();
		// setUploading(true);
		// const body = JSON.stringify({
		// 	email: emailValidator.inputValue,
		// 	password: pwdValidator.inputValue,
		// });

		// const url = `${process.env.REACT_APP_API_ENDPOINT}/pharmacist/login`;

		// const response = await fetch(url, {
		// 	method: 'POST',
		// 	body,
		// 	headers: {
		// 		'Content-Type': 'application/json',
		// 	},
		// });

		// const data = await response.json();
		// setUploading(false);
		// if (data.success) {
		// 	authCtx.login(data.token, data.expiresIn);
		// } else {
		// 	alert(data.message);
		// }
		authCtx.login(
			'dummyToken',
			(new Date().getTime() + 172800000).toString()
		);
		setUploading(false);
	};
	return (
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
				<Field
					hasError={pwdValidator.hasError}
					errorMsg='Password length >= 6'
					onChange={pwdValidator.valueChangeHandler}
					onBlur={pwdValidator.inputBlurHandler}
					value={pwdValidator.inputValue}
					ref={pwdValidator.inputRef as RefObject<HTMLInputElement>}
					id='pwd'
					type='password'
					label='Password'
				/>
			</div>

			<div className=''>
				<button type='submit' className='register-btn'>
					{uploading ? 'Authenticating...' : 'Login'}
				</button>
				<div className='font-light text-[#2F8D76] mb-[15px]'>
					<p className='my-[3px]'>
						Don't have an account?{' '}
						<Link to='/signup' className='underline'>
							Register
						</Link>
					</p>
					<p>
						Forgot your password?{' '}
						<Link to='/reset/request' className='underline'>
							Reset
						</Link>
					</p>
				</div>
			</div>
		</form>
	);
};

export default LoginForm;
