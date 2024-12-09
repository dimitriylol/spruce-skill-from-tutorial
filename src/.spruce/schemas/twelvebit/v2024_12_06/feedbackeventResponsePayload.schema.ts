import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../../schemas.types'



const feedbackeventResponsePayloadSchema: SpruceSchemas.Twelvebit.v2024_12_06.FeedbackeventResponsePayloadSchema  = {
	id: 'feedbackeventResponsePayload',
	version: 'v2024_12_06',
	namespace: 'Twelvebit',
	name: '',
	    fields: {
	            /** . */
	            'success': {
	                type: 'boolean',
	                isRequired: true,
	                options: undefined
	            },
	    }
}

SchemaRegistry.getInstance().trackSchema(feedbackeventResponsePayloadSchema)

export default feedbackeventResponsePayloadSchema
