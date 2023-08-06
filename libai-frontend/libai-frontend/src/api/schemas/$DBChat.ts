/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $DBChat = {
    properties: {
        name: {
            type: 'string',
            isRequired: true,
        },
        user_id: {
            type: 'number',
            isRequired: true,
        },
        id: {
            type: 'number',
            isRequired: true,
        },
        completions: {
            type: 'array',
            contains: {
                type: 'DBComp',
            },
            isRequired: true,
        },
    },
} as const;
