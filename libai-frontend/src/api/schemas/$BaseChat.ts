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
        user: {
            type: 'any-of',
            contains: [{
                type: 'BaseUser',
            }, {
                type: 'null',
            }],
            isRequired: true,
        },
        convos: {
            type: 'any-of',
            contains: [{
                type: 'array',
                contains: {
                    type: 'BaseConvo',
                },
            }, {
                type: 'null',
            }],
            isRequired: true,
        },
    },
} as const;
