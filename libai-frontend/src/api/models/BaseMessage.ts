/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { BaseCompletion } from './BaseCompletion';

export type BaseMessage = {
    id: (number | null);
    role: string;
    content: string;
    name: string;
    function_call: string;
    completion_id: number;
    Completion: BaseCompletion;
};

