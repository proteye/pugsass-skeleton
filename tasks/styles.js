import gulp from 'gulp';
import gulpIf from 'gulp-if';
import plumber from 'gulp-plumber';
import sass from 'gulp-sass';
import sassImport from 'gulp-sass-glob-import';
import autoprefixer from 'gulp-autoprefixer';
import gcmq from 'gulp-group-css-media-queries';
import cleanCss from 'gulp-clean-css';
import rename from 'gulp-rename';
import sourcemaps from 'gulp-sourcemaps';
import errorHandler from 'gulp-plumber-error-handler';

const isDebug = process.env.NODE_ENV !== 'production';

gulp.task('styles', () => (
	gulp.src('app/styles/app.scss')
    .pipe(plumber({errorHandler: errorHandler(`Error in \'styles\' task`)}))
		.pipe(gulpIf(isDebug, sourcemaps.init()))
    .pipe(sassImport())
    .pipe(sass({paths: ['app/styles/**/*.scss']}))
		.pipe(gulpIf(!isDebug, gcmq()))
    .pipe(autoprefixer())
		.pipe(gulpIf(!isDebug, cleanCss()))
    .pipe(rename({suffix: '.min'}))
		.pipe(gulpIf(isDebug, sourcemaps.write()))
		.pipe(gulp.dest('dist/assets/styles'))
));
