// Importa las dependencias necesarias
const gulp = require('gulp');
const concat = require('gulp-concat');
const cleanCSS = require('gulp-clean-css');
const sourcemaps = require('gulp-sourcemaps');
const terser = require('gulp-terser');
const rename = require('gulp-rename');
const watch = require('gulp-watch');
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const glob = require('glob');

const paths = {
  css: 'src/css/*.css',
  js: 'src/js/*.js',
  images: 'src/img/**/*'
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

// Define una tarea Gulp para procesar las imágenes
gulp.task('imagenes', function(done) {
  const srcDir = './src/img';
  const buildDir = './public/build/img';
  const images = glob.sync(paths.images);  // Síncrono para simplificar

  images.forEach(file => {
    const relativePath = path.relative(srcDir, path.dirname(file));
    const outputSubDir = path.join(buildDir, relativePath);
    procesarImagenes(file, outputSubDir);
  });
  done();
});

function procesarImagenes(file, outputSubDir) {
  if (!fs.existsSync(outputSubDir)) {
    fs.mkdirSync(outputSubDir, { recursive: true });
  }
  const baseName = path.basename(file, path.extname(file));
  const extName = path.extname(file);

  if (extName.toLowerCase() === '.svg') {
    // Si es un archivo SVG, se mueve al directorio de salida
    const outputFile = path.join(outputSubDir, `${baseName}${extName}`);
    fs.copyFileSync(file, outputFile);
  } else {
    // Para otros formatos de imagen, se procesan con sharp
    const outputFile = path.join(outputSubDir, `${baseName}${extName}`);
    const outputFileWebp = path.join(outputSubDir, `${baseName}.webp`);
    const outputFileAvif = path.join(outputSubDir, `${baseName}.avif`);
    const options = { quality: 80 };

    sharp(file).jpeg(options).toFile(outputFile);
    sharp(file).webp(options).toFile(outputFileWebp);
    sharp(file).avif().toFile(outputFileAvif);
  }
}

// Define una tarea de watch para monitorear cambios en los archivos CSS, JS y las imágenes
gulp.task('watch', function() {
  gulp.watch(paths.css, gulp.series('styles'));
  gulp.watch(paths.js, gulp.series('scripts'));
  gulp.watch(paths.images, gulp.series('imagenes'));
});

// Define la tarea por defecto que primero compila los estilos, scripts y las imágenes, luego empieza a monitorear
gulp.task('default', gulp.series('styles', 'scripts', 'imagenes', 'watch'));
