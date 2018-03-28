require("./lib/ads");
var paywall = require("./lib/paywall");
paywall(10767520);
// var track = require("./lib/tracking");

require("component-responsive-frame/child");

var $ = require("./lib/qsa");
var debounce = require("./lib/debounce");

var events = $(".event").reverse();
var timeline = $.one(".timeline");
var fanContainer = $.one(".fans");
var meterReading = $.one(".fans .meter .enthusiasm");
var fans = {
  happy: {},
  sad: {}
};

timeline.classList.add("loaded");

$(".fans img").forEach(function(img) {
  var id = img.getAttribute("data-fan");
  var mood = img.classList.contains("happy") ? "happy" : "sad";
  fans[mood][id] = img;
  // prime the cache
  var primer = new Image();
  primer.src = img.src;
});

var currentItem = null;

window.addEventListener("scroll", debounce(function() {
  var tBounds = timeline.getBoundingClientRect();
  if (tBounds.top < window.innerHeight && tBounds.bottom > window.innerHeight) {
    fanContainer.classList.remove("hidden");
  } else {
    fanContainer.classList.add("hidden");
    return;
  }
  var mood = 0;
  var event = null;
  for (var i = 0; i < events.length; i++) {
    event = events[i];
    var bounds = event.getBoundingClientRect();
    if (bounds.bottom > 0 && bounds.top < window.innerHeight * .5) {
      mood = event.getAttribute("data-mood") * 1;
      break;
    }
  }
  if (currentItem == event) return;
  var existing = $.one(".current");
  if (existing) existing.classList.remove("current");
  currentItem = event;
  currentItem.classList.add("visible");
  currentItem.classList.add("current");
  var bars = "";
  for (var j = 1; j <= 6; j++) {
    if (j <= mood) {
      fans.happy[j].classList.add("show");
      fans.sad[j].classList.remove("show");
      bars += "&bigstar;";
    } else {
      fans.happy[j].classList.remove("show");
      fans.sad[j].classList.add("show");
    }
  }
  meterReading.innerHTML = bars;
}));
