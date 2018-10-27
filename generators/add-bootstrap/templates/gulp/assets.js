import { task, src, dest, watch, series } from "gulp";
import gulpLoadPlugins from "gulp-load-plugins";
import browserSync from "browser-sync";
import del from "del";

const $ = gulpLoadPlugins(),
    webRoot = `src/Project/<%= solutionNamespace %>.Web<%= frontEndAssetPath %>`,
    source = `${webRoot}/src`,
    dist = `${webRoot}/dist`,
    paths = {
        src: {
            html: `${source}/index.html`,
            styles: `${source}/sass/**/*.scss`,
            scripts: `${source}/lib/**/*.js`
        },
        dist: {
            html: `${dist}`,
            recursive: `${dist}/**/*`,
            styles: `${dist}/css`,
            scripts: `${dist}/scripts`
        }
    };

// Copy static html files from src to dist
function html() {
    return src(paths.src.html).pipe(dest(paths.dist.html));
}

// Copy JavaScript files from src to dist
function scripts() {
    return src(paths.src.scripts).pipe(dest(paths.dist.scripts));
}

// Compile CSS from Sass files.
function styles() {
    // Add vendor prefixes based on rules by http://www.caniuse.com.
    // Only applies to properties that are not supported at or below the specified client version.
    const autoprefixerBrowsers = [
        "Android 2.3",
        "Android >= 4",
        "Chrome >= 20",
        "Firefox >= 24",
        "Explorer >= 8",
        "iOS >= 6",
        "Opera >= 12",
        "Safari >= 6"
    ];

    return src(paths.src.styles)
        .pipe($.using())
        .pipe($.sourcemaps.init())
        .pipe($.sass().on("error", $.sass.logError))
        .pipe($.autoprefixer(autoprefixerBrowsers))
        .pipe(dest(paths.dist.styles))
        .pipe($.if("*.css", $.cssnano()))
        .pipe($.size({ title: "styles" }))
        .pipe($.sourcemaps.write("maps"))
        .pipe(dest(paths.dist.styles))
        .pipe(browserSync.stream());
}

// Clean contents of "dist" directory.
task("assets-clean", function () {
    return del(paths.dist.recursive);
});

task("assets-compile", series("assets-clean", styles, scripts, html));

// Watch files for changes and automatically refresh browser
task("assets-serve", (cb) => {
    browserSync({
        server: `${dist}`,
        injectChanges: true,
        port: 3000,
        https: false
    }, cb);

    const watcher = watch([
        paths.src.styles
    ], task("before-build"));

    watcher.on("all", (event, path) => {
        console.log("\x1b[30m\x1b[43m%s\x1b[0m", `${event} Detected @ ${path}: running "before-build" task...`);
        browserSync.stream();
    });
});
