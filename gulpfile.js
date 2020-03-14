const { src, dest, parallel, series, watch } = require('gulp');
const connect = require('gulp-connect');
const open = require('gulp-open');
const sass = require('gulp-sass');
const uglify = require('gulp-terser');
const rename = require('gulp-rename');

function css(){
  watch('src/css/*.scss', function (){
    return src('src/css/*.scss')
    .pipe(sass())
    .pipe(rename({ extname: '.min.css'}))
    .pipe(dest('dist/css/'));
  })
}

function js(){
  watch('src/js/*.js', function (){
    return src('src/js/*.js')
    .pipe(uglify())
    .pipe(rename({ extname: '.min.js'}))
    .pipe(dest('dist/js/'));
  })  
}

function html(){
  watch('src/*.html', function(){
    return src('src/*.html')
    .pipe(dest('dist/*.html'));
  })

}

function connect(){
  connect.server({
    root: 'dist',
    port: 8001,
    livereload: true
  })
}

exports.default= parallel(css, js, html)

exports.connect= parallel(connect)

/*
function connect

function livereload

gulp.task('connect', function() {
  connect.server();
});

*/