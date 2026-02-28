enum MethodType {
    GET = "GET",
    POST = "POST",
    PUT = "PUT",
    PATCH = "PARCH",
    DELETE = "DELETE"
}

const BASE_URL: string = "http://localhost:8000";
const BASE_PROTOCOL: string = "https";
const BASE_TIMEOUT: number = 15_000;
const TOKEN_KEY_NAME: string="edu_pilot_sid";

export { MethodType, BASE_URL, BASE_PROTOCOL, BASE_TIMEOUT, TOKEN_KEY_NAME }
