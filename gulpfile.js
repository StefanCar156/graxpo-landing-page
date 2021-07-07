// list dependencies
const { src, dest, watch, series } = require("gulp")
const sass = require("gulp-sass")(require("sass"))
const prefix = require("gulp-autoprefixer")
const minify = require("gulp-clean-css")
const terser = require("gulp-terser")
const imageMin = require("gulp-imagemin")
const imageWebp = require("gulp-webp")

// create functions

// scss
const compileScss = () => {
  return src("src/scss/**/*.scss")
    .pipe(sass())
    .pipe(prefix())
    .pipe(minify())
    .pipe(dest("dist/css"))
}

// js
const jsMin = () => {
  return src("src/js/*.js").pipe(terser()).pipe(dest("dist/js"))
}

// images
const optimizeImg = () => {
  return src("src/images/*.{jpg,png}")
    .pipe(
      imageMin([
        imageMin.mozjpeg({ quality: 80, progressive: true }),
        imageMin.optipng({ optimizationLevel: 2 }),
      ])
    )
    .pipe(dest("dist/images"))
}

// webp images
const webpImage = () => {
  return src("dist/images/*.{jpg,png}")
    .pipe(imageWebp())
    .pipe(dest("dist/images"))
}

// create watchTask
const watchTask = () => {
  watch("src/scss/**/*.scss", compileScss)
  watch("src/js/*.js", jsMin)
  watch("src/images/*.{jpg,png}", optimizeImg)
  watch("dist/images/*.{jpg,png}", webpImage)
}

// default gulp
exports.default = series(compileScss, jsMin, optimizeImg, webpImage, watchTask)
