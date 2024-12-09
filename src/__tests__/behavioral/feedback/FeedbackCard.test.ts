import {
    formAssert,
    SpruceSchemas,
    vcAssert,
} from '@sprucelabs/heartwood-view-controllers'
import { eventFaker, fake } from '@sprucelabs/spruce-test-fixtures'
import { assert, test } from '@sprucelabs/test-utils'
import AbstractTwelveBitTest from '../../support/AbstractTwelveBitTest'
import SpyFeedbackCardViewController from './SpyFeedbackCardViewController'

@fake.login()
export default class FeedbackCardTest extends AbstractTwelveBitTest {
    private static vc: SpyFeedbackCardViewController
    private static wasFormSubmitted: boolean

    private static get formVc() {
        return this.vc.getFormVc()
    }

    protected static async beforeEach() {
        await super.beforeEach()
        this.wasFormSubmitted = false
        this.views.setController(
            'twelvebit.feedback-card',
            SpyFeedbackCardViewController
        )
        this.vc = this.views.Controller('twelvebit.feedback-card', {
            onSubmit: () => {
                this.wasFormSubmitted = true
            },
        }) as SpyFeedbackCardViewController
    }

    @test()
    protected static rendersAForm() {
        formAssert.cardRendersForm(this.vc)
    }

    @test()
    protected static includesFeedbackLabel() {
        formAssert.formRendersField(this.formVc, 'feedback')
    }

    @test()
    protected static renderFeedbackAsTextarea() {
        formAssert.formFieldRendersAs(this.formVc, 'feedback', 'textarea')
    }

    @test()
    protected static hiddenCancelButton() {
        assert.isFalse(
            this.formVc.getShouldRenderCancelButton(),
            "Just don't render cancel button!"
        )
    }

    @test()
    protected static async hasFeedbackEventOnSubmit() {
        let feedbackFromPayload: string | undefined

        await this.eventFaker.fakeSubmitFeedbackEvent(
            ({ payload: { feedback } }) => {
                feedbackFromPayload = feedback
            }
        )
        const expected = await this.fillOutFeedbackForm()
        await this.submit()

        assert.isEqual(feedbackFromPayload, expected, "Feedback wasn't passed")
        assert.isTrue(this.wasFormSubmitted, 'Form must be submitted')
    }

    @test()
    protected static async errorOnSubmittingFeedback() {
        await eventFaker.makeEventThrow('twelvebit.feedbackevent::v2024_12_06')
        await this.fillOutFeedbackForm()
        await vcAssert.assertRendersAlert(this.vc, () => this.submit())
        await assert.isFalse(
            this.wasFormSubmitted,
            'Form must not be submitted on error'
        )
    }

    private static async fillOutFeedbackForm() {
        return this.vc.fillOutFeedback()
    }

    private static async submit() {
        await this.vc.submitFeedbackForm()
    }
}
