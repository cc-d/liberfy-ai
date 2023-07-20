import type { AccessToken } from '../models/AccessToken';
import type { BaseUser } from '../models/BaseUser';
import type { Body_token_login_api_token_login_post } from '../models/Body_token_login_api_token_login_post';
import type { EmailPassData } from '../models/EmailPassData';
import type { CancelablePromise } from '../core/CancelablePromise';
export declare class DefaultService {
    /**
     * Hello
     * @returns any Successful Response
     * @throws ApiError
     */
    static helloApiGet(): CancelablePromise<any>;
    /**
     * Token Login
     * @param formData
     * @returns AccessToken Successful Response
     * @throws ApiError
     */
    static tokenLoginApiTokenLoginPost(formData: Body_token_login_api_token_login_post): CancelablePromise<AccessToken>;
    /**
     * Users Me
     * @returns BaseUser Successful Response
     * @throws ApiError
     */
    static usersMeApiUsersMeGet(): CancelablePromise<BaseUser>;
    /**
     * Register
     * @param requestBody
     * @returns BaseUser Successful Response
     * @throws ApiError
     */
    static registerApiRegisterPost(requestBody: EmailPassData): CancelablePromise<BaseUser>;
    /**
     * Get Openapi Schema
     * @returns any Successful Response
     * @throws ApiError
     */
    static getOpenapiSchemaApiOpenapiJsonGet(): CancelablePromise<any>;
}
