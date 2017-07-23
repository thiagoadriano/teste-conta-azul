const gulp = require('gulp');
const pump = require('pump');
const path = require('path');
const less = require('gulp-less');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const ts = require('gulp-typescript');
const jshint = require('gulp-jshint');
const minifyCss = require('gulp-minify-css');
const htmlLint = require('gulp-html-linter');
const sourcemaps = require('gulp-sourcemaps');
const htmlmin = require('gulp-html-minifier2');
const browserSync = require('browser-sync').create();

const vendorsJS = [
    "./node_modules/angular/angular.js",
    "./node_modules/jquery/dist/jquery.js",
    "./node_modules/ng-table/bundles/ng-table.js",
    "./node_modules/bootstrap/dist/js/bootstrap.js",
    "./node_modules/moment/min/moment-with-locales.js"
];

const vendorsCSS = [
    "./node_modules/bootstrap/dist/css/bootstrap.css",
    "./node_modules/bootstrap/dist/css/bootstrap-theme.css",
    "./node_modules/ng-table/bundles/ng-table.css"
];

gulp.task('minifyHtml', () => {
    gulp.src('./src/html/*.html')
        .pipe(htmlLint())
        .pipe(htmlLint.format())
        .pipe(htmlLint.failOnError())
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest('./public'));
});


gulp.task('lessCompile', () => {
    return gulp.src('./src/less/**/*.less')
        .pipe(sourcemaps.init())            
        .pipe(less({
            paths: [path.join(__dirname, 'less', 'includes')]
        }))
        .pipe(csslint())
        .pipe(csslint.formatter())
        .pipe(sourcemaps.write('maps', {
            mapSources: (sourcePath) => `maps/${sourcePath}`
        }))
        .pipe(gulp.dest('./public/assets/css'));
});


gulp.task('scriptsBuild', () => {
    return gulp.src('./src/ts/*.ts')
        .pipe(sourcemaps.init())    
        .pipe(ts({
            noImplicitAny: true,
            outFile: 'app.js'
        }))
        .pipe(jshint())
        .pipe(jshint.reporter('YOUR_REPORTER_HERE'))
        .pipe(uglify())
        .pipe(sourcemaps.write('maps', {
            mapSources: (sourcePath) => `maps/${sourcePath}`
        }))
        .pipe(gulp.dest('./public/assets/js'));
});


gulp.task('compressVendorJS', (cb) => {
    pump([
        gulp.src(vendorsJS),
        sourcemaps.init(),
        concat("vendors.min.js"),
        uglify(),
        sourcemaps.write('maps', {
            mapSources: (sourcePath) => `maps/${sourcePath}`
        }),
        gulp.dest('./public/assets/js')
    ],
        cb
    );
});

gulp.task('compressVendorCSS', (cb) => {
    pump([
        gulp.src(vendorsCSS),
        sourcemaps.init(),
        concat("vendors.min.css"),
        minifyCss(),
        sourcemaps.write('maps', {
            mapSources: (sourcePath) => `maps/${sourcePath}`
        }),
        gulp.dest('./public/assets/css')
    ],
        cb
    );
});

gulp.task('browser-sync', () => {
    browserSync.reload();
});

gulp.task('default', () => {
    browserSync.init({
        ghostMode: {
            clicks: true,
            forms: true,
            scroll: true
        }
    });

    gulp.watch("./src/ts/*.ts", ["scriptsBuild"]);
    gulp.watch("./src/less/**/*.less", ["lessCompile"]);
    gulp.watch("./src/html/*.html", ["minifyHtml"]);
});