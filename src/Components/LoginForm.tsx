import { ReactNode } from 'react';
import { SubmitHandler, useForm, UseFormReturn } from 'react-hook-form';

type Inputs = {
	email: string;
	password: string;
};

interface Props {
	form: UseFormReturn<Inputs, object>;
	name: 'email' | 'password';
	children: ReactNode;
	type?: string;
	autofocus?: boolean;
}

const Field = ({
	form: { register, formState },
	children,
	name,
	type,
	autofocus,
}: Props) => {
	const { [name]: error } = formState.errors;
	return (
		<div className='flex flex-col text-gray-500 focus-within:text-[#5E9486] w-full my-[15px]'>
			<label htmlFor={name} className='text-sm mb-[4px] text-[#6C6C6C]'>
				{children}
			</label>
			<input
				{...register(name, { required: true })}
				type={type}
				autoFocus={autofocus}
				className='focus:border-[#5E9486] rounded-md border-2 border-[#BCBCBC] w-full min-w-[300px] h-10 px-3 text-black'
			/>
			{error && (
				<span className='text-red-500 text-xs'>
					This field is required
				</span>
			)}
		</div>
	);
};

const Fields = (props: { form: UseFormReturn<Inputs> }) => {
	return (
		<div>
			<Field form={props.form} name='email' type='email' autofocus>
				Email
			</Field>
			<Field form={props.form} name='password' type='password'>
				Password
			</Field>
		</div>
	);
};

const LoginForm = () => {
	const form = useForm<Inputs>();
	const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);
	return (
		<form
			onSubmit={form.handleSubmit(onSubmit)}
			className='flex flex-col min-h-[70vh] items-start justify-between w-full'
		>
			<Fields form={form} />
			<div className='flex items-center justify-between w-52 md:w-80'>
				<button type='submit' className='register-btn'>
					Submit
				</button>
			</div>
		</form>
	);
};

export default LoginForm;
