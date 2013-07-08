<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title></title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- build:css(build) css/app.min.css -->
    <link rel="stylesheet" href="css/app.css">
    <!-- endbuild -->
  </head>
  <body>
    <div id="app"></div>
    <!-- build:js(build) js/lib.min.js -->
    <script src="lib/react.js"></script>
    <!-- endbuild -->
    <!-- build:js(build) js/app.min.js -->
    <script src="js/app.js"></script>
    <!-- endbuild -->
    <% if (!production) { %>
    <script src="http://localhost:35729/livereload.js"></script>
    <% } %>
  </body>
</html>
