import React from 'react';
import { classNames } from '../../utils/utils';

// @ts-ignore
export function Button({ children, ...rest }) {
	return (
		<button
			type='button'
			className={classNames(
				'relative inline-flex  active:bg-gray-500 active:border-gray-300 justify-center items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50'
			)}
			{...rest}
		>
			{children}
		</button>
	);
}

// @ts-ignore
export function PageButton({ children, ...rest }) {
	return (
		<button
			type='button'
			className={classNames(
				'relative inline-flex items-center justify-center px-2 py-2 active:bg-gray-500 active:border-gray-300 text-sm font-medium text-gray-500 hover:bg-gray-50'
			)}
			{...rest}
		>
			{children}
		</button>
	);
}
