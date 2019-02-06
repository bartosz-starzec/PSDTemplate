const { watch, src, dest, gulp, series} = require('gulp');
const babel = require('gulp-babel');
const sass = require('gulp-sass');
const browserSync = require('browser-sync');
const server = browserSync.create();
const del = require('del');

const clean = () => del(['dist']);

const jsPaths = {
    scripts: {
      src: 'src/js/*.js',
      dest: 'dist/js'
    }
  };

  const scssPaths = {
    styles: {
      src: 'src/scss/*.scss',
      dest: 'dist/css'
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
    .pipe(dest(jsPaths.scripts.dest));
}

function scss() {
    return src(scssPaths.styles.src)
    .pipe(sass())
    .pipe(dest(scssPaths.styles.dest));
}

watch(jsPaths.scripts.src, series(javas, reload));
watch(scssPaths.styles.src, series(scss, reload));

const dev = series(clean, javas, scss, serve);
exports.javas = javas;
exports.scss = scss;
exports.default = dev;