// const { chromium } = require('playwright');
//
// (async () => {
//     const browser = await chromium.launch();
//     const context = await browser.newContext();
//     const page = await context.newPage();
//     await page.goto('https://www.lazada.co.th');
//     let x = await page.$("#q").click()
//     console.log(x)
//     // await x.click().type("monitor").submit()
//     // console.log(x.click)
//         // .click().type("monitor").submit()
//     // await page.click('#q');
//     // await page.waitForRequest(/.*preview\/pwa/);
//     await page.screenshot({ path: 'colosseum-iphone.png' });
//     await browser.close();})();