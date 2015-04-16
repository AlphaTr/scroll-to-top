var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    clean = require('gulp-clean'),
    cssMinify = require('gulp-minify-css'),
    zip = require('gulp-zip');

/* 压缩 JS */
gulp.task('minifyjs', function () {
    return gulp.src(['src/**/*.js'], {
        base: 'src'
    }).pipe(uglify()).pipe(gulp.dest('build'));
});

/* 压缩 CSS */
gulp.task('minifycss', function () {
    return gulp.src(['src/**/*.css'], {
        base: 'src'
    }).pipe(cssMinify()).pipe(gulp.dest('build'));
});

gulp.task('minify', ['minifyjs', 'minifycss']);

/* 复制图片等其他文件 */
gulp.task('copy', function () {
    return gulp.src(['src/**', '!src/**/*.js', '!src/**/*.css'], {base: 'src'})
        .pipe(gulp.dest('build'));
});

/* 打包压缩 */
gulp.task('package', ['minify', 'copy'], function () {
    return gulp.src('build/**')
        .pipe(zip('build.zip'))
        .pipe(gulp.dest('./'));
});

/* 清除 */
gulp.task('default', ['package'], function () {
    return gulp.src('build', {read: false})
        .pipe(clean());
});
