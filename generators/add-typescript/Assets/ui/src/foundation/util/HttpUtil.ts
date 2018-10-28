export class HttpUtil {

    public static postData(url: string, data?: object) {
        return fetch(url, {
            method: "POST",
            cache: "no-cache",
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            },
            redirect: "follow",
            referrer: window.location.hostname,
            body: JSON.stringify(data)
        })
            .then((response: Response) => this.handleResponse(response))
            .catch(error => this.handleError(error));
    }

    public static getData(url: string) {
        return fetch(url, {
            method: "GET",
            cache: "no-cache",
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            },
            redirect: "follow",
            referrer: window.location.hostname,
        })
            .then((response: Response) => this.handleResponse(response))
            .catch(error => this.handleError(error));
    }

    private static handleResponse(response: Response) {
        if (response.ok) {
            return response.json();
        }

        return HttpUtil.handleError(response.statusText);
    }

    private static handleError(error: string) {
        console.error(error);
    }
}
