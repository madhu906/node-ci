Number.prototype._called = {};
const Page = require('./helpers/page');
let page;

beforeEach(async () =>{
    page = await Page.build()
    await page.goto('http://localhost:3000');
})
afterEach(async () =>{
    await page.close();
})



describe('When logged in', async ()=>{
    beforeEach(async () =>{
        await page.login();
        await page.click('a.btn-floating');
    })
    test('show create blog form', async () =>{    
        const label = await page.getContentsOf('form label');
    
        expect(label).toEqual('Blog Title');
    });


describe('And using valid inputs', async () => {
    beforeEach(async () =>{
        await page.type('.title input', 'My Title');
        await page.type('.content input', 'My Content');
        await page.click('form button');
    });

    test('Submitting takes user to review', async () => {
            const text = await page.getContentsOf('h5');
            expect(text).toEqual('Please confirm your entries');     
    })

    test('Submitting then saving add blog to index page', async () => {
        await page.click('button.green')
        await page.waitFor('.card');
        const title = await page.getContentsOf('.card-title');
        const content = await page.getContentsOf('p');

        expect(title).toEqual('My Title');
        expect(content).toEqual('My Content')
    });
})


describe('And using invalid inputs', async () => {
    beforeEach(async () =>{
        await page.waitFor('form button')
        await page.click('form button');
    });

    test('the form shows an error message', async () => {
            const titleError = await page.getContentsOf('.title .red-text');
            const contentError = await page.getContentsOf('.content .red-text');
    
            expect(titleError).toEqual('You must provide a value');
            expect(contentError).toEqual('You must provide a value');
        
    })
})

});

describe('User is not logged in', async () => {
    const actions = [{
        method: 'get',
        path: '/api/blogs'
    },
    {
        method: 'post',
        path: '/api/blogs',
        data: {title:"m", content:"c"} 
    }
    ]

    test('Blog actions prohibited', async () => {
       const results =  await page.execRequests(actions);

       for(let result of results){
        expect(result).toEqual({error: 'You must log in!'})
       }
        
    })
    // test('User cannot create blog post', async () => {
    //     const result = await page.evaluate(
    //         () => {
    //         return fetch('/api/blogs',{
    //                 method: 'POST',
    //                 credentials: 'same-origin',
    //                 headers: {
    //                     'Content-Type' : 'application/json'
    //                 },
    //                 body: JSON.stringify({title:"My Title", content:"My Content"})
    //             }).then(res => res.json());
    //         }
    //     )

    //     expect(result).toEqual({error: 'You must log in!'})

    // });

    // test('User cannot get list of blog posts', async () => {
    //     const result = await page.get('/api/blogs');
                    

    //     expect(result).toEqual({error: 'You must log in!'})

    // });

})