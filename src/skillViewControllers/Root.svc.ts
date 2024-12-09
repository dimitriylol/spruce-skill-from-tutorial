import {
    AbstractSkillViewController,
    ViewControllerOptions,
    SkillView,
    CardViewController,
    SkillViewControllerLoadOptions,
    Router,
} from '@sprucelabs/heartwood-view-controllers'

export default class RootSkillViewController extends AbstractSkillViewController {
    public static id = 'root'
    protected cardVc: CardViewController
    private router?: Router

    public constructor(options: ViewControllerOptions) {
        super(options)
        this.cardVc = this.CardVc()
    }

    private async handleClickFeedback() {
        const feedbackCardVc = this.Controller('twelvebit.feedback-card', {
            onSubmit: () => {
                dialogVc.hide()
            },
        })
        const dialogVc = this.renderInDialog(feedbackCardVc.render())
    }

    private CardVc(): CardViewController {
        return this.Controller('card', {
            header: {
                image: 'https://media.istockphoto.com/id/1443562748/uk/%D1%84%D0%BE%D1%82%D0%BE/%D0%BC%D0%B8%D0%BB%D0%B8%D0%B9-%D1%96%D0%BC%D0%B1%D0%B8%D1%80%D0%BD%D0%B8%D0%B9-%D0%BA%D1%96%D1%82.jpg?s=1024x1024&w=is&k=20&c=CUCKlGqSlq4j328b9SQqUe9bZ_jfRBt1QeaPRHTcHkU=',
            },
            body: {
                sections: [
                    {
                        buttons: [
                            {
                                id: 'members',
                                label: "Cat's Members",
                            },
                            {
                                id: 'values',
                                label: "Cat's Values",
                                onClick: async () => {
                                    await this.router?.redirect(
                                        'twelvebit.values'
                                    )
                                },
                            },
                            {
                                id: 'feedback',
                                label: 'Feedback',
                                onClick: this.handleClickFeedback.bind(this),
                            },
                            {
                                id: 'write',
                                label: 'Write Cat Story',
                                type: 'primary',
                            },
                        ],
                    },
                ],
            },
        })
    }

    public async load(options: SkillViewControllerLoadOptions) {
        const { router } = options
        this.router = router
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

    public async getIsLoginRequired() {
        return true
    }
}
