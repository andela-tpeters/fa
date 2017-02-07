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

var absolutePath = function(source, folder, file = '') { 
	if(/.min.(css|js)/.exec(file)){
		// return "!" + path.resolve(source, folder) + "/" + file;
	}
	return path.resolve(source, folder) + "/" + file; 
}

var imagefiles = fs.readdirSync(absolutePath('src','images')).map(function(filename) { return absolutePath('src','images',filename);});

var htmlFiles = fs.readdirSync(absolutePath('src','views')).map(function(filename) { return absolutePath('src','views', filename)});

var sassFiles = fs.readdirSync(absolutePath('src', 'scss')).map(function(filename){ return  absolutePath('src','scss', filename)});

var cssFiles = fs.readdirSync(absolutePath('src','css')).map(function(filename){ return absolutePath('src','css',filename)});

var jsFiles = fs.readdirSync(absolutePath('src','js')).map(function(filename){ return absolutePath('src','js',filename)});

var fontFiles = fs.readdirSync(absolutePath('src','fonts')).map(function(filename){ return absolutePath('src','fonts',filename)});


gulp.task('sassify', function() {
	return gulp.src(sassFiles)
				.pipe(sourcemap.init())
				.pipe(sass().on('error', sass.logError))
				.pipe(autoprefixer())
				.pipe(concat('main.css'))
				.pipe(beautify())
				.pipe(sourcemap.write('./maps'))
				.pipe(gulp.dest('build/css'))
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
				.pipe(gulp.dest('build/css'))
				.pipe(livereload());
});

gulp.task('copyCss', function() {
	return gulp.src(cssFiles)
				.pipe(gulp.dest('build/css'));
})

gulp.task('html::ejs', function() {
	return gulp.src(htmlFiles)
				.pipe(rename(function(path) {
					path.extname = ".ejs";
				}))
				.pipe(gulp.dest('build/views'))
				.pipe(livereload());
});

gulp.task('copyHtml', function() {
	return gulp.src(htmlFiles)
				.pipe(gulp.dest('build/views'))
				.pipe(livereload());
});

gulp.task('copy:fonts', function() {
	return gulp.src(fontFiles)
				.pipe(gulp.dest('build/fonts'));
});

gulp.task('imagemin', function() {
	return gulp.src(imagefiles)
				.pipe(imagemin())
				.pipe(rename(function(path) { if(path.basename == 'ads') { path.basename = "imagead";}}))
				.pipe(gulp.dest('build/images'));
});


gulp.task('js:build', function(c) {
	return gulp.src(jsFiles)
				.pipe(minify())
				.pipe(rename(function(path) {if(!/.min$/.exec(path.basename)) {return path.basename += ".min";}}))
				.pipe(gulp.dest('build/js'))
				.pipe(livereload());
})

gulp.task('sass:watch', function() {
	livereload.listen();
	gulp.watch(absolutePath('src','scss') + "*.scss", ['sassify', 'minify-css']);
});

gulp.task('ejs:watch', function() {
	livereload.listen();
	gulp.watch(absolutePath('src','views') + "*.html", ['html::ejs']);
});

gulp.task('js:watch', function() {
	livereload.listen();
	gulp.watch(absolutePath('src','js') + "*.js", ['js:build']);
});


gulp.task('build', ['sassify','minify-css', 'imagemin', 'html::ejs', 'copyCss','js:build', 'copy:fonts']);

gulp.task('build:zip', ['minify-css', 'imagemin', 'copyHtml', 'copyCss','js:build', 'copy:fonts']);

gulp.task('watch', ['sass:watch', 'ejs:watch', 'js:watch'])

gulp.task('default', ['build', 'watch']);


