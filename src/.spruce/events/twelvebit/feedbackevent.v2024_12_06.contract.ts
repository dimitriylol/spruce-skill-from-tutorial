import '#spruce/permissions/permissions.types'
import feedbackeventEmitTargetAndPayloadSchema from '#spruce/schemas/twelvebit/v2024_12_06/feedbackeventEmitTargetAndPayload.schema'
import feedbackeventResponsePayloadSchema from '#spruce/schemas/twelvebit/v2024_12_06/feedbackeventResponsePayload.schema'
import { buildEventContract } from '@sprucelabs/mercury-types'


const feedbackeventEventContract = buildEventContract({
    eventSignatures: {
        'twelvebit.feedbackevent::v2024_12_06': {
            isGlobal: true,
            emitPermissions: {"contractId":"twelvebit.twelvebit","permissionIdsAny":["can-submit-feedback"]},
            
            emitPayloadSchema: feedbackeventEmitTargetAndPayloadSchema,
            responsePayloadSchema: feedbackeventResponsePayloadSchema,
            
            
        }
    }
})
export default feedbackeventEventContract

export type FeedbackeventEventContract = typeof feedbackeventEventContract