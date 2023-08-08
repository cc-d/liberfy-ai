/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $DBComp = {
    properties: {
        messages: {
            type: 'array',
            contains: {
                type: 'DBMsg',
            },
            isRequired: true,
        },
        model: {
            type: 'string',
            isRequired: true,
        },
        temperature: {
            type: 'number',
            isRequired: true,
        },
        id: {
            type: 'number',
            isRequired: true,
        },
        user_id: {
            type: 'number',
            isRequired: true,
        },
    },
} as const;
