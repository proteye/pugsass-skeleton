import gulp from 'gulp';
import gulpIf from 'gulp-if';
import plumber from 'gulp-plumber';
import pug from 'gulp-pug';
import inheritance from 'gulp-pug-inheritance';
import filter from 'gulp-filter';
import rename from 'gulp-rename';
import errorHandler from 'gulp-plumber-error-handler';
import staticHash from 'gulp-static-hash';

gulp.task('templates', () => (
	gulp.src('app/**/*.pug')
		.pipe(plumber({errorHandler: errorHandler(`Error in \'templates\' task`)}))
		.pipe(gulpIf(global.watch, inheritance({basedir: 'app', skip: 'node_modules'})))
    .pipe(filter(file => /app[\\\/]pages/.test(file.path)))
		.pipe(pug({basedir: 'app'}))
		.pipe(gulpIf(process.env.NODE_ENV === 'production', staticHash({
			asset: 'dist',
			exts: ['js', 'css']
		})))
		.pipe(rename({dirname: '.'}))
		.pipe(gulp.dest('dist'))
));
