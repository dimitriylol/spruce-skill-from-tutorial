import {
    buildPermissionReference,
    EventSignature,
} from '@sprucelabs/mercury-types'
import '#spruce/permissions/permissions.types'
import '@sprucelabs/mercury-core-events'

type Options = Omit<
    EventSignature,
    | 'responsePayloadSchema'
    | 'emitPayloadSchema'
    | 'listenPermissionContract'
    | 'emitPermissionContract'
>

const eventOptions: Options = {
    isGlobal: true,
    emitPermissions: buildPermissionReference('twelvebit.twelvebit', [
        'can-submit-cat-values',
    ]),
}

export default eventOptions