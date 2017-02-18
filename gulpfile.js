var gulp = require('gulp');
var minify = require('gulp-uglify');
var autoprefixer = require('gulp-autoprefixer');
var cleanCss = require('gulp-clean-css');
var concat = require('gulp-concat');
var sourcemap =require('gulp-sourcemaps');
var rename = require('gulp-rename');
var imagemin = require('gulp-imagemin');
var path = require('path');
var fs = require('fs');
var sass = require('gulp-sass');
var livereload = require('gulp-livereload');
var beautify = require('gulp-cssbeautify');
var pug = require('gulp-pug');

var absolutePath = function(source, folder, file = '') { 
	if(/.min.(css|js)/.exec(file)){
		// return "!" + path.resolve(source, folder) + "/" + file;
	}

	if(folder === 'scss' && /^_/.test(file)) {
		return "!" + path.resolve(source, folder) + "/" + file;
	}

	return path.resolve(source, folder) + "/" + file; 
}

var imagefiles = fs.readdirSync(absolutePath('src','images')).map(function(filename) { return absolutePath('src','images',filename);});

var htmlFiles = fs.readdirSync(absolutePath('src','views')).map(function(filename) { return absolutePath('src','views', filename)});

var htmlPartials = fs.readdirSync(absolutePath('src','views/partials')).map(function(filename) { return absolutePath('src','views/partials', filename)});

var sassFiles = fs.readdirSync(absolutePath('src', 'scss')).map(function(filename){ return  absolutePath('src','scss', filename)});

var cssFiles = fs.readdirSync(absolutePath('src','css')).map(function(filename){ return absolutePath('src','css',filename)});

var jsFiles = fs.readdirSync(absolutePath('src','js')).map(function(filename){ return absolutePath('src','js',filename)});


gulp.task('sassify', function() {
	return gulp.src(sassFiles)
				.pipe(sass().on('error', sass.logError))
				.pipe(autoprefixer())
				.pipe(concat('main.css'))
				.pipe(beautify())
				.pipe(gulp.dest('public/css'))
				.pipe(livereload());
});

gulp.task('minify-css', function() {
	return gulp.src(sassFiles)
				.pipe(sourcemap.init())
				.pipe(sass().on('error', sass.logError))
				.pipe(autoprefixer())
				.pipe(cleanCss())
				.pipe(concat('main.css'))
				.pipe(rename({ suffix: '.min' }))
				.pipe(sourcemap.write('./min-maps'))
				.pipe(gulp.dest('public/css'))
				.pipe(livereload());
});

gulp.task('html::pug', function() {
	return gulp.src(htmlFiles.concat(htmlPartials))
				.pipe(pug({}))
				.pipe(rename(function(path) {
					path.extname = ".html";
				}))
				.pipe(gulp.dest('public'))
				.pipe(livereload());
});


gulp.task('imagemin', function() {
	return gulp.src(imagefiles)
				.pipe(imagemin())
				.pipe(gulp.dest('public/images'));
});


gulp.task('js:build', function(c) {
	return gulp.src(jsFiles)
				.pipe(minify())
				.pipe(rename({suffix: ".min"}))
				.pipe(gulp.dest('public/js'))
				.pipe(livereload());
})

gulp.task('sass:watch', function() {
	livereload.listen();
	// gulp.watch(absolutePath('src','scss') + "*.scss", ['sassify', 'minify-css']);
	gulp.watch("src/scss/*.scss", ['sassify', 'minify-css']);
});

gulp.task('pug:watch', function() {
	livereload.listen();
	gulp.watch(absolutePath('src','views') + "**/*.pug", ['html::pug']);
});

gulp.task('js:watch', function() {
	livereload.listen();
	gulp.watch(absolutePath('src','js') + "*.js", ['js:build']);
});


gulp.task('build', ['sassify','minify-css', 'imagemin', 'html::pug', 'js:build']);

gulp.task('build:zip', ['minify-css', 'imagemin', 'js:build']);

gulp.task('watch', ['sass:watch', 'pug:watch', 'js:watch'])

gulp.task('default', ['build', 'watch']);


