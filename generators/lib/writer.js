const guid = require("uuid");
//gulp-rename@1.2.2 is required, See https://github.com/yeoman/yo/issues/577
const rename = require("gulp-rename");

function writeTemplates(src, dist) {
    this.registerTransformStream(rename((path) => {
        path.basename = path.basename.replace(/ArkeAreaName/g, this.settings.areaName);
        path.basename = path.basename.replace(/ArkeBase/g, this.settings.solutionNamespace);
        path.basename = path.basename.replace(/arkebase/g, this.settings.solutionNamespace.toLowerCase());

        path.dirname = path.dirname.replace(/ArkeAreaName/g, this.settings.areaName);
        path.dirname = path.dirname.replace(/ArkeBase/g, this.settings.solutionNamespace);
        path.dirname = path.dirname.replace(/arkebase/g, this.settings.solutionNamespace.toLowerCase());
    }));

    const templateData = Object.assign(generateGuids(), this.settings);

    if (src && dist) {
        this.fs.copyTpl(this.templatePath(src), this.destinationPath(dist), templateData);
    } else {
        this.fs.copyTpl(this.templatePath(), this.destinationPath(), templateData);
    }
}

function writeConfigFiles() {
    // Any file that only has an extension needs to be copied explicitly
    this.fs.copyTpl(this.templatePath(".gitignore"), this.destinationPath(".gitignore"), this.settings);
    this.fs.copyTpl(this.templatePath(".gitattributes"), this.destinationPath(".gitattributes"));
    this.fs.copyTpl(this.templatePath(".babelrc"), this.destinationPath(".babelrc"));
    this.fs.copyTpl(this.templatePath("./src/.editorconfig"), this.destinationPath("./src/.editorconfig"));
}

function generateGuids() {
    return {
        projectGuid: guid.v4(),
        projectTDSCoreGuid: guid.v4(),
        projectTDSMasterGuid: guid.v4(),
        projectUnitTestGuid: guid.v4(),
        featureGuid: guid.v4(),
        featureTDSCoreGuid: guid.v4(),
        featureTDSMasterGuid: guid.v4(),
        featureUnitTestGuid: guid.v4(),
        foundationGuid: guid.v4(),
        foundationTDSCoreGuid: guid.v4(),
        foundationTDSMasterGuid: guid.v4(),
        cmBundleGuid: guid.v4(),
        cdBundleGuid: guid.v4()
    };
}

module.exports = {
    writeTemplates: writeTemplates,
    writeConfigFiles: writeConfigFiles
};
