# Yeoman Generator For Sitecore Visual Studio Solutions
## by Anastasiya Flynn

The purpose of this project is to demonstrate how a custom Sitecore solution generator can be implemented using [Yeoman](http://yeoman.io).

## Why automate
Visual Studio solutions for Sitecore projects are quite complex, as there are multiple integration points to manage. Automating the solution setup process accelerates the time it takes to kick off new projects and enforces consistency across the entire development team. This sample implementation demonstrates how to use Yeoman to create a custom Sitecore project generator. With Yeoman, Sitecore solution templates become source controlled and collectively managed. This allows teams to hit the ground running faster, and when a team does something really cool in their project that everyone likes, they can add it to the template so that everyone can benefit from the learnings and the "company standard" can evolve.
Read this [blog post]() for more information.

## Usage
Create a new folder where you want your Sitecore Visual Studio Project to live. Open a terminal from this folder and run the following commands

```bash
# intalls yeoman globally
npm install -g yo

# installs the Sitecore solution generator globally
npm install generator-sitecore-flynn

# Runs the main generator
yo sitecore-flynn

# Runs the sub-generator
yo sitecore-flynn:add-bootstrap
```

## What this generator creates
*Main generator*
1. C# projects structured in accordance with Helix
 * NuGet references to Sitecore packages based on the Sitecore version specified when generator is run
 * Build profiles for CM/CD server roles
 * Unit test projects
 * Code Style configuration (Resharper rules, EditorConfig file)
2. TDS projects that parallel the Helixified C# projects
 * TDS validation rules configuration
 * Sitecore package generation configured by server roles
 * Assembly inclusion/exclusion configured
3. DevOps - Gulp task for generating a deployable NuGet file that contains the CM and CD Sitecore update packages

*Add-bootstrap sub-generator*
1. Front-end assets - Sass compilation, bundling, minification, linting
