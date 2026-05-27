import gulp from "gulp";          // The pipeline itself
import rename from "gulp-rename";  // File renaming tool
import * as dartSass from "sass";  // Sass compiler engine
import gulpSass from "gulp-sass";  // Sass adapter for the pipeline
import pug from "gulp-pug";        // Pug tool
import browserSync from "browser-sync"; // Browser Sync

const sass = gulpSass(dartSass);   // Connect the compiler with the adapter
const bs = browserSync.create();

// Paths (routing)
const stylesSRC = "./dev/scss/style.scss"; // WHERE we take the file FROM
const stylesWatch = "./dev/scss/**/*.scss";
const stylesDIST = "./dist/css/";           // WHERE we put the result

const markupSRC = "./dev/pug/index.pug";
const markupWatch = "./dev/pug/**/*.pug";
const markupDIST = "./dist/";

const imagesSRC = "./dev/img/**/*";   // All files inside dev/img/
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
    .pipe(gulp.dest(stylesDIST))             // Save to dist/css/
    .pipe(bs.stream());
}

// Images task — copy as-is, no processing needed
export function images() {
  return gulp
    .src(imagesSRC, { encoding: false }) // encoding:false preserves binary files
    .pipe(gulp.dest(imagesDIST));        // Copy to dist/img/
}

// Pug task
export function markup() {
  return gulp
    .src(markupSRC)               // Take index.pug
    .pipe(pug())                  // Compile to HTML
    .pipe(gulp.dest(markupDIST))  // Save to dist/
    .pipe(bs.stream());
}

export function server() {
  bs.init({
    server: {
      baseDir: "./dist/" // Folder from which the server shows the site
    },
    notify: false // Turn off annoying notifications
  });
}

// Watching for file changes
export function watchFiles() {
  gulp.watch(stylesWatch, styles); // SCSS changed → compile styles
  gulp.watch(markupWatch, markup); // Pug changed → compile HTML
}

// Running tasks
export const start = gulp.series(
  gulp.parallel(styles, markup, images),
  gulp.parallel(server, watchFiles)
);

// export default — running "gulp" with no arguments will trigger this
export default start;
