const express = require("express");
const cors = require("cors");
const puppeteer = require("puppeteer");

const app = express();
app.use(cors());

let browser = null;

async function getBrowser() {
  if (!browser) {
    browser = await puppeteer.launch({
      headless: "new",
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
  }
  return browser;
}

app.get("/api/menu/:resId", async (req, res) => {
  let page = null;
  try {
    const { resId } = req.params;
    const b = await getBrowser();
    page = await b.newPage();

    await page.setUserAgent(
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36"
    );

    console.log(`🔄 Visiting Swiggy homepage to set cookies...`);
    await page.goto("https://www.swiggy.com", {
      waitUntil: "networkidle2",
      timeout: 60000,
    });

    const apiUrl = `https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=29.2248&lng=79.5313&restaurantId=${resId}&catalog_qa=undefined&submitAction=ENTER`;

    console.log(`🔄 Fetching menu for: ${resId}`);
    const data = await page.evaluate(async (url) => {
      const response = await fetch(url);
      return await response.json();
    }, apiUrl);

    console.log(`✅ Success for resId: ${resId}`);
    res.json(data);
  } catch (error) {
    console.error("❌ Error:", error.message);
    res.status(500).json({ error: error.message });
  } finally {
    if (page) await page.close();
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));