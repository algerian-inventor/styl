import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

const basma = [
  "https://www.facebook.com/share/p/1978VRJMur/",
  "https://www.facebook.com/share/p/1AoV9m4kny/",
  "https://www.facebook.com/share/p/18weicETQ6/",
  "https://www.facebook.com/share/p/1HqTybecRy/",
  "https://www.facebook.com/share/p/1RTJuWy54h/",
  "https://www.facebook.com/share/p/19eSAnHq3b/",
  "https://www.facebook.com/share/p/1D44QGVvf1/",
  "https://www.facebook.com/share/p/18JRhWkh7q/",
  "https://www.facebook.com/share/p/1D5nfoXzd7/",
  "https://www.facebook.com/share/p/1Ava9Q4yoT/",
  "https://www.facebook.com/share/p/1bUHovswhk/",
  "https://www.facebook.com/share/p/1EtsKpNnsY/",
  "https://www.facebook.com/share/p/1df71ozeTF/",
  "https://www.facebook.com/share/p/1U6HcwJ7qn/",
  "https://www.facebook.com/share/p/1D7jzJMfEp/",
  "https://www.facebook.com/share/p/1DXoaGG4PR/"
];

const ansf = [
  "https://www.facebook.com/share/r/1FSFPKYNkK/",
  "https://www.facebook.com/share/p/19cQ9hoPub/",
  "https://www.facebook.com/share/p/1JrXQz163i/",
  "https://www.facebook.com/share/p/1F7a91M8pi/",
  "https://www.facebook.com/share/p/19XD2mG3DF/",
  "https://www.facebook.com/share/p/19XEj97DJg/"
];

const outDir = path.join(process.cwd(), 'public', 'images', 'social-cache');

async function capture() {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext({
    viewport: { width: 1280, height: 1024 },
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
  });
  
  const page = await context.newPage();

  async function processUrl(url, prefix) {
    const idMatch = url.match(/\/([a-zA-Z0-9]+)\/?$/);
    const id = idMatch ? idMatch[1] : 'unknown';
    const outPath = path.join(outDir, `${prefix}-${id}.png`);
    
    console.log(`\nProcessing ${url} -> ${id}`);

    try {
      await page.goto(url, { waitUntil: 'load', timeout: 20000 });
      await page.waitForTimeout(5000); // Wait for redirects and images
      
      // Close login popup if present
      await page.evaluate(() => {
        const closeBtn = document.querySelector('div[role="dialog"] div[aria-label="Close"]');
        if (closeBtn) closeBtn.click();
        
        // Sometimes it's an overlay without standard role dialog
        const overlays = Array.from(document.querySelectorAll('div')).filter(el => {
          const style = window.getComputedStyle(el);
          return style.position === 'fixed' && style.zIndex > 100;
        });
        overlays.forEach(el => el.style.display = 'none');
      });
      await page.waitForTimeout(1000);
      
      const el = await page.evaluateHandle(() => {
        let largest = null;
        let maxArea = 0;
        const imgs = Array.from(document.querySelectorAll('img, video'));
        for (const img of imgs) {
          const rect = img.getBoundingClientRect();
          const area = rect.width * rect.height;
          // Ignore small icons
          if (area > maxArea && rect.width > 200 && rect.height > 200) {
            if (!img.src || (!img.src.includes('emoji') && !img.src.includes('icon'))) {
              maxArea = area;
              largest = img;
            }
          }
        }
        return largest;
      });

      const elementIsTruthy = await el.evaluate(e => !!e);
      if (elementIsTruthy) {
        await el.screenshot({ path: outPath });
        console.log(`  -> Success: Saved media screenshot for ${id}`);
      } else {
        console.log(`  -> Failed: No suitable image found for ${id}`);
        // don't leave empty or blank file
      }
    } catch (e) {
      console.log(`  -> Failed: ${e.message}`);
    }
  }

  for (const url of ansf) {
    await processUrl(url, 'ansf');
  }
  
  for (const url of basma) {
    await processUrl(url, 'basma');
  }

  await browser.close();
  console.log('Done!');
}

capture().catch(console.error);
