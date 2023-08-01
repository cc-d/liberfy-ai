/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $BaseChat = {
    properties: {
        id: {
            type: 'any-of',
            contains: [{
                type: 'number',
            }, {
                type: 'null',
            }],
            isRequired: true,
        },
        name: {
            type: 'string',
            isRequired: true,
        },
        user_id: {
            type: 'number',
            isRequired: true,
        },
        completions: {
            type: 'array',
            contains: {
                type: 'BaseCompletion',
            },
            isRequired: true,
        },
    },
} as const;
