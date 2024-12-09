import { interactor } from '@sprucelabs/heartwood-view-controllers'
import { generateId } from '@sprucelabs/test-utils'
import FeedbackCardViewController from '../../../feedback/FeedbackCard.vc'

export default class SpyFeedbackCardViewController extends FeedbackCardViewController {
    public getFormVc() {
        return this.formVc
    }

    public async fillOutFeedback() {
        const feedback = generateId()
        await this.formVc.setValue('feedback', feedback)
        return feedback
    }

    public async submitFeedbackForm() {
        await interactor.submitForm(this.formVc)
    }
}
