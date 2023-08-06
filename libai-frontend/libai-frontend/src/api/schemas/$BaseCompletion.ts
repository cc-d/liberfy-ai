/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $BaseCompletion = {
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
        chat_id: {
            type: 'number',
            isRequired: true,
        },
        user_id: {
            type: 'number',
            isRequired: true,
        },
        messages: {
            type: 'any-of',
            contains: [{
                type: 'array',
                contains: {
                    type: 'BaseMessage',
                },
            }, {
                type: 'null',
            }],
            isRequired: true,
        },
    },
} as const;
