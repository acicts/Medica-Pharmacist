import { ChangeEventHandler, Dispatch, FocusEventHandler, forwardRef, LegacyRef, RefObject, SetStateAction } from 'react';
import Dropzone from 'react-dropzone';
import { BsCloudUploadFill } from 'react-icons/bs';
import Field from './FormField';

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

interface selectProps {
	onChange: ChangeEventHandler<HTMLSelectElement>;
	onBlur: FocusEventHandler<HTMLSelectElement>;
	hasError: boolean;
	errorMessage: string;
	options: string[];
	defaultValue: string;
	label: string | undefined;
}

const DropDown = forwardRef(
	(props: selectProps, ref: LegacyRef<HTMLSelectElement>) => {
		const options = [props.defaultValue, ...props.options];
		return (
			<div className='w-full mb-[15px]'>
				{props.label && (
					<label className='text-sm text-primary block text-gray-500 my-[4px]'>
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
					className='focus:border-[#5E9486] bg-white rounded-md border-2 border-[#BCBCBC] w-full min-w-[300px] h-10 px-3 text-[#474747] focus:text-[#5E9486]'
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

export const ContactSection = ({
	validators,
	setLogo,
	logo,
	setLogoURL,
	logoURL,
	logoFocused,
	setLogoFocused
}: {
	validators: Array<any>;
	setLogo: Dispatch<SetStateAction<File | undefined>>;
	logo: File | undefined
	setLogoURL: Dispatch<SetStateAction<string | undefined>>;
	logoURL: string | undefined;
	setLogoFocused: Dispatch<SetStateAction<boolean>>;
	logoFocused: boolean;
}) => {
	const logoHasError = logoFocused && !logo;
	return (
		<section>
			{validators.map((validator) => {
				return (
					validator.type === 'drop-down' ? <DropDown
						hasError={validator.hasError}
						options={validator.options}
						errorMessage={validator.errorMsg}
						label={validator.label}
						onChange={validator.valueChangeHandler}
						onBlur={validator.inputBlurHandler}
						defaultValue={validator.defaultValue}
					/> :
						<Field
							hasError={validator.hasError}
							errorMsg={validator.errorMsg}
							onChange={validator.valueChangeHandler}
							onBlur={validator.inputBlurHandler}
							value={validator.inputValue}
							ref={validator.inputRef as RefObject<HTMLInputElement>}
							id={validator.id}
							type={validator.type}
							label={validator.label}
						/>
				);
			})}
			<div className='w-full'>
				<label
					htmlFor='upload'
					className='text-gray-500 text-md text-center lg:text-left w-full'
				>
					Logo
				</label>

				<Dropzone onDrop={(files) => {
					setLogo(files[0]); getBase64(files[0], (path: any) => {
						setLogoURL(path)
					})
				}} onFileDialogCancel={() => setLogoFocused(true)}>
					{({ getRootProps, getInputProps }) => (
						<section

							className="aspect-square w-40 border-gray-300 border-2 rounded-xl px-3 text-center items-center flex flex-col justify-center cursor-pointer relative before:content-[''] before:absolute before:w-40 before:aspect-square before:bg-white before:bg-opacity-70 before:rounded-xl"
							{...getRootProps()}
							style={{
								backgroundPosition: 'center',
								backgroundSize: 'cover',
								backgroundRepeat: 'no-repeat',
								backgroundImage: `url(${logoURL})`
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
				{logoHasError && <p className='text-red-500 text-xs'>
					<sup>*</sup>
					Please attach an image
				</p>}
			</div>
		</section>
	);
};

export const VerificationDataSection = ({
	validators,
	setPassImg,
	passImg,
	setPassImgURL,
	passImgURL,
	setPassImgFocused,
	passImgFocused
}: {
	validators: Array<any>;
	setPassImg: Dispatch<SetStateAction<File | undefined>>;
	passImg: File | undefined
	setPassImgURL: Dispatch<SetStateAction<string | undefined>>;
	passImgURL: string | undefined;
	setPassImgFocused: Dispatch<SetStateAction<boolean>>;
	passImgFocused: boolean;
}) => {
	const imgHasError = passImgFocused && !passImg;

	return (
		<section>
			{validators.map((validator) => {
				return (
					<Field
						hasError={validator.hasError}
						errorMsg={validator.errorMsg}
						onChange={validator.valueChangeHandler}
						onBlur={validator.inputBlurHandler}
						value={validator.inputValue}
						ref={validator.inputRef as RefObject<HTMLInputElement>}
						id={validator.id}
						type={validator.type}
						label={validator.label}
					/>
				);
			})}
			<div className='w-full'>
				<label
					htmlFor='upload'
					className='text-gray-500 text-md text-center lg:text-left w-full'
				>
					Photo of the Pharmacy Pass
				</label>
				<Dropzone onDrop={(files) => {
					setPassImg(files[0]); getBase64(files[0], (path: any) => {
						setPassImgURL(path)
					})
				}} onFileDialogCancel={() => setPassImgFocused(true)}>
					{({ getRootProps, getInputProps }) => (
						<section
							className="aspect-square w-40 border-gray-300 border-2 rounded-xl px-3 text-center items-center flex flex-col justify-center cursor-pointer relative before:content-[''] before:absolute before:w-40 before:aspect-square before:bg-white before:bg-opacity-70 before:rounded-xl"
							{...getRootProps()}
							style={{
								backgroundPosition: 'center',
								backgroundSize: 'cover',
								backgroundRepeat: 'no-repeat',
								backgroundImage: `url(${passImgURL})`
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
				{imgHasError && <p className='text-red-500 text-xs'>
					<sup>*</sup>
					Please attach an image
				</p>}
			</div>
		</section>
	);
};

export const CredentialsSection = ({
	validators,
}: {
	validators: Array<any>;
}) => {
	return (
		<section>
			{validators.map((validator) => {
				return (
					<Field
						hasError={validator.hasError}
						errorMsg={validator.errorMsg}
						onChange={validator.valueChangeHandler}
						onBlur={validator.inputBlurHandler}
						value={validator.inputValue}
						ref={validator.inputRef as RefObject<HTMLInputElement>}
						id={validator.id}
						type={validator.type}
						label={validator.label}
					/>
				);
			})}
		</section>
	);
};
