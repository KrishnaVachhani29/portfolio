gsap.registerPlugin(ScrollTrigger);

const lenis = new Lenis({
    lerp: 0.08,
    smoothWheel: true,
    syncTouch: true,
    touchMultiplier: 1,
    wheelMultiplier: 0.85
});

lenis.on("scroll", ScrollTrigger.update);

const raf = (time) => {
    lenis.raf(time);
    requestAnimationFrame(raf);
};

requestAnimationFrame(raf);

window.lenis = lenis;




const loader = document.getElementById("site-loader");
const loaderPanel = loader ? loader.querySelector(".loader") : null;
const loaderName = loader ? loader.querySelector(".loader-name") : null;
const scrollProgressBtn = document.querySelector(".scroll-progress-btn");
const scrollProgressValue = document.querySelector(".scroll-progress-value");
const lenisInstance = window.lenis;
let pageLoaded = document.readyState === "complete";
let loaderIntroComplete = false;
let loaderExitStarted = false;
let loaderDismissed = false;

const updateScrollProgress = (lenisData) => {
    const scrollTop = lenisData && typeof lenisData.scroll === "number"
        ? lenisData.scroll
        : (window.scrollY || window.pageYOffset);
    const maxScroll = lenisData && typeof lenisData.limit === "number"
        ? lenisData.limit
        : Math.max(document.documentElement.scrollHeight - window.innerHeight, 0);
    const progress = maxScroll > 0 ? Math.min((scrollTop / maxScroll) * 100, 100) : 0;
    const roundedProgress = Math.round(progress);

    document.documentElement.style.setProperty("--scroll-progress", `${progress}%`);
    scrollProgressValue.textContent = `${roundedProgress}%`;
    scrollProgressBtn.classList.add("is-visible");
    scrollProgressBtn.classList.toggle("is-at-top", scrollTop < 10);
};

scrollProgressBtn.addEventListener("click", () => {
    if (lenisInstance && typeof lenisInstance.scrollTo === "function") {
        lenisInstance.scrollTo(0, {
            duration: 1.2
        });
        return;
    }

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});

if (lenisInstance && typeof lenisInstance.on === "function") {
    lenisInstance.on("scroll", updateScrollProgress);
} else {
    window.addEventListener("scroll", updateScrollProgress, { passive: true });
}

window.addEventListener("resize", updateScrollProgress);

const beginLoaderExit = () => {
    if (!loaderPanel || loaderExitStarted || !pageLoaded || !loaderIntroComplete) return;
    loaderExitStarted = true;
    loaderPanel.classList.add("is-exiting");
};

const completeLoader = () => {
    if (loaderDismissed) return;
    loaderDismissed = true;
    loaderPanel.classList.add("is-hidden");
    loader.classList.add("is-hidden");
    document.body.classList.remove("is-loading");
    updateScrollProgress();

    if (lenisInstance && typeof lenisInstance.start === "function") {
        lenisInstance.start();
    }

    requestAnimationFrame(() => {
        if (window.ScrollTrigger && typeof window.ScrollTrigger.refresh === "function") {
            window.ScrollTrigger.refresh();
        }

        if (typeof window.playHeroEntrance === "function") {
            window.playHeroEntrance();
        }
    });
};

if (loaderName) {
    loaderName.addEventListener("animationend", (event) => {
        if (event.target !== loaderName || event.animationName !== "nameScale") return;
        loaderIntroComplete = true;
        beginLoaderExit();
    }, { once: true });
} else {
    loaderIntroComplete = true;
}

if (loaderPanel) {
    loaderPanel.addEventListener("animationend", (event) => {
        if (event.target !== loaderPanel || event.animationName !== "loaderOut") return;
        completeLoader();
    });
}

if (pageLoaded) {
    beginLoaderExit();
} else {
    window.addEventListener("load", () => {
        pageLoaded = true;
        beginLoaderExit();
    }, { once: true });
}




gsap.to(".about-thumb-wrapper .star-icon", {
    rotate: "720 deg",
    duration: 1,
    scrollTrigger: {
        trigger: ".about",
        start: "top 72%",
        scrub: true,
    }
})



// Cursor
var main = document.getElementById("main");
var cursor = document.getElementById("cursor");
var btn = document.querySelectorAll(".btn, button")

main.addEventListener("mousemove", function (event) {
    gsap.to(cursor, {
        x: event.x - 10,
        y: event.y - 10,
        duration: 0.6,
        overwrite: "auto"
    })
})

