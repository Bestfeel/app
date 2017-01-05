var gulp = require('gulp');
var webpack = require("webpack");
var webpackConfig = require("./webpack.publish.config.js");

gulp.task('default', ['webpack'], function () {
    return gulp.src(['./publish/*.js'])
        .pipe(gulp.dest('./publish/js'))
});

gulp.task('webpack', function () {
    webpack(webpackConfig, function (err, stats) {
        if (err)
            console.log("任务启动失败");
    });

});