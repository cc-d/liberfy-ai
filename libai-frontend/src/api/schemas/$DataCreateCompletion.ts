/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $DataCreateCompletion = {
    properties: {
        chat_id: {
            type: 'number',
            isRequired: true,
        },
        user_id: {
            type: 'number',
            isRequired: true,
        },
        sysprompt: {
            type: 'string',
            isRequired: true,
        },
        temperature: {
            type: 'number',
            isRequired: true,
        },
    },
} as const;
