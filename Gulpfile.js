let gulp = require('gulp');
let htmlmin = require('gulp-html-minifier2');
let less = require('gulp-less');
let path = require('path');
let concat = require('gulp-concat');
let uglify = require('gulp-uglify');
let pump = require('pump');
let ts = require('gulp-typescript');
let browserSync = require('browser-sync');

const vendorsJS = [
    "./node_modules/angular/angular.min.js",
    "./node_modules/jquery/dist/jquery.min.js",
    "./node_modules/ng-table/bundles/ng-table.min.js",
    "./node_modules/bootstrap/dist/js/bootstrap.min.js",
    "./node_modules/moment/min/moment-with-locales.min.js"
];

const vendorsCSS = [
    "./node_modules/bootstrap/dist/css/bootstrap.min.css",
    "./node_modules/bootstrap/dist/css/bootstrap-theme.min.css",
    "./node_modules/ng-table/bundles/ng-table.min.css"
];

gulp.task('minifyHtml', () => {
    gulp.src('./src/html/*.html')
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest('./public'));
});


gulp.task('lessCompile', () => {
    return gulp.src('./src/less/**/*.less')
        .pipe(less({
            paths: [path.join(__dirname, 'less', 'includes')]
        }))
        .pipe(gulp.dest('./public/assets/css'));
});


gulp.task('scriptsBuild', () => {
    return gulp.src('./src/ts/*.ts')
        .pipe(ts({
            noImplicitAny: true,
            outFile: 'app.js'
        }))
        .pipe(uglify())
        .pipe(gulp.dest('./public/assets/js'));
});


gulp.task('compressVendor', (cb) => {
    pump([
        gulp.src(vendorsJS),
        concat("vendors.min.js"),
        uglify(),
        gulp.dest('./public/assets/js')
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