var gulp = require('gulp'),
		watch = require('gulp-watch'),
		minifyJs = require('gulp-uglify'),
		concat = require('gulp-concat'),
        karma = require('karma').server;;
		argv = require('yargs').argv,
		fs = require('fs-utils'),
		gutil = require('gulp-util');




var paths = {
	js: [
        'src/js/idealcart/intro.js',
        'src/js/idealcart/util.js',
        'src/js/idealcart/ideal-cart.js',
        'src/js/idealcart/entity/*.js',
        'src/js/idealcart/outro.js'
    ],
    outputDir: 'dist/js/'
};


/**
 * Compile js
 *
 */

gulp.task('compile-js', function() {
	return gulp.src(paths.js)
            .pipe(concat('ideal-cart.js'))
            .pipe(gulp.dest(paths.outputDir))
			.pipe(minifyJs())
			.pipe(concat('ideal-cart.min.js'))
			.pipe(gulp.dest(paths.outputDir));
});

/**
 * Watch for file changes and re-run tests on each change
 */
gulp.task('test', function (done) {
    karma.start({
        configFile: __dirname + '/karma.conf.js'
    }, done);
});


gulp.task('build-custom', ['compile-js']);

/**
 * Watch src
 */
gulp.task('watch', function() {
	gulp.watch([paths.js], ['compile-js']);

});

gulp.task('build', ['build-custom']);
gulp.task('default', ['build', 'watch', 'test']);
