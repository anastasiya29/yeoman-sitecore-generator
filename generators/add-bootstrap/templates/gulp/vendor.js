import { task, dest, src } from "gulp";
import del from "del";

const libPath = `src/Project/<%= solutionNamespace %>.Web<%= frontEndAssetPath %>/src/lib`;

task("vendor-copy", () => src([
        "./node_modules/jquery/dist/jquery.min.js",
        "./node_modules/bootstrap/dist/js/bootstrap.bundle.min.js"
    ]).pipe(dest(libPath)));

task("vendor-clean", () => del(libPath + "/**/*"));
