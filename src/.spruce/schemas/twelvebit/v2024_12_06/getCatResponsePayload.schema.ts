import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../../schemas.types'

import catValuesSchema_v2024_12_06 from '#spruce/schemas/twelvebit/v2024_12_06/catValues.schema'

const getCatResponsePayloadSchema: SpruceSchemas.Twelvebit.v2024_12_06.GetCatResponsePayloadSchema  = {
	id: 'getCatResponsePayload',
	version: 'v2024_12_06',
	namespace: 'Twelvebit',
	name: '',
	    fields: {
	            /** . */
	            'cat': {
	                type: 'schema',
	                options: {schema: catValuesSchema_v2024_12_06,}
	            },
	    }
}

SchemaRegistry.getInstance().trackSchema(getCatResponsePayloadSchema)

export default getCatResponsePayloadSchema
