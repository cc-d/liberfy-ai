/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $DBUserWithToken = {
    properties: {
        email: {
            type: 'string',
            isRequired: true,
        },
        id: {
            type: 'number',
            isRequired: true,
        },
        token: {
            type: 'Token',
            isRequired: true,
        },
    },
} as const;
