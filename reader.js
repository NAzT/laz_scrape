let db = require('./db.json')
const puppeteer = require('puppeteer')
// console.log(db)

let scrape = async () => {
    const browser = await puppeteer.launch({headless: false});
    for (const dbElement of db) {
        const page = await browser.newPage();
        await page.setViewport({ width: 1280, height: 800 });
        await page.goto(dbElement.link, {waitUntil: 'networkidle2'});

        await page.close()
        // await page.waitForNavigation({
        //     waitUntil: 'networkidle0',
        // });
        // await page.waitForSelector('#q')
        // await page.type('#q', 'monitor');
        // await page.keyboard.type(String.fromCharCode(13));
    }
}
scrape()