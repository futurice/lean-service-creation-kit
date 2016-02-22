// include gulp
var gulp = require('gulp');

// include gulp plugins
var sass = require('gulp-sass'),
  autoprefixer = require('gulp-autoprefixer'),
  concat = require('gulp-concat'),
  minifyCSS = require('gulp-minify-css'),
  connect = require('gulp-connect');

var distDirectory = '';

// compile sass to css
gulp.task('sass', function() {
  return gulp.src([
      '../src/scss/lean_service_creation_kit.scss'
    ])
    .pipe(sass())
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(gulp.dest('css'));
});

// concatenate and minify css
gulp.task('minify-css', ['sass'], function() {
  gulp.src(['css/lean_service_creation_kit.css'])
    .pipe(concat('lean_service_creation_kit_all.css'))
    .pipe(minifyCSS())
    .pipe(gulp.dest('../' + distDirectory +'css'));
});

// copy static files
gulp.task('copy', function() {
  gulp.src(['../src/*.html'])
    .pipe(gulp.dest('../' + distDirectory));
  gulp.src(['../src/images/**'])
    .pipe(gulp.dest('../' + distDirectory + '/images'));
  gulp.src(['../src/videos/**'])
    .pipe(gulp.dest('../' + distDirectory + '/videos'));
});

// build and copy files
gulp.task('build-site', [
    'copy',
    'minify-css'
  ]
);

// watch files for changes
gulp.task('watch-site', function() {
  gulp.watch('../src/*.html', ['copy']);
  gulp.watch('../src/images/**', ['copy']);
  gulp.watch('../src/videos/**', ['copy']);
  gulp.watch('../src/scss/*.scss', ['minify-css']);
});

// start a server and watch for changes
gulp.task('serve-site', ['build-site', 'watch-site'], function() {
    connect.server({
        port: 4002,
        root: ['../' + distDirectory],
        livereload: true
    });
});
