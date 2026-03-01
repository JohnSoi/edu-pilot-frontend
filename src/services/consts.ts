/**
 * @enum {string} MethodType
 * @description Перечисление HTTP-методов, поддерживаемых сервисом.
 * 
 * @property {string} GET - Получение данных
 * @property {string} POST - Создание данных
 * @property {string} PUT - Полное обновление данных
 * @property {string} PATCH - Частичное обновление данных
 * @property {string} DELETE - Удаление данных
 */
enum MethodType {
    GET = "GET",
    POST = "POST",
    PUT = "PUT",
    PATCH = "PARCH",
    DELETE = "DELETE"
}

/**
 * @constant {string} BASE_URL
 * @description Базовый URL-адрес сервера API по умолчанию.
 * @default "http://localhost:8000"
 */
const BASE_URL: string = "http://localhost:8000";
/**
 * @constant {string} BASE_PROTOCOL
 * @description Протокол по умолчанию для запросов к API.
 * @default "https"
 */
const BASE_PROTOCOL: string = "https";
/**
 * @constant {number} BASE_TIMEOUT
 * @description Таймаут запроса по умолчанию в миллисехундах.
 * @default 15000
 */
const BASE_TIMEOUT: number = 15_000;
/**
 * @constant {string} TOKEN_KEY_NAME
 * @description Ключ для хранения токена аутентификации в localStorage.
 * @default "edu_pilot_sid"
 */
const TOKEN_KEY_NAME: string="edu_pilot_sid";

export { MethodType, BASE_URL, BASE_PROTOCOL, BASE_TIMEOUT, TOKEN_KEY_NAME }
