const Generator = require("yeoman-generator"),
    prompter = require("../lib/prompter"),
    writer = require("../lib/writer");

module.exports = class extends Generator {
    constructor(args, opts) {
        super(args, opts);
    }

    initializing() {
        this.log("Generating Sitecore project");

        // Initialize an object to track project-specific settings that change each
        // time the generator runs
        this.settings = {};

        // Escape single backslash with double-backslash for usage in strings
        this.settings.solutionRoot = this.destinationPath().replace(/\\/g, "\\\\") + "\\\\src";
    }

    async prompting() {
        // Prompt user for project-specific settings
        await prompter.getSolutionInfo.call(this);
        await prompter.getFrameworkInfo.call(this);
    }

    configuring() {
        // Save all the settings that have been provided to config file
        Object.keys(this.settings).forEach((key) => this.config.set(key, this.settings[key]));
    }

    writing() {
        writer.writeConfigFiles.call(this);

        // Copy Helix layers to destination, dynamically transforming files based on
        // project-specific settings as needed
        writer.writeTemplates.call(this);

        writer.writeRawFiles.call(this);
    }

    install() {
        // Install node modules in destination
        this.yarnInstall();
    }

    end() {
        this.log("Finished generating Sitecore project");
    }
};