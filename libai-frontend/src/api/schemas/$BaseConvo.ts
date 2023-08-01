/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $BaseConvo = {
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
        chat: {
            type: 'BaseChat',
            isRequired: true,
        },
        user_id: {
            type: 'number',
            isRequired: true,
        },
        user: {
            type: 'BaseUser',
            isRequired: true,
        },
        messages: {
            type: 'array',
            contains: {
                type: 'BaseMessage',
            },
            isRequired: true,
        },
    },
} as const;
