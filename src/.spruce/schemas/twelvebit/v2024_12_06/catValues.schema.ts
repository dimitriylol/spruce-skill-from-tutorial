import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../../schemas.types'

import catSourceSchema_v2024_12_06 from '#spruce/schemas/twelvebit/v2024_12_06/catSource.schema'

const catValuesSchema: SpruceSchemas.Twelvebit.v2024_12_06.CatValuesSchema  = {
	id: 'catValues',
	version: 'v2024_12_06',
	namespace: 'Twelvebit',
	name: 'Cat Values',
	    fields: {
	            /** . */
	            'id': {
	                type: 'id',
	                isRequired: true,
	                options: undefined
	            },
	            /** Cat's Name. */
	            'name': {
	                label: 'Cat\'s Name',
	                type: 'text',
	                isRequired: true,
	                options: undefined
	            },
	            /** Cat's Values. */
	            'values': {
	                label: 'Cat\'s Values',
	                type: 'text',
	                isRequired: true,
	                options: undefined
	            },
	            /** . */
	            'source': {
	                type: 'schema',
	                isRequired: true,
	                options: {schema: catSourceSchema_v2024_12_06,}
	            },
	    }
}

SchemaRegistry.getInstance().trackSchema(catValuesSchema)

export default catValuesSchema
