'use strict';

const gulp = require('gulp');
const htmlmin = require('gulp-htmlmin');
const sass = require('gulp-sass');
const inlinesource = require('gulp-inline-source');
const autoprefixer = require('gulp-autoprefixer');

gulp.task('sass', function () {
  return gulp.src('scss/main.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
      remove: false,
      browsers: ['last 2 versions', '> 5%', 'iOS 7'],
      cascade: false
    }))
    .pipe(gulp.dest('src/css'));
});

gulp.task('minify', ['sass'], () => {
  return gulp.src('src/**/*.html')
    .pipe(htmlmin({collapseWhitespace: true, minifyJS: true}))
    .pipe(inlinesource())
    .pipe(gulp.dest('dist'));
});

gulp.task('assets', () => {
  return gulp.src('src/assets/*.*')
    .pipe(gulp.dest('dist/assets'));
});

gulp.task('sass:watch', () => {
  gulp.watch('scss/**/*.scss', ['sass']);
});

gulp.task('minify:watch', () => {
  gulp.watch('src/**/*.html', ['minify']);
});

gulp.task('default', ['sass', 'minify', 'assets'], () => {
  return;
});

gulp.task('watch', () => {
  gulp.watch(['scss/**/*.scss', 'src/**/*.html', 'src/assets/*.*'], ['sass', 'minify', 'assets']);
});
