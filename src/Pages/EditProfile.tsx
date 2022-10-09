import React, {
	ChangeEventHandler,
	FocusEventHandler,
	forwardRef,
	LegacyRef,
	RefObject,
	useState,
	useContext,
	useEffect,
	FormEventHandler
} from 'react';
import useInput from '../hooks/useInput';
import {authContext} from '../Context/authContext'
interface inputProps {
	placeholder: string;
	type: string;
	onChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
	onBlur: FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>;
	hasError: boolean;
	errorMessage: string;
	value: string | number;
}
const Input = forwardRef(
	(props: inputProps, ref: LegacyRef<HTMLInputElement>) => {
		return (
			<div className='w-full mb-[10px] md:mb-[15px] last:mb-[0px]'>
				<label className=' text-xs'>{props.placeholder}</label>
				<input
					ref={ref}
					onChange={props.onChange}
					onBlur={props.onBlur}
					type={props.type}
					value={props.value}
					className='border-gray-500  mx-auto border-[1px] border-solid bg-[#F6FFF3] rounded-md block p-[9px] w-full text-left'
				/>
				{props.hasError && (
					<p className='text-red-500 text-xs'>
						<sup>*</sup>
						{props.errorMessage}
					</p>
				)}
			</div>
		);
	}
);

const EditProfile = () => {
	const [currentUser,setCurrentUser] = useState()
	const [image,setImage] = useState([])
	const authCtx = useContext(authContext);
	const pharmacyNameValidator = useInput(
		(inputVal) => inputVal.trim().length > 0
	);
	const emailValidator = useInput(
		(inputVal) => inputVal.trim().length > 0 && inputVal.includes('@')
	);
	const noValidator = useInput((inputVal) => inputVal.trim().length > 10);
	const addressValidator = useInput((inputVal) => inputVal.trim().length > 0);
	useEffect(()=>{
		async function fetchData(){
			const url = `${process.env.REACT_APP_API_ENDPOINT}/profile?token=${authCtx.token}`;
			const response = await fetch(url, {
				method: 'GET'
			});

			const data = await response.json();
			if (data.success) {
				alert(data.message);
				setCurrentUser(data.user)
			} else {
				alert(data.message);
			}
		}
		fetchData()
	})
	const handleSubmit:FormEventHandler = async(e)=>{
		e.preventDefault();
		const pharmacyName = pharmacyNameValidator.inputValue
		const email = emailValidator.inputValue
		const contactNo = noValidator.inputValue
		const address = addressValidator.inputValue

		const formData: any = new FormData();
		formData.append('shopName', pharmacyName);
		formData.append('email', email);
		formData.append('contactNo', contactNo);
		formData.append('address', address);
		formData.append('image', image);

		//const url = `${process.env.REACT_APP_API_ENDPOINT}/profile?token=${authCtx.token}`;

		// const response = await fetch(url, {
		// 	method: 'POST',
		// 	body:formData,
		// 	headers: {
		// 		'Content-Type': 'x-www-form-urlencoded',
		// 	},
		// });

		// const data = await response.json();
		// if (data.success) {
		// 	alert(data.message);
		// } else {
		// 	alert(data.message);
		// }
	}
	return (
		<div>
			<section className='mb-[15px] md:mb-[30px]'>
				<h1 className='text-2xl font-bold'>Edit Profile</h1>
				<p className='text-xs'>Edit your profile Information</p>
			</section>
			<section className='w-full rounded-md border-[1px] border-solid border-[#6C6C6C] bg-[#FFFF] p-[15px]'>
				<form className='w-full flex items-start justify-between flex-col md:flex-row' onSubmit={handleSubmit}>
					<div className='w-full flex items-start justify-between mb-[15px] sm:flex-col md:w-min'>
						<span className='font-bold text-[#5E5E5E]'>Logo</span>
						<label
							className='w-[125px] h-[125px] sm:w-[175px] sm:h-[175px] rounded-md relative'
							htmlFor='profilePic'
							style={{
								backgroundImage:
									'url(https://img.freepik.com/premium-vector/pharmacy-logo-vector_23987-171.jpg)',
								backgroundSize: 'cover',
								backgroundPosition: 'center',
								backgroundRepeat: 'no-repeat',
							}}
						>
							<p className='bg-black text-sm bg-opacity-30 text-white rounded-b-md  w-full py-[5px] text-center absolute bottom-0 left-0'>
								Upload Image
							</p>
						</label>
						<input type='file' id='profilePic' className='hidden' onChange={(e:any)=>setImage(e.target.files[0])} />
					</div>
					<div className='w-full md:w-[60%]'>
						<span className='font-bold text-[#5E5E5E] mb-[15px]'>
							Pharmacy Information
						</span>
						<hr color='#5E5E5E' />
						<Input
							placeholder='Pharmacy Name'
							type='text'
							onChange={pharmacyNameValidator.valueChangeHandler}
							onBlur={pharmacyNameValidator.inputBlurHandler}
							ref={
								pharmacyNameValidator.inputRef as RefObject<HTMLInputElement>
							}
							hasError={pharmacyNameValidator.hasError}
							errorMessage='Please enter a valid name'
							value={pharmacyNameValidator.inputValue}
						/>
						<Input
							placeholder='Email Address'
							type='email'
							onChange={emailValidator.valueChangeHandler}
							onBlur={emailValidator.inputBlurHandler}
							ref={
								emailValidator.inputRef as RefObject<HTMLInputElement>
							}
							hasError={emailValidator.hasError}
							errorMessage='Please enter a valid email address'
							value={emailValidator.inputValue}
						/>
						<Input
							placeholder='Contact No'
							type='number'
							onChange={noValidator.valueChangeHandler}
							onBlur={noValidator.inputBlurHandler}
							ref={
								noValidator.inputRef as RefObject<HTMLInputElement>
							}
							hasError={noValidator.hasError}
							errorMessage='Please enter a valid number'
							value={noValidator.inputValue}
						/>
						<Input
							placeholder='Address'
							type='text'
							onChange={addressValidator.valueChangeHandler}
							onBlur={addressValidator.inputBlurHandler}
							ref={
								addressValidator.inputRef as RefObject<HTMLInputElement>
							}
							hasError={addressValidator.hasError}
							errorMessage='Please enter a valid address'
							value={addressValidator.inputValue}
						/>
						<div className='flex justify-between mb-[15px]'>
							<div />
							<div className='flex'>
								<button
									type='submit'
									className='text-center w-[100px] mr-[10px] p-[5px] border-md bg-emerald-900 text-white'
								>
									Save
								</button>
								<button className='text-center w-[100px] p-[5px] border-md bg-gray-300'>
									Cancel
								</button>
							</div>
						</div>
					</div>
				</form>
			</section>
		</div>
	);
};

export default EditProfile;
