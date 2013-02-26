/**
  * Module dependencies.
  */

var _ = require("underscore")._

/**
  * Chocolat mixin.
  */

var mixin = module.exports = {}

mixin.ag = function(){
  var win = new Window()
  win.html = "<!DOCTYPE html><h1>Silver Searcher</h1>"
  win.buttons = ["OK"]
  win.onButtonClick = function() { win.close() }
  win.run()
}