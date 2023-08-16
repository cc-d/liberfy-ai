/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { DataCreateChat } from '../models/DataCreateChat';
import type { DataCreateComp } from '../models/DataCreateComp';
import type { DataJustToken } from '../models/DataJustToken';
import type { DataMsgAdd } from '../models/DataMsgAdd';
import type { DataOAuth } from '../models/DataOAuth';
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
     * Register User
     * @param requestBody
     * @returns DBUserWithToken Successful Response
     * @throws ApiError
     */
    public static registerUserApiUserRegisterPost(
        requestBody: DataOAuth,
    ): CancelablePromise<DBUserWithToken> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/user/register',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Login Jwt Token
     * @param requestBody
     * @returns DBUserWithToken Successful Response
     * @throws ApiError
     */
    public static loginJwtTokenApiUserLoginPost(
        requestBody: DataOAuth,
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
     * Jwt Autologin
     * @param requestBody
     * @returns DBUser Successful Response
     * @throws ApiError
     */
    public static jwtAutologinApiUserFromTokenPost(
        requestBody: DataJustToken,
    ): CancelablePromise<DBUser> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/user_from_token',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
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
     * Delete Chat
     * @param chatId
     * @returns any Successful Response
     * @throws ApiError
     */
    public static deleteChatApiChatChatIdDeleteDelete(
        chatId: number,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/chat/{chat_id}/delete',
            path: {
                'chat_id': chatId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Get Chat
     * @param userId
     * @returns DBChat Successful Response
     * @throws ApiError
     */
    public static getChatApiUserUserIdChatsGet(
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
     * Delete Completion
     * @param completionId
     * @returns any Successful Response
     * @throws ApiError
     */
    public static deleteCompletionApiCompletionCompletionIdDeleteDelete(
        completionId: number,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/completion/{completion_id}/delete',
            path: {
                'completion_id': completionId,
            },
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
    public static addMessageApiCompletionCompletionIdMessagesAddPost(
        completionId: number,
        requestBody: DataMsgAdd,
    ): CancelablePromise<DBMsg> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/completion/{completion_id}/messages/add',
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

    /**
     * Submit Comp
     * submits a completion to chatgpt and saves response
     * @param completionId
     * @returns DBComp Successful Response
     * @throws ApiError
     */
    public static submitCompApiCompletionCompletionIdSubmitPost(
        completionId: number,
    ): CancelablePromise<DBComp> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/completion/{completion_id}/submit',
            path: {
                'completion_id': completionId,
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

}
