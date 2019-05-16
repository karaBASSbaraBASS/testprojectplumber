const gulp = require('gulp');
const plumber = require('gulp-plumber'); // модуль для отслеживания ошибок
const rigger = require('gulp-rigger'); // модуль для импорта содержимого одного файла в другой
const sourcemaps = require('gulp-sourcemaps');
const sass = require('gulp-sass'); //Подключаем Sass пакет
const autoprefixer = require('gulp-autoprefixer');
const csso = require('gulp-csso');
const uglify = require('gulp-uglify');
const browserSync = require('browser-sync'); // Подключаем Browser Sync
const cache = require('gulp-cache'); // модуль для кэширования
const imagemin = require('gulp-imagemin'); // плагин для сжатия PNG, JPEG, GIF и SVG изображений
const jpegrecompress = require('imagemin-jpeg-recompress'); // плагин для сжатия jpeg
const pngquant = require('imagemin-pngquant'); // плагин для сжатия png
const gifsicle = require('imagemin-gifsicle');
const rename = require('gulp-rename');
//const del = require('del'); // плагин для удаления файлов и каталогов

sass.compiler = require('node-sass');

var path = {
    build: {
        html:  'dist',
        js:    'dist/assets/js/',
        css:   'dist/assets/css/',
        img:   'dist/assets/img/',
        fonts: 'dist/assets/fonts/'
    },
    src: {
        html:  'app/index.html',
        js:    'app/assets/js/script.js',
        style: 'app/assets/scss/style.scss',
        img:   'app/assets/img/**/*.*',
        fonts: 'app/assets/fonts/**/*.*'
    },
    watch: {
        html:  'app/index.html',
        js:    'app/assets/js/script.js',
        css: 'app/assets/scss/**/*.*',
        img:   'app/assets/img/**/*.*',
        fonts: 'app/assets/fonts/**/*.*'
    },
    clean:     'app'
};

// запуск сервера
gulp.task('browser-sync', function() { // Создаем таск browser-sync
    browserSync({ // Выполняем browser Sync
        server: { // Определяем параметры сервера
            baseDir: path.build.html // Директория для сервера - app
        },
        notify: false // Отключаем уведомления
    });
});

gulp.task('buildCSS', function(){
    return gulp.src(path.src.style)
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(rename({suffix: '.min'}))
        .pipe(csso())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(path.build.css))
        .pipe(browserSync.reload({
            stream: true
        }));
});

gulp.task('buildHTML', function(){
    return gulp.src(path.src.html)
        .pipe(rigger()) // импорт вложений
        .pipe(gulp.dest(path.build.html))
        .pipe(browserSync.reload({
            stream: true
        }));
});

gulp.task('buildFonts', function(){
    return gulp.src(path.src.fonts)
        .pipe(gulp.dest(path.build.fonts))
        .pipe(browserSync.reload({
            stream: true
        }));
});

// сбор js
gulp.task('buildJS', function () {
    gulp.src(path.src.js) // получим файл main.js
        .pipe(plumber()) // для отслеживания ошибок
        .pipe(sourcemaps.init()) //инициализируем sourcemap
        .pipe(rigger()) // импортируем все указанные файлы в main.js
        .pipe(uglify()) // минимизируем js
        .pipe(rename({suffix: '.min'}))
        .pipe(sourcemaps.write('.')) //  записываем sourcemap
        .pipe(gulp.dest(path.build.js)) // положим готовый файл
        .pipe(browserSync.reload({
            stream: true
        })); // перезагрузим сервер
});

// наблюдения за изменениями
gulp.task('watch', ['browser-sync', 'buildCSS', 'buildHTML', 'buildFonts', 'buildJS'], function() {
    gulp.watch(path.watch.css, ['buildCSS']); // Наблюдение за sass файлами
    gulp.watch(path.watch.html, ['buildHTML']); // Наблюдение за HTML файлами в корне проекта
    gulp.watch(path.watch.js, ['buildJS']); // Наблюдение за JS файлами в папке js
    gulp.watch(path.watch.fonts, ['buildFonts']);
    //gulp.watch(path.watch.img, ['buildImg']);
});