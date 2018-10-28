# Yeoman Generator For Sitecore Visual Studio Solutions
## by Anastasiya Flynn

The purpose of this project is to demonstrate how a custom Sitecore solution generator can be implemented using [Yeoman](http://yeoman.io).

## Why automate
Visual Studio solutions for Sitecore projects are quite complex, as there are multiple integration points to manage. Automating the solution setup process accelerates the time it takes to kick off new projects and enforces consistency across the entire development team. This sample implementation demonstrates how to use Yeoman to create a custom Sitecore project generator. With Yeoman, Sitecore solution templates become source controlled and collectively managed. This allows teams to hit the ground running faster, and when a team does something really cool in their project that everyone likes, they can add it to the template so that everyone can benefit from the learnings and the "company standard" can evolve.
Read this [blog post](https://www.codealamodeblog.com/Sitecore/Node-js/automate-with-yeoman/) for more information.

## Usage
Create a new folder where you want your Sitecore Visual Studio Project to live. Open a terminal from this folder and run the following commands

```bash
# intalls yeoman globally
npm install yo -g

# installs the Sitecore solution generator globally
npm install generator-sitecore-flynn -g

# Runs the main generator
yo sitecore-flynn

# Runs the sub-generator
yo sitecore-flynn:add-bootstrap
```

## Project-Specific Variables
The main generator will prompt you for some project-specific values
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

## What this generator creates
### Main generator
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

### Add-bootstrap sub-generator
* Front-end assets - Sass compilation, bundling, minification, linting
* Gulp tasks to copy Bootstrap vendor files into the project, compile Sass into CSS, and server assets on a local Webpack server

Once you've run the sub-generator:
* Click refresh in the Task Runner Explorer to load in the new Gulp tasks
* Run the `vendor-copy` task to copy Bootstrap vendor files from the node_modules folder to the project
* Run the `assets-compile` task to compile Sass files to Css
* Run the `assets-serve` task to launch a local Webpack server to test the Bootstrap assets locally

Happy generating!