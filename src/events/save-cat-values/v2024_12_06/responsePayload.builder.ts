import { buildSchema } from '@sprucelabs/schema'
import catValuesBuilder from '../../../schemas/v2024_12_06/catValues.builder'

const saveCatValuesResponsePayloadBuilder = buildSchema({
    id: 'saveCatValuesResponsePayload',
    fields: {
        cat: {
            type: 'schema',
            options: {
                schema: catValuesBuilder,
            },
            isRequired: true,
        },
    },
})

export default saveCatValuesResponsePayloadBuilder
