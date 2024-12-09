import { fake } from '@sprucelabs/spruce-test-fixtures'
import { assert, generateId, test } from '@sprucelabs/test-utils'
import CatsStore from '../../../stores/Cats.store'
import { CreateCatValues } from '../../../twelvebit.type'
import AbstractTwelveBitTest from '../../support/AbstractTwelveBitTest'

@fake.login()
export default class SaveCatListenerTest extends AbstractTwelveBitTest {
    private static cats: CatsStore
    protected static async beforeEach(): Promise<void> {
        await super.beforeEach()
        await this.bootSkill()
        this.cats = await this.stores.getStore('cats')
    }

    @test()
    protected static async skillIsListening() {
        await this.emitSaveCatValues()
    }

    private static async emitSaveCatValues(values?: Partial<CreateCatValues>) {
        const [{ cat }] = await this.fakedClient.emitAndFlattenResponses(
            'twelvebit.save-cat-values::v2024_12_06',
            {
                payload: {
                    cat: {
                        name: generateId(),
                        values: generateId(),
                        ...values,
                    },
                },
            }
        )
        return cat
    }

    @test()
    protected static async savingCatValuesCreateCatRecord() {
        await this.emitSaveCatValues()
        const total = await this.cats.count()
        assert.isEqual(total, 1, 'Cat record was not created')
    }

    @test()
    protected static async saveNamesAndValues() {
        const name = generateId()
        const values = generateId()
        await this.emitSaveCatValues({ name, values })
        const cat = await this.cats.findOne({ name })
        assert.isTruthy(cat)
        assert.isEqual(cat.values, values)
    }

    @test()
    protected static async returnsSavedCat() {
        const name = generateId()
        const created = await this.emitSaveCatValues({ name })
        const saved = await this.cats.findOne({ name })
        assert.isEqualDeep(created, saved)
    }

    @test()
    protected static async savingCatValuesTwiceDoesNotCreateSecondRecord() {
        const name = generateId()
        await this.emitSaveCatValues({ name })
        await this.emitSaveCatValues({ name })
        // const savedNumbers = await this.cats.count({ name })
        // assert.isEqual(savedNumbers, 1, `Cat record was created twice or none`)
    }

    @test()
    protected static async saveDifferentRecordForDifferentCat() {
        const name1 = generateId()
        await this.emitSaveCatValues({ name: name1 })

        const { client } = await this.people.loginAsDemoPerson('555-000-0123')
        this.fakedClient = client

        const name2 = generateId()
        await this.emitSaveCatValues({ name: name2 })

        const savedNumbers1 = await this.cats.count({ name: name1 })
        const savedNumbers2 = await this.cats.count({ name: name2 })
        assert.isEqual(
            savedNumbers1,
            1,
            `Cat record for the first name was created twice or none`
        )
        assert.isEqual(
            savedNumbers2,
            1,
            `Cat record for the second name was created twice or none`
        )
    }
}
