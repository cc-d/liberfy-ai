/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BaseToken } from '../models/BaseToken';
import type { DataCreateChat } from '../models/DataCreateChat';
import type { DataCreateComp } from '../models/DataCreateComp';
import type { DataEmailPass } from '../models/DataEmailPass';
import type { DataMsgAdd } from '../models/DataMsgAdd';
import type { DBChat } from '../models/DBChat';
import type { DBComp } from '../models/DBComp';
import type { DBMsg } from '../models/DBMsg';
import type { DBUser } from '../models/DBUser';
import type { DBUserWithToken } from '../models/DBUserWithToken';

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
     * @returns DBUserWithToken Successful Response
     * @throws ApiError
     */
    public static loginUserApiUserLoginPost(
        requestBody: DataEmailPass,
    ): CancelablePromise<DBUserWithToken> {
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
     * @returns DBUser Successful Response
     * @throws ApiError
     */
    public static userFromTokenApiUserUserFromTokenPost(
        requestBody: BaseToken,
    ): CancelablePromise<DBUser> {
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
     * @returns DBChat Successful Response
     * @throws ApiError
     */
    public static getChatsApiUserUserIdChatsGet(
        userId: number,
    ): CancelablePromise<Array<DBChat>> {
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
     * @param requestBody
     * @returns DBChat Successful Response
     * @throws ApiError
     */
    public static newChatApiChatNewPost(
        requestBody: DataCreateChat,
    ): CancelablePromise<DBChat> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/chat/new',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Get Chat
     * @param chatId
     * @returns DBChat Successful Response
     * @throws ApiError
     */
    public static getChatApiChatChatIdGet(
        chatId: number,
    ): CancelablePromise<DBChat> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/chat/{chat_id}',
            path: {
                'chat_id': chatId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Create Completion
     * @param requestBody
     * @returns DBComp Successful Response
     * @throws ApiError
     */
    public static createCompletionApiCompletionNewPost(
        requestBody: DataCreateComp,
    ): CancelablePromise<DBComp> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/completion/new',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Get Completion
     * @param completionId
     * @returns DBComp Successful Response
     * @throws ApiError
     */
    public static getCompletionApiCompletionCompletionIdGet(
        completionId: number,
    ): CancelablePromise<DBComp> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/completion/{completion_id}',
            path: {
                'completion_id': completionId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Add Message
     * @param completionId
     * @param requestBody
     * @returns DBMsg Successful Response
     * @throws ApiError
     */
    public static addMessageApiCompletionCompletionIdMessageAddPost(
        completionId: number,
        requestBody: DataMsgAdd,
    ): CancelablePromise<DBMsg> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/completion/{completion_id}/message/add',
            path: {
                'completion_id': completionId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

}
