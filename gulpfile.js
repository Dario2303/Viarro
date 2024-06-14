// Importa las dependencias necesarias
const gulp = require('gulp');
const concat = require('gulp-concat');
const cleanCSS = require('gulp-clean-css');
const sourcemaps = require('gulp-sourcemaps');
const terser = require('gulp-terser');
const rename = require('gulp-rename');
const watch = require('gulp-watch');

const paths = {
  css: 'src/css/*.css',
  js: 'src/js/*.js'
};

// Define una tarea Gulp para compilar los archivos CSS
gulp.task('styles', function() {
  return gulp.src(paths.css)  // Ruta a tus archivos CSS
    .pipe(concat('styles.min.css'))  // Nombre del archivo CSS concatenado
    .pipe(cleanCSS())                // Minificar el CSS concatenado
    .pipe(gulp.dest('public/build/css'));    // Carpeta de destino para el archivo final
});

// Define una tarea Gulp para compilar los archivos JavaScript
gulp.task('scripts', function() {
  return gulp.src(paths.js)  // Ruta a tus archivos JavaScript
    .pipe(sourcemaps.init())  // Inicializar la generación de sourcemaps
    .pipe(concat('bundle.js'))  // Nombre del archivo JS concatenado
    .pipe(terser())  // Minificar el JS concatenado
    .pipe(rename({ suffix: '.min' }))  // Renombrar el archivo a bundle.min.js
    .pipe(sourcemaps.write('.'))  // Escribir sourcemaps
    .pipe(gulp.dest('public/build/js'));  // Carpeta de destino para el archivo final
});

// Define una tarea de watch para monitorear cambios en los archivos CSS y JS
gulp.task('watch', function() {
  gulp.watch(paths.css, gulp.series('styles'));
  gulp.watch(paths.js, gulp.series('scripts'));
});

// Define la tarea por defecto que primero compila los estilos y scripts y luego empieza a monitorear
gulp.task('default', gulp.series('styles', 'scripts', 'watch'));
