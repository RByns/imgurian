'use strict';

var gulp = require('gulp');
var watch = require('gulp-watch');
var sass = require('gulp-sass');
var nodemon = require('gulp-nodemon');
var livereload = require('gulp-livereload');
var notify = require('gulp-notify');
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var cssnano = require('gulp-cssnano');
var concat = require('gulp-concat');

gulp.task('sass', function () {
    return gulp.src('./public/stylesheets/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(concat('styles.css'))
        .pipe(gulp.dest('./public/stylesheets'))
        .pipe(notify('Styles changed...'))
        .pipe(livereload());
});

gulp.task('nodemon', ['lint'], function() {
    livereload.listen();
    nodemon({
        script: './bin/www',
        ext: 'js ejs'
    }).on('restart', function(){
     // when the app has restarted, run livereload.
     gulp.src('./bin/www')
     .pipe(livereload())
     .pipe(notify('Reloading page, please wait...'));
     });
});

gulp.task('lint', function() {
    return gulp.src(['./*.js', './**/*.js', '!./node_modules/**/*.js'])
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

gulp.task('watch', ['sass'], function() {
    livereload.listen();
    watch('public/stylesheets/*.scss', function() {
        gulp.start('sass');
    });
    watch(['*.js', '**/*.js', '!node_modules/**/*.js'], function() {
        gulp.start('lint');
    });
});

gulp.task('default', ['nodemon', 'watch']);
