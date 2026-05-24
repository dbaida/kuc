import gulp from "gulp";          // The pipeline itself
import rename from "gulp-rename";  // File renaming tool
import * as dartSass from "sass";  // Sass compiler engine
import gulpSass from "gulp-sass";  // Sass adapter for the pipeline
import pug from "gulp-pug";        // Pug tool

const sass = gulpSass(dartSass);   // Connect the compiler with the adapter

// Paths (routing)
const stylesSRC  = "./dev/scss/style.scss"; // WHERE we take the file FROM
const stylesDIST = "./dist/css/";           // WHERE we put the result

const markupSRC  = "./dev/pug/index.pug";
const markupDIST = "./dist/";

const imagesSRC  = "./dev/img/**/*";   // All files inside dev/img/
const imagesDIST = "./dist/img/";       // WHERE we put them

// Styles task
export function styles() {
  return gulp
    .src(stylesSRC)                          // Take the source file style.scss
    .pipe(
      sass({ style: "compressed" })          // Compile and minify in one step
        .on("error", sass.logError)          // On error — log it and don't break the pipeline
    )
    .pipe(rename({ suffix: ".min" }))        // Add .min suffix → style.min.css
    .pipe(gulp.dest(stylesDIST));            // Save to dist/css/
}

// Images task — copy as-is, no processing needed
export function images() {
  return gulp
    .src(imagesSRC, { encoding: false }) // encoding:false preserves binary files
    .pipe(gulp.dest(imagesDIST));         // Copy to dist/img/
}

// Pug task
export function markup() {
  return gulp
    .src(markupSRC)               // Take index.pug
    .pipe(pug())                  // Compile to HTML
    .pipe(gulp.dest(markupDIST)); // Save to dist/
}

// Running tasks
// gulp.parallel runs all three tasks simultaneously
export const start = gulp.parallel(styles, markup, images);

// export default — running "gulp" with no arguments will trigger this
export default start;
