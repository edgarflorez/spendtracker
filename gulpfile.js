var gulp 			= require('gulp');
// Requires the gulp-sass plugin
var sass 			= require('gulp-sass');
// Require useref 
var useref 			= require('gulp-useref');
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
  runSequence(['sass','browserSync','watch'])
});

// Create a build
gulp.task('build', function  (callback) {
	runSequence('clean:dist',
		['sass','images','fonts'],
		callback
	)
})

gulp.task('sass', function(){
	return gulp.src('app/scss/style.scss') //Gets all files ending with .scss in app/scss and children dirs
		.pipe(sass({outputStyle:'compressed'}).on('error', sass.logError)) // using gulp-sass
		.pipe(gulp.dest('app/css'))
		.pipe(gulp.dest('dist/css'))
		.pipe(browserSync.reload({
			stream:true
		}))
})

// Gulp browserSync task
gulp.task('browserSync', function(){
	browserSync.init({
		server:{
			baseDir: 'app'
		}
	})
});

// Gulp watch syntax
gulp.task('watch', ['browserSync','sass'], function(){
	gulp.watch('app/scss/**/*.scss', ['sass']);	
	// Reloads the browser whenever HTML or JS  files change
	gulp.watch('app/*.html', browserSync.reload)
	gulp.watch('app/js/**/*.js', browserSync.reload)
})

// Gulp del 
gulp.task('clean:dist', function  () {
	return del.sync('dist');
})

// Gulp useref
gulp.task('useref', function  () {
	return gulp.src('app/*.html')
		.pipe(useref())
		// Minifies only if it's a Javascript file
		.pipe(gulpIf('*.js',uglify()))
		// Minifies only if it's a CSS file
		.pipe(gulpIf('*.css',cssnano()))
		.pipe(gulp.dest('dist'))
})

// Gulp imagemin
gulp.task('images', function  () {
	return gulp.src('app/images/**/*.+(png|jpg|gif|svg)')
		// caching images that ran throught imagemin
		.pipe(cache(imagemin({
			// Setting interlaced to true
			interlaced: true
		})))
		.pipe(gulp.dest('dist/images'))
})

// Gulp copy fonts
gulp.task('fonts', function  () {
	return gulp.src('app/fonts/**/*')
		.pipe(gulp.dest('dist/fonts'))
})