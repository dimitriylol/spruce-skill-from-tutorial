import {
    AbstractSkillViewController,
    ViewControllerOptions,
    SkillView,
    CardViewController,
    buildForm,
    FormViewController,
    SkillViewControllerLoadOptions,
    Router,
} from '@sprucelabs/heartwood-view-controllers'
import catValuesSchema from '#spruce/schemas/twelvebit/v2024_12_06/catValues.schema'
import { CatValuesSchema } from '../twelvebit.type'

export default class ValuesSkillViewController extends AbstractSkillViewController {
    public static id = 'values'
    protected cardVc: CardViewController
    protected formVc: FormViewController<CatValuesSchema>
    private router?: Router

    public constructor(options: ViewControllerOptions) {
        super(options)
        this.formVc = this.FormVc()
        this.cardVc = this.CardVc()
    }

    private FormVc(): FormViewController<CatValuesSchema> {
        return this.Controller(
            'form',
            buildForm({
                onCancel: async () => {
                    await this.router?.redirect('twelvebit.root')
                },
                onSubmit: this.onSubmitForm.bind(this),
                schema: catValuesSchema,
                sections: [
                    {
                        fields: [
                            'name',
                            {
                                name: 'values',
                                renderAs: 'textarea',
                            },
                        ],
                    },
                ],
            })
        )
    }

    private async onSubmitForm() {
        const client = await this.connectToApi()
        const { name, values } = this.formVc.getValues()
        this.formVc.setIsBusy(true)
        try {
            await client.emitAndFlattenResponses(
                'twelvebit.save-cat-values::v2024_12_06',
                {
                    payload: {
                        cat: { name: name!, values: values! },
                    },
                }
            )
            await this.router?.redirect('twelvebit.root')
        } catch (err: any) {
            this.log.error('Failed to save cat values', err)
            await this.alert({
                style: 'error',
                message: err.message ?? 'Failed to save cat values',
                title: 'Tough luck',
            })
        }
        this.formVc.setIsBusy(false)
    }

    public async load(options: SkillViewControllerLoadOptions) {
        const { router } = options
        this.router = router
        const client = await this.connectToApi()
        const [{ cat }] = await client.emitAndFlattenResponses(
            'twelvebit.get-cat::v2024_12_06'
        )
        await this.formVc.setValues(cat ?? {})
    }

    private CardVc(): CardViewController {
        return this.Controller('card', {
            header: {
                title: "Cat's Values",
            },
            body: {
                sections: [
                    {
                        form: this.formVc.render(),
                    },
                ],
            },
        })
    }

    public render(): SkillView {
        return {
            layouts: [
                {
                    cards: [this.cardVc.render()],
                },
            ],
        }
    }
}