btn.forEach(function (item) {
    item.addEventListener("mouseenter", function () {
        gsap.to(cursor, {
            scale: 1.75,
            duration: 0.5,
            overwrite: "auto"
        });
    });
});

btn.forEach(function (item) {
    item.addEventListener("mouseleave", function () {
        gsap.to(cursor, {
            scale: 1,
            duration: 0.5,
            overwrite: "auto"
        });
    });
});

const heroTimeline = gsap.timeline({
    paused: true,
    defaults: {
        ease: "power3.out"
    }
});

let heroTimelineStarted = false;

window.playHeroEntrance = () => {
    if (heroTimelineStarted) return;
    heroTimelineStarted = true;
    heroTimeline.play(0);
};

heroTimeline
    .from(".header .navbar-wrapper", {
        y: -36,
        opacity: 0,
        duration: 0.85
    })
    .from(".header .navbar .nav-item", {
        y: -18,
        opacity: 0,
        stagger: 0.08,
        duration: 0.45
    }, "-=0.45")
    .to(".hero-shape", {
        y: -60,
        scale: 1,
        opacity: 1,
        rotate: "720 deg",
        duration: 1
    }, "-=0.2")
    .from(".hero-title", {
        y: 55,
        opacity: 0,
        duration: 1
    }, "-=0.75")
    .from(".hero .text-desc", {
        y: 36,
        opacity: 0,
        duration: 0.8
    }, "-=0.55")
    .from(".hero .innovate-btn", {
        y: 24,
        opacity: 0,
        duration: 0.7
    }, "-=0.5")
    .from(".hero .rating, .hero .rating-year", {
        x: 34,
        opacity: 0,
        stagger: 0.08,
        duration: 0.7
    }, "-=0.68")
    .from(".thumb-wrapper img", {
        y: "100%",
        opacity: 0,
        duration: 1
    }, "-=0.9");

heroTimeline.progress(1).progress(0).pause();



const swiperBaseConfig = {
    spaceBetween: 0,
    loop: true,
    speed: 4000,
    freeMode: {
        enabled: true,
        sticky: false,
    },
    autoplay: {
        delay: 0,
        disableOnInteraction: false,
    }
};

const workSwiperConfig = {
    ...swiperBaseConfig,
    slidesPerView: 6,
    breakpoints: {
        0: { slidesPerView: 2.2 },
        576: { slidesPerView: 3.2 },
        768: { slidesPerView: 4 },
        992: { slidesPerView: 5 },
        1200: { slidesPerView: 6 }
    }
};

const skillSwiperConfig = {
    ...swiperBaseConfig,
    slidesPerView: 6,
    breakpoints: {
        0: { slidesPerView: 2.6 },
        576: { slidesPerView: 3.6 },
        768: { slidesPerView: 4.6 },
        992: { slidesPerView: 5.5 },
        1200: { slidesPerView: 6 }
    }
};

document.querySelectorAll(".work-swiper .mySwiper").forEach(function (swiperElement) {
    new Swiper(swiperElement, workSwiperConfig);
});

document.querySelectorAll(".skill-swiper .mySwiper").forEach(function (swiperElement) {
    new Swiper(swiperElement, skillSwiperConfig);
});



const menuOpener = document.querySelector(".menu-opener");
const siteNavbar = document.querySelector(".header .navbar-wrapper .navbar");

const closeMobileMenu = () => {
    if (!menuOpener) return;
    menuOpener.classList.remove("open");
    menuOpener.setAttribute("aria-expanded", "false");
};

if (menuOpener && siteNavbar) {
    menuOpener.setAttribute("aria-expanded", "false");
    menuOpener.setAttribute("aria-label", "Toggle navigation");

    menuOpener.addEventListener("click", function () {
        if (window.innerWidth > 767) return;
        const isOpen = menuOpener.classList.toggle("open");
        menuOpener.setAttribute("aria-expanded", String(isOpen));
    });

    siteNavbar.querySelectorAll(".nav-link").forEach(function (link) {
        link.addEventListener("click", function () {
            if (window.innerWidth <= 767) {
                closeMobileMenu();
            }
        });
    });

    window.addEventListener("resize", function () {
        if (window.innerWidth > 767) {
            closeMobileMenu();
        }
    });
}

const createReplayScene = ({ playTrigger, start = "top 82%", timeline, reset }) => {
    let hasPlayed = false;

    reset();

    ScrollTrigger.create({
        trigger: playTrigger,
        start,
        onEnter: () => {
            if (hasPlayed) return;
            hasPlayed = true;
            reset();
            timeline.restart();
        },
        onEnterBack: () => {
            if (hasPlayed) return;
            hasPlayed = true;
            reset();
            timeline.restart();
        }
    });
};

