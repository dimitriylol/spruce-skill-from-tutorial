import { buildSchema } from '@sprucelabs/schema'
import catValuesBuilder from '../../../schemas/v2024_12_06/catValues.builder'

const getCatResponsePayloadBuilder = buildSchema({
    id: 'getCatResponsePayload',
    fields: {
        cat: {
            type: 'schema',
            options: {
                schema: catValuesBuilder,
            },
        },
    },
})

export default getCatResponsePayloadBuilder
