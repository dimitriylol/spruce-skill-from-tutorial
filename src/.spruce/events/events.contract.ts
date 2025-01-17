import { coreEventContracts } from '@sprucelabs/mercury-core-events'

import heartwoodDidRegisterSkillViewsEventContract_v2021_02_11, { DidRegisterSkillViewsEventContract as HeartwoodDidRegisterSkillViewsEventContract_v2021_02_11  } from '#spruce/events/heartwood/didRegisterSkillViews.v2021_02_11.contract'
import twelvebitFeedbackeventEventContract_v2024_12_06, { FeedbackeventEventContract as TwelvebitFeedbackeventEventContract_v2024_12_06  } from '#spruce/events/twelvebit/feedbackevent.v2024_12_06.contract'
import heartwoodGenerateUrlEventContract_v2021_02_11, { GenerateUrlEventContract as HeartwoodGenerateUrlEventContract_v2021_02_11  } from '#spruce/events/heartwood/generateUrl.v2021_02_11.contract'
import heartwoodGetActiveThemeEventContract_v2021_02_11, { GetActiveThemeEventContract as HeartwoodGetActiveThemeEventContract_v2021_02_11  } from '#spruce/events/heartwood/getActiveTheme.v2021_02_11.contract'
import twelvebitGetCatEventContract_v2024_12_06, { GetCatEventContract as TwelvebitGetCatEventContract_v2024_12_06  } from '#spruce/events/twelvebit/getCat.v2024_12_06.contract'
import heartwoodGetSkillViewsEventContract_v2021_02_11, { GetSkillViewsEventContract as HeartwoodGetSkillViewsEventContract_v2021_02_11  } from '#spruce/events/heartwood/getSkillViews.v2021_02_11.contract'
import heartwoodListViewsEventContract_v2021_02_11, { ListViewsEventContract as HeartwoodListViewsEventContract_v2021_02_11  } from '#spruce/events/heartwood/listViews.v2021_02_11.contract'
import heartwoodRegisterDashboardCardsEventContract_v2021_02_11, { RegisterDashboardCardsEventContract as HeartwoodRegisterDashboardCardsEventContract_v2021_02_11  } from '#spruce/events/heartwood/registerDashboardCards.v2021_02_11.contract'
import heartwoodRegisterSkillViewsEventContract_v2021_02_11, { RegisterSkillViewsEventContract as HeartwoodRegisterSkillViewsEventContract_v2021_02_11  } from '#spruce/events/heartwood/registerSkillViews.v2021_02_11.contract'
import twelvebitSaveCatValuesEventContract_v2024_12_06, { SaveCatValuesEventContract as TwelvebitSaveCatValuesEventContract_v2024_12_06  } from '#spruce/events/twelvebit/saveCatValues.v2024_12_06.contract'
import heartwoodUpsertThemeEventContract_v2021_02_11, { UpsertThemeEventContract as HeartwoodUpsertThemeEventContract_v2021_02_11  } from '#spruce/events/heartwood/upsertTheme.v2021_02_11.contract'

export default [
    heartwoodDidRegisterSkillViewsEventContract_v2021_02_11,
    twelvebitFeedbackeventEventContract_v2024_12_06,
    heartwoodGenerateUrlEventContract_v2021_02_11,
    heartwoodGetActiveThemeEventContract_v2021_02_11,
    twelvebitGetCatEventContract_v2024_12_06,
    heartwoodGetSkillViewsEventContract_v2021_02_11,
    heartwoodListViewsEventContract_v2021_02_11,
    heartwoodRegisterDashboardCardsEventContract_v2021_02_11,
    heartwoodRegisterSkillViewsEventContract_v2021_02_11,
    twelvebitSaveCatValuesEventContract_v2024_12_06,
    heartwoodUpsertThemeEventContract_v2021_02_11,
    ...coreEventContracts,
]

declare module '@sprucelabs/mercury-types/build/types/mercury.types' {
    interface SkillEventSignatures {
    
    'heartwood.did-register-skill-views::v2021_02_11': HeartwoodDidRegisterSkillViewsEventContract_v2021_02_11['eventSignatures']['heartwood.did-register-skill-views::v2021_02_11'],
    
    
    'twelvebit.feedbackevent::v2024_12_06': TwelvebitFeedbackeventEventContract_v2024_12_06['eventSignatures']['twelvebit.feedbackevent::v2024_12_06'],
    
    
    'heartwood.generate-url::v2021_02_11': HeartwoodGenerateUrlEventContract_v2021_02_11['eventSignatures']['heartwood.generate-url::v2021_02_11'],
    
    
    'heartwood.get-active-theme::v2021_02_11': HeartwoodGetActiveThemeEventContract_v2021_02_11['eventSignatures']['heartwood.get-active-theme::v2021_02_11'],
    
    
    'twelvebit.get-cat::v2024_12_06': TwelvebitGetCatEventContract_v2024_12_06['eventSignatures']['twelvebit.get-cat::v2024_12_06'],
    
    
    'heartwood.get-skill-views::v2021_02_11': HeartwoodGetSkillViewsEventContract_v2021_02_11['eventSignatures']['heartwood.get-skill-views::v2021_02_11'],
    
    
    'heartwood.list-views::v2021_02_11': HeartwoodListViewsEventContract_v2021_02_11['eventSignatures']['heartwood.list-views::v2021_02_11'],
    
    
    'heartwood.register-dashboard-cards::v2021_02_11': HeartwoodRegisterDashboardCardsEventContract_v2021_02_11['eventSignatures']['heartwood.register-dashboard-cards::v2021_02_11'],
    
    
    'heartwood.register-skill-views::v2021_02_11': HeartwoodRegisterSkillViewsEventContract_v2021_02_11['eventSignatures']['heartwood.register-skill-views::v2021_02_11'],
    
    
    'twelvebit.save-cat-values::v2024_12_06': TwelvebitSaveCatValuesEventContract_v2024_12_06['eventSignatures']['twelvebit.save-cat-values::v2024_12_06'],
    
    
    'heartwood.upsert-theme::v2021_02_11': HeartwoodUpsertThemeEventContract_v2021_02_11['eventSignatures']['heartwood.upsert-theme::v2021_02_11'],
    
    }
}