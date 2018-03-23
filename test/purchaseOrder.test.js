describe('sizes', function () {
    let page;

    before (async function () {
        page = await browser.newPage();
        await page.goto(host + 'demos/globalDemo/sizes.html');
    });

    after (async function () {
        await page.close();
    })

    it('should have the correct page title', async function () {
        expect(await page.title()).to.eql('Awesome Table');
    });

    it('take_a_pictyure', async function(){
        // await page.pdf({path: 'hn.pdf', format: 'A4'});
        await page.screenshot({path: 'test/example1.png'});
    })

    it('should have a heading', async function () {
        const HEADING_SELECTOR = 'h1';
        let heading;

        await page.waitFor(HEADING_SELECTOR);
        heading = await page.$eval(HEADING_SELECTOR, heading => heading.innerText);

        expect(heading).to.eql('Purchase Order');
    });

    it('should have a single table section', async function () {
        const BODY_SELECTOR = '#table';

        await page.waitFor(BODY_SELECTOR);

        expect(await page.$$(BODY_SELECTOR)).to.have.lengthOf(1);
    });

    it('should add a row when add row is clicked', async function () {
        const selector = '#adjustableColumn_add_row';
        await page.waitFor(selector);
        page.click(selector);

        //console.log(await page.evaluate(() => new AwesomeTable.AwesomeTable('collection')));
      //  expect(await page.$$('adjustableColumn_data_tbody')).to.have.lengthOf(1);

    });
    it('should update quantity', async function () {
        const selector = '#adjustableColumn_r0c3';
        // await page.waitFor(selector);
        // page.click(selector);
        await page.waitFor(selector);
        await page.$eval(selector, el => el.value = '2');
        // const val = await page.evaluate(() => {
        //     //const anchor = document.getElementById('#adjustableColumn_r0c7');
        //     return document.querySelector('#adjustableColumn_r0c3').textContent
        //     //console.log(anchor);
        //     //return anchor.value;
        // });

        let input = await page.$('#adjustableColumn_r0c3');
        let valueHandle = await input.getProperty('value');

        assert.equal(await valueHandle.jsonValue(), '2')
        // expect( valueHandle.jsonValue()).to.equal('2');

        // expect.assert.equal(valueHandle,2);


    });






});
