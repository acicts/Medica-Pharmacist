import axios from 'axios';
import React, {
	ChangeEventHandler,
	FocusEventHandler,
	FormEventHandler,
	forwardRef,
	LegacyRef,
	RefObject,
	useCallback,
	useContext,
	useEffect,
	useState,
} from 'react';
import { Bars, Circles } from 'react-loader-spinner';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { authContext } from '../Context/authContext';
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

interface selectProps {
	onChange: ChangeEventHandler<HTMLSelectElement>;
	onBlur: FocusEventHandler<HTMLSelectElement>;
	hasError: boolean;
	errorMessage: string;
	options: string[];
	defaultValue: string;
	label: string | undefined;
}

const TextArea = forwardRef(
	(props: inputProps, ref: LegacyRef<HTMLTextAreaElement>) => {
		return (
			<div className='w-full mb-[15px]'>
				<label className='text-xs'>{props.placeholder}</label>
				<textarea
					ref={ref}
					onChange={
						props.onChange as ChangeEventHandler<HTMLTextAreaElement>
					}
					onBlur={props.onBlur}
					rows={6}
					value={props.value}
					className='border-gray-500 bg-[#F6FFF3] resize-none border-[1px] border-solid w-full rounded-sm p-[5px]'
				></textarea>
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

const DropDown = forwardRef(
	(props: selectProps, ref: LegacyRef<HTMLSelectElement>) => {
		const options = [props.defaultValue, ...props.options];
		return (
			<div className='w-full mb-[15px]'>
				{props.label && (
					<label className='text-xs text-primary block'>
						{props.label}
					</label>
				)}
				<select
					onChange={props.onChange}
					onBlur={props.onBlur}
					defaultValue={
						props.defaultValue.length > 0
							? props.defaultValue
							: '---'
					}
					ref={ref}
					className='border-gray-500 bg-[#F6FFF3]  mx-auto form-input border-[1px] border-solid w-full rounded-sm p-[9px]'
				>
					{options.length > 0 &&
						options.map((_item) => {
							return <option value={_item}>{_item}</option>;
						})}
				</select>
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
	const [medicines, setMedicines] = useState([]);
	const [qty, setQty] = useState(0);
	const [loading, setLoading] = useState(true);
	const [uploading, setUploading] = useState(false);
	const [imageUploading, setImageUploading] = useState(false);
	const { id } = useParams();
	const authCtx = useContext(authContext)
	const medicineNameValidator = useInput(
		(inputVal) => inputVal.trim().length > 0
	);
	const manufacturerValidator = useInput(
		(inputVal) => inputVal.trim().length > 0
	);
	const sciNameValidator = useInput(
		(inputVal) =>
			inputVal.trim().length > 0 && inputVal !== '-- Scientific Names --'
	);
	const desctiptionValidator = useInput((inputVal) => inputVal.length > 0);
	const [image, setImage] = useState('');
	const fetchMedicineData = useCallback(() => {
		const url = `${process.env.REACT_APP_API_ENDPOINT}/pharmacist/medicine/${id}?token=${authCtx.token}`;
		axios
			.get(url)
			.then((response) => {
				console.log(response);
				medicineNameValidator.setInputValue(response.data._medicine.name);
				manufacturerValidator.setInputValue(response.data._medicine.manufacturer);
				sciNameValidator.setInputValue(response.data._medicine.chemicalName);
				desctiptionValidator.setInputValue(response.data._medicine.description);
				setQty(response.data._medicine.stock)
				setImage(response.data._medicine.image.link)
				console.log(response.data._medicine.description)
			})
			.catch(console.log);
	}, [
		authCtx.token,
	]);
	useEffect(() => {
		setLoading(true)
		const fetchData = async () => {
			setLoading(true);
			const medicineURL =
				'https://raw.githubusercontent.com/dariusk/corpora/master/data/medicine/drugs.json';
			const medicineResponse = await fetch(medicineURL);
			const medicine = await medicineResponse.json();
			setMedicines(medicine.drugs);
			setLoading(false);
		};
		fetchData();
		fetchMedicineData();
		setLoading(false)
	}, []);

	const updateImageHandler: ChangeEventHandler<HTMLInputElement> = (e) => {
		setImageUploading(true)
		const url = `${process.env.REACT_APP_API_ENDPOINT}/pharmacist/medicine/image/${id}?token=${authCtx.token}`;
		const formData = new FormData();
		formData.append('image', e.target.files![0]);

		axios.put(url, formData).then((response) => {
			console.log(response)
			const data = response.data;
			if (data.success) {
				setImage(data.link)
			}
			setImageUploading(false)
		}).catch(console.log)
	}
	const updateMedicineHandler: FormEventHandler<HTMLFormElement> = (e) => {
		e.preventDefault();
		setUploading(true)
		const body = JSON.stringify({
			name: medicineNameValidator.inputValue,
			chemicalName: sciNameValidator.inputValue,
			description: desctiptionValidator.inputValue,
			stock: qty,
			manufacturer: manufacturerValidator.inputValue
		})

		const url = `${process.env.REACT_APP_API_ENDPOINT}/pharmacist/medicine/${id}?token=${authCtx.token}`;

		axios.put(url, body, {
			headers: {
				'Content-Type': 'application/json'
			}
		}).then((response) => {
			console.log(response)
			if (response.data.success) {
				toast.success(response.data.message)
			}
			else {
				toast.error(response.data.message)
			}
			setUploading(false)
		}).catch(console.log)
	}

	const navigate = useNavigate()
	return (
		loading ? <h1>Loading...</h1> : <div>
			<section className='mb-[15px] md:mb-[30px]'>
				<h1 className='text-2xl font-bold'>Edit Medicine</h1>
				<p className='text-xs'>Edit medicine details</p>
			</section>
			<section className='w-full rounded-md border-[1px] border-solid border-[#6C6C6C] bg-[#FFFF] p-[15px]'>
				<form onSubmit={updateMedicineHandler} className='w-full flex items-start justify-between flex-col md:flex-row'>
					<div className='w-full flex items-start justify-between mb-[15px] sm:flex-col md:w-min'>
						<span className='font-bold text-[#5E5E5E]'>Image</span>
						<label
							className='w-[125px] h-[125px] sm:w-[175px] sm:h-[175px] rounded-md relative'
							htmlFor='profilePic'
							style={{
								backgroundImage:
									`url(${image})`,
								backgroundSize: 'cover',
								backgroundPosition: 'center',
								backgroundRepeat: 'no-repeat',
							}}
						>
							<div className='bg-black text-sm bg-opacity-30 text-white rounded-b-md  w-full py-[5px] text-center absolute bottom-0 left-0'>
								{imageUploading ? <Circles
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
								/> : 'Upload Image'}
							</div>
						</label>
						<input type='file' id='profilePic' className='hidden' onChange={updateImageHandler} />
					</div>
					<div className='w-full md:w-[60%]'>
						<span className='font-bold text-[#5E5E5E] mb-[15px]'>
							Pharmacy Information
						</span>
						<hr color='#5E5E5E' />
						<Input
							placeholder='Medicine Name*'
							type='text'
							onChange={medicineNameValidator.valueChangeHandler}
							onBlur={medicineNameValidator.inputBlurHandler}
							ref={
								medicineNameValidator.inputRef as RefObject<HTMLInputElement>
							}
							hasError={medicineNameValidator.hasError}
							errorMessage='Please enter a valid name'
							value={medicineNameValidator.inputValue}
						/>
						<div className='mb-[15px] w-full'>
							<label className='text-xs'>Quantity*</label>
							<div className='block'>
								<span className='text-xl font-bold pl-[15px]'>
									{qty}
								</span>
								<div className='flex'>
									<button
										onClick={() => {
											setQty((curr) => curr + 1);
										}}
										type='button'
										className='text-center w-[40px] h-[40px] flex items-center rounded-full justify-center mr-[10px] border-md bg-emerald-900 text-white'
									>
										+
									</button>
									<button
										onClick={() => {
											if (qty > 0)
												setQty((curr) => curr - 1);
										}}
										type='button'
										className='text-center w-[40px] h-[40px] flex items-center rounded-full justify-center border-md bg-gray-300'
									>
										-
									</button>
								</div>
							</div>
						</div>
						<DropDown
							hasError={sciNameValidator.hasError}
							options={medicines}
							errorMessage='Please select the scientific name of the medicine'
							label='Select Scientific Name*'
							onChange={sciNameValidator.valueChangeHandler}
							onBlur={sciNameValidator.inputBlurHandler}
							defaultValue={
								loading ? 'Loading...' : sciNameValidator.inputValue
							}
						/>
						<Input
							placeholder='Manufacturer*'
							type='text'
							onChange={manufacturerValidator.valueChangeHandler}
							onBlur={manufacturerValidator.inputBlurHandler}
							ref={
								manufacturerValidator.inputRef as RefObject<HTMLInputElement>
							}
							hasError={manufacturerValidator.hasError}
							errorMessage='Please enter manufacturers name'
							value={manufacturerValidator.inputValue}
						/>

						<TextArea
							placeholder='Description(optional)'
							type='text'
							onChange={desctiptionValidator.valueChangeHandler}
							onBlur={desctiptionValidator.inputBlurHandler}
							ref={
								desctiptionValidator.inputRef as RefObject<HTMLTextAreaElement>
							}
							hasError={desctiptionValidator.hasError}
							errorMessage='Please enter a description'
							value={desctiptionValidator.inputValue} />
						<div className='flex justify-between mb-[15px]'>
							<div />
							<div className='flex'>
								<button
									type='submit'
									className='text-center w-[100px] mr-[10px] p-[5px] border-md bg-emerald-900 text-white'
								>
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
									/> : 'Save'}
								</button>
								<button onClick={() => navigate(-1)} type='button' className='text-center w-[100px] p-[5px] border-md bg-gray-300'>
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
