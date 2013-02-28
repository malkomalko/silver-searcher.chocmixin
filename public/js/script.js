var emit = chocolat.sendMessage
  , on   = chocolat.onMessage

$(window).ready(function(){
  var searchBox = $("input[type='search']")

  searchBox.focus()

  searchBox.keypress(function(event){
    var keycode = (event.keyCode ? event.keyCode : event.which)

    if (keycode === 13) { // enter
      emit("search", [searchBox.val()])
    }
  })
})

function searchResults(results){
  var el = $("#results")

  el.html("")

  results.forEach(function(result){
    el.append("<li>" + result + "</li>")
  })
}