export interface IComponentOption<T> {
    required?: boolean;
    defaultValue?: T;
}

export interface IComponentOptionLoader<T> {
    (element: HTMLElement, name: string): T;
}

export class ComponentOptions {

    public static buildStringOption(descriptor?: IComponentOption<string>): IComponentOptionLoader<string> {
        return function (element: HTMLElement, name: string) {
            return ComponentOptions.loadStringOption(element, name, descriptor);
        };
    }

    public static buildIntegerOption(descriptor?: IComponentOption<number>): IComponentOptionLoader<number> {
        return function (element: HTMLElement, name: string) {
            return ComponentOptions.loadIntegerOption(element, name, descriptor);
        };
    }

    public static buildNumberOption(descriptor?: IComponentOption<number>): IComponentOptionLoader<number> {
        return function (element: HTMLElement, name: string) {
            return ComponentOptions.loadNumberOption(element, name, descriptor);
        };
    }

    public static buildBooleanOption(descriptor?: IComponentOption<boolean>): IComponentOptionLoader<boolean> {
        return function (element: HTMLElement, name: string) {
            return ComponentOptions.loadBooleanOption(element, name, descriptor);
        };
    }

    public static loadIntegerOption(element: HTMLElement, name: string, descriptor?: IComponentOption<number>): number {
        const attrName = "data-" + ComponentOptions.camelToSnakeCase(name),
            valueAsStr = element.getAttribute(attrName);

        let valueAsInt: number = undefined;

        if (valueAsStr !== undefined) {
            valueAsInt = parseInt(valueAsStr, 10);
        }

        if (descriptor === undefined) {
            return valueAsInt;
        }

        if (valueAsInt === undefined || isNaN(valueAsInt)) {
            valueAsInt = descriptor.defaultValue;
        }

        if (valueAsInt === undefined && descriptor.required === true) {
            throw new Error(`Missing required integer value for ${name}`);
        }

        return valueAsInt;
    }

    public static loadNumberOption(element: HTMLElement, name: string, descriptor?: IComponentOption<number>): number {
        const attrName = "data-" + ComponentOptions.camelToSnakeCase(name),
            valueAsStr = element.getAttribute(attrName);

        let valueAsNum: number = undefined;

        if (valueAsStr !== undefined) {
            valueAsNum = parseFloat(valueAsStr);
        }

        if (descriptor === undefined) {
            return valueAsNum;
        }

        if (valueAsNum === undefined || isNaN(valueAsNum)) {
            valueAsNum = descriptor.defaultValue;
        }

        if (valueAsNum === undefined && descriptor.required === true) {
            throw new Error(`Missing required number value for ${name}`);
        }

        return valueAsNum;
    }

    public static loadStringOption(element: HTMLElement, name: string, descriptor?: IComponentOption<string>): string {
        const attrName = "data-" + ComponentOptions.camelToSnakeCase(name);
        let value = element.getAttribute(attrName);
        if (value !== undefined) {
            value = String(value);
        }

        if (descriptor === undefined) {
            return value;
        }

        if (value === undefined) {
            value = descriptor.defaultValue;
        }

        if (value === undefined && descriptor.required === true) {
            throw new Error(`Missing required string value for ${name}`);
        }

        return value;
    }

    public static loadBooleanOption(element: HTMLElement, name: string, descriptor?: IComponentOption<boolean>): boolean {
        const attrName = "data-" + ComponentOptions.camelToSnakeCase(name);
        let value = element.getAttribute(attrName), result = undefined;
        if (value) {
            value = value.trim().toLowerCase();
            result = value === "true" ? true : value === "false" ? false : undefined;
        }

        if (descriptor === undefined) {
            return result;
        }

        if (result === undefined) {
            result = descriptor.defaultValue;
        }

        if (result === undefined && descriptor.required === true) {
            throw new Error(`Missing required string value for ${name}`);
        }

        return result;
    }

    public static initComponentOptions<T>(
        element: HTMLElement,
        options: {
            [name: string]: IComponentOptionLoader<any>;
        }
    ): T {
        if (!element || !options) {
            throw new Error("ComponentOptions.initComponentOptions: invalid args");
        }

        const result = {};
        Object.keys(options).forEach((key) => {
            const loader = options[key];
            result[key] = loader(element, key);
        });

        return <T>result;
    }

    public static camelToSnakeCase(input: string): string {
        if (input === undefined || input === null) {
            throw new Error("'input' must be a valid string");
        }

        return input.replace(/([A-Z])/g, function ($1) {
            return "-" + $1.toLowerCase();
        });
    }
}
