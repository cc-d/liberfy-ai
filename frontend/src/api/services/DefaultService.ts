/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AccessToken } from '../models/AccessToken';
import type { BaseUser } from '../models/BaseUser';
import type { Body_token_login_api_token_login_post } from '../models/Body_token_login_api_token_login_post';
import type { EmailPassData } from '../models/EmailPassData';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class DefaultService {

    /**
     * Get Openapi Schema
     * @returns any Successful Response
     * @throws ApiError
     */
    public static getOpenapiSchemaOpenapiJsonGet(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/openapi.json',
        });
    }

    /**
     * Hello
     * @returns any Successful Response
     * @throws ApiError
     */
    public static helloApiGet(): CancelablePromise<any> {
        return __request(OpenAPI, {
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
    public static tokenLoginApiTokenLoginPost(
        formData: Body_token_login_api_token_login_post,
    ): CancelablePromise<AccessToken> {
        return __request(OpenAPI, {
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
    public static usersMeApiUsersMeGet(): CancelablePromise<BaseUser> {
        return __request(OpenAPI, {
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
    public static registerApiRegisterPost(
        requestBody: EmailPassData,
    ): CancelablePromise<BaseUser> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/register',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

}
