var gulp = require('gulp'),
    nuget = require('gulp-nuget'),
    clean = require('gulp-clean'),
    runSequence = require('run-sequence'),
    project = require('./package.json'),
    nugetApi = require('../nugetApi.json'),
    nugetPath = '../nuget.exe';

gulp.task('nuget-pack', function() {
    return gulp.src('./jQuery.jTableScroll.js')
        .pipe(nuget.pack({
            nuspec: 'project.nuspec',
            nuget: nugetPath,
            version: project.version,
            workingDirectory: '.tmp/'
        }))
        .pipe(gulp.dest('nuget/'));
});

gulp.task('nuget-push', function() {
    return gulp.src('nuget/jTableScroll.' + project.version + '.nupkg')
        .pipe(nuget.push({
            feed: 'https://www.nuget.org/',
            nuget: nugetPath,
            apiKey: nugetApi.key
        }));
});

gulp.task('clean', function() {
    return gulp.src(['./*.nupkg','.tmp/**']).pipe(clean());
});

gulp.task('clean-leftovers', function() {
    return gulp.src(['./*.nupkg']).pipe(clean());
});

gulp.task('nuget', function() {
    runSequence('clean','nuget-pack','clean-leftovers');
});