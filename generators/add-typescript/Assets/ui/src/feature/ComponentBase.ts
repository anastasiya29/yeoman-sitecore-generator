import { IContext } from "../foundation/interfaces/IContext";

export class ComponentBase {
    protected readonly context: IContext;

    constructor(context?: IContext) {
        this.context = context;
    }
}
