let db = require('./db.json')
const puppeteer = require('puppeteer')
const fs = require('fs')
// console.log(db)

let scrape = async () => {
    const browser = await puppeteer.launch({headless: true});
    let i = 0;
    for (const dbElement of db) {
        console.log(dbElement.text)
        console.log(dbElement.link)
        const page = await browser.newPage();
        await page.setViewport({ width: 1280, height: 800 });
        await page.goto(dbElement.link, {waitUntil: 'networkidle2'});

        const items1 = await page.$$eval('#module_recommendation .recommend-content .recommend-product-list > .recommend-product-item a', items => {
            return items.map(item => {
                return {text: item.innerText, href: item.href}
            })
        })

        const items2 = await page.$$eval('#module_recommendation_2 .recommend-content .recommend-product-list > .recommend-product-item a', items => {
            return items.map(item => {
                return {text: item.innerText, href: item.href}
            })
        })

        const score = await page.$eval('.summary .score .score-average', item => item.innerText)
        // const score = await page.$$eval('.detail li', items => items )
        const items3 = await page.$$eval('.detail li .percent', items => items.map(item => {
            return {text: item.innerText};
        }))
        console.log(score)
        console.log(items3)
        console.log('-----------')
        console.log('From The Same Store')
        console.log('-----------')
        console.log(items1)
        console.log('-----------')
        console.log('People Who Viewed This Item Also Viewed')
        console.log('-----------')
        console.log(items2)



        // let x = await page.$$('.recommend-product-list .recommend-product-item')
        // console.log(x.innerText)
        // const element = await page.$$(".recommend-product-list .recommend-product-item");
        // console.log(element)
        // const text = await page.evaluate({ element => element.textContent, element);
        // console.log(text)
        // const innerTextOfButton = await page.$eval('.recommend-product-list .recommend-product-item', (el) => {
        //     return el
        // })
        // console.log(innerTextOfButton)

        // let ret = await page.evaluate(() => {
        //     return {
        //         abc: document.querySelectorAll('.recommend-product-list .recommend-product-item')
        //     }
        // })
        // console.log(ret)
        // fs.writeFileSync(`${i++}.html`, await page.content())

        // await page.close()
        // await page.waitForNavigation({
        //     waitUntil: 'networkidle0',
        // });
        // await page.waitForSelector('#q')
        // await page.type('#q', 'monitor');
        // await page.keyboard.type(String.fromCharCode(13));
    }
}
scrape()