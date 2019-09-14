export const htmlTemplate = ( reactDom?: string ): string => {
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" type="text/css" href="index.css">
    <title>Gender bias</title>
  </head>
  <body>
    <div id="app">${ reactDom }</div>
    <script src="index.bundle.js"></script>
  </body>
  </html>
  `;
};
