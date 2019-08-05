export const htmlTemplate = ( reactDom?: string ): string => {
  return `
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" type="text/css" href="index.css">
    <title>Document</title>
  </head>
  <body>
    <div id="app">${ reactDom }</div>
      <div class="container">
        <div class="row">
          <div class="col-3">1 of 3</div>
          <div class="col-3">2 of 3</div>
          <div class="col-3">3 of 3</div>
          <div class="col-3">3 of 3</div>
        </div>
        <div class="row">
          <div class="col-sm-2 col-md-5 col-lg-4">1 of 3</div>
          <div class="col-sm-2 col-md-5 col-lg-4">1 of 3</div>
          <div class="col-sm-2 col-md-5 col-lg-4">1 of 3</div>
          <div class="col-sm-2 col-md-5 col-lg-4">1 of 3</div>
          <div class="col-sm-2 col-md-5 col-lg-4">1 of 3</div>
        </div>
      </div>
    </div>
    <script src="index.bundle.js"></script>
  </body>
  </html>
  `;
};
