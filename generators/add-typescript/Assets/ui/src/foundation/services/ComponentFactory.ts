import { IContext } from "../interfaces/IContext";

export interface IComponentDeclaration {
    component: any;
    element: HTMLElement;
}

// Factory for auto-loading components. If the component class name is "MyComponent",
// place HTML into the page with attribute data-component="MyComponent" and this will auto
// load the component.
export class ComponentFactory {
     // The components that have been loaded by ComponentFactory
    public static loadedComponents: IComponentDeclaration[] = [];

    private static componentClasses = {};
    private static context: IContext;

    // Registers a components class for auto-loading. A component can exist one or many
    // times on a page.
    public static registerComponent(componentName: string, componentClass: Function) {
        if (!componentName.length) {
            throw new Error("ComponentFactory.registerComponent: componentName cannot be empty");
        }

        if (ComponentFactory.componentClasses.hasOwnProperty(componentName)) {
            throw new Error(`ComponentFactory.registerComponent: componentName ${componentName} is already defined`);
        }

        ComponentFactory.componentClasses[componentName] = componentClass;
    }

    // Sets the context that all components will use and loads all components on the page.
    public static init(context: IContext) {
        ComponentFactory.context = context;
        ComponentFactory.loadComponents();
    }

    // Loads components that have been registered with ComponentFactory.registerComponent
    // within the specified scope. If the scope is undefined, then loads components
    // for the entire page. This function can be used when additional components have
    // been added to the DOM after initial load.
    public static loadComponents(scope?: HTMLElement) {
        const elements = scope === undefined
            ? document.querySelectorAll("[data-component]")
            : scope.querySelectorAll("[data-component]");

        const elementArray = Array.prototype.slice.call(elements);
        elementArray.forEach((element: HTMLElement) => {
            const name = element.getAttribute("data-component");
            if (ComponentFactory.componentClasses.hasOwnProperty(name)) {
                // tslint:disable-next-line:no-unused-expression
                const component = new (ComponentFactory.componentClasses[name])(
                    element,
                    ComponentFactory.context);

                this.loadedComponents.push({ component, element });
            }
        });
    }
}
