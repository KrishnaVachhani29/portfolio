import Cursor from "./cursor.js";
import Magnetic from "./magnetic.js";

const $ = window.jQuery;

if (!$ || !window.gsap) {
    throw new Error("Cursor scripts require jQuery and GSAP to be loaded before js/cursor/index.js.");
}

// Init magnetic
$('[data-magnetic]').each(function () {new Magnetic(this);});

const cursor = new Cursor({
      container: "body",
      speed: 0.7, // animation speed
      ease: "expo.out", // gsap easing
      visibleTimeout: 300
});
