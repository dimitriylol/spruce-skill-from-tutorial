import { buildSchema } from '@sprucelabs/schema'

const feedbackeventResponsePayloadBuilder = buildSchema({
    id: 'feedbackeventResponsePayload',
    fields: {
        success: {
            type: 'boolean',
            isRequired: true,
        },
    },
})

export default feedbackeventResponsePayloadBuilder
