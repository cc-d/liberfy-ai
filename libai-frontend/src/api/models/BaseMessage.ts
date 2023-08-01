/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { BaseConvo } from './BaseConvo';

export type BaseMessage = {
    id: (number | null);
    role: string;
    content: string;
    name: string;
    function_call: string;
    convo_id: number;
    convo: BaseConvo;
};

