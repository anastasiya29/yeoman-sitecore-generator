export interface ISitecoreService {

    getSitecoreData(controller: string, action: string, params?: string)
        : Promise<any>;

    postSitecoreData(controller: string, action: string, data: any)
        : Promise<any>;
}
