import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../../schemas.types'

import createCatSchema_v2024_12_06 from '#spruce/schemas/twelvebit/v2024_12_06/createCat.schema'

const saveCatValuesEmitPayloadSchema: SpruceSchemas.Twelvebit.v2024_12_06.SaveCatValuesEmitPayloadSchema  = {
	id: 'saveCatValuesEmitPayload',
	version: 'v2024_12_06',
	namespace: 'Twelvebit',
	name: '',
	    fields: {
	            /** . */
	            'cat': {
	                type: 'schema',
	                isRequired: true,
	                options: {schema: createCatSchema_v2024_12_06,}
	            },
	    }
}

SchemaRegistry.getInstance().trackSchema(saveCatValuesEmitPayloadSchema)

export default saveCatValuesEmitPayloadSchema
