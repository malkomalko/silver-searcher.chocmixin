/**
  * Module dependencies.
  */

var _ = require("underscore")._

/**
  * Api extensions.
  */

Document.prototype.pathNoExt = function(){
  var re = new RegExp(this.filename() + "$", "g")
  return this.path().split(re)[0]
}
