import {IEndpoint, IFilter, INavigation, IRequestConfig, ISorting, IRequestParams} from "@/services/interfaces.ts";
import {BASE_PROTOCOL, BASE_TIMEOUT, BASE_URL, MethodType, TOKEN_KEY_NAME} from "@/services/consts.ts";
import axios, {type AxiosInstance} from "axios";

/**
 * @class ApiService
 * @description Базовый класс для реализации сервисов API. Предоставляет методы для выполнения
 * стандартных HTTP-операций: GET, POST, PUT, PATCH, DELETE.
 * Автоматически добавляет токен авторизации из localStorage к запросам.
 * 
 * @example
 * const userService = new ApiService({ entity: 'users' });
 * const user = await userService.get<User>("123");
 */
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

    /**
     * Получает объект по его UUID.
     * 
     * @template TResponse - Тип ожидаемого ответа
     * @param {string} uuid - Уникальный идентификатор объекта
     * @returns {Promise<TResponse>} Промис с данными объекта
     * 
     * @example
     * const user = await userService.get<User>("123");
     * console.log(user);
     */
    async get<TResponse>(uuid: string): Promise<TResponse> {
        return await this._sendRequest<TResponse>({
            method: MethodType.GET,
            path: uuid
        });
    };

    /**
     * Получает список объектов с поддержкой фильтрации, пагинации и сортировки.
     * 
     * @template TResponse - Тип ожидаемого ответа
     * @param {IFilter} [filter] - Параметры фильтрации
     * @param {INavigation} [navigation] - Параметры пагинации
     * @param {ISorting} [sorting] - Параметры сортировки
     * @returns {Promise<TResponse>} Промис со списком объектов
     * 
     * @example
     * const users = await userService.list<User[]>(
     *   { active: true },
     *   { page: 1, pageSize: 10 },
     *   { name: 'asc' }
     * );
     */
    async list<TResponse>(filter?: IFilter, navigation?: INavigation, sorting?: ISorting): Promise<TResponse> {
        return await this._sendRequest({
            method: MethodType.GET,
            params: {filter, navigation, sorting}
        });
    };

    /**
     * Создает новый объект.
     * 
     * @template TDataIn - Тип данных для создания
     * @param {TDataIn} data - Данные для создания объекта
     * @returns {Promise<string>} Промис с UUID созданного объекта
     * 
     * @example
     * const uuid = await userService.create<UserCreate>({ name: "John", email: "john@example.com" });
     * console.log("Created user with UUID:", uuid);
     */
    async create<TDataIn>(data: TDataIn): Promise<string> {
        return await this._sendRequest({
            method: MethodType.PUT,
            params: data as IRequestParams
        });
    };

    /**
     * Обновляет существующий объект по его UUID.
     * 
     * @template TDataIn - Тип данных для обновления
     * @template TDataOut - Тип ожидаемого ответа
     * @param {string} uuid - Уникальный идентификатор объекта
     * @param {TDataIn} data - Данные для обновления
     * @returns {Promise<TDataOut>} Промис с обновленными данными объекта
     * 
     * @example
     * const updatedUser = await userService.update<UserUpdate, User>(
     *   "123", 
     *   { name: "John Doe" }
     * );
     * console.log("Updated user:", updatedUser);
     */
    async update<TDataIn, TDataOut>(uuid: string, data: TDataIn): Promise<TDataOut> {
        return await this._sendRequest({
            method: MethodType.PATCH,
            path: uuid,
            params: data as IRequestParams
        });
    };

    /**
     * Удаляет объект по его UUID.
     * 
     * @param {string} uuid - Уникальный идентификатор объекта
     * @returns {Promise<boolean>} Промис с результатом операции
     * 
     * @example
     * const success = await userService.delete("123");
     * if (success) {
     *   console.log("User deleted successfully");
     * }
     */
    async delete(uuid: string): Promise<boolean> {
        return await this._sendRequest({
            method: MethodType.DELETE,
            path: uuid
        });
    };

    /**
     * Выполняет произвольный запрос к API.
     * 
     * @template TDataIn - Тип данных для запроса
     * @template TResponse - Тип ожидаемого ответа
     * @param {MethodType} method - HTTP-метод
     * @param {string} [path] - Путь запроса
     * @param {TDataIn} [data] - Данные для запроса
     * @returns {Promise<TResponse>} Промис с ответом
     * 
     * @example
     * const response = await userService.call<string, User>(
     *   MethodType.POST,
     *   "custom-action",
     *   "some-data"
     * );
     */
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
