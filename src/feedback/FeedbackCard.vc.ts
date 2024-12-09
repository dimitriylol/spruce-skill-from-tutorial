import {
    AbstractViewController,
    ViewControllerOptions,
    Card,
    CardViewController,
    buildForm,
    FormViewController,
} from '@sprucelabs/heartwood-view-controllers'
import { buildSchema } from '@sprucelabs/schema'

export default class FeedbackCardViewController extends AbstractViewController<Card> {
    public static id = 'feedback-card'
    private cardVc: CardViewController
    protected formVc: FormViewController<FeedbackFormSchemaType>
    private onSubmit: OnFeedbackSubmitHandler | undefined

    public constructor(options: ViewControllerOptions & FeedbackCardOptions) {
        super(options)
        this.onSubmit = options.onSubmit
        this.formVc = this.FormVc()
        this.cardVc = this.CardVc()
    }

    private CardVc(): CardViewController {
        return this.Controller('card', {
            header: {
                title: 'Tell me about cats',
            },
            body: {
                sections: [
                    {
                        text: {
                            content:
                                'We love cats and appreciate your stories about them.',
                        },
                    },
                    {
                        form: this.formVc.render(),
                    },
                ],
            },
        })
    }

    private FormVc(): FormViewController<FeedbackFormSchemaType> {
        return this.Controller(
            'form',
            buildForm({
                schema: feedbackFormSchema,
                shouldShowCancelButton: false,
                onSubmit: this.formVcSubmit.bind(this),
                sections: [
                    {
                        fields: [
                            {
                                name: 'feedback',
                                label: 'Story of your cat',
                                renderAs: 'textarea',
                            },
                        ],
                    },
                ],
            })
        )
    }

    private async formVcSubmit() {
        const feedback = this.formVc.getValue('feedback')
        try {
            this.cardVc.setIsBusy(true)
            const client = await this.connectToApi()
            await client.emitAndFlattenResponses(
                'twelvebit.feedbackevent::v2024_12_06',
                {
                    payload: {
                        feedback,
                    },
                }
            )
            await this.alert({
                title: 'Thanks!',
                message: 'Your feedback has been submitted',
                style: 'success',
            })
            await this.onSubmit?.()
        } catch (err: any) {
            this.log.error('Failed to submit feedback', err)
            await this.alert({
                title: 'Oops',
                message: err.message ?? 'Something went wrong',
                style: 'error',
            })
        } finally {
            this.cardVc.setIsBusy(false)
        }
    }

    public render() {
        return this.cardVc.render()
    }
}

const feedbackFormSchema = buildSchema({
    id: 'feedback-form',
    fields: {
        feedback: {
            type: 'text',
            isRequired: true,
            label: 'Feedback',
        },
    },
})

type FeedbackFormSchemaType = typeof feedbackFormSchema

type OnFeedbackSubmitHandler = () => void | Promise<void>

interface FeedbackCardOptions {
    onSubmit: OnFeedbackSubmitHandler
}
