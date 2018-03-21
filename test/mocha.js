const puppeteer = require('puppeteer');


(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('http://localhost:8081/');
    await page.pdf({path: 'hn.pdf', format: 'A4'});
    await page.screenshot({path: 'example1.png'});


    await browser.close();
})();