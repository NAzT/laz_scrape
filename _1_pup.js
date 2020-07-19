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
    console.log(arrs)
    fs.writeFileSync('db.json', JSON.stringify(arrs) )
    // x.each
    // fs.writeFileSync('resutl2.html', x)
    // let refs = x.toArray()
    // refs.shift()
    // let i =0;
    // for (const ref of refs) {
    //     let li = cheerio.load(ref)
    //     var text = $(this).text();
    //     var link = $(this).attr('href');
    //     // let aa  = li('a').toArray()
    //     // let apop = aa.pop()
    //     // let ahtml = cheerio.html(apop)
    //     // cheerio.text()
    //     // fs.writeFileSync(`${i++}.html`, ahtml)
    // }
    // fs.writeFileSync('item1.html', cheerio.html(refs[0]))
    // let li = cheerio.load(refs[0])
    // let aa  = li('a').toArray()
    // let apop = aa.pop()
    // let ahtml = cheerio.html(apop)
    // fs.writeFileSync('ahtml.html', ahtml)
    // console.log(aa.toArray())
    // let a = qqq('a')
    // console.log(a)
    // console.log(a[2].innerText)
    // console.log(qqq)
    // fs.writeFileSync('a.html', a)
    // console.log(refs)

    // refs

    // console.log(refs)
    // fs.writeFileSync('item1.html', refs[0].text())
    // let refs = [...x]
    // refs.shift()
    // console.log(refs)
    // console.log(refs)
   //
    // console.log($)
    // fs.writeFileSync('result.html', websiteContent)
    // console.log(title);
    // const elems = await page.evaluate(() => {
    //     // document.querySelector('#roductTitle').innerHTML
    //
    //     let out = document.querySelectorAll('[data-qa-locator]');
    //     console.log(out)
    //     return out.innerHTML
    // });
    // await page.screenshot({path: 'lazada.png'});
    // console.log(elems)

    // console.log(websiteContent)
    browser.close()
    // let googleHtml = await page.getPageContent(ws);
    // await page.type(String.fromCharCode(13));
    // await page.click('form :first');
    // #topActionHeader > div > div.lzd-logo-bar > div > div.lzd-nav-search > form > div > div.search-box__search--2fC5 > button
    // await page.waitForSelector('#search > div.sg-row > div.sg-col-20-of-24.sg-col-28-of-32.sg-col-16-of-20.sg-col.s-right-column.sg-col-32-of-36.sg-col-8-of-12.sg-col-12-of-16.sg-col-24-of-28 > div > span:nth-child(4) > div.s-result-list.s-search-results.sg-row > div:nth-child(1) > div > div > div > div > div > div:nth-child(2) > div:nth-child(1) > div > div > span > a > div > img');
    // await page.screenshot({path: 'cat.png'});
    // const response = await Promise.all([
    //     page.waitForNavigation(), // The promise resolves after navigation has finished
    //     page.setDefaultNavigationTimeout(0),
    //     page.click('#search > div.sg-row > div.sg-col-20-of-24.sg-col-28-of-32.sg-col-16-of-20.sg-col.s-right-column.sg-col-32-of-36.sg-col-8-of-12.sg-col-12-of-16.sg-col-24-of-28 > div > span:nth-child(4) > div.s-result-list.s-search-results.sg-row > div:nth-child(1) > div > div > div > div > div > div:nth-child(2) > div:nth-child(1) > div > div > span > a > div > img'), // Clicking the link will indirectly cause a navigation
    // ]);
    // await page.waitForSelector('#productTitle');
    // await page.emulateMedia('screen');
    // await page.pdf({path: 'cat.pdf', format: 'A4', pageRanges: '1',printBackground:true});
    // const title = await page.evaluate(() => document.querySelector('#productTitle').innerHTML);
    // console.log(title);


    await browser.close();

};

scrape().then((value) => {
    console.log(value); // Success!
});