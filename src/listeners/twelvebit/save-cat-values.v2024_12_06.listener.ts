import { SkillEventContract } from '@sprucelabs/mercury-types'
import {
    SpruceEvent,
    SpruceEventResponse,
} from '@sprucelabs/spruce-event-utils'
import { SpruceSchemas } from '#spruce/schemas/schemas.types'

export default async (
    event: SpruceEvent<SkillEventContract, EmitPayload>
): SpruceEventResponse<ResponsePayload> => {
    const { stores, payload, source } = event

    const created = await (
        await stores.getStore('cats')
    ).upsertOne(
        {
            'source.personId': source.personId,
            'source.name': payload.cat.name,
        },
        {
            ...payload.cat,
            source: {
                // @ts-ignore
                personId: source.personId,
            },
        }
    )
    return {
        cat: created,
    }
}

type EmitPayload =
    SpruceSchemas.Twelvebit.v2024_12_06.SaveCatValuesEmitTargetAndPayload

type ResponsePayload =
    SpruceSchemas.Twelvebit.v2024_12_06.SaveCatValuesResponsePayload
