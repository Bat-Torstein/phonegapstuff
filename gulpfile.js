var gulp = require('gulp');
var browserify = require('gulp-browserify');
var shell = require('gulp-shell');
var runSequence = require('run-sequence');
var notify = require('gulp-notify');
var less = require('gulp-less');
var jshint = require('gulp-jshint');


var paths = {
    js: ['./js/**/.js'],
	watch: ['./js/**/*.js', './templates/*.html', './less/*.less'],
	less: ['./less/*.less'],
	dist: {
		css: './www/css/',
		js: './www/js/'
	}
};

function notifyBrowserifyError() {
    gulp.src("gulpfile.js").pipe(notify("Browserify failed!"));
    this.emit('end');
}

function notifyLessError() {
    gulp.src("gulpfile.js").pipe(notify("Less failed!"));
    this.emit('end');
}

function notifyTestsFailed() {
    gulp.src("gulpfile.js").pipe(notify("Tests failed!"));
    this.emit('end');
}

function notifyLintError() {
    gulp.src("gulpfile.js").pipe(notify("Lint failed!"));
    this.emit('end');
}

// Basic usage
gulp.task('bundle', function() {
    // Single entry point to browserify
	gulp.src(paths.js)
        .pipe(browserify({
            transform: ['node-underscorify']
        }))
		.on('error', notifyBrowserifyError)
        .pipe(gulp.dest(paths.dist.js));
});

// Rerun tasks whenever a file changes.
gulp.task('watch', function() {
    gulp.watch(paths.watch, ['bundle']);
});


// Runs all phonegap tasks in sequence
gulp.task('phonegap', function() {
        runSequence(
            'phonegap-init',
            'phonegap-build');
});

gulp.task("less", function() {
	gulp.src(paths.less)
		.pipe(less())
		.on('error', notifyLessError)
		.pipe(gulp.dest(paths.dist.css));
});

gulp.task("lint", function() {
	gulp.src(paths.js)
		.pipe(jshint())
		.pipe(jshint.reporter("default"))
		.pipe(jshint.reporter("fail")
		.on('error', notifyLintError));
});

// Init phonegap - add platforms
gulp.task('phonegap-init', shell.task([
   'phonegap platform add android']
    , {
        ignoreErrors: 'true'
    }
));

gulp.task('phonegap-build', shell.task([
    'phonegap build'
], {
        ignoreErrors: 'true'
    }
));

gulp.task('build', function() {
   runSequence(
       'bundle',
	   'less',
	   'lint',
       'phonegap'
    );
});

gulp.task('default', ['build', 'watch'])
