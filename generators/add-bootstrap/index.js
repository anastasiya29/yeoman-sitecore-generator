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