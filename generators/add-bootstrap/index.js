const Generator = require("yeoman-generator"),
    writer = require("../lib/writer");

module.exports = class extends Generator {

    constructor(args, opts) {
        super(args, opts);
    }

    initializing() {
        this.log("Generating Sitecore project");

        // Read previously defined settings
        this.settings = this.config.getAll();
    }

    writing() {
        const pkgJson = {
            dependencies: {
                "bootstrap": "4.1.2",
                "jquery": "^3.3.1",
                "popper.js": "^1.14.4"
            },
            devDependencies: {
                "browser-sync": "^2.24.4",
                "del": "^3.0.0",
                "gulp-autoprefixer": "^5.0.0",
                "gulp-cssnano": "^2.1.3",
                "gulp-if": "^2.0.2",
                "gulp-sass": "^4.0.1",
                "gulp-size": "^3.0.0",
                "gulp-sourcemaps": "^2.6.4",
                "gulp-using": "^0.1.1",
                "source-map": "^0.7.3"
            }
        };

        // Extend or create package.json file in destination path
        this.fs.extendJSON(this.destinationPath("package.json"), pkgJson);

        // Copy template files, dynamically transforming files based on project-specific settings as needed
        writer.writeTemplates.call(this);
        writer.writeTemplates.call(
            this,
            "./../Assets",
            `./src/Project/${this.settings.solutionNamespace}.Web/${this.settings.frontEndAssetPath}`);
    }

    install() {
        this.yarnInstall();
    }
}