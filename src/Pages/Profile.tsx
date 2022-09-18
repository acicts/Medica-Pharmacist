import React from 'react';
import { RiProfileLine } from 'react-icons/ri';
import { Link } from 'react-router-dom';

const Field = (props: { term: string; value: string }) => {
	return (
		<div className='w-full flex items-start justify-between text-sm mt-[3vh] md:mt-[15px] sm:text-base lg:text-lg font-light'>
			<p className='w-6/12 text-left text-[#696969]'>{props.term}</p>
			<p className='w-6/12 text-left break-words'>{props.value}</p>
		</div>
	);
};

const Profile = () => {
	return (
		<div>
			<section className='mb-[20px] md:mb-[20px]'>
				<h1 className='text-2xl font-bold'>My Profile</h1>
				<p className='text-xs'>Your Profile Information</p>
			</section>
			<section className='bg-[#FFFFFF] w-full min-h-[60vh] md:min-h-0 lg:h-[65vh]  border-solid border-[1px] border-[#6C6C6C] rounded-md p-[15px] flex flex-col items-start justify-evenly sm:h-max lg:flex-row '>
				<div className='w-full lg:w-[40%] mb-[10px]'>
					<p className='text-[#5E5E5E] font-bold w-full text-left mb-[10px] md:text-lg'>
						Your Logo
					</p>
					<img
						className='w-[110px] h-[auto] rounded-md sm:mx-0 md:w-[200px]'
						alt='profile-pic'
						src='https://i0.wp.com/www.howtomob.com/wp-content/uploads/2022/07/whatsapp-dp-for-boys-.jpg?ssl=1&resize=512%2C512'
					/>
				</div>
				<div className='w-full lg:w-[60%] mt-[10px] sm:mt-0 md:h-full md:flex flex-col items-start justify-between'>
					<div className='w-full'>
						<p className='text-[#5E5E5E] font-bold  md:text-lg'>
							Pharmacy Details
						</p>
						<hr color='#6C6C6C' />
						<div>
							<Field term='Pharmacy Name' value='Test Name' />
							<Field
								term='Email Address'
								value='info@testphrama.com'
							/>
							<Field term='Contact' value='+94 77 1234567' />
							<Field
								term='Address'
								value='pharmacy, pharmacy lane, Colombo'
							/>
							<Field term='Website' value='www.testpharma.org' />
						</div>
					</div>

					<div className='w-full flex justify-between mt-[5px] md:mt-[15px]'>
						<div />
						<Link
							to='/profile/edit'
							className='flex items-center justify-between text-white hover:bg-red-700 transition-colors bg-red-500 p-[10px] rounded-md mt-[10px] w-max'
						>
							<i>
								<RiProfileLine />
							</i>
							<span className='ml-[5px]'>Edit Profile</span>
						</Link>
					</div>
				</div>
			</section>
		</div>
	);
};

export default Profile;
