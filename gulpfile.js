var gulp = require('gulp');

// include plug-ins
var changed = require('gulp-changed');
var imageResize = require('gulp-image-resize');
var imagemin = require('gulp-imagemin');

//gulp.task('default', function() {
  // place code for your default task here
//});

// minify new images
gulp.task('imagemin', function () {
    var imgSrc = './resources/images/**/*',
        imgDst = './www/img';
    gulp.src(imgSrc)
        .pipe(changed(imgDst))
        .pipe(imagemin())
        .pipe(imageResize({
            width : 100,
            height : 100,
            crop : true,
            upscale : false
        }))
        .pipe(gulp.dest(imgDst));
});

// default gulp task
gulp.task('default', ['imagemin'], function () {});
//gulp.task('default', ['imagemin', 'htmlpage', 'scripts', 'styles',
//    'prepare'], function () {});