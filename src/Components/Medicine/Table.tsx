import React, { useMemo, useEffect, useState, useContext} from 'react';
import { Link } from 'react-router-dom';
import {
	useTable,
	useGlobalFilter,
	useAsyncDebounce,
	useSortBy,
	usePagination,
} from 'react-table';
import { Stocks } from '../../dummyData/stocks';
import { Button, PageButton } from './Button';
import {
	AiOutlineSearch,
	AiOutlineEdit,
	AiOutlineDelete,
} from 'react-icons/ai';
import { DOTS, useCustomPagination } from '../../hooks/useCustomPagination';
import { authContext } from '../../Context/authContext';

export function GlobalFilter({
	globalFilter,
	preGlobalFilteredRows,
	setGlobalFilter,
	placeholder,
}: {
	globalFilter: any;
	setGlobalFilter: any;
	preGlobalFilteredRows: any;
	placeholder: any;
}) {
	const [value, setValue] = useState(globalFilter);
	const onChange = useAsyncDebounce((value) => {
		setGlobalFilter(value || undefined);
	}, 200);

	return (
		<form className='max-w-sm pt-5 mb-5'>
			<div className='relative w-full sm:w-[350px]'>
				<input
					value={value || ''}
					type='text'
					onChange={(e) => {
						setValue(e.target.value);
						onChange(e.target.value);
					}}
					placeholder='Search Inventory..'
					className='w-full h-10 py-3 pl-4 pr-4 text-gray-500 rounded-md outline-none bg-[#E3F3F2] border border-[#01A768]'
				/>
				<AiOutlineSearch className='absolute top-0 bottom-0 w-6 h-5 my-auto text-gray-900 right-3 flex-shrink-0' />
			</div>
		</form>
	);
}

export async function deleteItem(itemID: number, itemName: string) {
	if (window.confirm(`Are you sure, want to delete ${itemName}`)) {
		// eslint-disable-next-line no-restricted-globals
		// location.reload();
		const authCtx = useContext(authContext);
		const url = `${process.env.REACT_APP_API_ENDPOINT}/medicine/${itemID}?token=${authCtx.token}`;
		const response = await fetch(url, {
			method: 'DELETE'
		});

		const data = await response.json();
		if (data.success) {
			alert(data.message);
		} else {
			alert(data.message);
		}
	}
}

