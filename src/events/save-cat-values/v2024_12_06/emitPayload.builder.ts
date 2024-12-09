import { buildSchema, dropFields } from '@sprucelabs/schema'
import catValuesBuilder from '../../../schemas/v2024_12_06/catValues.builder'

const saveCatValuesEmitPayloadBuilder = buildSchema({
    id: 'saveCatValuesEmitPayload',
    fields: {
        cat: {
            type: 'schema',
            options: {
                schema: buildSchema({
                    id: 'createCat',
                    fields: {
                        ...dropFields(catValuesBuilder.fields, [
                            'id',
                            'source',
                        ]),
                    },
                }),
            },
            isRequired: true,
        },
    },
})

export default saveCatValuesEmitPayloadBuilder
