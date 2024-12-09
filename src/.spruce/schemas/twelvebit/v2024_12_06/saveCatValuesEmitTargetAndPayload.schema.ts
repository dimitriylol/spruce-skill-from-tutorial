import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../../schemas.types'

import eventSourceSchema_v2021_09_13 from '#spruce/schemas/spruceEventUtils/v2021_09_13/eventSource.schema'
import saveCatValuesEmitPayloadSchema_v2024_12_06 from '#spruce/schemas/twelvebit/v2024_12_06/saveCatValuesEmitPayload.schema'

const saveCatValuesEmitTargetAndPayloadSchema: SpruceSchemas.Twelvebit.v2024_12_06.SaveCatValuesEmitTargetAndPayloadSchema  = {
	id: 'saveCatValuesEmitTargetAndPayload',
	version: 'v2024_12_06',
	namespace: 'Twelvebit',
	name: '',
	    fields: {
	            /** Source. */
	            'source': {
	                label: 'Source',
	                type: 'schema',
	                options: {schema: eventSourceSchema_v2021_09_13,}
	            },
	            /** . */
	            'payload': {
	                type: 'schema',
	                isRequired: true,
	                options: {schema: saveCatValuesEmitPayloadSchema_v2024_12_06,}
	            },
	    }
}

SchemaRegistry.getInstance().trackSchema(saveCatValuesEmitTargetAndPayloadSchema)

export default saveCatValuesEmitTargetAndPayloadSchema
