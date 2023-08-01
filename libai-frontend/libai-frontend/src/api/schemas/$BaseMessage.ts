/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $BaseMessage = {
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
        role: {
            type: 'string',
            isRequired: true,
        },
        content: {
            type: 'string',
            isRequired: true,
        },
        completion_id: {
            type: 'number',
            isRequired: true,
        },
    },
} as const;
