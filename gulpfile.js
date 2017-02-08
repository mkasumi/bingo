// gulpを導入
var gulp = require('gulp');

// 導入されているプラグイン
var rename = require('gulp-rename'),
	sass = require('gulp-sass'),
	path = require('path'),
	cssnano = require('gulp-cssnano'),
	watch = require('gulp-watch'),
	autoprefixer = require('gulp-autoprefixer'),
	csscomb = require('gulp-csscomb'),
	replace = require('gulp-replace'),
	gzip = require('gulp-gzip'),
    changedInPlace = require('gulp-changed-in-place');

// プロジェクト設定
// var rootTheme = 'takisada';

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
		.pipe(gulp.dest('css'));
});
// // SCSSファイルを圧縮する
// SCSSファイルを圧縮するgulp.task('mincss', function () {
// 	gulp.src(['themes/' + rootTheme + '/scss/site.scss'])
// 		.pipe(rename({
// 			suffix: '.min'
// 		}))
// 		.pipe(sass())
// 		.pipe(autoprefixer({
// 			browsers: ['last 2 versions', 'ie 9'],
// 			cascade: false
// 		}))
// 		.pipe(csscomb())// *1
// 		.pipe(gzip())
// 		.pipe(gulp.dest('themes/' + rootTheme + '/css'));
// });

// gulp.task('minjs', function () {
// 	gulp.src(['themes/' + rootTheme + '/js/**.js'])
// 		.pipe(gzip())
// 		.pipe(gulp.dest('themes/' + rootTheme + '/js'));
// });



// プロジェクトのSCSSとCSSファイルを監視する
gulp.task('project', function() {
	gulp.watch('scss/**',['sass']);
	// gulp.watch('themes/' + rootTheme + '/css/site.css',['mincss']);
  	// gulp.watch('themes/' + rootTheme + '/js/**.js',['minjs']);
});

// gulp.task('acms', function() {
// 	gulp.watch('themes/' + rootTheme + '/scss/foundation/acms/**',['acmssass']);
// 	gulp.watch('themes/' + rootTheme + '/css/acms.css',['acmsmin']);
// });

// デフォルトのタスク
gulp.task('default', ['project']);


// *1・*2 gulp-csscombとgulp-sourcemaps は、gulp-csscombがgulp-sourcemapsに対応していないので、同時に動作することができません。gulp-csscombを動作させたい場合は、「*2」の記述をコメントアウトしてください。
