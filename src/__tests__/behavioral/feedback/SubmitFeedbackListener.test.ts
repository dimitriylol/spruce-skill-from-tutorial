import { EventSource } from '@sprucelabs/spruce-event-utils'
import { fake } from '@sprucelabs/spruce-test-fixtures'
import { test, assert, generateId } from '@sprucelabs/test-utils'
import AbstractTwelveBitTest from '../../support/AbstractTwelveBitTest'
import { SendMessageTargetAndPayload } from '../../support/EventFaker'

@fake.login()
export default class SubmitFeedbackListenerTest extends AbstractTwelveBitTest {
    private static wasHit: boolean
    private static sendMessageTarget?: SendMessageTargetAndPayload['target']
    private static sendMessagePayload?: SendMessageTargetAndPayload['payload']
    private static feedback: string

    protected static async beforeEach() {
        await super.beforeEach()
        this.feedback = generateId()
        this.wasHit = false
        delete this.sendMessageTarget
        delete this.sendMessagePayload
        await this.eventFaker.fakeSendMessage(({ target, payload }) => {
            this.wasHit = true
            this.sendMessageTarget = target
            this.sendMessagePayload = payload
        })
        process.env.FEEDBACK_PHONE = '555-555-5555'
        await this.bootSkill()
    }

    @test()
    protected static async skillIsListening() {
        const success = await this.emitSubmitFeedbackEvent()
        assert.isTrue(
            success,
            'Submit feedback listener  must return success true'
        )
    }

    @test('send message to phone 555-555-5555', '555-555-5555')
    @test('send message to phone 555-000-5555', '555-000-5555')
    protected static async emitSendMessageEvent(phone: string) {
        process.env.FEEDBACK_PHONE = phone
        await this.emitSubmitFeedbackEvent()
        assert.isTrue(this.wasHit, 'submit feedback  event must be emitted')
        assert.isEqualDeep(this.sendMessageTarget, {
            phone: process.env.FEEDBACK_PHONE,
        })
    }

    @test()
    protected static async emitSendMessageWithPayload() {
        await this.emitSubmitFeedbackEvent()
        const { message } = this.sendMessagePayload ?? {}

        assert.isEqual(message?.classification, 'transactional')
        assert.isEqualDeep(message?.context, {
            fromName: this.fakedPerson.casualName,
            feedback: this.feedback,
        })
    }

    @test()
    protected static async emitsGetPersonAsSkill() {
        let passedSource: EventSource | undefined | null
        await this.eventFaker.fakeGetPerson(({ source }) => {
            passedSource = source
        })
        const res = await this.skills.loginAsCurrentSkill()
        await this.emitSubmitFeedbackEvent()
        assert.isEqualDeep(passedSource, {
            skillId: res.skill.id,
        })
    }

    private static async emitSubmitFeedbackEvent() {
        const [{ success }] = await this.fakedClient.emitAndFlattenResponses(
            'twelvebit.feedbackevent::v2024_12_06',
            {
                payload: {
                    feedback: this.feedback,
                },
            }
        )
        return success
    }
}
