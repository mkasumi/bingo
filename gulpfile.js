// gulpを導入
var gulp = require('gulp');

// 導入されているプラグイン
var browserSync = require('browser-sync').create(),
	rename = require('gulp-rename'),
	sass = require('gulp-sass'),
	path = require('path'),
	cssnano = require('gulp-cssnano'),
	watch = require('gulp-watch'),
	autoprefixer = require('gulp-autoprefixer'),
	csscomb = require('gulp-csscomb'),
	replace = require('gulp-replace'),
	gzip = require('gulp-gzip'),
    changedInPlace = require('gulp-changed-in-place');

//テーマ
//SCSSファイルをCSSにコンパイルする
gulp.task('sass', function () {
	gulp.src(['scss/bingo.scss'])
        .pipe(csscomb())// *1
        .pipe(gulp.dest('scss'))
		.pipe(sass().on('error', sass.logError))
		.pipe(autoprefixer({
			browsers: ['last 2 versions', 'ie 9'],
			cascade: false
		}))
		.pipe(csscomb())// *1
		.pipe(gulp.dest('css'))
		.pipe(cssnano())
        .pipe(rename({
          suffix: '.min'
        }))
		.pipe(gulp.dest('css'))
		.pipe(browserSync.stream());
});


gulp.task('html', function () {
	gulp.src(['**.html'])
		.pipe(browserSync.stream());
});


// プロジェクトのSCSSとCSSファイルを監視する
gulp.task('project', function() {
	gulp.watch('scss/**',['sass']);
});


// デフォルトのタスク
gulp.task('default', ['project']);

// buildのタスク
gulp.task('compile', ['sass']);
