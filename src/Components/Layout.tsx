import React, { ReactElement, useContext, useState } from 'react';
import { motion } from 'framer-motion';
import { AiOutlineLogout, AiOutlineMedicineBox } from 'react-icons/ai';
import { GiHamburgerMenu, GiMedicines } from 'react-icons/gi';
import { RiDashboardLine } from 'react-icons/ri';
import { CgProfile } from 'react-icons/cg';
import { NavLink, useLocation } from 'react-router-dom';
import { authContext } from '../Context/authContext';
import { profileContext } from '../Context/profileContext';
import { profile } from 'console';

const NavigationLink = (props: {
	icon: ReactElement;
	children: string;
	href: string;
}) => {
	const location = useLocation().pathname;
	return (
		<li
			className={`w-full my-[10px] py-[10px] last:mb-0 first:mt-0 ${location === props.href ? 'bg-[#2F8D76]' : ''
				} transition-all`}
		>
			<NavLink
				to={props.href}
				className='w-full text-white px-[15px] inline-block'
			>
				<div className='flex w-max h-max items-center text-sm'>
					<i className='mr-[10px]'>{props.icon}</i>
					<span>{props.children}</span>
				</div>
			</NavLink>
		</li>
	);
};

const Layout = (props: {
	children: ReactElement | ReactElement[];
	ignoredRoutes: string[];
}) => {
	const [isNav, setIsNav] = useState(false);
	const location = useLocation().pathname;
	const authCtx = useContext(authContext)
	const profileCtx = useContext(profileContext)
	const animationVariants = {
		clicked: {
			x: '0%',
			opacity: 1,
			transition: {
				duration: 0.3,
				ease: 'easeOut',
			},
		},
		notClicked: {
			x: '-100%',
			opacity: 0,
			transition: {
				duration: 0.3,
				ease: 'easeOut',
			},
		},
	};
	const hamburgerVariants = {
		notClicked: {
			scale: 1,
			opacity: 1,
		},
		clicked: {
			scale: 0,
			opacity: 0,
		},
	};

	const desktopSideBarVariants = {
		notClicked: {
			width: '0px',
			scale: 0,
			opacity: 0,
			transition: {
				ease: 0,
			},
		},
		clicked: {
			width: '250px',
			scale: 1,
			opacity: 1,
			transition: {
				ease: 0,
			},
		},
	};

	const desktopNavBarVariants = {
		notClicked: {
			width: 'calc(100% - 0px)',
			transition: {
				ease: 0,
			},
		},
		clicked: {
			width: 'calc(100% - 250px)',
			transition: {
				ease: 0,
			},
		},
	};
	return !props.ignoredRoutes.find((r) => r === location || r.startsWith(location)) ? (
		<div className='flex items-center h-full justify-between font-poppins'>
			{/*Mobile Nav bar*/}
			<motion.div
				variants={animationVariants}
				animate={isNav ? 'clicked' : 'notClicked'}
				initial='notClicked'
				className='backdrop-blur-md absolute w-[70%] z-10 bg-[#1529279c] left-0 top-0 h-[100vh] sm:w-[40%] lg:hidden'
			>
				<div className='flex items-center justify-between w-full h-[10vh] p-[10px] bg-[#021F13]'>
					<div className='flex h-max w-max'>
						<img
							className='aspect-square h-[6vh] rounded-lg'
							alt='profile-pic'
							src={profileCtx.profilePic}
						/>
						<div className='text-white h-min  ml-[5px] w-[calc(100% - 80px)] flex flex-col items-start justify-between'>
							<span className='font-black text-[0.85rem]'>{profileCtx.pharmacyName}</span>
							<span className='text-[0.7rem]'>ID: {profileCtx.pharmacyID}</span>
						</div>
					</div>
					<motion.i
						variants={hamburgerVariants}
						animate={isNav ? 'notClicked' : 'clicked'}
						initial='notClicked'
					>
						<GiHamburgerMenu
							width={'30px'}
							height='30px'
							color='white'
							onClick={() => {
								setIsNav((curr) => !curr);
							}}
						/>
					</motion.i>
				</div>
				<ul className='w-full mt-[25px]'>
					<NavigationLink
						href='/dashboard'
						icon={<RiDashboardLine />}
					>
						Dashboard
					</NavigationLink>
					<NavigationLink
						href='/stocks'
						icon={<AiOutlineMedicineBox />}
					>
						My Stock
					</NavigationLink>
					<NavigationLink href='/stocks/new' icon={<GiMedicines />}>
						Add Item
					</NavigationLink>
					<hr />

					<NavigationLink href='/profile' icon={<CgProfile />}>
						Profile
					</NavigationLink>
					<li
						onClick={() => authCtx.logout()}
						className={`bg-red-500 hover:bg-red-700 cursor-pointer w-full my-[10px] py-[10px] last:mb-0 first:mt-0 transition-all`}
					>
						<div
							className='w-full text-white px-[15px] inline-block'
						>
							<div className='flex w-max h-max items-center text-sm'>
								<i className='mr-[10px]'><AiOutlineLogout /></i>
								<span>Logout</span>
							</div>
						</div>
					</li>
				</ul>
			</motion.div>
			{/*Desktop Nav bar*/}
			<motion.div
				variants={desktopSideBarVariants}
				animate={!isNav ? 'clicked' : 'notClicked'}
				initial={false}
				className='hidden lg:block w-[250px] bg-[#152927] h-[100vh]'
			>
				<div className='flex items-center justify-between w-full h-[10vh] p-[10px] bg-[#021F13]'>
					<div className='flex h-max w-max'>
						<img
							className='aspect-square h-[6vh] rounded-lg'
							alt='profile-pic'
							src={profileCtx.profilePic}
						/>
						<div className='text-white h-min  ml-[5px] w-[calc(100% - 80px)] flex flex-col items-start justify-between'>
							<span className='font-black text-[0.85rem]'>{profileCtx.pharmacyName}</span>
							<span className='text-[0.7rem]'>ID: {profileCtx.pharmacyID}</span>
						</div>
					</div>
					<motion.i
						variants={hamburgerVariants}
						animate={!isNav ? 'notClicked' : 'clicked'}
						initial='notClicked'
						className='cursor-pointer'
					>
						<GiHamburgerMenu
							width={'30px'}
							height='30px'
							color='white'
							onClick={() => {
								setIsNav((curr) => !curr);
							}}
						/>
					</motion.i>
				</div>
				<ul className='w-full mt-[25px]'>
					<NavigationLink
						href='/dashboard'
						icon={<RiDashboardLine />}
					>
						Dashboard
					</NavigationLink>
					<NavigationLink
						href='/stocks'
						icon={<AiOutlineMedicineBox />}
					>
						My Stock
					</NavigationLink>
					<NavigationLink href='/stocks/new' icon={<GiMedicines />}>
						Add Item
					</NavigationLink>
					<hr />

					<NavigationLink href='/profile' icon={<CgProfile />}>
						Profile
					</NavigationLink>
					<li
						onClick={() => authCtx.logout()}
						className={`bg-red-500 hover:bg-red-700 cursor-pointer w-full my-[10px] py-[10px] last:mb-0 first:mt-0 transition-all`}
					>
						<div
							className='w-full text-white px-[15px] inline-block'
						>
							<div className='flex w-max h-max items-center text-sm'>
								<i className='mr-[10px]'><AiOutlineLogout /></i>
								<span>Logout</span>
							</div>
						</div>
					</li>
				</ul>
			</motion.div>
			<div className='lg:hidden w-full h-[100vh] lg:w-[65%]'>
				<nav className='h-[10vh] bg-[#2F8D76] w-full px-[15px] flex items-center justify-between'>
					<motion.i
						variants={hamburgerVariants}
						animate={isNav ? 'clicked' : 'notClicked'}
						initial='notClicked'
					>
						<GiHamburgerMenu
							size='1.3rem'
							color='white'
							onClick={() => {
								setIsNav((curr) => !curr);
							}}
						/>
					</motion.i>
					<div className='w-max flex flex-col items-center justify-between text-white'>
						<h1 className='font-bold text-lg'>Pharmacy App</h1>
						<span className='text-xs font-light'>
							Powered by ACICTS
						</span>
					</div>
				</nav>
				<div
					className='h-[90vh] overflow-y-scroll'
					onClick={() => {
						if (isNav) setIsNav(false);
					}}
				>
					<div className='w-full min-h-[90vh] p-[15px]'>
						{props.children}
					</div>

					<div className='w-full py-[15px] text-center bg-[#D9D9D9] text-xs font-light'>
						{' '}
						Copyright &copy; {new Date().getFullYear()} - Pharmacist
						- Powered by{' '}
						<a
							href='https://acicts.lk/'
							target='_blank'
							rel='noreferrer'
							className='underline'
						>
							ACICTS
						</a>{' '}
					</div>
				</div>
			</div>
			<motion.div
				variants={desktopNavBarVariants}
				animate={!isNav ? 'clicked' : 'notClicked'}
				initial={false}
				className='hidden lg:block w-full h-[100vh] lg:w-[calc(100%_-_250px)]'
			>
				<nav className='h-[10vh] shadow-md bg-[#2F8D76] w-full px-[15px] flex items-center justify-between'>
					<motion.i
						variants={hamburgerVariants}
						animate={!isNav ? 'clicked' : 'notClicked'}
						initial={false}
						className='cursor-pointer'
					>
						<GiHamburgerMenu
							size='1.3rem'
							color='white'
							onClick={() => {
								setIsNav((curr) => !curr);
							}}
						/>
					</motion.i>
					<div className='w-max flex flex-col items-center justify-between text-white'>
						<h1 className='font-bold text-lg'>Pharmacy App</h1>
						<span className='text-xs font-light'>
							Powered by ACICTS
						</span>
					</div>
				</nav>
				<div
					className='h-[90vh] overflow-y-scroll'
					onClick={() => {
						if (isNav) setIsNav(false);
					}}
				>
					<div className='w-full min-h-[90vh] p-[25px]'>
						{props.children}
					</div>

					<div className='w-full py-[15px] text-center bg-[#D9D9D9] text-sm font-light'>
						{' '}
						Copyright &copy; {new Date().getFullYear()} - Pharmacist
						- Powered by{' '}
						<a
							href='https://acicts.lk/'
							target='_blank'
							rel='noreferrer'
							className='underline'
						>
							ACICTS
						</a>{' '}
					</div>
				</div>
			</motion.div>
		</div>
	) : (
		<div>{props.children}</div>
	);
};

export default Layout;
