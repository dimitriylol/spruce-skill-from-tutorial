import '#spruce/permissions/permissions.types'
import saveCatValuesEmitTargetAndPayloadSchema from '#spruce/schemas/twelvebit/v2024_12_06/saveCatValuesEmitTargetAndPayload.schema'
import saveCatValuesResponsePayloadSchema from '#spruce/schemas/twelvebit/v2024_12_06/saveCatValuesResponsePayload.schema'
import { buildEventContract } from '@sprucelabs/mercury-types'


const saveCatValuesEventContract = buildEventContract({
    eventSignatures: {
        'twelvebit.save-cat-values::v2024_12_06': {
            isGlobal: true,
            emitPermissions: {"contractId":"twelvebit.twelvebit","permissionIdsAny":["can-submit-cat-values"]},
            
            emitPayloadSchema: saveCatValuesEmitTargetAndPayloadSchema,
            responsePayloadSchema: saveCatValuesResponsePayloadSchema,
            
            
        }
    }
})
export default saveCatValuesEventContract

export type SaveCatValuesEventContract = typeof saveCatValuesEventContract