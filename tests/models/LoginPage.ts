import { Page, Locator } from '@playwright/test';

export class LoginPage {
    page: Page;
    usernameInput: Locator;
    passwordInput: Locator;
    loginButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.usernameInput = page.getByLabel('Gebruikersnaam of e-mailadres');
        this.passwordInput = page.getByLabel('Wachtwoord');
        this.loginButton = page.getByRole('button', { name: 'Inloggen' });
    };

    async load() {
        await this.page.goto("/wp-admin/");
    };

    async login(username: string, password: string) {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    };

};

