import gulp from 'gulp';
import changed from 'gulp-changed';

gulp.task('copy', () => (
	gulp.src('app/resources/**/*')
		.pipe(changed('dist'))
		.pipe(gulp.dest('dist'))
));
