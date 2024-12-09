import RootSkillViewController from '../../skillViewControllers/Root.svc'
import ValuesSkillViewController from '../../values/Values.svc'
import FeedbackCardViewController from '../../feedback/FeedbackCard.vc'

import '@sprucelabs/heartwood-view-controllers'

const vcs = {
    RootSkillViewController,
    ValuesSkillViewController,
    FeedbackCardViewController,
}

export const pluginsByName = {
}



type LoadOptions<Args extends Record<string,any>[]> = Args[0]['args'] extends Record<string, any> ? Args[0]['args'] : Record<never, any>

declare module '@sprucelabs/heartwood-view-controllers/build/types/heartwood.types' {
	interface SkillViewControllerMap {
		'twelvebit.root': RootSkillViewController
		'twelvebit.values': ValuesSkillViewController
	}

	interface SkillViewControllerArgsMap {
		'twelvebit.root': LoadOptions<Parameters<RootSkillViewController['load']>>
		'twelvebit.values': LoadOptions<Parameters<ValuesSkillViewController['load']>>
	}

	interface ViewControllerMap {
		'twelvebit.feedback-card': FeedbackCardViewController
		'twelvebit.root': RootSkillViewController
		'twelvebit.values': ValuesSkillViewController
	}

    interface ViewControllerOptionsMap {
		'twelvebit.feedback-card': ConstructorParameters<typeof FeedbackCardViewController>[0]
	}

	interface ViewControllerPlugins {
	}

	interface AppControllerMap {
	}
}


//@ts-ignore
if(typeof heartwood === 'function') { 
	//@ts-ignore
	heartwood({ vcs, pluginsByName }) 
}

export default vcs


export const App = undefined
