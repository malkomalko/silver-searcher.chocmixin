/**
  * Module dependencies.
  */

var _ = require("underscore")._

/**
  * Chocolat mixin.
  */

var mixin = module.exports = {}

var createWindow = function(){
  if (mixin.win && mixin.win.isVisible()) return

  var win = mixin.win = new Window()
  win.htmlPath = "public/silver_searcher.html"
  win.buttons = ["OK"]
  win.useDefaultCSS = false
  win.onButtonClick = function() { win.close() }
  win.run()
}

mixin.ag = function(){
  createWindow()
}