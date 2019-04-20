const gulp = require('gulp');
const babel = require('gulp-babel');
const sourcemaps = require('sourcemaps');
const uglify = require('gulp-uglify');


// babel
gulp.src()
.pipe(sourcemaps.init())
.pipe(babel({
    presets: ['@babel/env']
}))
.pipe(uglify())
.pipe(rename({suffix: '.min'}))
.pipe(sourcemaps.write())
.pipe(gulp.dest('build/js/'))