const { watch, src, dest, gulp, series} = require('gulp');
const babel = require('gulp-babel');
const sass = require('gulp-sass');
const browserSync = require('browser-sync');
const server = browserSync.create();
const del = require('del');

const clean = () => del(['dist']);

const paths = {
    scripts: {
      src: 'src/*.js',
      dest: 'dist/'
    }
  };

function reload(done) {
    server.reload();
    done();
  }
  
  function serve(done) {
    server.init({
      server: {
        baseDir: './'
      }
    });
    done();
  }

function javas() {
    return src('src/*.js')
    .pipe(babel())
    .pipe(dest('dist/'));
}

function scss() {
    return src('src/*.scss')
    .pipe(sass())
    .pipe(dest('dist/'));
}

watch('src/*.js', series(javas, reload));
watch('src/*.scss', series(scss, reload));

const dev = series(clean, javas, scss, serve);
exports.javas = javas;
exports.scss = scss;
exports.default = dev;