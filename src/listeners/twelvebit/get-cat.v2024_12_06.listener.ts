import {
    SpruceEvent,
    SpruceEventResponse,
} from '@sprucelabs/spruce-event-utils'

import { SpruceSchemas } from '#spruce/schemas/schemas.types'

export default async (
    event: SpruceEvent
): SpruceEventResponse<ResponsePayload> => {
    const { stores } = event
    const cats = await stores.getStore('cats')
    const cat = await cats.findOne({})
    return { cat }
}

type ResponsePayload = SpruceSchemas.Twelvebit.v2024_12_06.GetCatResponsePayload
