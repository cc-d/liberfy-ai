"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultService = void 0;
const OpenAPI_1 = require("../core/OpenAPI");
const request_1 = require("../core/request");
class DefaultService {
    /**
     * Hello
     * @returns any Successful Response
     * @throws ApiError
     */
    static helloApiGet() {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
            method: 'GET',
            url: '/api/',
        });
    }
    /**
     * Token Login
     * @param formData
     * @returns AccessToken Successful Response
     * @throws ApiError
     */
    static tokenLoginApiTokenLoginPost(formData) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
            method: 'POST',
            url: '/api/token_login',
            formData: formData,
            mediaType: 'application/x-www-form-urlencoded',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Users Me
     * @returns BaseUser Successful Response
     * @throws ApiError
     */
    static usersMeApiUsersMeGet() {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
            method: 'GET',
            url: '/api/users/me',
        });
    }
    /**
     * Register
     * @param requestBody
     * @returns BaseUser Successful Response
     * @throws ApiError
     */
    static registerApiRegisterPost(requestBody) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
            method: 'POST',
            url: '/api/register',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Get Openapi Schema
     * @returns any Successful Response
     * @throws ApiError
     */
    static getOpenapiSchemaApiOpenapiJsonGet() {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
            method: 'GET',
            url: '/api/openapi.json',
        });
    }
}
exports.DefaultService = DefaultService;
