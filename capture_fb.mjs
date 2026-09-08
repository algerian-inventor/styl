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
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

async function capture() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 800, height: 1200 },
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
  });
  
  const page = await context.newPage();

  async function processUrl(url, prefix) {
    const idMatch = url.match(/\/([a-zA-Z0-9]+)\/?$/);
    const id = idMatch ? idMatch[1] : 'unknown';
    const outPath = path.join(outDir, `${prefix}-${id}.png`);
    
    console.log(`Processing ${url} -> ${outPath}`);
    
    const isVideo = url.includes('/r/') || url.includes('/v/');
    const pluginUrl = isVideo 
      ? `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(url)}&show_text=false&width=500`
      : `https://www.facebook.com/plugins/post.php?href=${encodeURIComponent(url)}&show_text=false&width=500`;

    try {
      await page.goto(pluginUrl, { waitUntil: 'networkidle', timeout: 15000 });
      await page.waitForTimeout(3000);
      
      const el = await page.evaluateHandle(() => {
        let largest = null;
        let maxArea = 0;
        const elements = Array.from(document.querySelectorAll('img, video, [style*="background-image"]'));
        for (const e of elements) {
          const rect = e.getBoundingClientRect();
          const area = rect.width * rect.height;
          if (area > maxArea && rect.width > 150 && rect.height > 150) {
            maxArea = area;
            largest = e;
          }
        }
        return largest;
      });

      const elementIsTruthy = await el.evaluate(e => !!e);
      if (elementIsTruthy) {
        await el.screenshot({ path: outPath });
        console.log(`  -> Saved media screenshot for ${id}`);
      } else {
        await page.screenshot({ path: outPath });
        console.log(`  -> Saved fallback full screenshot for ${id}`);
      }
    } catch (e) {
      console.log(`  -> Failed: ${e.message}`);
    }
  }

  for (const url of ansf) {
    await processUrl(url, 'ansf');
  }
  
  for (let i = 0; i < 8; i++) {
    if (basma[i]) await processUrl(basma[i], 'basma');
  }
  
  for (let i = 8; i < basma.length; i++) {
    if (basma[i]) await processUrl(basma[i], 'basma');
  }

  await browser.close();
  console.log('Done!');
}

capture().catch(console.error);
