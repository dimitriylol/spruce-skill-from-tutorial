import { buildPermissionContract } from '@sprucelabs/mercury-types'

const twelvebitPermissions = buildPermissionContract({
    id: 'twelvebit',
    name: ' twelvebit',
    description: '',
    requireAllPermissions: false,
    permissions: [
        {
            id: 'can-submit-feedback',
            name: 'Can submit feedback',

            defaults: {
                loggedIn: {
                    default: true,
                },
            },
            requireAllStatuses: false,
        },
        {
            id: 'can-submit-cat-values',
            name: 'Can submit cat values',
            description: 'This permission allows a user to submit cat values.',
            defaults: {
                loggedIn: {
                    default: true,
                },
            },
            requireAllStatuses: false,
        },
    ],
})

export default twelvebitPermissions
