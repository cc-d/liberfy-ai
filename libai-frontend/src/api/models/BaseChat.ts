/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { BaseCompletion } from './BaseCompletion';
import type { BaseUser } from './BaseUser';

export type BaseChat = {
    id: (number | null);
    name: string;
    user_id: number;
    user: (BaseUser | null);
    completions: (Array<BaseCompletion> | null);
};

