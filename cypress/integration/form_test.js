/* eslint-disable jest/valid-expect */
describe('User Onboarding app', () => {
	beforeEach(() => {
		cy.visit('http://localhost:3000');
	})

	const nameInput = () => cy.get('input[name=name]');
	const emailInput = () => cy.get('input[name=email]');
	const passwordInput = () => cy.get('input[name=password]');
	const tosAgreementInput = () => cy.get('input[name=tosAgreement]');
	const submitButton = () => cy.get('button[name=submit]')
	const notAnElement = () => cy.get('button[name=notarealbutton]');

	const usersTable = () => cy.get('table[name=usersTable]');
	const newUserName = () => cy.get('table[name=usersTable] tbody tr td:nth-child(2)');
	const newUserEmail = () => cy.get('table[name=usersTable] tbody tr td:nth-child(3)');
	const newUserPassword = () => cy.get('table[name=usersTable] tbody tr td:nth-child(4)');
	const newUserTosAgreement = () => cy.get('table[name=usersTable] tbody tr td:nth-child(5)');

	const sampleUser = {
		name: 'Joe Calderon',
		email: 'jc@gmail.com',
		password: 'jcinbiglights',
		tosAgreement: true,
	};

	const fillOutForm = ({ name, email, password, tosAgreement }) => {
		nameInput()
			.should('have.value', '')
			.type(name)
			.should('have.value', name);

		emailInput()
			.should('have.value', '')
			.type(email)
			.should('have.value', email);

		passwordInput()
			.should('have.value', '')
			.type(password)
			.should('have.value', password);

		if (tosAgreement) {
			tosAgreementInput()
			.should('not.be.checked')
			.check()
			.should('be.checked');
		}
		else {
			tosAgreementInput().should('not.be.checked')
		}
	}

	it('making sure tests work', () => {
		expect(1 + 2).to.equal(3);
		expect(2 + 2).not.to.equal(5);
		expect({}).not.to.equal({});
		expect({}).to.eql({});
	});

	it('making sure elements exist', () => {
		nameInput().should('exist');
		emailInput().should('exist');
		passwordInput().should('exist');
		tosAgreementInput().should('exist');
		submitButton().should('exist');
		notAnElement().should('not.exist');
	});

	describe('inputs work correctly', () => {
		it('can navigate to the site', () => {
			cy.url().should('include', 'localhost');
		});

		it('has a disabled submit button initially', () => {
			submitButton().should('be.disabled');
		});

		it('can input text', () => {
			fillOutForm(sampleUser);
		});

		it('can submit after being filled, and user is added to table', () => {
			fillOutForm(sampleUser);
			submitButton()
				.should('be.enabled')
				.click();

			usersTable().should('exist');

			newUserName()
				.should('exist')
				.should('have.html', sampleUser.name);

				newUserEmail()
				.should('exist')
				.should('have.html', sampleUser.email);

				newUserPassword()
				.should('exist')
				.should('have.html', '**********');

				newUserTosAgreement()
				.should('exist')
				.should('have.html', sampleUser.tosAgreement.toString());
		});
	});

	describe('form must be valid to submit', () => {
		it('has a disabled submit button', () => {
			submitButton().should('be.disabled');
		});

		it('has a disabled submit button after invalid data is entered', () => {
			fillOutForm({ ...sampleUser, email: 'bademal', tosAgreement: false });
			submitButton().should('be.disabled');
		});
	});
});