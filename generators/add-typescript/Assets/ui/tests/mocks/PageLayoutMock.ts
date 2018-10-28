import { ComponentFactory } from "../../src/foundation/services/ComponentFactory";
import { GlobalContext } from "../../src/foundation/services/GlobalContext";
import { SitecoreService } from "../../src/foundation/services/SitecoreService";

export class PageLayoutMock {
    public context: GlobalContext;

    constructor(sitecoreUrl: string) {
        this.context = new GlobalContext(new SitecoreService(sitecoreUrl));
    }

    public afterPageLoad() {
        ComponentFactory.init(this.context);
    }
}
