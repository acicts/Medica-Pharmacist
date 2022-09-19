import React, { ReactElement, useState } from 'react';
import { motion } from 'framer-motion';
import { AiOutlineMedicineBox } from 'react-icons/ai';
import { GiHamburgerMenu, GiMedicines } from 'react-icons/gi';
import { RiDashboardLine } from 'react-icons/ri';
import { CgProfile } from 'react-icons/cg';
import { NavLink, useLocation } from 'react-router-dom';

const NavigationLink = (props: {
	icon: ReactElement;
	children: string;
	href: string;
}) => {
	const location = useLocation().pathname;
	return (
		<li
			className={`w-full my-[10px] py-[10px] last:mb-0 first:mt-0 ${
				location === props.href ? 'bg-[#2F8D76]' : ''
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

const Layout = (props: { children: ReactElement | ReactElement[] }) => {
	const [isNav, setIsNav] = useState(false);
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
	return (
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
							className='w-[30px] h-[30px] rounded-lg'
							alt='profile-pic'
							src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAH4AAAB+CAMAAADV/VW6AAAAM1BMVEXk5ueutLepsLPb3t/n6erR1Nbh4+TV2Nqxt7q9wsTY29y2vL7DyMrKztC6v8LBxcjt7+++QDwtAAACsUlEQVRoge2a2bKkIAxAWSICit7//9pBvd1lzygkdqJVU5y3fjosIULSSjUajUaj0Wg0Go3GHsg8ZFbO9l1KqYtO3T4IlyavzYYeQlQ3DgBiyNI9Ro93DQCi/3T/juCmAYxH8pVO3A92OLVrM0vb46l79Q+y9v586hv+UXv2OzG7rcozk5ReDRi9GWXiH85P3Kc/iugjzp6Rlg54rN0kfj906MmLnD5U3IlNH7/zGfbkB4Fg16Zn1jt04K3MzKtPWnv24MOmnDeWV0+I+wXTseqJW8+d+B3Nnr97rHrUp3aPZ9WX71hHsOoR15z/WU+18+rJe88beuTI5z141LSjedPOw0kXRuLsmW+7xJPH/dYhJv3AfN14+LKFeV3KrX2GcvT4n3mQ8NM3Ao9seHLylFeWEXlhw4S0CxW4kImf+8y/wB0+ueISavvFSkuo0+ckK5uQKnYrW1eFruA2g+jcV7+bzjZAoqZzMIBOHxbUJ+GFf/tV+ruib/TU39fPABXD0kv5VWuf7M3tHFC2T/Mc5jH1d7vV2kP72YBb22mwtdDGeRr8yjAtK3BHOy2bYwp+baF9RN7y00+pd3LtpLzbafCmkHaXlt7YS6wCgB2L6t0ZDD3zAMCmw1Rzugpz5BsAWOQ9Z8/Q8YQBxNMkX14CjgGAC5fk2wC+TMRQ6JiiBvDVZwjoJZ1/BvDFR3j+2n79CgKu0CwmcSUCGBb+xYUNoLwo637qy4PVvpwAkp/ZvsyfYie0DLF+fHOJVkjB+tGPfnLrAudHvrvxvWKiH/X4ZA+7N6jwd1J21PJjSyiXqC4/ELulJOrRT62cE6lNn94xo1D7+JDr9kRqLR5Ze63NwPeRP6EYfHIp50Vx9YXjXlfqvSA9eW1Kf2uQS7hvfSnxRiNOKfZctOIUFr/RaDQaovwBctMfXcGmjxoAAAAASUVORK5CYII='
						/>
						<div className='text-white h-[30px] text-[0.85rem] ml-[5px] py-[2px]'>
							<span>Pharmacy Name</span>
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
				<ul className='w-full mt-[35px]'>
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
							className='w-[30px] h-[30px] rounded-lg'
							alt='profile-pic'
							src='https://i0.wp.com/www.howtomob.com/wp-content/uploads/2022/07/whatsapp-dp-for-boys-.jpg?ssl=1&resize=512%2C512'
						/>
						<div className='text-white h-[30px] text-[0.85rem] ml-[5px] py-[2px]'>
							<span>Pharmacy Name</span>
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
				<ul className='w-full mt-[35px]'>
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
							className='underline'
						>
							ACICTS
						</a>{' '}
					</div>
				</div>
			</motion.div>
		</div>
	);
};

export default Layout;
