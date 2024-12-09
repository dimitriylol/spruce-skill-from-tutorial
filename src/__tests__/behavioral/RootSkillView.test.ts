import {
    buttonAssert,
    interactor,
    vcAssert,
} from '@sprucelabs/heartwood-view-controllers'
import { fake } from '@sprucelabs/spruce-test-fixtures'
import { assert, test } from '@sprucelabs/test-utils'
import FeedbackCardViewController from '../../feedback/FeedbackCard.vc'
import RootSkillViewController from '../../skillViewControllers/Root.svc'
import AbstractTwelveBitTest from '../support/AbstractTwelveBitTest'
import SpyFeedbackCardViewController from './feedback/SpyFeedbackCardViewController'

@fake.login()
export default class RootSkillViewTest extends AbstractTwelveBitTest {
    private static vc: SpyRootSkillView

    protected static async beforeEach() {
        await super.beforeEach()
        await this.eventFaker.fakeSubmitFeedbackEvent()
        this.views.setController(
            'twelvebit.feedback-card',
            SpyFeedbackCardViewController
        )
        this.views.setController('twelvebit.root', SpyRootSkillView)
        this.vc = this.views.Controller(
            'twelvebit.root',
            {}
        ) as SpyRootSkillView
    }

    @test()
    protected static async rendersCard() {
        vcAssert.assertSkillViewRendersCard(this.vc)
    }

    @test()
    protected static async requiresLogin() {
        await vcAssert.assertLoginIsRequired(this.vc)
    }

    @test()
    protected static rendersExpectedButtons() {
        buttonAssert.cardRendersButtons(this.cardVc, [
            'members',
            'values',
            'feedback',
            'write',
        ])
    }

    private static get cardVc() {
        return this.vc.getCardVc()
    }

    @test()
    protected static async clickingFeedbackButton() {
        await this.clickFeedbackAndAssertDialog()
    }

    private static async clickFeedbackAndAssertDialog() {
        const dialogVc = await vcAssert.assertRendersDialog(this.vc, () =>
            this.clickButton('feedback')
        )
        const feedbackCard = vcAssert.assertRendersAsInstanceOf(
            dialogVc,
            FeedbackCardViewController
        )
        return {
            dialogVc,
            feedbackCardVc: feedbackCard as SpyFeedbackCardViewController,
        }
    }

    @test()
    protected static async submittingFedbackClosesDialog() {
        const { dialogVc, feedbackCardVc } =
            await this.clickFeedbackAndAssertDialog()
        await feedbackCardVc.fillOutFeedback()
        await assert.isTrue(
            dialogVc.getIsVisible(),
            'Dialog should be visible at first'
        )
        await feedbackCardVc.submitFeedbackForm()
        await assert.isFalse(dialogVc.getIsVisible(), 'Dialog should be closed')
    }

    @test()
    protected static async clickingFamilyValuesRedirectsToOwnSkillView() {
        await this.load()

        await vcAssert.assertActionRedirects({
            action: () => this.clickButton('values'),
            router: this.views.getRouter(),
            destination: {
                id: 'twelvebit.values',
            },
        })
    }

    private static load() {
        return this.views.load(this.vc)
    }

    private static clickButton(id: string) {
        return interactor.clickButton(this.cardVc, id)
    }
}

class SpyRootSkillView extends RootSkillViewController {
    public getCardVc() {
        return this.cardVc
    }
}
