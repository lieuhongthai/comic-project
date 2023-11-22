// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require('fs').promises;

import path from 'path';

import 'expect-puppeteer';
describe('Evaluation Login', () => {
  beforeAll(async () => {
    await page.goto('http://localhost:4200/login');
  });

  it('Case1: Should display "評価システム" text on page', async () => {
    await expect(page).toMatchTextContent('評価システム');
    await page.waitForSelector('#login_form', { visible: true });
    await page.screenshot({ path: path.resolve(__dirname, './screenshots/1.jpg') });
  });

  it('Case2: Email is required', async () => {
    await expect(page).toFill('input[name="email"]', 'v');

    await page.keyboard.down('Backspace');

    await expect(page).toMatchElement('div.ant-form-item-explain-error', { text: 'この項目を入力してください。' });
    await page.screenshot({ path: path.resolve(__dirname, './screenshots/2.jpg') });
  });

  it('Case3: Email is max 30 character', async () => {
    await expect(page).toFill('input[name="email"]', '1234567891234567891234567891234');

    await expect(page).toMatchElement('div.ant-form-item-explain-error', { text: '30文字以内で入力してください。' });
    await page.screenshot({ path: path.resolve(__dirname, './screenshots/3.jpg') });

    await page.click('input[name="email"]', { clickCount: 3 });

    await page.type('input[name="email"]', ' ');
  });

  it('Case4: Password is required', async () => {
    await expect(page).toFill('input[name="password"]', 'v');

    await page.keyboard.down('Backspace');

    await expect(page).toMatchElement('div.ant-form-item-explain-error', { text: 'この項目を入力してください。' });
    await page.screenshot({ path: path.resolve(__dirname, './screenshots/4.jpg') });
  });

  it('Case5: Password is max 100 character', async () => {
    await expect(page).toFill(
      'input[name="password"]',
      '12345678912345678912345678912341234567891234567891234567891234123456789123456789123456789123412345678',
    );

    await expect(page).toMatchElement('div.ant-form-item-explain-error', { text: '100文字以内で入力してください。' });
    await page.screenshot({ path: path.resolve(__dirname, './screenshots/5.jpg') });

    await page.click('input[name="password"]', { clickCount: 3 });

    await page.type('input[name="password"]', ' ');
  });

  it('Case6: Login failed', async () => {
    await page.click('input[name="email"]', { clickCount: 3 });
    await expect(page).toFill('input[name="email"]', 'vietnam.system.123');

    await page.click('input[name="password"]', { clickCount: 3 });
    await expect(page).toFill('input[name="password"]', '111111');

    await expect(page).toClick('button', { text: 'ログイン' });

    await expect(page).toMatchElement('span', { text: 'ユーザ名またはパスワードが正しくありません。もう一度入力してください。' });
    await page.screenshot({ path: path.resolve(__dirname, './screenshots/6.jpg') });
  });

  it('Case7: Login successfully', async () => {
    await page.click('input[name="email"]', { clickCount: 3 });
    await expect(page).toFill('input[name="email"]', 'vietnam.system');

    await page.click('input[name="password"]', { clickCount: 3 });
    await expect(page).toFill('input[name="password"]', '111111');

    await expect(page).toClick('button', { text: 'ログイン' });

    await expect(page).toMatchTextContent('ナビゲーション');

    const cookies = await page.cookies();
    fs.writeFile(path.resolve(__dirname, `./cookies.json`), JSON.stringify(cookies, null, 2), () => {});
    await page.screenshot({ path: path.resolve(__dirname, './screenshots/7.jpg') });
  });
});
