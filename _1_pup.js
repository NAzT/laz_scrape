const puppeteer = require('puppeteer');
const fs = require('fs')
const cheerio = require('cheerio')

let scrape = async () => {
    const browser = await puppeteer.launch({headless: true});
    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 800 });
    await page.goto('https://www.lazada.co.th');
    await page.waitForSelector('#q')
    // await page.goto('https://www.lazada.co.th', {waitUntil: 'networkidle2'});
    await page.type('#q', 'monitor');
    await page.keyboard.type(String.fromCharCode(13));
    await page.waitForNavigation({
        waitUntil: 'networkidle0',
    });
    // const title = await page.evaluate(() => {
    //     let out = document.querySelector('[data-qa-locator]')
    //     return out
    // });
    // console.log('x', title)
    const websiteContent = await page.content();
    fs.writeFileSync('web.html', websiteContent)
    const $ = cheerio.load(websiteContent)
    let x = $('[data-qa-locator] a')

    let arrs = []
    x.each(() => {
        var text = $(this).text();
        var link = "http:" + $(this).attr('href');
        arrs.push({ text, link })
    })
    fs.writeFileSync('db.json', JSON.stringify(arrs) )

    await browser.close();

};

scrape().then((value) => {
    console.log(value); // Success!
});