const resetCounterVisual = () => {
    gsap.set(".counter .counter-wrapper", {
        y: 36,
        opacity: 0,
        scale: 0.97
    });

    gsap.set(".counter .counter-block", {
        y: 28,
        opacity: 0
    });
};

const counterVisualTimeline = gsap.timeline({
    paused: true
});

counterVisualTimeline
    .to(".counter .counter-wrapper", {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.9,
        ease: "power3.out"
    })
    .to(".counter .counter-block", {
        y: 0,
        opacity: 1,
        duration: 0.65,
        ease: "power3.out",
        stagger: 0.08
    }, 0.16);

createReplayScene({
    playTrigger: ".counter",
    start: "top 82%",
    timeline: counterVisualTimeline,
    reset: resetCounterVisual
});

document.querySelectorAll(".count-num").forEach((item) => {
    const counterState = { value: 0 };
    const targetValue = Number(item.dataset.target);
    const resetCounter = () => {
        gsap.killTweensOf(counterState);
        counterState.value = 0;
        item.textContent = "0";
    };

    const playCounter = () => {
        resetCounter();
        gsap.to(counterState, {
            value: targetValue,
            duration: 0.75,
            ease: "power2.out",
            onUpdate() {
                item.textContent = Math.floor(counterState.value);
            }
        });
    };

    ScrollTrigger.create({
        trigger: ".counter",
        start: "top 82%",
        onEnter: playCounter,
        onEnterBack: playCounter
    });
});

const resetAboutAnimation = () => {
    gsap.set(".about .col-lg-7 .section-title", {
        y: 52,
        opacity: 0
    });
    gsap.set(".about .about-thumb-wrapper > .img-fluid", {
        y: 34,
        opacity: 0,
        scale: 0.96
    });
    gsap.set(".about .label-wrapper", {
        x: -26,
        opacity: 0
    });
    gsap.set(".about .col-lg-5 .section-desc", {
        x: 34,
        opacity: 0
    });
    gsap.set(".about .col-lg-5 .img-fluid", {
        y: 40,
        opacity: 0
    });
};

const aboutTimeline = gsap.timeline({
    paused: true
});

aboutTimeline
    .to(".about .col-lg-7 .section-title", {
        y: 0,
        opacity: 1,
        duration: 0.85,
        ease: "power3.out"
    })
    .to(".about .about-thumb-wrapper > .img-fluid", {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 1,
        ease: "power3.out"
    }, 0.14)
    .to(".about .label-wrapper", {
        x: 0,
        opacity: 1,
        duration: 0.72,
        ease: "power2.out"
    }, 0.42)
    .to(".about .col-lg-5 .section-desc", {
        x: 0,
        opacity: 1,
        duration: 0.75,
        ease: "power3.out"
    }, 0.2)
    .to(".about .col-lg-5 .img-fluid", {
        y: 0,
        opacity: 1,
        duration: 0.85,
        ease: "power3.out"
    }, 0.34);

createReplayScene({
    playTrigger: ".about",
    start: "top 78%",
    timeline: aboutTimeline,
    reset: resetAboutAnimation
});

var navBtn = document.querySelectorAll(".nav-pills button");

navBtn.forEach(function (item) {
    item.addEventListener("shown.bs.tab", function () {
        const targetPane = document.querySelector(item.getAttribute("data-bs-target"));
        const paneImage = targetPane ? targetPane.querySelector("img") : null;

        if (!paneImage) return;

        gsap.from(paneImage, {
            y: 34,
            scale: 0.92,
            opacity: 0,
            duration: 0.75,
            ease: "power3.out",
            overwrite: "auto"
        });
    });
});

// gsap.to("#gray-shape-star", {
//     x: 1546,
//     rotate: "720 deg",
//     duration: 5,
//     scrollTrigger: {
//         trigger: ".swiper-section",
//         scrub: true,
//         start: "top 70%"
//     }
// });

ScrollTrigger.matchMedia({
    "(min-width: 992px)": function () {
        gsap.to(".service-fixed-label", {
            y: 500,
            duration: 0.2,
            scrollTrigger: {
                trigger: ".services",
                start: "top 35%",
                scrub: true
            }
        });
    }
});

const resetServicesAnimation = () => {
    gsap.set(".services .section-title", {
        y: 46,
        opacity: 0
    });
    gsap.set(".services .section-desc", {
        y: 30,
        opacity: 0
    });
    gsap.set(".services .nav-link", {
        x: -42,
        opacity: 0
    });
    gsap.set(".services .tab-content", {
        x: 48,
        opacity: 0
    });
};

