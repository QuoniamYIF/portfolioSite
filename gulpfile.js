var gulp = require('gulp');
var rename = require('gulp-rename');
var minifyCss = require('gulp-clean-css');
var refresh = require('gulp-refresh');
var responsive = require('gulp-responsive');

gulp.task('responsiveImg', function(){
    gulp.src('img/*.{jpeg,jpg}')
            .pipe(responsive({
                '*.{jpeg,jpg}': [{
                    width: 320,
                    height: 320,
                    rename: {
                        suffix: '-small'
                    }
                }]
            }, {
                progressive: true
            }))
            .pipe(gulp.dest('./img/'));

});

gulp.task('styles', function(){
    gulp.src('css/*.css')
            .pipe(minifyCss())
            .pipe(rename({
                suffix:'-min'
            }))
            .pipe(gulp.dest('./build/css/'))
            .pipe(refresh());
});

gulp.task('watch', function(){
    // gulp.watch('js/*.js',['scripts']);
    refresh.listen()
    gulp.watch('css/*.css',['styles']);
    gulp.watch('./index.html', function(event) {
            refresh.changed(event.path);
    });
});

gulp.task('default', ['watch']);