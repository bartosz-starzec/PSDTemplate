const { watch, src, dest, gulp, series } = require("gulp");
const babelify = require("babelify");
const imagemin = require("gulp-imagemin");
const babel = require("gulp-babel");
const sass = require("gulp-sass");
const browserSync = require("browser-sync");
const server = browserSync.create();
const del = require("del");
const concat = require("gulp-concat");

const clean = () => del(["dist"]);

const jsPaths = {
  scripts: {
    src: "src/js/app.js",
    dest: "dist/js"
  }
};

const scssPaths = {
  styles: {
    src: "src/scss/**/*.scss",
    dest: "dist/css"
  }
};

const imagesPath = {
  images: {
    src: "src/images/*",
    dest: "dist/images"
  }
};

function reload(done) {
  server.reload();
  done();
}

function serve(done) {
  server.init({
    server: {
      baseDir: "./",
      directory: true
    }
  });
  done();
}

function javas() {
  return src(jsPaths.scripts.src)
    .pipe(babel())
    .pipe(concat("main.js"))
    .pipe(dest(jsPaths.scripts.dest));
}

function images() {
  return src(imagesPath.images.src)
    .pipe(imagemin())
    .pipe(dest(imagesPath.images.dest));
}

function scss() {
  return src(scssPaths.styles.src)
    .pipe(sass())
    .pipe(concat("style.css"))
    .pipe(dest(scssPaths.styles.dest));
}

watch(
  [
    jsPaths.scripts.src,
    scssPaths.styles.src,
    imagesPath.images.src,
    "./index.html"
  ],
  series(javas, scss, images, reload)
);

const dev = series(clean, javas, scss, images, serve);
exports.javas = javas;
exports.scss = scss;
exports.images = images;
exports.default = dev;