const servicesTimeline = gsap.timeline({
    paused: true
});

servicesTimeline
    .to(".services .section-title", {
        y: 0,
        opacity: 1,
        duration: 0.85,
        ease: "power3.out"
    })
    .to(".services .section-desc", {
        y: 0,
        opacity: 1,
        duration: 0.7,
        ease: "power3.out"
    }, 0.12)
    .to(".services .nav-link", {
        x: 0,
        opacity: 1,
        duration: 0.72,
        stagger: 0.1,
        ease: "power3.out"
    }, 0.18)
    .to(".services .tab-content", {
        x: 0,
        opacity: 1,
        duration: 0.9,
        ease: "power3.out"
    }, 0.3);

createReplayScene({
    playTrigger: ".services",
    start: "top 80%",
    timeline: servicesTimeline,
    reset: resetServicesAnimation
});

const resetWorkAnimation = () => {
    gsap.set(".work-swiper .swiper", {
        y: 44,
        opacity: 0
    });
    gsap.set(".work-swiper .v-line", {
        scaleX: 0,
        transformOrigin: "left center"
    });
    gsap.set("#gray-shape-star", {
        scale: 0,
        rotate: -180,
        opacity: 0
    });
};

const workTimeline = gsap.timeline({
    paused: true
});

workTimeline
    .to(".work-swiper .swiper", {
        y: 0,
        opacity: 1,
        duration: 0.95,
        ease: "power3.out"
    })
    .to(".work-swiper .v-line", {
        scaleX: 1,
        duration: 0.8,
        stagger: 0.08,
        ease: "power2.out"
    }, 0.24)
    .to("#gray-shape-star", {
        scale: 1,
        rotate: 0,
        opacity: 1,
        duration: 0.8,
        ease: "back.out(1.6)"
    }, 0.36);

createReplayScene({
    playTrigger: ".work-swiper",
    start: "top 82%",
    timeline: workTimeline,
    reset: resetWorkAnimation
});

const processCards = [
    ".process .card-one",
    ".process .card-third",
    ".process .card-two",
    ".process .card-fourth"
];

const processOuterShapes = [".process-ellipse-outer", ".process-ellipse-outer-fill"];
const processInnerShapes = [".process-ellipse-inner", ".process-ellipse-inner-fill"];

const resetProcessAnimation = () => {
    gsap.set(".process .section-btn, .process .section-title, .process .section-desc", {
        y: 40,
        opacity: 0
    });

    gsap.set(".process .process-card", {
        "--connector-scale": 0,
        y: 42,
        opacity: 0
    });

    gsap.set(processInnerShapes, {
        y: 72,
        scale: 0.82,
        opacity: 0.18,
        transformOrigin: "center center"
    });

    gsap.set(processOuterShapes, {
        scale: 0.96,
        opacity: 0.65,
        transformOrigin: "center center"
    });
};

resetProcessAnimation();

const processTimeline = gsap.timeline({
    paused: true
});

processTimeline
    .to(".process .section-btn, .process .section-title, .process .section-desc", {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.12,
        ease: "power3.out"
    })
    .to(processCards, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.12
    }, 0.2)
    .to(processOuterShapes, {
        scale: 1,
        opacity: 1,
        duration: 1.2,
        ease: "power3.out"
    }, 0.38)
    .to(processInnerShapes, {
        y: 0,
        scale: 1,
        opacity: 1,
        duration: 1.45,
        ease: "power4.out"
    }, 0.48)
    .to(processCards, {
        "--connector-scale": 1,
        duration: 0.95,
        ease: "power2.out",
        stagger: 0.22
    }, 0.74);

createReplayScene({
    playTrigger: ".process",
    start: "top 80%",
    timeline: processTimeline,
    reset: resetProcessAnimation
});

const resetSkillAnimation = () => {
    gsap.set(".skill-swiper", {
        y: 54,
        opacity: 0,
        rotate: -7.5
    });
};

const skillTimeline = gsap.timeline({
    paused: true
});

skillTimeline.to(".skill-swiper", {
    y: 0,
    opacity: 1,
    rotate: -4.5,
    duration: 1,
    ease: "power3.out"
});

createReplayScene({
    playTrigger: ".skill-swiper",
    start: "top 84%",
    timeline: skillTimeline,
    reset: resetSkillAnimation
});

const resetProjectAnimation = () => {
    gsap.set(".project .section-title, .project .section-desc", {
        y: 38,
        opacity: 0
    });
    gsap.set(".project .project-block", {
        y: 42,
        opacity: 0,
        scale: 0.98
    });
};

