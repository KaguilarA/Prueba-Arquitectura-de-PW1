'use strict';
//- Variables globales con las dependencias que van a ser usadas por toda la aplicación
const gulp = require('gulp'),
    pug = require('gulp-pug'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    nib = require('nib'),
    nodemon = require('gulp-nodemon'),
    connect = require('gulp-connect');

//- Tarea que realiza la conexión con el servidor y activa el livereload
gulp.task('connect', () => 
    connect.server({
        root: 'public',
        port: 8000,
        livereload: true
    })
)

//- Tarea que se encarga de renderizar todos los html`s
gulp.task('pug', () => 
    gulp.src([
        './production/*.pug',
        './production/**/*.pug'
    ])
        .pipe(pug({
            pretty: true
        }))
        .pipe(gulp.dest('./public/'))
);

//- Tarea que se encarga de setear las dependencias del front-end
gulp.task('dependencies', () => {

    //- Trae angular
    gulp.src([
        './node_modules/angular/*'
    ])
        .pipe(gulp.dest('./public/lib/angular')),

    //- Trae angular-css
    gulp.src([
        './node_modules/angular-css/*'
    ])
        .pipe(gulp.dest('./public/lib/angular-css')),

    //- Trae angular-ui-router
    gulp.src([
        './node_modules/angular-ui-router/**/**/**/*'
    ])
        .pipe(gulp.dest('./public/lib/angular-ui-router')),
    
    //- Trae jquery
    gulp.src([
        './node_modules/jquery/**/**/**/**/*'
    ])
        .pipe(gulp.dest('./public/lib/jquery')),

    //- Trae popper.js
    gulp.src([
        './node_modules/popper.js/**/**/**/**/*'
    ])
        .pipe(gulp.dest('./public/lib/popper')),

    //- Trae tooltip
    gulp.src([
        './node_modules/tooltip.js/**/**/**/**/*'
    ])
        .pipe(gulp.dest('./public/lib/tooltip')),
    
    //- Trae bootstrap
    gulp.src([
        './node_modules/bootstrap/**/**/**/*'
    ])
        .pipe(gulp.dest('./public/lib/bootstrap')),
    
    //- Trae ocLazyLoad
    gulp.src([
        './node_modules/oclazyload/**/**/**/*'
    ])
        .pipe(gulp.dest('./public/lib/oclazyload')),
    
    //- Trae font-awesome
    gulp.src([
        './node_modules/font-awesome/**/**/**/*'
    ])
        .pipe(gulp.dest('./public/lib/font-awesome'))
})

//- Tarea que se encarga de renderizar todos los css`s
gulp.task('css', () =>
    gulp.src('./public/styles/*.css')
        .pipe(connect.reload())
);

//- Tarea que se encarga de renderizar todos lo js`s
gulp.task('js', () => 
    gulp.src('./production/**/**/*.js')
        .pipe(gulp.dest('./public/'))
        .pipe(connect.reload())
);

//- Tarea que vigila todos los cambios en los archivos
gulp.task('watch', () => {

    //- Vigila todos los cambios dentro de los css
    gulp.watch([
        './production/styles/*.css'
    ], ['css']),

    //- Vigila todos los cambios dentro de los pug
    gulp.watch([
        './production/*.pug',
        './production/components/*.pug',
        './production/components/**/*.pug'
    ], ['pug']),

    //- Vigila todos los cambios dentro de los js
    gulp.watch([
        './production/*.js',
        './production/components/*.js',
        './production/components/**/*.js',
        './production/components/**/**/*.js'
    ], ['js'])
});

//- Tarea que ejecuta todas las tareas anteriores al mismo tiempo, y levanta el servidor en el puerto 8000 (por defecto)
gulp.task('default', ['connect', 'pug', 'dependencies', 'css', 'js', 'watch'])
