'use strict';
// Variables globales que van a ser usadas por toda la aplicación
const gulp = require('gulp'),
    pug = require('gulp-pug'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    nib = require('nib'),
    nodemon = require('gulp-nodemon'),
    connect = require('gulp-connect');


gulp.task('connect', function(){
    connect.server({
        root:'public',
        port:8000,
        livereload:true
    });
    nodemon();
});

gulp.task('pug', () => 
    gulp.src('./public/**/**/*.pug')
);

gulp.task('sass', () => 
    gulp.src('./public/styles/*.scss')
);