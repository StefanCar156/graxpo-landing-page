const testimonialsSlider=document.querySelector(".testimonials__slider"),testimonialsArticle=document.querySelector(".testimonials__article"),testimonialsDots=document.querySelectorAll(".testimonials__dot");let testimonialCounter=0,timeAfterReset=0;testimonialsDots.forEach((e=>{e.addEventListener("click",(e=>{testimonialsDots.forEach((e=>e.classList.remove("testimonials__dot--active"))),e.target.classList.add("testimonials__dot--active");for(let t=0;t<testimonialsDots.length;t++)testimonialsDots[t]===e.target&&(testimonialCounter=t,testimonialsSlider.style.transform="translateX("+-testimonialsArticle.clientWidth*testimonialCounter+"px)");clearInterval(slideInterval),slideInterval=setInterval(autoSlide,1e4)}))}));const autoSlide=()=>{testimonialCounter++,testimonialCounter>=testimonialsDots.length&&(testimonialCounter=0),testimonialsSlider.style.transform="translateX("+-testimonialsArticle.clientWidth*testimonialCounter+"px)",testimonialsDots.forEach((e=>e.classList.remove("testimonials__dot--active"))),testimonialsDots[testimonialCounter].classList.add("testimonials__dot--active")};let slideInterval=setInterval(autoSlide,1e4);const navBtn=document.querySelector(".nav__btn"),navLinks=document.querySelector(".nav__links"),header=document.querySelector("header"),nav=document.querySelector(".nav"),closeNav=()=>{document.querySelector("body").style.overflow="scroll",navBtn.querySelector("img").src="./dist/images/menu-open.png"};navBtn.addEventListener("click",(()=>{navLinks.classList.toggle("nav__links--active"),navLinks.classList.contains("nav__links--active")?(document.querySelector("body").style.overflow="hidden",navBtn.querySelector("img").src="./dist/images/menu-close.png"):closeNav()}));const links=document.querySelectorAll(".nav__link");links.forEach((e=>{e.addEventListener("click",(()=>{navLinks.classList.remove("nav__links--active"),closeNav()}))}));let scrollPosition=0;function fixedNav(){document.body.getBoundingClientRect().top>scrollPosition?(header.classList.remove("header--hidden"),header.classList.add("header--sticky"),header.style.boxShadow="0 5px 5px rgba(0, 0, 0, 0.1)"):(header.classList.add("header--hidden"),header.classList.remove("header--sticky"),header.style.boxShadow="none"),window.scrollY<100&&(header.classList.remove("header--sticky"),header.style.boxShadow="none"),scrollPosition=document.body.getBoundingClientRect().top}let animationExecuted=!1;const animateNumbers=()=>{const e=document.querySelectorAll(".achievements__item span");e.forEach((e=>{let t=0;const i=+e.getAttribute("data-target"),n=i/100,s=()=>{t<i?(t+=n,e.textContent=Math.floor(t),setTimeout(s,1)):e.textContent=i};s()}))},triggerNumbersAnimaiton=()=>{document.querySelector(".achievements").getBoundingClientRect().top<500&&(animationExecuted||(animateNumbers(),animationExecuted=!0))};window.addEventListener("scroll",(()=>{fixedNav(),document.querySelector(".achievements").getBoundingClientRect().top<500&&(animationExecuted||(animateNumbers(),animationExecuted=!0))})),window.addEventListener("resize",(()=>{testimonialsSlider.style.transform="translateX("+-testimonialsArticle.clientWidth*testimonialCounter+"px)"}));