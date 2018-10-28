/*
 * Project settings managed by this prompter:
 * 
 * solutionName (optional, string) - Ex. "Demo Systems Project"
 * solutionNamespace (optional, string) - The base .NET namespace for C# projects and classes. Ex. "Demo.Sitecore.Project"
 * areaName (optional, string) - The base for the MVC area name. Ex. "DemoArea"
 * author (required, string) - Ex. "Anastasiya Flynn"
 * frontEndAssetPath (string) - The path to front-end assets directory relative to src/Project/YoBase.Web Ex. "/Assets"
 * localUrl (string) - The domain of the local Sitecore instance. Ex. "sc901.local".
 *                     The generator assumes Sitecore instances are in C:\inetpub\wwwroot\<localUrl>\Website.
 *                     To change this, update TdsGlobal.config after running the generator.
 * sitecoreVersion (select list) - Ex. "9.0 rev. 171219 (9.0 Update-1)"
 * framework (select list) - Ex. ".NET 4.6.2"
 */

function getSolutionInfo() {
    return this.prompt([{
        type: "input",
        name: "solutionName",
        message: "Your solution name",
        default: this.appname // Default to current folder name
    }, {
        type: "input",
        name: "solutionNamespace",
        message: "Your .NET namespace base",
        default: this.appname.replace(" ", "")
    }, {
        type: "input",
        name: "areaName",
        message: "Your MVC area name base",
        default: this.appname.replace(" ", "")
    }, {
        type: "input",
        name: "author",
        message: "Your author name",
        required: true
    }, {
        type: "input",
        name: "frontEndAssetPath",
        message: "Your path to front-end assets directory (relative to the Project-level web project)",
        default: "/Assets"
    }, {
        type: "input",
        name: "localUrl",
        message: "Domain of your local Sitecore instance",
        required: true
    }, {
        type: "list",
        name: "sitecoreVersion",
        message: "Your Sitecore version",
        choices: [
            { name: "8.2 rev. 171121 (8.2 Update-6)", value: "8.2.171121" },
            { name: "8.2 rev. 180406 (8.2 Update-7)", value: "8.2.180406" },
            { name: "9.0 rev. 171219 (9.0 Update-1)", value: "9.0.171219" }
        ],
        required: true,
        store: true
    }]).then((answers) => {
        Object.keys(answers).forEach((key) => this.settings[key] = answers[key]);
    });
}

function getFrameworkInfo() {
    // The options for the target framework of the VS Solution is based on the compatibility table https://kb.sitecore.net/articles/087164
    // The value of the frameworkSitecore variable is based on the actual target framework of the Sitecore NuGet packages.
    const choices = [];
    let frameworkSitecore = null;

    switch (this.settings.sitecoreVersion) {
        case "8.2.171121":
        case "8.2.180406":
            choices.push({ name: ".NET 4.6.1", value: "4.6.1" });
            choices.push({ name: ".NET 4.6", value: "4.6" });
            choices.push({ name: ".NET 4.5.2", value: "4.5.2" });
            frameworkSitecore = "net452";
            break;
        case "9.0.171219":
            choices.push({ name: ".NET 4.7", value: "4.7" });
            choices.push({ name: ".NET 4.6.2", value: "4.6.2" } );
            frameworkSitecore = "net462";
            break;
    };
    return this.prompt([{
        type: "list",
        name: "framework",
        message: "Your .NET framework",
        choices: choices,
        required: true,
        store: true
    }]).then((answers) => {
        this.settings.framework = "v" + answers.framework;
        this.settings.frameworkShorthand = "net" + answers.framework.replace(/\./g, "");
        this.settings.frameworkMajor = "net" + answers.framework.substring(0, 3).replace(/\./g, "");
        this.settings.frameworkSitecore = frameworkSitecore;
    });
}

/*
 * filename (string) - Ex. "main" (don't include the .js)
 * libraryVariable (string) - The variable that will be exported to the global JavaScript namespace by your library - Ex. "LIB"
 */
function getTypeScriptInfo() {
    return this.prompt([{
        type: "input",
        name: "filename",
        message: "The filename of your compiled JavaScript",
        required: true
    }, {
        type: "input",
        name: "libraryVariable",
        message: "The global variable exported by your TypeScript library",
        required: true
    }]).then((answers) => {
        Object.keys(answers).forEach((key) => this.settings[key] = answers[key]);
    });
}

module.exports = {
    getSolutionInfo: getSolutionInfo,
    getFrameworkInfo: getFrameworkInfo,
    getTypeScriptInfo: getTypeScriptInfo
}
