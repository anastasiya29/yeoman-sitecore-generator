import { IContext } from "../interfaces/IContext";
import { ISitecoreService } from "../interfaces/ISitecoreService";

export class GlobalContext implements IContext {
    public readonly sitecoreService: ISitecoreService;

    constructor(
        apiProxyService: ISitecoreService
    ) {
        this.sitecoreService = apiProxyService;
    }
}
