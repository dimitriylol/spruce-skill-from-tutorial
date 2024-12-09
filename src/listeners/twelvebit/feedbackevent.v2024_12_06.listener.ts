import { SkillEventContract } from '@sprucelabs/mercury-types'
import {
    SpruceEvent,
    SpruceEventResponse,
} from '@sprucelabs/spruce-event-utils'
import { SpruceSchemas } from '#spruce/schemas/schemas.types'

export default async (
    event: SpruceEvent<SkillEventContract, EmitPayload>
): SpruceEventResponse<ResponsePayload> => {
    const {
        payload: { feedback },
        source,
        connectToApiAsSkill,
    } = event

    const client = await connectToApiAsSkill()
    const [{ person }] = await client.emitAndFlattenResponses(
        'get-person::v2020_12_25',
        {
            target: {
                personId: source.personId,
            },
        }
    )
    await client.emitAndFlattenResponses('send-message::v2020_12_25', {
        target: {
            phone: process.env.FEEDBACK_PHONE,
        },
        payload: {
            message: {
                body: 'Feedback Alert! {{fromName}} has submitted feedback: {{feedback}}',
                classification: 'transactional',
                context: {
                    feedback,
                    fromName: person.casualName,
                },
            },
        },
    })
    return {
        success: true,
    }
}

type EmitPayload =
    SpruceSchemas.Twelvebit.v2024_12_06.FeedbackeventEmitTargetAndPayload

type ResponsePayload =
    SpruceSchemas.Twelvebit.v2024_12_06.FeedbackeventResponsePayload
