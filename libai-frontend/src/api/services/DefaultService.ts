/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BaseChat } from '../models/BaseChat';
import type { BaseTokenData } from '../models/BaseTokenData';
import type { BaseUser } from '../models/BaseUser';
import type { BaseUserToken } from '../models/BaseUserToken';
import type { EmailPassData } from '../models/EmailPassData';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class DefaultService {

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
     * Login User
     * @param requestBody
     * @returns BaseUserToken Successful Response
     * @throws ApiError
     */
    public static loginUserApiUserLoginPost(
        requestBody: EmailPassData,
    ): CancelablePromise<BaseUserToken> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/user/login',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * User From Token
     * @param requestBody
     * @returns BaseUser Successful Response
     * @throws ApiError
     */
    public static userFromTokenApiUserUserFromTokenPost(
        requestBody: BaseTokenData,
    ): CancelablePromise<BaseUser> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/user/user_from_token',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Get Chats
     * @param userId
     * @returns BaseChat Successful Response
     * @throws ApiError
     */
    public static getChatsApiUserUserIdChatsGet(
        userId: number,
    ): CancelablePromise<Array<BaseChat>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/user/{user_id}/chats',
            path: {
                'user_id': userId,
            },
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
    public static getOpenapiSchemaApiOpenapiJsonGet(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/openapi.json',
        });
    }

    /**
     * New Chat
     * @param name
     * @param userId
     * @returns BaseChat Successful Response
     * @throws ApiError
     */
    public static newChatApiChatNewGet(
        name: string,
        userId: number,
    ): CancelablePromise<BaseChat> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/chat/new',
            query: {
                'name': name,
                'user_id': userId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

}
