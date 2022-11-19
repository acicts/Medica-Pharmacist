import axios from 'axios';
import React, {
	ChangeEventHandler,
	FocusEventHandler,
	FormEventHandler,
	forwardRef,
	LegacyRef,
	RefObject,
	useContext,
	useEffect,
	useState,
} from 'react';
import Dropzone from 'react-dropzone';
import { BsCloudUploadFill } from 'react-icons/bs';
import { Circles } from 'react-loader-spinner';
import { useNavigate } from 'react-router-dom';
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
interface selectProps {
	onChange: ChangeEventHandler<HTMLSelectElement>;
	onBlur: FocusEventHandler<HTMLSelectElement>;
	hasError: boolean;
	errorMessage: string;
	options: string[];
	defaultValue: string;
	label: string | undefined;
}
const Input = forwardRef(
	(props: inputProps, ref: LegacyRef<HTMLInputElement>) => {
		return (
			<div className='w-full mb-[15px] last:mb-[0px]'>
				<label className=' text-xs'>{props.placeholder}</label>
				<input
					ref={ref}
					onChange={props.onChange}
					onBlur={props.onBlur}
					type={props.type}
					value={props.value}
					className='border-[#01A768] mx-auto border-[1px] border-solid bg-[#E8F2F2] rounded-sm block p-[9px] w-full text-left'
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

const getBase64 = (file: File | undefined, cb: any) => {
	if (!file) return cb('');
	let reader = new FileReader()
	reader.readAsDataURL(file!)
	reader.onload = () => {
		cb(reader.result)
	};
	reader.onerror = function (error) {
		cb(error)
	}

}

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
					className='border-[#01A768] bg-[#E8F2F2] text-[#01A768]  mx-auto form-input border-[1px] border-solid w-full rounded-sm p-[9px]'
				>
					{options.map((_item) => {
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
					className='border-[#01A768] bg-[#E8F2F2] resize-none border-[1px] border-solid w-full rounded-sm p-[5px]'
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

const AddMedicine = () => {
	const [medicines, setMedicines] = useState([]);
	const [loading, setLoading] = useState(true);
	const authCtx = useContext(authContext)
	const medicineNameValidator = useInput(
		(inputVal) => inputVal.trim().length > 0
	);
	const manufacturerValidator = useInput(
		(inputVal) => inputVal.trim().length > 0
	);
	const qtyValidator = useInput(
		(inputVal) => inputVal.toString().trim().length > 0
	);
	const sciNameValidator = useInput(
		(inputVal) =>
			inputVal.trim().length > 0 && inputVal !== '-- Scientific Names --'
	);
	const desctiptionValidator = useInput(() => true);
	const [image, setImage] = useState<File>();
	const [imageFocused, setImageFocused] = useState(false);

	const imageError = imageFocused && !image;
	const [imgURL, setImageURL] = useState('');
	useEffect(() => {
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
	}, []);

	const [uploading, setUploading] = useState(false)

	const uploadHandler: FormEventHandler = (e) => {
		e.preventDefault();
		if (!medicineNameValidator.isInputValid)
			return medicineNameValidator.focusHandler();
		if (!qtyValidator.isInputValid) return qtyValidator.focusHandler();
		if (!sciNameValidator.isInputValid) return sciNameValidator.focusHandler();
		if (!manufacturerValidator.isInputValid)
			return manufacturerValidator.focusHandler();
		if (!image) return setImageFocused(true);

		setUploading(true)

		const formData = new FormData();
		formData.append('manufacturer', manufacturerValidator.inputValue);
		formData.append('name', medicineNameValidator.inputValue);
		formData.append('description', desctiptionValidator.inputValue);
		formData.append('stock', qtyValidator.inputValue);
		formData.append('chemicalName', sciNameValidator.inputValue);
		formData.append('image', image as Blob);

		const url = `${process.env.REACT_APP_API_ENDPOINT}/pharmacist/medicine?token=${authCtx.token}`

		axios.post(url, formData).then((response) => {
			if (response.data.success) toast.success(response.data.message);
			medicineNameValidator.reset();
			qtyValidator.reset();
			sciNameValidator.reset()
			sciNameValidator.setInputValue('-- Scientific Names --');
			manufacturerValidator.reset();
			desctiptionValidator.reset();
			setUploading(false)
		})
	};

	const navigate = useNavigate()
	return (
		<div>
			<section className='mb-[25px]'>
				<h1 className='text-2xl font-bold'>Add New Medicine</h1>
				<p className='text-xs'>
					*All fields are required, except mentioned as (Optional)
				</p>
			</section>
			{loading ? (
				<div>Loading...</div>
			) : (
				<form onSubmit={uploadHandler}>
					<div className='w-full block md:flex justify-between'>
						<div className='w-full md:w-[calc(100%_-_250px)]'>
							<Input
								placeholder='Medicine Name*'
								type='text'
								onChange={
									medicineNameValidator.valueChangeHandler
								}
								onBlur={medicineNameValidator.inputBlurHandler}
								ref={
									medicineNameValidator.inputRef as RefObject<HTMLInputElement>
								}
								hasError={medicineNameValidator.hasError}
								errorMessage='Please enter a valid name'
								value={medicineNameValidator.inputValue}
							/>
							<Input
								placeholder='Quantity*'
								type='number'
								onChange={qtyValidator.valueChangeHandler}
								onBlur={qtyValidator.inputBlurHandler}
								ref={
									qtyValidator.inputRef as RefObject<HTMLInputElement>
								}
								hasError={qtyValidator.hasError}
								errorMessage='Please enter a valid quantity'
								value={qtyValidator.inputValue}
							/>
							<DropDown
								hasError={sciNameValidator.hasError}
								options={medicines}
								errorMessage='Please select the scientific name of the medicine'
								label='Select Scientific Name*'
								onChange={sciNameValidator.valueChangeHandler}
								onBlur={sciNameValidator.inputBlurHandler}
								defaultValue='-- Scientific Names --'
							/>
							<Input
								placeholder='Manufacturer*'
								type='text'
								onChange={
									manufacturerValidator.valueChangeHandler
								}
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
								onChange={
									desctiptionValidator.valueChangeHandler
								}
								onBlur={desctiptionValidator.inputBlurHandler}
								ref={
									desctiptionValidator.inputRef as RefObject<HTMLTextAreaElement>
								}
								hasError={desctiptionValidator.hasError}
								errorMessage='Please enter a description'
								value={desctiptionValidator.inputValue}
							/>
							<div className='mb-[15px] md:hidden' onBlur={() => setImageFocused(true)}>
								<label className='text-xs'>Image*</label>
								<Dropzone onDrop={(files) => {
									setImage(files[0]); getBase64(files[0], setImageURL)
								}}>
									{({ getRootProps, getInputProps }) => (
										<section
											className="w-full h-max py-[10px] md:aspect-square border-gray-300 border-2 rounded-sm px-3 text-center items-center flex flex-col justify-center cursor-pointer relative before:content-[''] before:absolute before:w-full before:h-max before:bg-white before:bg-opacity-70 before:rounded-sm"
											{...getRootProps()}
											style={{
												backgroundPosition: 'center',
												backgroundSize: 'cover',
												backgroundRepeat: 'no-repeat',
												backgroundImage: `url(${imgURL})`
											}}
										>
											<BsCloudUploadFill
												className='w-24 h-12'
												fill='#6c6c6c'
											/>
											<input
												{...getInputProps()}
												accept='image/png, image/jpg, image/jpeg'
											/>
											{
												<p className='text-[#6C6C6C] text-[0.8rem]'>
													Upload JPG, JPEG, PNG file
												</p>
											}
										</section>
									)}
								</Dropzone>
								{imageError && <p className='text-red-500 text-xs'>
									<sup>*</sup>
									Please attach an image
								</p>}
							</div>
							<div className='flex justify-between mb-[15px] md:flex-row-reverse'>
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
						<div className='hidden md:block' onBlur={() => setImageFocused(true)}>
							<label className='text-xs'>Image*</label>
							<Dropzone onDrop={(files) => {
								setImage(files[0]); getBase64(files[0], setImageURL)
							}} >
								{({ getRootProps, getInputProps }) => (
									<section
										className="w-[175px] h-max py-[10px] md:aspect-square border-gray-300 border-2 rounded-sm px-3 text-center items-center flex flex-col justify-center cursor-pointer relative before:content-[''] before:absolute before:w-[175px] before:aspect-square before:bg-white before:bg-opacity-70 before:rounded-sm"
										{...getRootProps()}
										style={{
											backgroundPosition: 'center',
											backgroundSize: 'cover',
											backgroundRepeat: 'no-repeat',
											backgroundImage: `url(${imgURL})`
										}}
									>
										<BsCloudUploadFill
											className='w-24 h-12'
											fill='#6c6c6c'
										/>
										<input
											{...getInputProps()}
											accept='image/png, image/jpg, image/jpeg'
										/>
										{
											<p className='text-[#6C6C6C] text-[0.8rem]'>
												Upload JPG, JPEG, PNG file
											</p>
										}
									</section>
								)}
							</Dropzone>
							{imageError && <p className='text-red-500 text-xs'>
								<sup>*</sup>
								Please attach an image
							</p>}
						</div>
						<div />
					</div>
				</form>
			)}
		</div>
	);
};

export default AddMedicine;
