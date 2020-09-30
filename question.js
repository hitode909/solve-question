const puppeteer = require('puppeteer');

const question = async (query) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(`https://www.google.com/search?q=${encodeURIComponent(query)}`);

  const answer = await page.evaluate(() => {
    let winnerContent = '';
    let winnerSize = 0;
    const allElements = document.querySelectorAll('*');
    allElements.forEach(element => {
      const content = element.textContent;
      if (!content) return;
      const sizeString = window.getComputedStyle(element).fontSize;
      if (!sizeString) return;
      const matched = sizeString.match(/^(\d+)px/);
      if (!matched) return;
      const size = + matched[1];
      if (size > winnerSize) {
        winnerSize = size;
        winnerContent = element.textContent;
      }
    });
    return winnerContent;
  });
  await browser.close();
  return answer;
}

module.exports = { question };