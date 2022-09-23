import { ReactElement, useContext } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Layout from './Components/Layout';
import { authContext } from './Context/authContext';
import AddMedicine from './Pages/AddMedicine';
import Dashboard from './Pages/Dashboard';
import EditMedicine from './Pages/EditMedicine';
import EditProfile from './Pages/EditProfile';
import Login from './Pages/Login';
import Medicine from './Pages/Medicine';
import Profile from './Pages/Profile';
import ResetPwd from './Pages/ResetPwd';
import SendResetPwdEmail from './Pages/SendPwdResetEmail';
import SendVerificationEmail from './Pages/SendVerificationEmail';
import Signup from './Pages/SignUp';
import Verify from './Pages/Verify';

const CheckNotAuthenticated = (props: {
	children: ReactElement | ReactElement[];
}) => {
	const authCtx = useContext(authContext);

	return authCtx.token ? <>{props.children}</> : <Navigate to='/login' />;
};

const CheckAuthenticated = (props: {
	children: ReactElement | ReactElement[];
}) => {
	const authCtx = useContext(authContext);

	return !authCtx.token ? (
		<>{props.children}</>
	) : (
		<Navigate to='/dashboard' />
	);
};

const App = () => (
	<>
		<Routes>
			<Route
				path='/'
				element={
					<CheckNotAuthenticated>
						<Navigate to={'/dashboard'} />
					</CheckNotAuthenticated>
				}
			/>
			<Route
				path='/signup'
				element={
					<CheckAuthenticated>
						<Signup />
					</CheckAuthenticated>
				}
			/>
			<Route
				path='/login'
				element={
					<CheckAuthenticated>
						<Login />
					</CheckAuthenticated>
				}
			/>
			<Route
				path='/reset/reqeust'
				element={
					<CheckAuthenticated>
						<SendResetPwdEmail />
					</CheckAuthenticated>
				}
			/>
			<Route
				path='/reset/password/:token'
				element={
					<CheckAuthenticated>
						<ResetPwd />
					</CheckAuthenticated>
				}
			/>
			<Route
				path='/verify/request'
				element={
					<CheckAuthenticated>
						<SendVerificationEmail />
					</CheckAuthenticated>
				}
			/>
			<Route
				path='/verify/:token'
				element={
					<CheckAuthenticated>
						<Verify />
					</CheckAuthenticated>
				}
			/>
			<Route
				path='/dashboard'
				element={
					<CheckNotAuthenticated>
						<Layout>
							<Dashboard />
						</Layout>
					</CheckNotAuthenticated>
				}
			/>
			<Route
				path='/stocks'
				element={
					<CheckNotAuthenticated>
						<Layout>
							<Medicine />
						</Layout>
					</CheckNotAuthenticated>
				}
			/>
			<Route
				path='/stocks/new'
				element={
					<CheckNotAuthenticated>
						<Layout>
							<AddMedicine />
						</Layout>
					</CheckNotAuthenticated>
				}
			/>
			<Route
				path='/stocks/:id'
				element={
					<CheckNotAuthenticated>
						<Layout>
							<EditMedicine />
						</Layout>
					</CheckNotAuthenticated>
				}
			/>
			<Route
				path='/profile'
				element={
					<CheckNotAuthenticated>
						<Layout>
							<Profile />
						</Layout>
					</CheckNotAuthenticated>
				}
			/>
			<Route
				path='/profile/edit'
				element={
					<CheckNotAuthenticated>
						<Layout>
							<EditProfile />
						</Layout>
					</CheckNotAuthenticated>
				}
			/>
		</Routes>
	</>
);

export default App;