const projectTimeline = gsap.timeline({
    paused: true
});

projectTimeline
    .to(".project .section-title, .project .section-desc", {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.12,
        ease: "power3.out"
    })
    .to(".project .project-block", {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.82,
        stagger: 0.12,
        ease: "power3.out"
    }, 0.16);

createReplayScene({
    playTrigger: ".project",
    start: "top 82%",
    timeline: projectTimeline,
    reset: resetProjectAnimation
});

const resetFaqAnimation = () => {
    gsap.set(".faq .section-title, .faq .section-desc, .faq .book-call-wrapper", {
        y: 38,
        opacity: 0
    });
    gsap.set(".faq #faqAccordion .accordion-item", {
        y: 30,
        opacity: 0
    });
};

const faqTimeline = gsap.timeline({
    paused: true
});

faqTimeline
    .to(".faq .section-title, .faq .section-desc", {
        y: 0,
        opacity: 1,
        duration: 0.78,
        stagger: 0.12,
        ease: "power3.out"
    })
    .to(".faq .book-call-wrapper", {
        y: 0,
        opacity: 1,
        duration: 0.82,
        ease: "power3.out"
    }, 0.16)
    .to(".faq #faqAccordion .accordion-item", {
        y: 0,
        opacity: 1,
        duration: 0.68,
        stagger: 0.08,
        ease: "power3.out"
    }, 0.22);

createReplayScene({
    playTrigger: ".faq",
    start: "top 82%",
    timeline: faqTimeline,
    reset: resetFaqAnimation
});

const resetCtaAnimation = () => {
    gsap.set(".cta .section-title, .cta .section-desc, .cta .contact-input-wrapper", {
        y: 38,
        opacity: 0
    });
    gsap.set(".cta .img-fluid", {
        y: 42,
        opacity: 0,
        scale: 0.98
    });
};

const ctaTimeline = gsap.timeline({
    paused: true
});

ctaTimeline
    .to(".cta .section-title, .cta .section-desc", {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.12,
        ease: "power3.out"
    })
    .to(".cta .contact-input-wrapper", {
        y: 0,
        opacity: 1,
        duration: 0.78,
        ease: "power3.out"
    }, 0.2)
    .to(".cta .img-fluid", {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.9,
        ease: "power3.out"
    }, 0.16);

createReplayScene({
    playTrigger: ".cta",
    start: "top 84%",
    timeline: ctaTimeline,
    reset: resetCtaAnimation
});

const resetFooterAnimation = () => {
    gsap.set(".footer .footer-name, .footer .footer-tag-line, .footer #svg-wrapper", {
        y: 30,
        opacity: 0
    });
    gsap.set(".footer .copy-right-txt, .footer .footer-nav .nav-item", {
        y: 24,
        opacity: 0
    });
};

const footerTimeline = gsap.timeline({
    paused: true
});

footerTimeline
    .to(".footer .footer-name, .footer .footer-tag-line, .footer #svg-wrapper", {
        y: 0,
        opacity: 1,
        duration: 0.82,
        stagger: 0.12,
        ease: "power3.out"
    })
    .to(".footer .copy-right-txt, .footer .footer-nav .nav-item", {
        y: 0,
        opacity: 1,
        duration: 0.68,
        stagger: 0.08,
        ease: "power3.out"
    }, 0.28);

createReplayScene({
    playTrigger: ".footer",
    start: "top 88%",
    timeline: footerTimeline,
    reset: resetFooterAnimation
});


// Footer


var string = document.getElementById("svg-wrapper");
var svg = string.querySelector("svg");
var path = svg.querySelector("path");

string.addEventListener("mousemove", function (dets) {
    var rect = string.getBoundingClientRect();

    var x = dets.clientX - rect.left;
    var y = dets.clientY - rect.top;

    var width = rect.width;

    var newPath = `M 0 50 Q ${x} ${y} ${width} 50`;

    gsap.to(path, {
        attr: { d: newPath },
        duration: 0.2,
        ease: "power3.out",
        overwrite: "auto"
    });
});

string.addEventListener("mouseleave", function () {
    var width = string.getBoundingClientRect().width;

    var finalPath = `M 0 50 Q ${width / 2} 50 ${width} 50`;

    gsap.to(path, {
        attr: { d: finalPath },
        duration: 1.5,
        ease: "elastic.out(1, 0.2)",
        overwrite: "auto"
    });
});

// Current Year
let date = new Date;
let Currentyear = date.getFullYear();
document.getElementById("year").innerHTML = Currentyear;