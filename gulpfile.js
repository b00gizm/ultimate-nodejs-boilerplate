var gulp       = require('gulp');
var nodemon    = require('gulp-nodemon');
var sass       = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var browserify = require('gulp-browserify');
var uglify     = require('gulp-uglify');
var bust       = require('gulp-buster');
var gulpif     = require('gulp-if');
var livereload = require('gulp-livereload');

var isProd = process.env.NODE_ENV == 'production';

gulp.task('develop', function () {
  nodemon({script: './bin/www', ext: 'js json html', legacyWatch: true });
});

gulp.task('sass', function() {
  return gulp
    .src('./public/scss/main.scss')
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(gulpif(!isProd, sourcemaps.write()))
    .pipe(gulp.dest('./public/stylesheets'))
    .pipe(bust())
    .pipe(gulp.dest('.'))
  ;
});

gulp.task('scripts', function() {
  gulp.src('app/main.js')
    .pipe(browserify({
      insertGlobals : true,
      debug         : !isProd,
      transform     : ['reactify']
    }))
    .pipe(gulpif(isProd, uglify()))
    .pipe(gulp.dest('./public/javascripts'))
    .pipe(bust())
    .pipe(gulp.dest('.'))
  ;
});

gulp.task('watch', function() {
  gulp.watch('./public/scss/**/*.scss', ['sass']);
  gulp.watch('app/**/*.js', ['scripts']);
});

gulp.task('default', ['develop', 'sass', 'scripts', 'watch']);
gulp.task('build', ['sass', 'scripts']);
