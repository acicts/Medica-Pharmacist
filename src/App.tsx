import { Route, Routes, Navigate } from 'react-router-dom';
import Layout from './Components/Layout';
import AddMedicine from './Pages/AddMedicine';
import Dashboard from './Pages/Dashboard';
import EditMedicine from './Pages/EditMedicine';
import Login from './Pages/Login';
import Profile from './Pages/Profile';
import ResetPwd from './Pages/ResetPwd';
import SendResetPwdEmail from './Pages/SendPwdResetEmail';
import SendVerificationEmail from './Pages/SendVerificationEmail';
import Signup from './Pages/SignUp';
import Verify from './Pages/Verify';

const App = () => (
	<>
		<Routes>
			<Route path='/' element={<Navigate to={'/dashboard'} />} />
			<Route path='/signup' element={<Signup />} />
			<Route path='/login' element={<Login />} />
			<Route path='/reset/reqeust' element={<SendResetPwdEmail />} />
			<Route path='/reset/password/:token' element={<ResetPwd />} />
			<Route path='/verify/request' element={<SendVerificationEmail />} />
			<Route path='/verify/:token' element={<Verify />} />
			<Route
				path='/dashboard'
				element={
					<Layout>
						<Dashboard />
					</Layout>
				}
			/>
			<Route
				path='/stocks'
				element={
					<Layout>
						<Profile />
					</Layout>
				}
			/>
			<Route
				path='/stocks/new'
				element={
					<Layout>
						<AddMedicine />
					</Layout>
				}
			/>
			<Route
				path='/stocks/:id'
				element={
					<Layout>
						<EditMedicine />
					</Layout>
				}
			/>
		</Routes>
	</>
);

export default App;
