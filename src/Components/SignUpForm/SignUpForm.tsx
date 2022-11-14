import { FormEventHandler, useState } from 'react';
import { Link } from 'react-router-dom';
import useInput from '../../hooks/useInput';
import {
	ContactSection,
	CredentialsSection,
	VerificationDataSection,
} from './Sections';
import axios from 'axios';

const SignupForm = () => {
	const [currSection, setCurrSection] = useState(0);
	const sections = [0, 1, 2];

	const [logo, setLogo] = useState<File>();
	const [passImg, setPassImg] = useState<File>();

	const contactValidators = [
		{
			...useInput((inputVal) => inputVal.trim().length > 0),
			errorMsg: 'Enter a valid name',
			id: 'shopName',
			type: 'text',
			label: 'Shop Name',
		},
		{
			...useInput((inputVal) => inputVal.trim().length > 0),
			errorMsg: 'Enter a valid address',
			id: 'address',
			type: 'text',
			label: 'Address',
		},
		{
			...useInput(
				(inputVal) =>
					inputVal.trim().length === 10 && !isNaN(parseInt(inputVal))
			),
			errorMsg: 'Enter a valid number',
			id: 'number',
			type: 'number',
			label: 'Contact Number',
		},
	];

	const verificationDataValidators = [
		{
			...useInput((inputVal) => inputVal.trim().length > 0),
			errorMsg: 'Enter a valid ID',
			id: 'pharmacyPassId',
			type: 'text',
			label: 'Pharmacy ID',
		},
	];

	const authenticationDataValidatos = [
		{
			...useInput(
				(inputVal) =>
					inputVal.trim().length > 0 && inputVal.includes('@')
			),
			errorMsg: 'Enter a valid email address',
			id: 'email',
			type: 'text',
			label: 'Email',
		},
		{
			...useInput((inputVal) => inputVal.trim().length > 5),
			errorMsg: 'Password length should be > 5',
			id: 'password',
			type: 'password',
			label: 'Password',
		},
	];

	const formSubmitHandler: FormEventHandler = (e) => {
		e.preventDefault();

		for (let i = 0; i < authenticationDataValidatos.length; i++) {
			if (!authenticationDataValidatos[i].isInputValid) {
				return authenticationDataValidatos[i].focusHandler();
			}
		}
		const formData: any = new FormData();
		formData.append('logo', logo);
		formData.append('pharmacyPassImg', passImg);
		formData.append('host', window.location.origin)

		contactValidators.forEach((validator) => {
			formData.append(validator.id, validator.inputValue);
		});

		authenticationDataValidatos.forEach((validator) => {
			formData.append(validator.id, validator.inputValue);
		});

		verificationDataValidators.forEach((validator) => {
			formData.append(validator.id, validator.inputValue);
		});
		const url = `${process.env.REACT_APP_API_ENDPOINT}/pharmacist/register`;
		console.log(url);
		axios
			.post(url, formData)
			.then((response) => {
				console.log(response);
			})
			.catch(console.log);
	};

	const sectionIncrementHanlder = () => {
		if (currSection === 0) {
			for (let i = 0; i < contactValidators.length; i++) {
				if (!contactValidators[i].isInputValid) {
					return contactValidators[i].focusHandler();
				}
			}
		} else if (currSection === 1) {
			for (let i = 0; i < verificationDataValidators.length; i++) {
				if (!verificationDataValidators[i].isInputValid) {
					return verificationDataValidators[i].focusHandler();
				}
			}
		}
		setCurrSection((curr) => curr + 1);
	};

	return (
		<form
			onSubmit={formSubmitHandler}
			className='min-h-[80vh] md:min-h-[70vh] flex flex-col items-start justify-between w-full'
		>
			{currSection === 0 ? (
				<ContactSection
					validators={contactValidators}
					setLogo={setLogo}
				/>
			) : currSection === 1 ? (
				<VerificationDataSection
					validators={verificationDataValidators}
					setPassImg={setPassImg}
				/>
			) : (
				<CredentialsSection validators={authenticationDataValidatos} />
			)}
			<div className='w-full'>
				<div className='flex items-end justify-between w-[40px] ml-[5px] mt-[45px] mb-[15px]'>
					{sections.map((section) => (
						<div
							className={`w-[8px] h-[8px] transition-colors rounded-full ${currSection === section
								? 'bg-[#2F8D76]'
								: 'bg-gray-400'
								}`}
						/>
					))}
				</div>
				<div className='flex items-center justify-between w-52 md:w-80'>
					{currSection !== 0 && (
						<button
							type='button'
							onClick={() => setCurrSection(currSection - 1)}
							className='register-btn'
						>
							Back
						</button>
					)}
					{currSection === 2 ? (
						<input
							type='submit'
							className='register-btn'
							value='Sign Up'
						/>
					) : (
						<button
							onClick={sectionIncrementHanlder}
							type='button'
							className='register-btn'
						>
							Next
						</button>
					)}
				</div>
				<div className='font-light text-[#2F8D76] mb-[15px]'>
					<p>
						Already have an account?{' '}
						<Link to='/login' className='underline'>
							Login
						</Link>
					</p>
				</div>
			</div>
		</form>
	);
};

export default SignupForm;
