// require("./lib/social");
// require("./lib/ads");
// var track = require("./lib/tracking");

require("component-responsive-frame/child");

var $ = require("./lib/qsa");

var events = $(".event").reverse();
var timeline = $.one(".timeline");
var fanContainer = $.one(".fans");
var fans = {
  happy: {},
  sad: {}
};

$(".fans img").forEach(function(img) {
  var id = img.getAttribute("data-fan");
  var mood = img.classList.contains("happy") ? "happy" : "sad";
  fans[mood][id] = img;
  // prime the cache
  var primer = new Image();
  primer.src = img.src;
});

var currentMood = 0;

window.addEventListener("scroll", function() {
  var tBounds = timeline.getBoundingClientRect();
  if (tBounds.top < window.innerHeight && tBounds.bottom > window.innerHeight) {
    fanContainer.classList.remove("hidden");
  } else {
    fanContainer.classList.add("hidden");
    return;
  }
  var mood = 6;
  for (var i = 0; i < events.length; i++) {
    var e = events[i];
    var bounds = e.getBoundingClientRect();
    if (bounds.bottom > 0 && bounds.top < window.innerHeight * .5) {
      mood = e.getAttribute("data-mood") * 1;
      break;
    }
  }
  for (var j = 1; j <= 6; j++) {
    if (j <= mood) {
      fans.happy[j].classList.add("show");
      fans.sad[j].classList.remove("show");
    } else {
      fans.happy[j].classList.remove("show");
      fans.sad[j].classList.add("show");
    }
  }
});