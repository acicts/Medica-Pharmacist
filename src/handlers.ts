import { rest } from 'msw';

const users = [
	{
		email: 'user1@testmail.com',
		password: 'user1pwd',
	},
	{
		email: 'user2@testmail.com',
		password: 'user2pwd',
	},
];

export default [
	rest.post(
		`${process.env.REACT_APP_API_ENDPOINT}/pharmacist/login`,
		async (req, res, ctx) => {
			const { email, password } = await req.json();

			if (!users.find((i) => i.email === email)) {
				return res(
					ctx.json({
						success: false,
						message: 'Invalid email',
					})
				);
			}

			const index = users.findIndex((i) => i.email === email);

			if (users[index].password !== password) {
				return res(
					ctx.json({
						success: false,
						message: 'Invalid password',
					})
				);
			}

			return res(
				ctx.json({
					success: true,
					message: 'User authenticated successfully!',
				})
			);
		}
	),
];
