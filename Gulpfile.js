const gulp = require('gulp');
const path = require('path');
const less = require('gulp-less');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const ts = require('gulp-typescript');
const jshint = require('gulp-jshint');
const csslint = require('gulp-csslint');
const minifyCss = require('gulp-minify-css');
const htmlLint = require('gulp-html-linter');
const sourcemaps = require('gulp-sourcemaps');
const htmlmin = require('gulp-html-minifier2');
const config = require('./config.gulp.plugins');
const browserSync = require('browser-sync').create();

const vendorsJS = [
    "./node_modules/angular/angular.js",
    "./node_modules/angular-route/angular-route.js",
    "./node_modules/jquery/dist/jquery.js",
    "./node_modules/ng-table/bundles/ng-table.js",
    "./node_modules/bootstrap/dist/js/bootstrap.js",
    "./node_modules/bootstrap3-dialog/dist/js/bootstrap-dialog.js",
    "./node_modules/ekko-lightbox/dist/ekko-lightbox.js",
    "./node_modules/moment/min/moment-with-locales.js"
];

const vendorsCSS = [
    "./node_modules/bootstrap/dist/css/bootstrap.css",
    "./node_modules/bootstrap/dist/css/bootstrap-theme.css",
    "./node_modules/bootstrap3-dialog/dist/css/bootstrap-dialog.css",
    "./node_modules/ekko-lightbox/dist/ekko-lightbox.css",
    "./node_modules/ng-table/bundles/ng-table.css"
];

gulp.task('minifyHtml', () => {
    return gulp.src('./src/html/**/*.html')
        .pipe(htmlLint(config.HTMLINTER))
        .pipe(htmlLint.format())
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest('./public'));
});


gulp.task('lessCompile', () => {
    return gulp.src('./src/less/**/*.less')
        .pipe(sourcemaps.init())
        .pipe(less({
            paths: [path.join(__dirname, 'less', 'includes')],
            filename: 'style.less'
        }))
        .pipe(csslint())
        .pipe(csslint.formatter())
        .pipe(sourcemaps.write('maps', {
            mapSources: (sourcePath) => `../../maps/${sourcePath}`
        }))
        .pipe(gulp.dest('./public/assets/css'));
});


gulp.task('scriptsBuild', () => {
    return gulp.src('./src/ts/**/*.ts')
        .pipe(sourcemaps.init())
        .pipe(ts({
            noImplicitAny: true,
            outFile: 'app.min.js'
        }))
        .pipe(jshint())
        .pipe(jshint.reporter())
        .pipe(uglify())
        .pipe(sourcemaps.write('maps', {
            mapSources: (sourcePath) => `../../maps/${sourcePath}`
        }))
        .pipe(gulp.dest('./public/assets/js'));
});


gulp.task('compressVendorJS', (cb) => {
    return gulp.src(vendorsJS)
        .pipe(sourcemaps.init())
        .pipe(concat("vendors.min.js"))
        .pipe(uglify())
        .pipe(sourcemaps.write('maps', {
            mapSources: (sourcePath) => `../../maps/${sourcePath}`
        }))
        .pipe(gulp.dest('./public/assets/js'));
});

gulp.task('compressVendorCSS', (cb) => {
    return gulp.src(vendorsCSS)
        .pipe(sourcemaps.init())
        .pipe(concat("vendors.min.css"))
        .pipe(minifyCss())
        .pipe(sourcemaps.write('maps', {
            mapSources: (sourcePath) => `../../maps/${sourcePath}`
        }))
        .pipe(gulp.dest('./public/assets/css'));
});

gulp.task('browser-sync', () => {
    return browserSync.reload();
});

gulp.task('default', () => {
    browserSync.init({
        proxy: "http://localhost:4889/",
        ghostMode: {
            clicks: true,
            forms: true,
            scroll: true
        }
    });

    gulp.watch("./src/ts/**/*.ts", ["scriptsBuild"]);
    gulp.watch("./src/less/**/*.less", ["lessCompile"]);
    gulp.watch("./src/html/**/*.html", ["minifyHtml"]);
});