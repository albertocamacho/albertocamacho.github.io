var gulp = require('gulp');
var uglify = require('gulp-uglify');
var clean = require('gulp-clean');
var concat = require('gulp-concat');
var striplog = require('gulp-strip-debug');
var minfycss = require('gulp-minify-css');
var gutil = require('gulp-util');
var browserSync = require('browser-sync');
var sass = require('gulp-sass');
var reload = browserSync.reload;


// JS
gulp.task('scripts', function() {
  var js_src = 'scripts/**/*.js'; 
  var js_dest = './';
 
  return gulp.src(js_src)
      .pipe(concat('app.min.js')) // concat all files in the src
      .pipe(striplog())
      .pipe(uglify())   // uglify them all
      .pipe(gulp.dest(js_dest)) // save the file
      .on('error', gutil.log); 
});

//SCSS
gulp.task('sass', function () {
  var css_src = 'styles/**/*.scss';
  var css_dest = './';

  return gulp.src('styles/**/*.scss')
    .pipe(sass()) 
    .pipe(concat('app.min.css')) // concat all files in the src
    .pipe(minfycss()) // uglify them all
    .pipe(gulp.dest(css_dest)) // save the file
    .pipe(gulp.dest('app/css'))
    .on('error', gutil.log); 
});







// Default task
gulp.task('build', function() {
    gulp.start('sass', 'scripts');
});






// watch files for changes and reload
gulp.task('serve', function() {

  

  browserSync({
    server: {
      baseDir: './'
    }
  });

  gulp.watch(['*.html', 'styles/**/*.scss', 'scripts/**/*.js'], {cwd: './'}, ['build', reload]);
});