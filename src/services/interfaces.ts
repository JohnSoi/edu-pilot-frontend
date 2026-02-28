import {MethodType} from "@/services/consts.ts";

interface IEndpoint {
    address?: string;
    entity: string;
    protocol?: string;
    timeout?: number;
}

interface IRequestParams {[key: string]: unknown};

interface IRequestConfig {
    path?: string;
    method: MethodType;
    params?: IRequestParams;
}

interface IFilter {
    [key: string]: string | boolean | number | Date;
}

interface INavigation {
    page: number;
    pageSize: number;
}

interface ISorting {
    [sortKey:string] : 'asc' | 'desc';
}

export type { IEndpoint, IRequestConfig, IFilter, INavigation, ISorting, IRequestParams };
