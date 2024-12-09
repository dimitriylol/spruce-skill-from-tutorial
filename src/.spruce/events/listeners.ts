import { EventFeatureListener } from '@sprucelabs/spruce-event-utils'

const listeners: EventFeatureListener[] = [
    {
        eventName: 'did-boot',
        eventNamespace: 'skill',
        version: 'v2024_12_06',
        callback: require('../../listeners/skill/did-boot.v2024_12_06.listener').default,
        isGlobal: require('../../listeners/skill/did-boot.v2024_12_06.listener').isGlobal,
    },
    {
        eventName: 'feedbackevent',
        eventNamespace: 'twelvebit',
        version: 'v2024_12_06',
        callback: require('../../listeners/twelvebit/feedbackevent.v2024_12_06.listener').default,
        isGlobal: require('../../listeners/twelvebit/feedbackevent.v2024_12_06.listener').isGlobal,
    },
    {
        eventName: 'get-cat',
        eventNamespace: 'twelvebit',
        version: 'v2024_12_06',
        callback: require('../../listeners/twelvebit/get-cat.v2024_12_06.listener').default,
        isGlobal: require('../../listeners/twelvebit/get-cat.v2024_12_06.listener').isGlobal,
    },
    {
        eventName: 'save-cat-values',
        eventNamespace: 'twelvebit',
        version: 'v2024_12_06',
        callback: require('../../listeners/twelvebit/save-cat-values.v2024_12_06.listener').default,
        isGlobal: require('../../listeners/twelvebit/save-cat-values.v2024_12_06.listener').isGlobal,
    },
]

export default listeners
