import React, { ReactElement, useState } from 'react';
import { motion } from 'framer-motion';
import { GiHamburgerMenu } from 'react-icons/gi';

const Layout = (props: { children: ReactElement | ReactElement[] }) => {
	const [isNav, setIsNav] = useState(false);
	const animationVariants = {
		clicked: {
			scale: 1,
			opacity: 1,
			transition: {
				ease: 0,
			},
		},
		notClicked: {
			scale: 0,
			opacity: 0,
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
	return (
		<div className='flex items-center h-full justify-between'>
			<motion.div
				variants={animationVariants}
				animate={isNav ? 'clicked' : 'notClicked'}
				initial='notClicked'
				className='absolute w-[60%] bg-[#152927d3] left-0 top-0 h-[100vh]'
			>
				<div className='flex items-center justify-between w-full h-[10vh] p-[10px]'>
					<div className='flex h-max w-max'>
						<img
							className='w-[40px] h-[40px] rounded-md'
							alt='profile-pic'
							src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAH4AAAB+CAMAAADV/VW6AAAAM1BMVEXk5ueutLepsLPb3t/n6erR1Nbh4+TV2Nqxt7q9wsTY29y2vL7DyMrKztC6v8LBxcjt7+++QDwtAAACsUlEQVRoge2a2bKkIAxAWSICit7//9pBvd1lzygkdqJVU5y3fjosIULSSjUajUaj0Wg0Go3GHsg8ZFbO9l1KqYtO3T4IlyavzYYeQlQ3DgBiyNI9Ro93DQCi/3T/juCmAYxH8pVO3A92OLVrM0vb46l79Q+y9v586hv+UXv2OzG7rcozk5ReDRi9GWXiH85P3Kc/iugjzp6RmD54rN0kfj906MmLnD5U3IlNH7/zGfbkB4Fg16Zn1jt04K3MzKtPWnv24MOmnDeWV0+I+wXTseqJW8+d+B3Nnr97rHrUp3aPZ9WX71hHsOoR15z/WU+18+rJe88beuTI5z141LSjedPOw0kXRuLsmW+7xJPH/dYhJv3AfN14+LKFeV3KrX2GcvT4n3mQ8NM3Ao9seHLylFeWEXlhw4S0CxW4kImf+8y/wB0+ueISavvFSkuo0+ckK5uQKnYrW1eFruA2g+jcV7+bzjZAoqZzMIBOHxbUJ+GFf/tV+ruib/TU39fPABXD0kv5VWuf7M3tHFC2T/Mc5jH1d7vV2kP72YBb22mwtdDGeRr8yjAtK3BHOy2bYwp+baF9RN7y00+pd3LtpLzbafCmkHaXlt7YS6wCgB2L6t0ZDD3zAMCmw1Rzugpz5BsAWOQ9Z8/Q8YQBxNMkX14CjgGAC5fk2wC+TMRQ6JiiBvDVZwjoJZ1/BvDFR3j+2n79CgKu0CwmcSUCGBb+xYUNoLwo637qy4PVvpwAkp/ZvsyfYie0DLF+fHOJVkjB+tGPfnLrAudHvrvxvWKiH/X4ZA+7N6jwd1J21PJjSyiXqC4/ELulJOrRT62cE6lNn94xo1D7+JDr9kRqLR5Ze63NwPeRP6EYfHIp50Vx9YXjXlfqvSA9eW1Kf2uQS7hvfSnxRiNOKfZctOIUFr/RaDQaovwBctMfXcGmjxoAAAAASUVORK5CYII='
						/>
						<div className='text-white text-sm font-bold ml-[5px]'>
							<span>Pharmacy Name</span>
						</div>
					</div>
					<motion.i
						variants={hamburgerVariants}
						animate={isNav ? 'notClicked' : 'clicked'}
						initial='notClicked'
					>
						<GiHamburgerMenu
							size='1.5rem'
							color='white'
							onClick={() => {
								setIsNav((curr) => !curr);
							}}
						/>
					</motion.i>
				</div>
			</motion.div>
			<div className='w-full h-full'>
				<nav className='h-[10vh] bg-[#2F8D76] w-full p-[25px] flex items-start justify-between'>
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
					className='h-[80vh] overflow-y-scroll'
					onClick={() => {
						if (isNav) setIsNav(false);
					}}
				>
					{props.children}
				</div>
			</div>
		</div>
	);
};

export default Layout;
