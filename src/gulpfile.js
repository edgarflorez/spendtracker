var gulp 			= require('gulp');
// Requires the gulp-sass plugin
var sass 			= require('gulp-sass');
// Require gulpIf check que type of file
var gulpIf 			= require('gulp-if');
// Require uglify for JS
var uglify 			= require('gulp-uglify');
// Require gulp-cssnano for compress CSS
var cssnano 		= require('gulp-cssnano');
// Require gulp imagemin to compress images
var imagemin 		= require('gulp-imagemin')
// Require gulp-cache helps to avoid optimize images twice
var cache 			= require('gulp-cache');
// Require Del, delete files
var del  			= require('del');
// Require Browser Sync
var browserSync 	= require('browser-sync').create();
// Require run-sequence allow set the order
var runSequence 	= require('run-sequence');
// Require concat : Take multiple files into one
var concat 			= require('gulp-concat');

gulp.task('default', function(callback) {
  runSequence(['sass','js','browserSync','watch'])
});

// Create a build
gulp.task('build', function  (callback) {
	runSequence('clean:dist',
		['sass','js','images','fonts'],
		callback
	)
})

gulp.task('sass', function(){
	return gulp.src('scss/style.scss') //Gets all files ending with .scss in scss and children dirs
		.pipe(sass({outputStyle:'compressed'}).on('error', sass.logError)) // using gulp-sass
		.pipe(gulp.dest('../dist/css'))
		.pipe(browserSync.reload({
			stream:true
		}))
})

// Gulp browserSync task
gulp.task('browserSync', function(){
	browserSync.init({
		server:{
			baseDir: '../dist'
		}
	})
});

// Gulp watch syntax
gulp.task('watch', ['browserSync','sass'], function(){
	gulp.watch('scss/**/*.scss', ['sass']);	
	gulp.watch('js/**/*.js', ['js']);
	// Reloads the browser whenever HTML or JS  files change
	gulp.watch('../dist/*.html', browserSync.reload)
	gulp.watch('js/**/*.js', browserSync.reload)
})

// Gulp del 
gulp.task('clean:dist', function  () {
	return del.sync(['../dist/css/','../dist/js/'], {force:true});
})



// Gulp imagemin
gulp.task('images', function  () {
	return gulp.src('images/**/*.+(png|jpg|gif|svg)')
		// caching images that ran throught imagemin
		.pipe(cache(imagemin({
			// Setting interlaced to true
			interlaced: true
		})))
		.pipe(gulp.dest('../dist/images'))
})

// Gulp copy fonts
gulp.task('fonts', function  () {
	return gulp.src('fonts/**/*')
		.pipe(gulp.dest('../dist/fonts'))
})

// Gulp js
gulp.task('js', function  () {
	return gulp.src([
			'node_modules/bootstrap-sass/assets/javascripts/bootstrap/collapse.js', // bootstrap hamburguer menu
			'js/lib.js',
			'js/script.js',
			'js/vendor/vendor.js',
			])
		.pipe(concat('scripts.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest('../dist/js/'))
})