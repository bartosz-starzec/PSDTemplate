const { watch, series, src, dest } = require('gulp');
const babel = require('gulp-babel');
const sass = require('gulp-sass');

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


watch('src/*.scss', scss);
watch('src/*.js', javas);

exports.javas = javas;
exports.scss = scss;
exports.default = series(javas, scss);