import { buildSchema } from '@sprucelabs/schema'

const feedbackeventEmitPayloadBuilder = buildSchema({
    id: 'feedbackeventEmitPayload',
    fields: {
        feedback: {
            type: 'text',
            isRequired: true,
        },
    },
})

export default feedbackeventEmitPayloadBuilder
