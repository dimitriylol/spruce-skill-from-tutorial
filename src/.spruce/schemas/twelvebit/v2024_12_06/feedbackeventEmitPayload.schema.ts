import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../../schemas.types'



const feedbackeventEmitPayloadSchema: SpruceSchemas.Twelvebit.v2024_12_06.FeedbackeventEmitPayloadSchema  = {
	id: 'feedbackeventEmitPayload',
	version: 'v2024_12_06',
	namespace: 'Twelvebit',
	name: '',
	    fields: {
	            /** . */
	            'feedback': {
	                type: 'text',
	                isRequired: true,
	                options: undefined
	            },
	    }
}

SchemaRegistry.getInstance().trackSchema(feedbackeventEmitPayloadSchema)

export default feedbackeventEmitPayloadSchema
