using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Diagnostics.CodeAnalysis;
using System.Linq;
using System.Reflection;
using System.Runtime.CompilerServices;
using System.Web.Http;
using System.Web.Mvc;

namespace <%= solutionNamespace %>.Foundation.Kernel.Extensions
{
    public static class ServiceCollectionExtensions
    {
        /// <summary>Adds MVC controllers found in the current assembly.</summary>
        /// <param name="serviceCollection">The service collection.</param>
        /// <returns>The configured service collection.</returns>
        [SuppressMessage(
            "Microsoft.Naming",
            "CA1702:CompoundWordsShouldBeCasedCorrectly",
            Justification = "This is not a compound word.",
            MessageId = "InCurrent")]
        [MethodImpl(MethodImplOptions.NoInlining)]
        public static IServiceCollection AddMvcControllersInCurrentAssembly(
            this IServiceCollection serviceCollection) =>
            AddMvcControllers(serviceCollection, Assembly.GetCallingAssembly());

        /// <summary>
        ///   Adds MVC controllers found in the provided assemblies.
        /// </summary>
        /// <param name="serviceCollection">The service collection.</param>
        /// <param name="assemblies">The list of assemblies.</param>
        /// <returns>The configured service collection.</returns>
        private static IServiceCollection AddMvcControllers(
            this IServiceCollection serviceCollection,
            params Assembly[] assemblies)
        {
            var controllers = GetTypesImplementing<IController>(assemblies)
                .Union(GetTypesImplementing<ApiController>(assemblies))
                .Where(controller =>
                    controller.Name.EndsWith("Controller", StringComparison.Ordinal));

            foreach (var controller in controllers)
            {
                serviceCollection.AddTransient(controller);
            }

            return serviceCollection;
        }

        /// <summary>
        ///   Scans the provided assemblies and gets a list of types that
        ///   implement the requested interface or class.
        /// </summary>
        /// <typeparam name="T">The interface to look for.</typeparam>
        /// <param name="assemblies">The list of assemblies to scan.</param>
        /// <returns>A list of candidate types.</returns>
        private static IEnumerable<Type> GetTypesImplementing<T>(
            params Assembly[] assemblies)
        {
            if (assemblies == null || assemblies.Length == 0)
            {
                return Enumerable.Empty<Type>();
            }

            var targetType = typeof(T);

            return
                from assembly in assemblies
                where assembly.IsDynamic == false
                from type in GetExportedTypes(assembly)
                where type.IsAbstract == false
                where type.IsGenericTypeDefinition == false
                where targetType.IsAssignableFrom(type)
                select type;
        }

        /// <summary>Scan an assembly for its exported types.</summary>
        /// <param name="assembly">The assembly to scan.</param>
        /// <returns>The list of exported types.</returns>
        private static IEnumerable<Type> GetExportedTypes(Assembly assembly)
        {
            try
            {
                return assembly.GetExportedTypes();
            }
            catch (NotSupportedException)
            {
                // A type load exception would typically happen on an Anonymously
                // Hosted DynamicMethods Assembly and it would be safe to skip
                // this exception.
                return Type.EmptyTypes;
            }
            catch (ReflectionTypeLoadException ex)
            {
                // Return the types that could be loaded. Types can contain
                // null values.
                return ex.Types.Where(type => type != null);
            }
            catch (Exception ex)
            {
                // Throw a more descriptive message containing the name of
                // the assembly.
                var msg =
                    $"Unable to load types from assembly {assembly.FullName}.\n" +
                    ex.Message;

                throw new InvalidOperationException(msg);
            }
        }
    }
}