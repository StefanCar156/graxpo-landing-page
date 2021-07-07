// Testimonials
const testimonialsSlider = document.querySelector(".testimonials__slider")
const testimonialsArticle = document.querySelector(".testimonials__article")
const testimonialsDots = document.querySelectorAll(".testimonials__dot")
let testimonialCounter = 0
let timeAfterReset = 0

testimonialsDots.forEach((dot) => {
  dot.addEventListener("click", (e) => {
    // Set active dot
    testimonialsDots.forEach((dot) =>
      dot.classList.remove("testimonials__dot--active")
    )
    e.target.classList.add("testimonials__dot--active")
    // Transform slider
    for (let i = 0; i < testimonialsDots.length; i++) {
      if (testimonialsDots[i] === e.target) {
        testimonialCounter = i
        testimonialsSlider.style.transform =
          "translateX(" +
          -testimonialsArticle.clientWidth * testimonialCounter +
          "px)"
      }
    }
    // Reset autoSlide interval
    clearInterval(slideInterval)
    slideInterval = setInterval(autoSlide, 10000)
  })
})

// autoSlide interval
const autoSlide = () => {
  testimonialCounter++
  if (testimonialCounter >= testimonialsDots.length) {
    testimonialCounter = 0
  }
  testimonialsSlider.style.transform =
    "translateX(" +
    -testimonialsArticle.clientWidth * testimonialCounter +
    "px)"
  testimonialsDots.forEach((dot) =>
    dot.classList.remove("testimonials__dot--active")
  )
  testimonialsDots[testimonialCounter].classList.add(
    "testimonials__dot--active"
  )
}
let slideInterval = setInterval(autoSlide, 10000)

// Nav links
const navBtn = document.querySelector(".nav__btn")
const navLinks = document.querySelector(".nav__links")
const header = document.querySelector("header")
const nav = document.querySelector(".nav")

const closeNav = () => {
  document.querySelector("body").style.overflow = "scroll"
  navBtn.querySelector("img").src = "./dist/images/menu-open.png"
}

navBtn.addEventListener("click", () => {
  navLinks.classList.toggle("nav__links--active")
  if (navLinks.classList.contains("nav__links--active")) {
    document.querySelector("body").style.overflow = "hidden"
    navBtn.querySelector("img").src = "./dist/images/menu-close.png"
  } else {
    closeNav()
  }
})

const links = document.querySelectorAll(".nav__link")
links.forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("nav__links--active")
    closeNav()
  })
})

// Fixed nav
let scrollPosition = 0

function fixedNav() {
  // Display navbar if scrolling upwards, Hide it if scrolling downwards
  if (document.body.getBoundingClientRect().top > scrollPosition) {
    header.classList.remove("header--hidden")
    header.classList.add("header--sticky")
    header.style.boxShadow = "0 5px 5px rgba(0, 0, 0, 0.1)"
  } else {
    header.classList.add("header--hidden")
    header.classList.remove("header--sticky")
    header.style.boxShadow = "none"
  }
  if (window.scrollY < 100) {
    header.classList.remove("header--sticky")
    header.style.boxShadow = "none"
  }
  // save the new position for iteration.
  scrollPosition = document.body.getBoundingClientRect().top
}

// Numbers animation
let animationExecuted = false
const animateNumbers = () => {
  const numbers = document.querySelectorAll(".achievements__item span")
  const speed = 100

  numbers.forEach((number) => {
    let count = 0
    const target = +number.getAttribute("data-target")
    const inc = target / speed
    const updateCount = () => {
      if (count < target) {
        count = count + inc
        number.textContent = Math.floor(count)
        setTimeout(updateCount, 1)
      } else {
        number.textContent = target
      }
    }
    updateCount()
  })
}

// Trigger numbers animation
const triggerNumbersAnimaiton = () => {
  const numbersSection = document.querySelector(".achievements")
  const numbersSectionPosition = numbersSection.getBoundingClientRect().top

  if (numbersSectionPosition < 500) {
    if (!animationExecuted) {
      animateNumbers()
      animationExecuted = true
    }
  }
}

// Triggers
window.addEventListener("scroll", () => {
  // Show / hide nav
  fixedNav()

  // Activate numbers animation
  triggerNumbersAnimaiton()
})

// Adjust testimonials slider on resize
window.addEventListener("resize", () => {
  testimonialsSlider.style.transform =
    "translateX(" +
    -testimonialsArticle.clientWidth * testimonialCounter +
    "px)"
})
