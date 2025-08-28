const fs = require('fs/promises');
const path = require('path');
const { marked } = require('marked');
const puppeteer = require('puppeteer');

async function readMarkdown(filePath) {
  const content = await fs.readFile(filePath, 'utf8');
  return content;
}

function buildHtml(markdown) {
  const htmlBody = marked.parse(markdown, { mangle: false, headerIds: true });
  const styles = `
    :root {
      --accent: #0d6efd;
      --text: #1f2937;
      --muted: #6b7280;
      --border: #e5e7eb;
    }
    @page {
      size: A4;
      margin: 20mm 16mm 24mm 16mm;
    }
    * { box-sizing: border-box; }
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', 'Liberation Sans', sans-serif; color: var(--text); line-height: 1.6; }
    h1, h2, h3 { color: #111827; }
    h1 { font-size: 28px; margin: 0 0 8px; }
    h2 { font-size: 20px; margin-top: 24px; border-bottom: 1px solid var(--border); padding-bottom: 6px; }
    h3 { font-size: 16px; margin-top: 18px; }
    p { margin: 8px 0; }
    code, pre { font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace; font-size: 12px; }
    pre { background: #0b1020; color: #d1e9ff; border-radius: 8px; padding: 12px 14px; overflow-x: auto; border: 1px solid #0d1b2a; }
    pre code { background: transparent; padding: 0; }
    code { background: #f3f4f6; color: #111827; padding: 1px 4px; border-radius: 4px; }
    blockquote { border-left: 3px solid var(--accent); margin: 8px 0; padding: 6px 12px; color: var(--muted); background: #f8fafc; }
    table { width: 100%; border-collapse: collapse; margin: 8px 0 14px; }
    th, td { border: 1px solid var(--border); padding: 8px; font-size: 12px; }
    th { background: #f8fafc; text-align: left; }
    ul { margin: 6px 0 6px 20px; }
    .doc-title { display:flex; align-items:center; justify-content:space-between; padding-bottom: 8px; border-bottom: 2px solid var(--border); margin-bottom: 10px; }
    .brand { font-size: 13px; color: var(--muted); }
    .chip { border: 1px solid var(--border); border-radius: 999px; padding: 4px 10px; font-size: 11px; color: var(--muted); }
    .toc { border: 1px solid var(--border); border-radius: 12px; padding: 10px; background: #ffffff; margin: 10px 0 16px; }
    .toc h3 { margin: 0 0 6px; font-size: 14px; }
    .toc a { text-decoration: none; color: var(--accent); }
    .footer { font-size: 10px; color: var(--muted); border-top: 1px solid var(--border); margin-top: 16px; padding-top: 6px; }
  `;

  return `<!doctype html>
  <html lang="tr">
  <head>
    <meta charset="utf-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1"/>
    <title>Teurny.com Teknik Teslim ve Doğrulama Raporu</title>
    <style>${styles}</style>
  </head>
  <body>
    <div class="doc-title">
      <div>
        <h1>Teurny.com Teknik Teslim ve Doğrulama Raporu</h1>
        <div class="brand">Rapor tarihi: ${new Date().toLocaleDateString('tr-TR')}</div>
      </div>
      <div class="chip">Gizli • İç Kullanım</div>
    </div>
    ${htmlBody}
    <div class="footer">Bu rapor Teurny.com için hazırlanmıştır. Otomatik oluşturma: Node + Puppeteer.</div>
  </body>
  </html>`;
}

async function htmlToPdf(html, outPdfPath) {
  const browser = await puppeteer.launch({
    headless: true,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--font-render-hinting=none'
    ]
  });
  const page = await browser.newPage();
  await page.setContent(html, { waitUntil: 'networkidle0' });
  await page.pdf({
    path: outPdfPath,
    format: 'A4',
    printBackground: true,
    margin: { top: '20mm', bottom: '16mm', left: '12mm', right: '12mm' },
    displayHeaderFooter: true,
    headerTemplate: `<div style="font-size:8px; color:#6b7280; width:100%; padding:4px 12px;">Teurny.com Teknik Teslim ve Doğrulama Raporu</div>`,
    footerTemplate: `<div style="font-size:8px; color:#6b7280; width:100%; padding:4px 12px; text-align:right;">Sayfa <span class="pageNumber"></span>/<span class="totalPages"></span></div>`
  });
  await browser.close();
}

async function main() {
  const mdPath = path.resolve(__dirname, 'Teslim_Raporu.md');
  const outHtmlPath = path.resolve(__dirname, 'Teslim_Raporu.html');
  const outPdfPath = path.resolve(__dirname, 'Teslim_Raporu.pdf');

  const md = await readMarkdown(mdPath);
  const html = buildHtml(md);
  await fs.writeFile(outHtmlPath, html, 'utf8');
  await htmlToPdf(html, outPdfPath);
  console.log('HTML:', outHtmlPath);
  console.log('PDF:', outPdfPath);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});

