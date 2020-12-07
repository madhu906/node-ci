Number.prototype._called = {};
const Page = require('./helpers/page');
// test('Add two numbers', () =>{
//  const sum = 1 + 2;
//  expect(sum).toEqual(3);
// })

let page;
beforeEach(async () =>{
    page = await Page.build()
    await page.goto('http://localhost:3000');
})
afterEach(async () =>{
    await page.close();
})
test('We can launch a browser', async () =>{

    // const text = await page.$eval('a.brand-logo', el => el.innerHTML);
    const text = await page.getContentsOf('a.brand-logo');
    expect(text).toEqual('Blogster')
})

test('Check login url', async () =>{

    await page.click('.right a');
    const url = await page.url();
    expect(url).toMatch(/accounts\.google\.com/)
})

//test.only for running one test case out of all
test('when signed in shows logout button', async () =>{
    // const id = '5fb7505dc05ae40aa6186843';
    await page.login();
    const text = await page.$eval('a[href="/auth/logout"]', el => el.innerHTML);
    expect(text).toEqual('Logout')
})