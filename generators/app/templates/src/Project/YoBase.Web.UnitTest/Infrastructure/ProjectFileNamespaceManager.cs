using System.Xml;

namespace <%= solutionNamespace %>.Web.UnitTest.Infrastructure
{
    /// <summary>A namespace manager for project files.</summary>
    internal sealed class ProjectFileNamespaceManager : XmlNamespaceManager
    {
        /// <summary>
        ///   Initializes a new instance of the
        ///   <see cref="ProjectFileNamespaceManager" /> class.
        /// </summary>
        public ProjectFileNamespaceManager()
            : base(new NameTable())
        {
            AddNamespace(
                "p",
                "http://schemas.microsoft.com/developer/msbuild/2003");
        }
    }
}
