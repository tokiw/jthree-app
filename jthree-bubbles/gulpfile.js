var gulp = require('gulp');
var webserver = require('gulp-webserver');

gulp.task('webserver', function() {
    gulp.src('')
    .pipe(webserver({
        host: "0.0.0.0",
        port: 9000,
        livereload: {
          port: 35729
        },
        directoryListing: false
    }));
});

gulp.task('default', ['webserver']);