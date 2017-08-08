import gulp from 'gulp';
import smartgrid from 'smart-grid';

const settings = {
  outputStyle: 'scss',
  // other options are default
}

gulp.task('smartgrid', () => (
  smartgrid('app/styles/_base', settings)
));
