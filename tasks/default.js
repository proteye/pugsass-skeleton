import runSequence from 'run-sequence';
import gulp from 'gulp';

gulp.task('styles:dependencies', () => (
	runSequence(
		'styles'
	)
));

gulp.task('default', ['clean'], () => (
	runSequence(
		[
			'styles:dependencies',
			'templates'
		],
		'server',
		'watch'
	)
));

gulp.task('build', ['clean'], () => (
	runSequence(
		'styles:dependencies',
		'scripts',
		'copy',
		'templates'
	)
));
