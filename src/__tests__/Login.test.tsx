import React from 'react';
import handlers from '../handlers';
import { setupServer } from 'msw/node';
import { fireEvent, render, screen } from '@testing-library/react';
import LoginPage from '../Pages/Login';
import { MemoryRouter } from 'react-router-dom';
import { act } from 'react-dom/test-utils';

const server = setupServer(...handlers);

beforeAll(() => {
	server.listen({ onUnhandledRequest: 'error' });
});

afterEach(() => {
	server.resetHandlers();
});

afterAll(() => {
	server.close();
});

describe('Async Login', () => {
	test('Should send invalid email when email is not correct', (done) => {
		act(() => { render(<LoginPage />, { wrapper: MemoryRouter }); })

		const emailInput = screen.getByTestId("login-email-input")
		const pwdInput = screen.getByTestId("login-pwd-input")
		const submitBtn = screen.getByTestId("login-submit-btn")
		const msgComp = screen.getByTestId("login-message")

		fireEvent.change(emailInput, {
			target: {
				value: 'notregistereduser@testmail.com',
			},
		});

		fireEvent.change(pwdInput, {
			target: {
				value: 'testpwd',
			},
		});

		fireEvent.click(submitBtn);

		expect(screen.getByText('Invalid email')).toBeInTheDocument()
	});

	test('Should send invalid password when email correct but password is incorrect', () => {
		act(() => { render(<LoginPage />, { wrapper: MemoryRouter }); })

		const emailInput = screen.getByTestId("login-email-input")
		const pwdInput = screen.getByTestId("login-pwd-input")
		const submitBtn = screen.getByTestId("login-submit-btn")

		fireEvent.change(emailInput, {
			target: {
				value: 'user1@testmail.com',
			},
		});

		fireEvent.change(pwdInput, {
			target: {
				value: 'testpwd',
			},
		});

		fireEvent.click(submitBtn);
		expect(screen.getByText('Invalid password')).toBeInTheDocument()

	});

	test('Should login when both email and password are correct', () => {
		const { getByTestId, getByText } = render(<LoginPage />, { wrapper: MemoryRouter });

		const emailInput = getByTestId("login-email-input")
		const pwdInput = getByTestId("login-pwd-input")
		const submitBtn = getByTestId("login-submit-btn")

		fireEvent.change(emailInput, {
			target: {
				value: 'user1@testmail.com',
			},
		});

		fireEvent.change(pwdInput, {
			target: {
				value: 'user1pwd',
			},
		});

		fireEvent.click(submitBtn);
		expect(window.location.pathname).toBe('/');
	});
});
