/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { BaseChat } from './BaseChat';
import type { BaseMessage } from './BaseMessage';
import type { BaseUser } from './BaseUser';

export type BaseCompletion = {
    id: (number | null);
    chat_id: number;
    chat: BaseChat;
    user_id: number;
    user: BaseUser;
    messages: Array<BaseMessage>;
};

