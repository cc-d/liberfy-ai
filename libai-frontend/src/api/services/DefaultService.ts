/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BaseChat } from '../models/BaseChat';
import type { BaseCompletion } from '../models/BaseCompletion';
import type { BaseMessage } from '../models/BaseMessage';
import type { OldBaseUser } from '../models/OldBaseUser';
import type { OldBaseUserToken } from '../models/OldBaseUserToken';
import type { DataCreateChat } from '../models/DataCreateChat';
import type { DataCreateComp } from '../models/DataCreateComp';
import type { DataMsgAdd } from '../models/DataMsgAdd';
import type { DataUserFromToken } from '../models/DataUserFromToken';
import type { DataEmailPass } from '../models/DataEmailPass';

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
     * @returns OldBaseUserToken Successful Response
     * @throws ApiError
     */
    public static loginUserApiUserLoginPost(
        requestBody: DataEmailPass,
    ): CancelablePromise<OldBaseUserToken> {
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
     * @returns OldBaseUser Successful Response
     * @throws ApiError
     */
    public static userFromTokenApiUserUserFromTokenPost(
        requestBody: DataUserFromToken,
    ): CancelablePromise<OldBaseUser> {
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
     * @param requestBody
     * @returns BaseChat Successful Response
     * @throws ApiError
     */
    public static newChatApiChatNewPost(
        requestBody: DataCreateChat,
    ): CancelablePromise<BaseChat> {
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
     * @returns BaseChat Successful Response
     * @throws ApiError
     */
    public static getChatApiChatChatIdGet(
        chatId: number,
    ): CancelablePromise<BaseChat> {
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
     * @returns BaseCompletion Successful Response
     * @throws ApiError
     */
    public static createCompletionApiCompletionNewPost(
        requestBody: DataCreateComp,
    ): CancelablePromise<BaseCompletion> {
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
     * @returns BaseCompletion Successful Response
     * @throws ApiError
     */
    public static getCompletionApiCompletionCompletionIdGet(
        completionId: number,
    ): CancelablePromise<BaseCompletion> {
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
     * @returns BaseMessage Successful Response
     * @throws ApiError
     */
    public static addMessageApiCompletionCompletionIdMessageAddPost(
        completionId: number,
        requestBody: DataMsgAdd,
    ): CancelablePromise<BaseMessage> {
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
