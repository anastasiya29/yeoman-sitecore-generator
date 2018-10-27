import { task, src, series } from "gulp";
import exec from "gulp-exec";
const solutionDir = "<%= solutionRoot %>";

function buildCmPackage() {
    const cmbuildcmd =
        "C:/Windows/Microsoft.NET/Framework/v4.0.30319/MSBuild.exe " +
        "/property:Configuration=Release-CM " +
        "/target:GeneratePackage " +
        "/property:GeneratePackage=True " +
        "/property:RecursiveDeployAction=Ignore " +
        `/property:SolutionDir=${solutionDir} ` +
        "/nologo " +
        "/verbosity:minimal " +
        "\"<%%= file.path %>\"";

    return new Promise(cm => {
        console.log("\x1b[30m\x1b[43m%s\x1b[0m",
            `Generating package from <%= solutionNamespace %>.CM.scproj`);

        src("./src/Project/<%= solutionNamespace %>.CM/<%= solutionNamespace %>.CM.scproj")
            .pipe(exec(cmbuildcmd))
            .pipe(exec.reporter())
            .on("finish", cm);
    });
}

function buildCdPackage() {
    const cdbuildcmd =
        "C:/Windows/Microsoft.NET/Framework/v4.0.30319/MSBuild.exe " +
        "/property:Configuration=Release-CD " +
        "/target:GeneratePackage " +
        "/property:GeneratePackage=True " +
        "/property:RecursiveDeployAction=Ignore " +
        `/property:SolutionDir=\"${solutionDir}\" ` +
        "/nologo " +
        "/verbosity:minimal " +
        "\"<%%= file.path %>\"";

    return new Promise(cd => {
        console.log("\x1b[30m\x1b[43m%s\x1b[0m",
            `Generating package from <%= solutionNamespace %>.CD.scproj`);

        src("./src/Project/<%= solutionNamespace %>.CD/<%= solutionNamespace %>.CD.scproj")
            .pipe(exec(cdbuildcmd))
            .pipe(exec.reporter())
            .on("finish", cd);
    });
}

function packagePackages() {
    console.log("\x1b[30m\x1b[43m%s\x1b[0m",
        `This assumes you have already built the solution in the Release-CM and Release-CD configurations before running this task.`);

    const nuspecFile = `${solutionDir}\\<%= solutionNamespace %>.Sitecore.nuspec`;
    const cmd =
        "lib\\nuget.exe pack \"<%%= file.path %>\" " +
        "-NoPackageAnalysis " +
        "-OutputDirectory ./Artifacts " +
        "-Version 1.0.0.0 ";

    return new Promise(pack => {
        src(nuspecFile)
            .pipe(exec(cmd))
            .pipe(exec.reporter())
            .on("finish", pack);
    });
}

// This task will build the <%= solutionNamespace %>.CM TDS project in the Release-CM build configuration
// and <%= solutionNamespace %>.CD TDS project in the Release-CD build configuration before packaging.
task("nuget-pack", series(buildCmPackage, buildCdPackage, packagePackages));
