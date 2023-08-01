/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { BaseCompletion } from './BaseCompletion';

export type BaseChat = {
    id: (number | null);
    name: string;
    user_id: number;
    completions: Array<BaseCompletion>;
};

