import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../../schemas.types'

import eventSourceSchema_v2021_09_13 from '#spruce/schemas/spruceEventUtils/v2021_09_13/eventSource.schema'
import feedbackeventEmitPayloadSchema_v2024_12_06 from '#spruce/schemas/twelvebit/v2024_12_06/feedbackeventEmitPayload.schema'

const feedbackeventEmitTargetAndPayloadSchema: SpruceSchemas.Twelvebit.v2024_12_06.FeedbackeventEmitTargetAndPayloadSchema  = {
	id: 'feedbackeventEmitTargetAndPayload',
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
	                options: {schema: feedbackeventEmitPayloadSchema_v2024_12_06,}
	            },
	    }
}

SchemaRegistry.getInstance().trackSchema(feedbackeventEmitTargetAndPayloadSchema)

export default feedbackeventEmitTargetAndPayloadSchema
