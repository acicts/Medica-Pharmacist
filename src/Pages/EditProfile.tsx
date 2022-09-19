import React, {
	ChangeEventHandler,
	FocusEventHandler,
	forwardRef,
	LegacyRef,
	RefObject,
} from 'react';
import useInput from '../hooks/useInput';
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
	const pharmacyNameValidator = useInput(
		(inputVal) => inputVal.trim().length > 0
	);
	const emailValidator = useInput(
		(inputVal) => inputVal.trim().length > 0 && inputVal.includes('@')
	);
	const noValidator = useInput((inputVal) => inputVal.trim().length > 10);
	const addressValidator = useInput((inputVal) => inputVal.trim().length > 0);
	return (
		<div>
			<section className='mb-[15px] md:mb-[30px]'>
				<h1 className='text-2xl font-bold'>Edit Profile</h1>
				<p className='text-xs'>Edit your profile Information</p>
			</section>
			<section className='w-full rounded-md border-[1px] border-solid border-[#6C6C6C] bg-[#FFFF] p-[15px]'>
				<form className='w-full flex items-start justify-between flex-col md:flex-row'>
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
						<input type='file' id='profilePic' className='hidden' />
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
