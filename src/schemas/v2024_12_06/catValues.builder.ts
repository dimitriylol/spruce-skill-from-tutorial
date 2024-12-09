import { buildSchema } from '@sprucelabs/schema'

export default buildSchema({
    id: 'catValues',
    name: 'Cat Values',
    fields: {
        id: {
            type: 'id',
            isRequired: true,
        },
        name: {
            type: 'text',
            label: "Cat's Name",
            isRequired: true,
        },
        values: {
            type: 'text',
            label: "Cat's Values",
            isRequired: true,
        },
        source: {
            type: 'schema',
            isRequired: true,
            options: {
                schema: buildSchema({
                    id: 'catSource',
                    fields: {
                        personId: {
                            type: 'id',
                            isRequired: true,
                        },
                    },
                }),
            },
        },
    },
})
