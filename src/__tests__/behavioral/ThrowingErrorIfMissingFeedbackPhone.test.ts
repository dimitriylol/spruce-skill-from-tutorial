import { fake } from '@sprucelabs/spruce-test-fixtures'
import { test, assert, errorAssert } from '@sprucelabs/test-utils'
import AbstractTwelveBitTest from '../support/AbstractTwelveBitTest'

@fake.login()
export default class ThrowingErrorIfMissingFeedbackPhoneTest extends AbstractTwelveBitTest {
    @test()
    protected static async canCreateThrowingErrorIfMissingFeedbackPhone() {
        delete process.env.FEEDBACK_PHONE
        const err = await assert.doesThrowAsync(() => this.bootSkill())
        errorAssert.assertError(err, 'MISSING_PARAMETERS', {
            parameters: ['env.FEEDBACK_PHONE'],
        })
    }
}
