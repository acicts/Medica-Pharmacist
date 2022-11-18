import { Dispatch, RefObject, SetStateAction } from 'react';
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

export const ContactSection = ({
	validators,
	setLogo,
	logo,
	setLogoURL,
	logoURL
}: {
	validators: Array<any>;
	setLogo: Dispatch<SetStateAction<File | undefined>>;
	logo: File | undefined
	setLogoURL: Dispatch<SetStateAction<string | undefined>>;
	logoURL: string | undefined
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
				}} >
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
			</div>
		</section>
	);
};

export const VerificationDataSection = ({
	validators,
	setPassImg,
	passImg,
	setPassImgURL,
	passImgURL
}: {
	validators: Array<any>;
	setPassImg: Dispatch<SetStateAction<File | undefined>>;
	passImg: File | undefined
	setPassImgURL: Dispatch<SetStateAction<string | undefined>>;
	passImgURL: string | undefined
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
				}}>
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
