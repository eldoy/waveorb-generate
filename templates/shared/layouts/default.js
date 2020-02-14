module.exports = async function($) {
  const host = $.req.headers['x-waveorb-build']
    ? 'https://example.com/api'
    : 'http://localhost:5000'

  return /* html */`
    <!doctype html>
    <html lang="${ $.lang }">
      <head>
        <meta http-equiv="content-type" content="text/html; charset=utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="description" content="Waveorb - Javascript framework for creating incredible web apps">
        <title>${ $.page.title || '♥' } - Waveorb</title>
        <link rel="icon" type="image/png" href="/img/favicon.png">
        <script src="/js/haka-min.js"></script>
        <script src="/js/waveorb-min.js"></script>
        <script>window.api = waveorb('${ host }')</script>
      </head>
      <body>
        <div class="main">${ $.page.content }</div>
      </body>
    </html>
  `
}
