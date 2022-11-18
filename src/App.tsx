import { lazy, ReactElement, Suspense, useContext } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Layout from './Components/Layout';
import Loading from './Components/Loading';
import 'react-toastify/dist/ReactToastify.css';
import { authContext } from './Context/authContext';

const Dashboard = lazy(() => import('./Pages/Dashboard'));
const Medicine = lazy(() => import('./Pages/Medicine'));
const AddMedicine = lazy(() => import('./Pages/AddMedicine'));
const EditMedicine = lazy(() => import('./Pages/EditMedicine'));
const EditProfile = lazy(() => import('./Pages/EditProfile'));
const Profile = lazy(() => import('./Pages/Profile'));
const Login = lazy(() => import('./Pages/Login'));
const Signup = lazy(() => import('./Pages/SignUp'));
const Verify = lazy(() => import('./Pages/Verify'));
const SendResetPwdEmail = lazy(() => import('./Pages/SendPwdResetEmail'));
const SendVerificationEmail = lazy(
	() => import('./Pages/SendVerificationEmail')
);
const ResetPwd = lazy(() => import('./Pages/ResetPwd'));

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
	console.log(authCtx.token);
	return authCtx.token ? <Navigate to='/dashboard' /> : <>{props.children}</>;
};

const App = () => (
	<>
		<Layout ignoredRoutes={['/login', '/signup', '/verify/:token']}>
			<Suspense fallback={<Loading />}>
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
								<Dashboard />
							</CheckNotAuthenticated>
						}
					/>
					<Route
						path='/stocks'
						element={
							<CheckNotAuthenticated>
								<Medicine />
							</CheckNotAuthenticated>
						}
					/>
					<Route
						path='/stocks/new'
						element={
							<CheckNotAuthenticated>
								<AddMedicine />
							</CheckNotAuthenticated>
						}
					/>
					<Route
						path='/stocks/:id'
						element={
							<CheckNotAuthenticated>
								<EditMedicine />
							</CheckNotAuthenticated>
						}
					/>
					<Route
						path='/profile'
						element={
							<CheckNotAuthenticated>
								<Profile />
							</CheckNotAuthenticated>
						}
					/>
					<Route
						path='/profile/edit'
						element={
							<CheckNotAuthenticated>
								<EditProfile />
							</CheckNotAuthenticated>
						}
					/>
				</Routes>
			</Suspense>
		</Layout>
	</>
);

export default App;
