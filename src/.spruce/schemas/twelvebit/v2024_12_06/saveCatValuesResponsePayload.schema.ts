import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../../schemas.types'

import catValuesSchema_v2024_12_06 from '#spruce/schemas/twelvebit/v2024_12_06/catValues.schema'

const saveCatValuesResponsePayloadSchema: SpruceSchemas.Twelvebit.v2024_12_06.SaveCatValuesResponsePayloadSchema  = {
	id: 'saveCatValuesResponsePayload',
	version: 'v2024_12_06',
	namespace: 'Twelvebit',
	name: '',
	    fields: {
	            /** . */
	            'cat': {
	                type: 'schema',
	                isRequired: true,
	                options: {schema: catValuesSchema_v2024_12_06,}
	            },
	    }
}

SchemaRegistry.getInstance().trackSchema(saveCatValuesResponsePayloadSchema)

export default saveCatValuesResponsePayloadSchema
