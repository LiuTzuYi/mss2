/*
* @Author: Zilvia Kam
* @Date:   2019-04-04 17:39:35
* @Last Modified by:   Zilvia Kam
* @Last Modified time: 2019-07-26 17:12:56
*/
//引入gulp组件
const gulp = require('gulp');
//文件合并
const concat = require('gulp-concat');
//壓縮JS
//const uglify = require('gulp-uglify');
const uglify = require('gulp-uglify-es').default;
//AngularJS support
const ngAnnotate = require('gulp-ng-annotate')
//壓縮圖片
const changed = require('gulp-changed');
const imagemin = require('gulp-imagemin');
//壓縮CSS
const cleancss = require('gulp-clean-css');
//壓縮HTML
const htmlmin = require('gulp-htmlmin');
//更換HTML
const htmlreplace = require('gulp-html-replace');
//更換JS Path
const gulpif = require('gulp-if');
const replace = require('gulp-replace');
//CLEAN UP ./dist
const del = require('del');
//Extract comment
const comments = require('gulp-comments');
//Minify PHP
//const phpMinify = require('@cedx/gulp-php-minify').phpMinify

var config = require('./gulpConfig.json');

gulp.task('clean', function() {
  	return del(config.src.cleanPackage);
})

gulp.task('copy', function() {
  	return gulp.src(config.src.copyPackage,{base:".", dot:true})
  		.pipe(gulp.dest(config.dest.package))
})

gulp.task('copyLang', function() {
  	return gulp.src(config.src.copyLang.path,{base: config.src.copyLang.base})
  		.pipe(gulp.dest(config.dest.lang))
})

gulp.task('copyi18n', function() {
  	return gulp.src(config.src.copyi18n.path,{base: config.src.copyi18n.base})
  		.pipe(gulp.dest(config.dest.i18n))
})

gulp.task('copyfonts', function() {
    return gulp.src(config.src.copyfonts.path,{base: config.src.copyfonts.base})
      .pipe(gulp.dest(config.dest.fonts))
})

gulp.task('copyfafonts', function() {
  	return gulp.src(config.src.copyfafonts.path,{base: config.src.copyfafonts.base})
  		.pipe(gulp.dest(config.dest.fonts))
})

gulp.task('polyfilljs', function() {
  	return gulp.src(config.src.js.polyfilljs)
  		.pipe(concat(config.dest.js.file.js))
  		.pipe(gulp.dest(config.dest.js.path,{append:true}))
})

gulp.task('npmjs', function() {
  	return gulp.src(config.src.js.npmjs)
  		.pipe(concat(config.dest.js.file.js))
  		.pipe(gulp.dest(config.dest.js.path,{append:true}))
})

gulp.task('customjs', function() {
  	return gulp.src(config.src.js.customjs)
  		.pipe(concat(config.dest.js.file.js))
  		.pipe(gulp.dest(config.dest.js.path,{append:true}))
})

gulp.task('modulejs', function() {
  	return gulp.src(config.src.js.modulejs)
  	  .pipe(gulpif(/.*translate\.js$/g, replace(/js\/lang\/locale-/g, '/src/lang/locale-')))
  		.pipe(gulpif(/.*locale\.js$/g, replace(/\/..\/..\/scripts\/angular-i18n\/angular-locale_{{locale}}\.js/g, '/../../src/i18n/angular-locale_{{locale}}.js')))
  		.pipe(concat(config.dest.js.file.js))
  		.pipe(gulp.dest(config.dest.js.path,{append:true}))
})

gulp.task('uglifyjs', function() {
  	return gulp.src(config.src.js.concatjs)
  		.pipe(ngAnnotate())
  		.pipe(uglify())
  		.pipe(gulp.dest(config.dest.js.path))
})

gulp.task('controllerjs', function() {
  	return gulp.src(config.src.js.controllerjs)
  		.pipe(concat(config.dest.js.file.controllerjs))
      .pipe(ngAnnotate())
  		.pipe(uglify())
  		.pipe(gulp.dest(config.dest.js.path))
})

gulp.task('html', function() {
  	return gulp.src(config.src.html.path,{base: config.src.html.base})
  		.pipe(htmlmin({caseSensitive:true,removeComments:true}))
  		.pipe(gulp.dest(config.dest.html))
})

gulp.task('css', function() {
  	return gulp.src(config.src.css.path,{base: config.src.css.base})
  		.pipe(concat(config.dest.css.file))
    	.pipe(cleancss())
  		.pipe(gulp.dest(config.dest.css.path))
})

gulp.task('image', function() {
  	return gulp.src(config.src.image.path,{base: config.src.image.base})
  		.pipe(changed(config.dest.image))
  		.pipe(gulpif(/^(?!.*veh_type\/.*\.svg$).*$/g, imagemin()))
    	.pipe(gulp.dest(config.dest.image))
})

gulp.task('index', function() {
  	return gulp.src(config.src.index,{base:"."})
    	.pipe(htmlreplace({
    		  'js': './src/'+config.dest.js.file.js,
        	'css': './src/'+config.dest.css.file,
        	'controllerjs': './src/'+config.dest.js.file.controllerjs
    	}))
    	.pipe(htmlmin({caseSensitive:true,removeComments:true}))
  		.pipe(gulp.dest(config.dest.package))
})

//gulp.task('php', function() {
//  return gulp.src(config.src.php.path, {base: config.src.php.base, read: false})
//    .pipe(phpMinify())
//    .pipe(gulp.dest(config.dest.php))
//});

gulp.task('apidoc', function() {
    return gulp.src(config.src.api)
      .pipe(comments())
      .pipe(concat(config.dest.doc.api.file))
      .pipe(gulp.dest(config.dest.doc.api.path));
})

gulp.task('build', gulp.series('clean', gulp.parallel('copy', 'copyLang', 'copyi18n', 'copyfonts', 'copyfafonts'), 'polyfilljs', 'npmjs', 'customjs', 'modulejs', gulp.parallel('uglifyjs', 'controllerjs', 'css', 'html', 'image'), 'index'))
