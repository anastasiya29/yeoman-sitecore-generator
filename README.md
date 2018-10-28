# Yeoman Generator For Sitecore Visual Studio Solutions
## by Anastasiya Flynn

The purpose of this project is to demonstrate how a custom Sitecore solution generator can be implemented using [Yeoman](http://yeoman.io). If you are in the market for a Sitecore solution generator, I encourage you to try out my generator to see how Yeoman works, then fork the project and replace my "templates" folders with your own templates. This [blog post](https://www.codealamodeblog.com/Sitecore/Node-js/automate-with-yeoman/) contains more information.

## Why automate
Visual Studio solutions for Sitecore projects are quite complex, as there are multiple integration points to manage. Automating the solution setup process accelerates the time it takes to kick off new projects and enforces consistency across the entire development team. This sample implementation demonstrates how to use Yeoman to create a custom Sitecore project generator. With Yeoman, Sitecore solution templates become source controlled and collectively managed. This allows teams to hit the ground running faster, and when a team does something really cool in their project that everyone likes, they can add it to the template so that everyone can benefit from the learnings and the "company standard" can evolve.

## Usage
Create a new folder where you want your Sitecore Visual Studio Project to live. Open a terminal from this folder and run the following commands

```bash
# intalls yeoman globally
npm install yo -g

# installs the Sitecore solution generator globally
npm install generator-sitecore-flynn -g

# Runs the main generator
yo sitecore-flynn

# Runs the sub-generators
yo sitecore-flynn:add-bootstrap
yo sitecore-flynn:add-typescript
```

## Project-Specific Variables
The `main generator` will prompt you for the following project-specific values:
* `solutionName` (optional, string) - Ex. "Demo Sitecore Project"
* `solutionNamespace` (optional, string) - The base .NET namespace for C# projects and classes. Ex. "Demo.Sitecore.Project"
* `areaName` (optional, string) - The base for the MVC area name. Ex. "DemoArea"
* `author` (required, string) - Ex. "Anastasiya Flynn"
* `frontEndAssetPath` (string) - The path to front-end assets directory relative to src/Project/YoBase.Web Ex. "/Assets"
* `localUrl` (string) - The domain of the local Sitecore instance. Ex. "sc901.local".
 * The generator assumes Sitecore instances are in C:\inetpub\wwwroot\<localUrl>\Website.
 * To change this, update TdsGlobal.config after running the generator.
* `sitecoreVersion` (select list) - Ex. "9.0 rev. 171219 (9.0 Update-1)"
* `framework` (select list) - Ex. ".NET 4.6.2"

The `add-bootstrap` sub-generator will not prompt for any project-specific variales, but will ask for permission to make changes to your project's package.json file.

The `add-typescript` sub-generator will prompt for the following project-specific values:
* `filename` (string) - Ex. "main" (don't include the .js)
* `libraryVariable` (string) - The variable that will be exported to the global JavaScript namespace by your library - Ex. "LIB"

## What this generator creates
### main generator
* C# projects structured in accordance with Helix
 * NuGet references to Sitecore packages based on the Sitecore version specified when generator is run
 * Build profiles for CM/CD server roles
 * Unit test projects
 * Code Style configuration (Resharper rules, EditorConfig file)
* TDS projects that parallel the Helixified C# projects
 * TDS validation rules configuration
 * Sitecore package generation configured by server roles
 * Assembly inclusion/exclusion configured
* DevOps - Gulp task for generating a deployable NuGet file that contains the CM and CD Sitecore update packages

Once you've run the generator and the solution has been created:
* Open the freshly generated solution in Visual Studio as administrator
* Restore NuGet packages for solution
* Build the solution in Debug, Release-CM, Release-CD
* Run unit tests (the solution comes with 1 test, and it should pass)
* Open Task Runner Explorer and run the `nuget-pack` task - This packs up the Sitecore update packages created by TDS into a deployable NuGet package, which is generated in /Artifacts

### add-bootstrap sub-generator
* Front-end assets - Sass compilation, bundling, minification, linting
* Gulp tasks to copy Bootstrap vendor files into the project, compile Sass into CSS, and server assets on a local Webpack server

Once you've run the sub-generator:
* Click refresh in the Task Runner Explorer to load in the new Gulp tasks
* Run the `vendor-copy` task to copy Bootstrap vendor files from the node_modules folder to the project
* Run the `assets-compile` task to compile Sass files to Css
* Run the `assets-serve` task to launch a local Webpack server to test the Bootstrap assets locally

### add-typescript sub-generator
* Skeleton for a TypeScript library, including a sample TypeScript component
* Webpack configuration to bundle the TypeScript library and an NPM task to kick off the Webpack bundling
* Webpack dev server configuration to work on the TypeScript library headlessly and an NPM task to launch the headless server
* Jasmine configuration and sample unit tests
* Karma configuration to run unit tests with code coverage reporting and an NPM task to trigger a test run

Once you're run the sub-generator:
* The TypeScript library will be generated in {project root}/src/Project/{solutionNamespace}.Web/{frontEndAssetPath}/ui - you should open a new Visual Studio Code window scoped to this "ui" folder to work with the TypeScript library. The TypeScript library has it's own `package.json` file that's separate from the rest of the Visual Studio project. The purpose is to allow working on the TypeScript layer detached from the rest of the code. (Headless!)
* Run `npm run build` to build the library
* Run `npm run test` to execute the unit tests
* Run `npm run dev` to launch a headless localhost server with dynamic on-the-fly compilation (Uses http://localhost:9000/)

Note: if  http://localhost:9000/ looks like it's missing CSS, that's because the `add-typescript` sub-generator does not deliver any styles. Follow the instructions from the `add-bootstrap` sub-generator to generate CSS assets. The `npm run dev` task will be automatically detected CSS assets in neighbor directories and copy them into the headless site.

Happy generating!