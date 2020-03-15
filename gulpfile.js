const { src, dest, parallel, series, watch } = require('gulp');
const connect = require('gulp-connect');
const open = require('gulp-open');
const sass = require('gulp-sass');
const uglify = require('gulp-terser');
const rename = require('gulp-rename');

function css(){
  watch('src/css/*.scss', function (){
    return src('src/css/*.scss')
    .pipe(sass({outputStyle: 'compressed'}))
    .pipe(rename({suffix: '.min'}))
    .pipe(dest('dist/css/'))
    .pipe(connect.reload());
  })
}

function js(){
  watch('src/js/*.js', function (){
    return src('src/js/*.js')
    .pipe(uglify())
    .pipe(rename({ extname: '.min.js'}))
    .pipe(dest('dist/js/'))
    .pipe(connect.reload());
  })  
}

function html(){  //questa sezione non funziona
  watch('src/*.html', function(){
    return src('src/*.html')
    .pipe(dest('dist/'))
    .pipe(connect.reload());
  })
}

function createServer(){
  connect.server({
    root: 'dist',
    port: 8001,
    livereload: true
  })
}

exports.default= parallel( css, js, html)

exports.connection= parallel(createServer, css, js, html)

