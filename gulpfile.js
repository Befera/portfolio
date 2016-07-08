const gulp = require('gulp');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const imagemin = require('gulp-imagemin');
const jpegtran = require('imagemin-jpegtran');
const sass = require('gulp-sass');
const cssnano = require('gulp-cssnano');
const babel = require('gulp-babel');
const serve = require('gulp-serve');
const htmlmin = require('gulp-htmlmin');

gulp.task('serve', serve('dist'));

gulp.task('scripts', () =>
  gulp.src(['src/js/*.js'])
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(concat('main.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'))
);

gulp.task('styles', () =>
  gulp.src('src/scss/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(cssnano())
    .pipe(gulp.dest('./dist/css'))
);

gulp.task('markup', () =>
  gulp.src('src/index.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('dist'))
);

gulp.task('images', () =>
  gulp.src('src/img/*')
    .pipe(imagemin({
      progressive: false,
      use: [jpegtran()]
    }))
    .pipe(gulp.dest('./dist/img'))
);

gulp.task('watch', () =>
  gulp.watch(['src/scss/*.scss'], ['markup', 'scripts', 'styles', 'images'])
);

gulp.task('default', ['markup', 'scripts', 'styles', 'images', 'watch']);
