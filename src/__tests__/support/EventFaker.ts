import {
    eventFaker,
    fake,
    SpruceSchemas,
} from '@sprucelabs/spruce-test-fixtures'
import { generateId } from '@sprucelabs/test-utils'

type SubmitFeedbackType =
    SpruceSchemas.Twelvebit.v2024_12_06.FeedbackeventEmitTargetAndPayload

export type SendMessageTargetAndPayload =
    SpruceSchemas.Mercury.v2020_12_25.SendMessageEmitTargetAndPayload

export type PersonTargetAndPayload =
    SpruceSchemas.Mercury.v2020_12_25.GetPersonEmitTargetAndPayload

export type SaveCatValuesEmitTargetAndPayload =
    SpruceSchemas.Twelvebit.v2024_12_06.SaveCatValuesEmitTargetAndPayload

export default class EventFaker {
    public async fakeGetPerson(
        cb?: (targetAndPayload: PersonTargetAndPayload) => void
    ) {
        await eventFaker.on('get-person::v2020_12_25', (targetAndPayload) => {
            cb?.(targetAndPayload)
            return {
                person: fake.getPerson(),
            }
        })
    }
    public async fakeSendMessage(
        cb?: (targetAndPayload: SendMessageTargetAndPayload) => void
    ) {
        await eventFaker.on('send-message::v2020_12_25', (targetAndPayload) => {
            cb?.(targetAndPayload)
            return {
                message: {
                    id: generateId(),
                    body: generateId(),
                    classification: 'transactional' as const,
                    target: {},
                    source: {},
                    dateCreated: Date.now(),
                },
            }
        })
    }

    public async fakeSaveCatValues(
        cb?: (targetAndPayload: SaveCatValuesEmitTargetAndPayload) => void
    ) {
        await eventFaker.on(
            'twelvebit.save-cat-values::v2024_12_06',
            (targetAndPayload) => {
                cb?.(targetAndPayload)
                return {
                    cat: {
                        id: generateId(),
                        name: generateId(),
                        values: generateId(),
                        source: {
                            personId: generateId(),
                        },
                    },
                }
            }
        )
    }

    public async fakeSubmitFeedbackEvent(
        cb?: (targetAndPayload: SubmitFeedbackType) => void
    ) {
        await eventFaker.on(
            'twelvebit.feedbackevent::v2024_12_06',
            (targetAndPayload) => {
                cb?.(targetAndPayload)
                return {
                    success: true,
                }
            }
        )
    }
}
