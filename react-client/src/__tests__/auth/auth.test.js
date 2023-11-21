describe('Google', () => {
  beforeAll(async () => {
    await page.goto('http://localhost:4200/login');
  });

  it('should display "評価システム" text on page', async () => {
    await expect(page).toMatchTextContent('評価システム');
  });

  it('Await form display', async () => {
    await page.waitForSelector('#login_form', { visible: true });

    await expect(page).toFillForm('form[id="login_form"]', {
      email: 'vietnam.system',
      password: '111111',
    });

    // await expect(page).toMatchTextContent('評価システム');
  });
});
