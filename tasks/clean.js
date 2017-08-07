import del from 'del';
import gulp from 'gulp';
import gutil from 'gulp-util';

gulp.task('clean', (cb) => {
  del(['dist']).then(function (paths) {
    gutil.log('clean', paths);
    cb();
  })
});
