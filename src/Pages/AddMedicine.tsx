import React, {
	ChangeEventHandler,
	FocusEventHandler,
	forwardRef,
	LegacyRef,
	RefObject,
	useEffect,
	useState,
} from 'react';
import Dropzone from 'react-dropzone';
import { BsCloudUploadFill } from 'react-icons/bs';
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
				<form>
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
							<div className='mb-[15px] md:hidden'>
								<label className='text-xs'>Image*</label>
								<Dropzone onDrop={console.log}>
									{({ getRootProps, getInputProps }) => (
										<section
											className='w-full h-max py-[10px] md:aspect-square border-gray-300 border-2 rounded-sm px-3 text-center items-center flex flex-col justify-center cursor-pointer'
											{...getRootProps()}
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
							</div>
							<div className='flex justify-between mb-[15px] md:flex-row-reverse'>
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
						<div className='hidden md:block'>
							<label className='text-xs'>Image*</label>
							<Dropzone onDrop={console.log}>
								{({ getRootProps, getInputProps }) => (
									<section
										className='w-[175px] h-max py-[10px] md:aspect-square border-gray-300 border-2 rounded-sm px-3 text-center items-center flex flex-col justify-center cursor-pointer'
										{...getRootProps()}
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
						</div>
						<div />
					</div>
				</form>
			)}
		</div>
	);
};

export default AddMedicine;
