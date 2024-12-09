import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../../schemas.types'



const createCatSchema: SpruceSchemas.Twelvebit.v2024_12_06.CreateCatSchema  = {
	id: 'createCat',
	version: 'v2024_12_06',
	namespace: 'Twelvebit',
	name: '',
	    fields: {
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
	    }
}

SchemaRegistry.getInstance().trackSchema(createCatSchema)

export default createCatSchema
