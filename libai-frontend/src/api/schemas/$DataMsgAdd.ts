/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $DataMsgAdd = {
    properties: {
        completion_id: {
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
    },
} as const;
