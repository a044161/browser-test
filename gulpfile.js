'use strict';

var gulp = require('gulp');

var browserSync = require('browser-sync');

gulp.task('serve', function(){
	browserSync({
		server:{
			baseDir: 'src'
		}
	});

	gulp.watch(['*.html', 'views/**/*.html', 'styles/**/*.css', 'scripts/**/*.js'],{cwd:'src'},browserSync.reload)
})