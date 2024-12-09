import {
    formAssert,
    interactor,
    vcAssert,
} from '@sprucelabs/heartwood-view-controllers'
import { eventFaker, fake } from '@sprucelabs/spruce-test-fixtures'
import { assert, generateId, test } from '@sprucelabs/test-utils'
import { CatValues } from '../../../twelvebit.type'
import ValuesSkillViewController from '../../../values/Values.svc'
import AbstractTwelveBitTest from '../../support/AbstractTwelveBitTest'
import { SaveCatValuesEmitTargetAndPayload } from '../../support/EventFaker'

@fake.login()
export default class ValuesSkillViewTest extends AbstractTwelveBitTest {
    private static vc: SpyValuesSkillViewController
    protected static async beforeEach(): Promise<void> {
        await super.beforeEach()
        this.views.setController(
            'twelvebit.values',
            SpyValuesSkillViewController
        )
        this.vc = this.views.Controller(
            'twelvebit.values',
            {}
        ) as SpyValuesSkillViewController
        await this.eventFaker.fakeGetCat()
    }

    @test()
    protected static async rendersCardVc() {
        vcAssert.assertSkillViewRendersCard(this.vc)
    }

    @test()
    protected static async cardRendersForm() {
        formAssert.cardRendersForm(this.vc.getCard())
    }

    @test()
    protected static async formRendersExpectedFields() {
        formAssert.formRendersFields(this.vc.getForm(), ['name', 'values'])
    }

    @test()
    protected static async valuesFieldRendersAsTextArea() {
        formAssert.formFieldRendersAs(this.vc.getForm(), 'values', 'textarea')
    }

    @test()
    protected static async clickingCancelRedirectsToRoot() {
        await this.views.load(this.vc)
        await vcAssert.assertActionRedirects({
            action: () => interactor.cancelForm(this.vc.getForm()),
            destination: {
                id: 'twelvebit.root',
            },
            router: this.views.getRouter(),
        })
    }

    @test()
    protected static async submittingFormEmitsSaveEvent() {
        let passedPayload:
            | SaveCatValuesEmitTargetAndPayload['payload']
            | undefined

        await this.eventFaker.fakeSaveCatValues(({ payload }) => {
            passedPayload = payload
        })
        await this.views.load(this.vc)

        const expected = await this.fillOutForm()
        await vcAssert.assertActionRedirects({
            action: () => this.submitForm(),
            destination: {
                id: 'twelvebit.root',
            },
            router: this.views.getRouter(),
        })
        assert.isEqualDeep(passedPayload?.cat, expected)
    }

    private static async submitForm() {
        await interactor.submitForm(this.vc.getForm())
    }

    private static async fillOutForm() {
        const expected = {
            name: generateId(),
            values: generateId(),
        }
        await this.vc.getForm().setValues(expected)
        return expected
    }

    @test()
    protected static async saveEventThrowsRendersAlert() {
        await eventFaker.makeEventThrow(
            'twelvebit.save-cat-values::v2024_12_06'
        )
        await this.fillOutForm()

        await vcAssert.assertRendersAlert(this.vc, () => this.submitForm())
    }

    @test()
    protected static async populateFormFromCatResponse() {
        const result: CatValues = this.eventFaker.generateCatValuesRecord()
        await this.eventFaker.fakeGetCat(() => {
            return result
        })
        await this.views.load(this.vc)

        const actual = this.vc.getForm().getValues()
        assert.isEqualDeep(
            actual,
            {
                name: result.name,
                values: result.values,
            },
            `Values are not set in the form`
        )
    }
}

class SpyValuesSkillViewController extends ValuesSkillViewController {
    public getCard() {
        return this.cardVc
    }

    public getForm() {
        return this.formVc
    }
}
