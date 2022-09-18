import React, { ReactElement } from 'react';
import { GiMedicines } from 'react-icons/gi';

const Card = (props: {
	icon: ReactElement;
	title: string;
	subTitle: string;
	borderClass: string;
	iconClass: string;
}) => {
	return (
		<div
			className={`w-[31%] lg:flex-row flex flex-col items-center justify-evenly min-h-[20vh] p-[10px] rounded-md ${props.borderClass} border-solid border-[2px] bg-[#F5F5F5]`}
		>
			<i className={props.iconClass}>{props.icon}</i>
			<div>
				<h1 className='font-black text-lg md:text-xl text-center lg:text-left'>
					{props.title}
				</h1>
				<p className='text-center lg:text-left text-xs md:text-base'>
					{props.subTitle}
				</p>
			</div>
		</div>
	);
};

const SecondaryCard = (props: {
	heading: string;
	subheading: string;
	href: string;
	mainBody: string;
	secondaryBody: string;
}) => {
	return (
		<div className='bg-[#FFFFFF] my-[15px] first:mt-0 last:mb-0 md:mt-0 md:last:mb-[15px] rounded-md w-full sm:w-[45%] h-[20vh] border-solid border-[1px] border-[#BEBEBE]'>
			<div className='flex items-center justify-between h-[5vh] px-[15px]'>
				<h1 className='text-lg font-bold'>{props.heading}</h1>
				<p className='text-xs font-extralight'>
					{props.subheading} {`>>`}
				</p>
			</div>
			<hr color='#BEBEBE' />
			<div className='h-[14vh] flex items-center justify-between px-[15px]'>
				<div>
					<h1 className='text-2xl font-black'>{props.mainBody}</h1>
					<p className='text-sm font-light'>{props.secondaryBody}</p>
				</div>
			</div>
		</div>
	);
};

const Dashboard = () => {
	return (
		<div>
			<section>
				<h1 className='text-2xl font-bold'>Dashboard</h1>
				<p className='text-xs'>
					Pharamacist Web App - Powered by ACICTS
				</p>
			</section>
			<section className='flex items-center justify-between mt-[15px] lg:mt-[25px]'>
				<Card
					icon={<GiMedicines size='3em' />}
					title='1009'
					subTitle='Medicine Available'
					borderClass='border-[#009099]'
					iconClass='text-[#009099]'
				/>
				<Card
					icon={<GiMedicines size='3em' />}
					title='1009'
					subTitle='Medicine Available'
					borderClass='border-[#2F8D76]'
					iconClass='text-[#2F8D76]'
				/>
				<Card
					icon={<GiMedicines size='3em' />}
					title='1009'
					subTitle='Medicine Available'
					borderClass='border-[#CEE157]'
					iconClass='text-[#CEE157]'
				/>
			</section>
			<section className='flex flex-wrap items-center justify-between mt-[15px] lg:mt-[25px]'>
				<SecondaryCard
					heading='Heading'
					subheading='Go to heading'
					href='/heading'
					mainBody='1009'
					secondaryBody='available medicines'
				/>
				<SecondaryCard
					heading='Heading'
					subheading='Go to heading'
					href='/heading'
					mainBody='1009'
					secondaryBody='available medicines'
				/>
				<SecondaryCard
					heading='Heading'
					subheading='Go to heading'
					href='/heading'
					mainBody='1009'
					secondaryBody='available medicines'
				/>
				<SecondaryCard
					heading='Heading'
					subheading='Go to heading'
					href='/heading'
					mainBody='1009'
					secondaryBody='available medicines'
				/>
			</section>
		</div>
	);
};

export default Dashboard;
