var gulp = require('gulp');
var webserver = require('gulp-webserver');

gulp.task('webserver', function() {
    gulp.src('')
    .pipe(webserver({
        port: 9000,
        livereload: true,
    }));
});

gulp.task('default', ['webserver']);