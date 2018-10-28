const Generator = require("yeoman-generator"),
    prompter = require("../lib/prompter"),
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

    async prompting() {
        // Prompt user for project-specific settings
        await prompter.getTypeScriptInfo.call(this);
    }

    writing() {
        // Copy template files, dynamically transforming files based on project-specific settings as needed
        writer.writeTemplates.call(this);
        writer.writeTemplates.call(
            this,
            "./../Assets",
            `./src/Project/${this.settings.solutionNamespace}.Web/${this.settings.frontEndAssetPath}`);
    }

    install() {
        // Change working directory to 'gulp' for dependency install
        const typeScriptDir = process.cwd() + `/src/Project/${this.settings.solutionNamespace}.Web/${this.settings.frontEndAssetPath}/ui`;
        process.chdir(typeScriptDir);
        this.yarnInstall();
    }
}