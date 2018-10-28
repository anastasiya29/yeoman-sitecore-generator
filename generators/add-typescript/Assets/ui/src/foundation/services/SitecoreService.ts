import { ISitecoreService } from "../interfaces/ISitecoreService";
import { HttpUtil } from "../util/HttpUtil";

export class SitecoreService implements ISitecoreService {
    private readonly sitecoreUrl: string;
    private readonly isHeadless: boolean;

    constructor(sitecoreUrl: string) {
        this.sitecoreUrl = sitecoreUrl;
        this.isHeadless = sitecoreUrl.endsWith(".json");
    }

    public getSitecoreData(
        controller: string,
        action: string,
        params?: string
    ): Promise<any> {
        const url = this.generateRoute(controller, action);

        return params && params.length
            ? HttpUtil.getData(`${url}?${encodeURIComponent(params)}`)
            : HttpUtil.getData(url);
    }

    public postSitecoreData(
        controller: string,
        action: string,
        data: any
    ): Promise<any> {
        const url = this.generateRoute(controller, action);
        return HttpUtil.postData(url, data);
    }

    private generateRoute(controller: string, action: string): string {
        return this.isHeadless
            ? this.sitecoreUrl
            : `${this.sitecoreUrl}/${controller}/${action}`;
    }
}
