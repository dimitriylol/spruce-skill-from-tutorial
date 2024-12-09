import '#spruce/permissions/permissions.types'
import getCatResponsePayloadSchema from '#spruce/schemas/twelvebit/v2024_12_06/getCatResponsePayload.schema'
import { buildEventContract } from '@sprucelabs/mercury-types'


const getCatEventContract = buildEventContract({
    eventSignatures: {
        'twelvebit.get-cat::v2024_12_06': {
            isGlobal: true,
            emitPermissions: {"contractId":"twelvebit.twelvebit","permissionIdsAny":["can-submit-cat-values"]},
            
            
            responsePayloadSchema: getCatResponsePayloadSchema,
            
            
        }
    }
})
export default getCatEventContract

export type GetCatEventContract = typeof getCatEventContract