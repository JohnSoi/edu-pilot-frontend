import {IEndpoint, IFilter, INavigation, IRequestConfig, ISorting, IRequestParams} from "@/services/interfaces.ts";
import {BASE_PROTOCOL, BASE_TIMEOUT, BASE_URL, MethodType, TOKEN_KEY_NAME} from "@/services/consts.ts";
import axios, {type AxiosInstance} from "axios";

class ApiService {
    protected readonly _client: AxiosInstance;

    constructor(endpoint: IEndpoint) {
        this._client = axios.create({
            baseURL: this._getAddress(endpoint),
            timeout: endpoint.timeout || BASE_TIMEOUT,
            headers: {
                'Content-Type': 'application/json'
            }
        });

        this._setupInterceptors();
    };

    async get<TResponse>(uuid: string): Promise<TResponse> {
        return await this._sendRequest<TResponse>({
            method: MethodType.GET,
            path: uuid
        });
    };

    async list<TResponse>(filter?: IFilter, navigation?: INavigation, sorting?: ISorting): Promise<TResponse> {
        return await this._sendRequest({
            method: MethodType.GET,
            params: {filter, navigation, sorting}
        });
    };

    async create<TDataIn>(data: TDataIn): Promise<string> {
        return await this._sendRequest({
            method: MethodType.PUT,
            params: data as IRequestParams
        });
    };

    async update<TDataIn, TDataOut>(uuid: string, data: TDataIn): Promise<TDataOut> {
        return await this._sendRequest({
            method: MethodType.PATCH,
            path: uuid,
            params: data as IRequestParams
        });
    };

    async delete(uuid: string): Promise<boolean> {
        return await this._sendRequest({
            method: MethodType.DELETE,
            path: uuid
        });
    };

    async call<TDataIn, TResponse>(method: MethodType, path?: string, data?: TDataIn): Promise<TResponse> {
        return await this._sendRequest({
            method,
            path,
            params: data as IRequestParams
        });
    };

    protected _getAddress(endpoint: IEndpoint): string {
        const url: string = endpoint.address || BASE_URL;
        const protocol: string = endpoint.protocol || BASE_PROTOCOL;

        return `${protocol}://${url}/${endpoint}/`;
    };

    protected _setupInterceptors(): void {
        this._client.interceptors.request.use((config) => {
            const token: string | null = localStorage.getItem(TOKEN_KEY_NAME);

            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }

            return config;
        }, (error) => Promise.reject(error));
    };

    protected async _sendRequest<TResponse>(config: IRequestConfig): Promise<TResponse> {
        const response = await this._client.request<TResponse>({
            url: config.path || "",
            method: config.method
        });

        if (response.status === 200 && response.data) {
            return response.data;
        }

        return {} as TResponse;
    };
}

export {ApiService};
