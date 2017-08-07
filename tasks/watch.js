import gulp from 'gulp';
import runSequence from 'run-sequence';
import { get as browserSync } from 'browser-sync';
import watch from 'gulp-watch';

const bs = browserSync('server');

gulp.task('watch', () => {
	global.watch = true;

	watch('app/{styles,blocks}/**/*.scss', () => {
		runSequence(['styles'], () => bs.reload('assets/styles/app.min.css'));
	});
	watch(['app/{pages,blocks}/**/*.pug'], () => runSequence('templates', bs.reload));
  watch('app/resources/**/*', () => runSequence('copy', bs.reload));

	gulp.start('scripts:watch');
});
