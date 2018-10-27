using System.Web.Mvc;

namespace <%= solutionNamespace %>.Feature.Common.<%= solutionNamespace %>Common
{
	/// <summary>The <%= areaName %> area registration.</summary>
	public class <%= areaName %>AreaRegistration : AreaRegistration
	{
		/// <summary>Gets the area's name.</summary>
		public override string AreaName => "<%= areaName %>";

		/// <summary>Register this area.</summary>
		/// <param name="context">The area registration context.</param>
		public override void RegisterArea(AreaRegistrationContext context)
		{
			context?.MapRoute(
				"<%= areaName %>_default",
				"<%= areaName %>/{controller}/{action}/{id}",
				new { action = "Index", id = UrlParameter.Optional });
		}
	}
}