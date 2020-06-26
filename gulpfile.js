// Gulp
var gulp = require('gulp');

// Gulp - Sass
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var browserSync = require('browser-sync').create();

// Gulp - Pug
var pug = require('gulp-pug');

// Task #1 - sass
gulp.task('sass', function() {
    return gulp.src('./dev/views/styles/*/*.sass')
            .pipe(sourcemaps.init())
            .pipe(sass().on("error", sass.logError))
            .pipe(sourcemaps.write())
            .pipe(gulp.dest('./dest/styles/home/'))
            .pipe(browserSync.stream());
});

// Task #2 - pug
gulp.task('pug', function() {
    return gulp.src('./dev/views/*/*.pug')
            .pipe(pug({
                pretty: true
            }))
            .pipe(gulp.dest('./dest/home/'));
});

// Task #3 - browserSync - serve
gulp.task('serve', function() {
    browserSync.init({
        server: {
            baseDir: './'
        }
    })
});

// Gulp Default
gulp.task('default', gulp.series('serve', 'sass', 'pug'), function() {
    gulp.watch('./dev/views/styles/*/*.sass', ['sass']);
    gulp.watch('./dev/views/*/*.pug', ['pug']);
});