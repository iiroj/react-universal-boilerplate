export default ({ app, helmet, js, state }) =>
  '<!DOCTYPE html>' +
  `<html lang="en" ${helmet.htmlAttributes.toString()}>` +
  '<head>' +
  '<meta charSet="utf-8" />' +
  helmet.title.toString() +
  '<meta httpEquiv="X-UA-Compatible" content="IE=edge" />' +
  '<meta name="viewport" content="width=device-width, initial-scale=1.0" />' +
  helmet.meta.toString() +
  '<link rel="icon" href="/favicon.ico" type="image/x-icon" />' +
  '<link rel="apple-touch-icon" sizes="600x600" href="/icon.png" />' +
  helmet.link.toString() +
  '<link rel="preconnect" href="https://fonts.gstatic.com">' +
  '<link rel="preconnect" href="https://fonts.googleapis.com">' +
  js +
  '</head>' +
  `<body ${helmet.bodyAttributes.toString()}>` +
  `<script id="initial-state" type="application/json">${state}</script>` +
  `<div id="root">${app}</div>` +
  '</body>' +
  '</html>';
