using <%= solutionNamespace %>.Web.UnitTest.Infrastructure;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Xml.Linq;
using System.Xml.XPath;
using Xunit;
using Xunit.Abstractions;

namespace <%= solutionNamespace %>.Web.UnitTest
{

    public class ProjectTests
    {
        /// <summary>An output helper.</summary>
        private readonly ITestOutputHelper _output;

        /// <summary>The solution src root.</summary>
        private const string SrcPath = "../../";

        /// <summary>
        ///   Initializes a new instance of the <see cref="ProjectTests"/> class.
        /// </summary>
        /// <param name="output">The test output helper.</param>
        public ProjectTests(ITestOutputHelper output)
        {
            _output = output;
        }

        /// <summary>
        ///   All projects must target .Net Framework <%= framework %>.
        /// </summary>
        [Fact]
        public void ProjectsTargetCorrectFrameworkVersion()
        {
            const string xpath =
                @"/p:Project/p:PropertyGroup/p:TargetFrameworkVersion";

            var ns = new ProjectFileNamespaceManager();
            var paths = ProjectFilePaths(SrcPath)
                .Concat(ProjectFilePaths(SrcPath, "*.scproj"))
                .ToArray();

            Assert.NotEmpty(paths);
            foreach (var path in paths)
            {
                _output.WriteLine($"Testing {path}");

                var nodes = XDocument
                    .Load(path)
                    .XPathSelectElements(xpath, ns)
                    .ToArray();

                Assert.Single(nodes);
                Assert.True(nodes.First().Value == "<%= framework %>");
                _output.WriteLine($"Passed: {path}");
            }

            ProjectFilesContainNode(SrcPath, xpath);
        }

        /// <summary>
        ///   Gets a list of project files in the specified folder.
        /// </summary>
        /// <param name="basePath">The root folder to search.</param>
        /// <param name="searchPattern">The search pattern to use.</param>
        /// <returns>A list of absolute paths to project files.</returns>
        private static IEnumerable<string> ProjectFilePaths(
            string basePath,
            string searchPattern = "*.csproj") => Directory
                .GetFiles(basePath, searchPattern, SearchOption.AllDirectories)
                .Select(Path.GetFullPath);

        /// <summary>Test that project files contain a specific node.</summary>
        /// <param name="fsPath">The path to search for project files.</param>
        /// <param name="xPath">The node to test for.</param>
        private void ProjectFilesContainNode(string fsPath, string xPath)
        {
            var ns = new ProjectFileNamespaceManager();
            var paths = ProjectFilePaths(fsPath).ToArray();

            Assert.NotEmpty(paths);
            foreach (var path in paths)
            {
                _output.WriteLine($"Testing {path}");
                var node = XDocument.Load(path).XPathSelectElement(xPath, ns);
                Assert.NotNull(node);
                _output.WriteLine($"Passed: {path}");
            }
        }
    }
}
