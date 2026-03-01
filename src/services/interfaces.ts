import {MethodType} from "@/services/consts.ts";

/**
 * @interface IEndpoint
 * @description Конфигурация конечной точки API.
 * 
 * @property {string} [address] - Адрес сервера. По умолчанию используется BASE_URL.
 * @property {string} entity - Имя сущности/ресурса.
 * @property {string} [protocol] - Протокол (http/https). По умолчанию используется BASE_PROTOCOL.
 * @property {number} [timeout] - Таймаут запроса в миллисекундах. По умолчанию используется BASE_TIMEOUT.
 */
interface IEndpoint {
    address?: string;
    entity: string;
    protocol?: string;
    timeout?: number;
}

/**
 * @interface IRequestParams
 * @description Объект параметров запроса, позволяющий передавать произвольные данные.
 * Используется для фильтрации, пагинации, сортировки и других параметров.
 * 
 * @example
 * const params: IRequestParams = {
 *   search: "query",
 *   active: true,
 *   limit: 10
 * };
 */
interface IRequestParams {[key: string]: unknown}

/**
 * @interface IRequestConfig
 * @description Конфигурация HTTP-запроса.
 * 
 * @property {string} [path] - Путь запроса.
 * @property {MethodType} method - HTTP-метод.
 * @property {IRequestParams} [params] - Параметры запроса.
 */
interface IRequestConfig {
    path?: string;
    method: MethodType;
    params?: IRequestParams;
}

/**
 * @interface IFilter
 * @description Параметры фильтрации для запросов.
 * Позволяет фильтровать данные по различным полям.
 * 
 * @example
 * const filter: IFilter = {
 *   status: "active",
 *   verified: true,
 *   age: 25
 * };
 */
interface IFilter {
    [key: string]: string | boolean | number | Date;
}

/**
 * @interface INavigation
 * @description Параметры пагинации для навигации по страницам.
 * 
 * @property {number} page - Номер текущей страницы (начиная с 1).
 * @property {number} pageSize - Количество элементов на странице.
 * 
 * @example
 * const navigation: INavigation = {
 *   page: 1,
 *   pageSize: 10
 * };
 */
interface INavigation {
    page: number;
    pageSize: number;
}

/**
 * @interface ISorting
 * @description Параметры сортировки для запросов.
 * Позволяет указать направление сортировки для различных полей.
 * 
 * @example
 * const sorting: ISorting = {
 *   name: 'asc',
 *   createdAt: 'desc'
 * };
 */
interface ISorting {
    [sortKey:string] : 'asc' | 'desc';
}

export type { IEndpoint, IRequestConfig, IFilter, INavigation, ISorting, IRequestParams };
