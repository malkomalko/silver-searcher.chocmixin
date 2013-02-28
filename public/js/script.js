var emit = chocolat.sendMessage
  , on   = chocolat.onMessage

var dom = {}

$(window).ready(function(){
  var searchBox = dom.searchBox = $("input[type='search']")

  searchBox.focus()

  searchBox.keypress(function(event){
    var keycode = (event.keyCode ? event.keyCode : event.which)

    if (keycode === 13) { // enter
      emit("search", [searchBox.val()])
    }
  })
})

function searchResults(results){
  if (dom.listView) dom.listView.remove()

  var listView = dom.listView = new infinity.ListView($("#results"))
    , searchTerm = dom.searchBox.val()
    , wrappedTerm = "<span class='hl'>" + searchTerm + "</span>"
    , re = new RegExp(searchTerm, "gi")

  results.forEach(function(result, i){
    var oddOrEven = i % 2 == 0 ? "even" : "odd"
      , lines = _.compact(result.split("\n"))
      , listItems = ""

    lines.forEach(function(line){
      line = line.replace(/</gi, "&lt;")
                 .replace(/>/gi, "&gt;")
                 .replace(re, wrappedTerm)
                 .substr(0, 100)
      listItems += "<pre>" + line + "</pre>"
    })

    listView.append(
      "<div class='search-result " + oddOrEven + "'>" + listItems + "</div>")
  })
}