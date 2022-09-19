import React from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import MedTable from '../Components/Medicine/Table';
import { Link } from 'react-router-dom';

const Medicine = () => {
	return (
		<div>
			<div className='flex md:flex md:items-center md:justify-between'>
				<div className='sm:min-w-0 flex-1'>
					<h1 className='text-2xl font-bold sm:text-2xl width-auto'>
						List of Medicines
					</h1>
					<div className='row-span-1'>
						<p className='text-xs'>List of Medicines Available</p>
					</div>
				</div>

				<div className='mt-5 flex lg:mt-0 lg:ml-4'>
					<span className='sm:ml-3'>
						<Link to='/stocks/new'>
							<button
								type='button'
								className='inline-flex items-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-[#152927] focus:outline-none'
							>
								<AiOutlinePlus
									className='h-5 w-5 flex-shrink-0 text-white'
									aria-hidden='true'
								/>
								<p className='sm:flex hidden ml-1.5'>
									Add New Item
								</p>
							</button>
						</Link>
					</span>
				</div>
			</div>

			<MedTable placeholder='Search Inventory..' />
		</div>
	);
};

export default Medicine;
