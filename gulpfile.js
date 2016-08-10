var gulp = require('gulp');
var sass = require('gulp-sass');

gulp.task('default', ['watch-sass']);

gulp.task('watch-sass', function(){
    gulp.watch("*.scss", ['sass']);
})

gulp.task('sass', function(){
    gulp.src('*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest("./"));
});
