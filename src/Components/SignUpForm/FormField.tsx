import {
	ChangeEventHandler,
	FocusEventHandler,
	forwardRef,
	LegacyRef,
} from 'react';

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

export default Field;
