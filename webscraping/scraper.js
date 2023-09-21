const puppeteer = require('puppeteer');

const scrapeAcademieVisage = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  await page.goto('https://www.academiebeaute.com/collections/visage');

  const products = await page.evaluate(() => {
    const productNodes = document.querySelectorAll('div.product-item');
    const productArray = [];

    productNodes.forEach(node => {
      const name = node.querySelector('h3.product-item__title a')?.textContent?.trim();
      const price = node.querySelector('span.money')?.textContent?.trim();
      
      if (name && price) {
        productArray.push({ name, price });
      }
    });

    return productArray;
  });

  console.log(products);

  await browser.close();
}

scrapeAcademieVisage();
