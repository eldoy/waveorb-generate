module.exports = async function(mail, $, data) {
  return /* html */`
    <!doctype html>
    <html>
      <head>
        <meta http-equiv="content-type" content="text/html; charset=utf-8">
        <title>${ mail.options.subject || '♥' }</title>
        <style>
          body {
            background-color: white;
          }
        </style>
      </head>
      <body>
        <div class="content">${ mail.html.content }</div>
      </body>
    </html>
  `
}
