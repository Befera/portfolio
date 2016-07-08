const gulp = require('gulp');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const imagemin = require('imagemin');
const jpegtran = require('imagemin-jpegtran');
const sass = require('gulp-sass');
const cssnano = require('gulp-cssnano');

gulp.task('scripts', () =>
  gulp.src(['src/js/*.js'])
    .pipe(concat('core.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'))
);

gulp.task('styles', () =>
  .pipe(sass().on('error', sass.logError))
  .pipe(cssnano())
  .pipe(gulp.dest('./dist/css'))
)

gulp.task('images', () =>
  gulp.src('src/img/*')
    .pipe(imagemin({
      progressive: false,
      use: [jpegtran()]
    }))
    .pipe(gulp.dest('dist/img'))
);

gulp.task('watch', () =>
  gulp.watch(['src/sass/*.sass'], ['scripts', 'styles', 'images'])
);

gulp.task('default', ['scripts', 'styles', 'images', 'watch']);
