import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../../schemas.types'



const catSourceSchema: SpruceSchemas.Twelvebit.v2024_12_06.CatSourceSchema  = {
	id: 'catSource',
	version: 'v2024_12_06',
	namespace: 'Twelvebit',
	name: '',
	    fields: {
	            /** . */
	            'personId': {
	                type: 'id',
	                isRequired: true,
	                options: undefined
	            },
	    }
}

SchemaRegistry.getInstance().trackSchema(catSourceSchema)

export default catSourceSchema
