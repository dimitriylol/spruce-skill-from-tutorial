import { AbstractSpruceFixtureTest } from '@sprucelabs/spruce-test-fixtures'
import CatsStore from '../../stores/Cats.store'
import EventFaker from './EventFaker'

export default abstract class AbstractTwelveBitTest extends AbstractSpruceFixtureTest {
    protected static eventFaker: EventFaker
    protected static cats: CatsStore

    protected static async beforeEach() {
        await super.beforeEach()
        this.eventFaker = new EventFaker()
        this.cats = await this.stores.getStore('cats')
    }
}