const Table = ({ placeholder }: { placeholder: string }) => {
	const [medicines,setMedicines] = useState([])
	const data = useMemo<any[]>(() => Stocks(), []);
	const authCtx = useContext(authContext);
	useEffect(()=>{
		async function getData(){
			const url = `${process.env.REACT_APP_API_ENDPOINT}/medicine?token=${authCtx.token}`;
			const response = await fetch(url, {
				method: 'GET'
			});

			const data = await response.json();
			if (data.success) {
				alert(data.message);
				setMedicines(data._medicines)
			} else {
				alert(data.message);
			}
		}
		getData()
	},[])

	const columns = useMemo(
		() => [
			{
				Header: 'Name',
				accessor: 'medicineName',
			},
			{
				Header: 'Medicine ID',
				accessor: 'medicineID',
			},
			{
				Header: 'Manufacturer',
				accessor: 'manufacturer',
			},
			{
				Header: 'Qty',
				accessor: 'qty',
			},
			{
				width: 200,
				Header: 'Actions',
				accessor: 'actions',
				Cell: (props: any) => (
					<div>
						<Link to={/stocks/ + props.row.original.medicineID}>
							<button
								type='button'
								className='text-white bg-[#00a57c] transition-colors hover:bg-[#40a321] focus:outline-none rounded-lg px-5 py-2.5 text-center inline-flex items-center mr-2'
							>
								<AiOutlineEdit />
							</button>
						</Link>

						<button
							type='button'
							className='text-white bg-[#c40b04] transition-colors hover:bg-[#740303] focus:outline-none rounded-lg px-5 py-2.5 text-center inline-flex items-center mr-2'
							onClick={() =>
								deleteItem(
									props.row.original.medicineID,
									props.row.original.medicineName
								)
							}
						>
							<AiOutlineDelete />
						</button>
					</div>
				),
			},
		],
		[]
	);

	const {
		getTableProps,
		getTableBodyProps,
		headerGroups,
		prepareRow,
		page,
		canPreviousPage,
		canNextPage,
		nextPage,
		previousPage,
		gotoPage,
		pageCount,
		setPageSize,
		state,
		preGlobalFilteredRows,
		setGlobalFilter,
	} = useTable(
		{
			columns,
			data,
			manualPagination: false,
		},
		useGlobalFilter,
		useSortBy,
		usePagination
	);
	const { pageIndex } = state;
	const paginationRange = useCustomPagination({
		totalPageCount: pageCount,
		currentPage: pageIndex,
		siblingCount: 0,
	});
	console.log(paginationRange);
	console.log(`Current Page : ${pageIndex + 1}`);

	useEffect(() => {
		setPageSize(8);
	}, [setPageSize]);

	return (
		<div>
			<GlobalFilter
				preGlobalFilteredRows={preGlobalFilteredRows}
				globalFilter={state.globalFilter}
				setGlobalFilter={setGlobalFilter}
				placeholder={placeholder}
			/>
			<div className='mt-2 flex flex-col'>
				<div className='overflow-x-auto'>
					<div className='py-1 align-middle inline-block min-w-full px-1'>
						<div className='shadow overflow-hidden border-b border-gray-200 sm:rounded-lg'>
							<table
								{...getTableProps()}
								className='min-w-full divide-y divide-gray-200'
							>
								<thead className='bg-gray-10'>
									{headerGroups.map((headerGroup) => (
										<tr
											{...headerGroup.getHeaderGroupProps()}
										>
											{headerGroup.headers.map(
												(column) => (
													<th
														{...column.getHeaderProps()}
														className='px-6 py-5 text-left text-20 font-medium text-gray-500 bg-[#ececec] uppercase rounded-sm tracking-wider'
													>
														{column.render(
															'Header'
														)}
													</th>
												)
											)}
										</tr>
									))}
								</thead>
								<tbody
									{...getTableBodyProps()}
									className='bg-white divide-y divide-gray-200'
								>
									{page.map((row, i) => {
										prepareRow(row);
										return (
											<tr {...row.getRowProps()}>
												{row.cells.map((cell) => {
													return (
														<td
															{...cell.getCellProps()}
															className='px-6 py-8 whitespace-nowrap'
														>
															{cell.render(
																'Cell'
															)}
														</td>
													);
												})}
											</tr>
										);
									})}
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>

			<div className='py-3 flex items-center text-center justify-center pt-10'>
				<div className='flex-1 flex justify-between md:hidden'>
					<Button
						onClick={() => previousPage()}
						disabled={!canPreviousPage}
					>
						Previous
					</Button>
					<Button onClick={() => nextPage()} disabled={!canNextPage}>
						Next
					</Button>
				</div>
				<div
					className='hidden sm:flex-1 sm:flex sm:items-center sm:justify-between'
					aria-label='Pagination'
				>
					<div
						className='relative z-0 inline-flex items-center ml-auto mr-auto rounded-md shadow-sm space-x-10'
						aria-label='Pagination'
					>
						{paginationRange?.map((pageNumber, index) => {
							if (pageNumber === DOTS) {
								return (
									<PageButton
										key={index}
										className=''
										onClick={() => gotoPage(0)}
									>
										...
									</PageButton>
								);
							}

							if (pageNumber - 1 === pageIndex) {
								return (
									<PageButton
										key={index}
										className=' active:bg-gray-500 active:border-gray-300'
										onClick={() => gotoPage(pageNumber - 1)}
									>
										{pageNumber}
									</PageButton>
								);
							}

							return (
								<PageButton
									key={index}
									className='active:bg-gray-500 active:border-gray-300'
									onClick={() => gotoPage(pageNumber - 1)}
								>
									{pageNumber}
								</PageButton>
							);
						})}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Table;
