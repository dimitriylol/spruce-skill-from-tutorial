import { fake, seed } from '@sprucelabs/spruce-test-fixtures'
import { assert, test } from '@sprucelabs/test-utils'
import AbstractTwelveBitTest from '../../support/AbstractTwelveBitTest'

@fake.login()
export default class GetCatListenerTest extends AbstractTwelveBitTest {
    protected static async beforeEach() {
        await super.beforeEach()
        await this.bootSkill()
    }

    private static async emitGetCatEvent() {
        return this.fakedClient.emitAndFlattenResponses(
            'twelvebit.get-cat::v2024_12_06'
        )
    }

    @test()
    protected static async skillIsListening() {
        await this.emitGetCatEvent()
    }

    @test()
    @seed('cats', 1)
    protected static async returnsTheOnlyCatRecord() {
        const [{ cat }] = await this.emitGetCatEvent()
        assert.isTruthy(cat, 'No cat was returned')
        const expected = await this.cats.findOne({})
        assert.isEqualDeep(
            cat,
            expected,
            'Returned cat does not match expected'
        )
    }
}
