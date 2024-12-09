import {
    AbstractStore,
    UniversalStoreOptions,
    PrepareOptions,
    PrepareResults,
    generateId,
} from '@sprucelabs/data-stores'
import {
    buildSchema,
    dropFields,
    makeFieldsOptional,
    SchemaValues,
    SchemaFieldNames,
} from '@sprucelabs/schema'
import { StoreSeedOptions } from '@sprucelabs/spruce-test-fixtures'
import catValuesSchema from '#spruce/schemas/twelvebit/v2024_12_06/catValues.schema'

export default class CatsStore extends AbstractStore<
    FullSchema,
    CreateSchema,
    UpdateSchema,
    DatabaseSchema
> {
    public name = 'Cats'
    protected collectionName = 'cats'

    protected createSchema = createSchema
    protected updateSchema = updateSchema
    protected fullSchema = fullSchema
    protected databaseSchema = databaseSchema

    public static Store(options: CatStoreOptions & UniversalStoreOptions) {
        return new this(options.db)
    }

    public async initialize(): Promise<void> {
        await this.db.syncUniqueIndexes(this.collectionName, [
            ['source.personId'],
        ])
    }

    protected async willCreate(
        values: CreateCat
    ): Promise<Omit<DatabaseCat, 'id'>> {
        return values
    }

    protected async willUpdate(values: UpdateCat) {
        return values as Partial<DatabaseCat>
    }

    protected async prepareRecord<
        IncludePrivateFields extends boolean,
        F extends SchemaFieldNames<FullSchema> = SchemaFieldNames<FullSchema>,
    >(
        record: DatabaseCat,
        _options?: PrepareOptions<IncludePrivateFields, FullSchema, F>
    ) {
        return record as PrepareResults<FullSchema, IncludePrivateFields>
    }

    public async seed(options: StoreSeedOptions) {
        const { totalToSeed, TestClass } = options
        const personId = TestClass.fakedPerson.id

        await Promise.all(
            Array.from({ length: totalToSeed }).map(() =>
                this.createOne({
                    name: generateId(),
                    values: generateId(),
                    source: {
                        personId,
                    },
                })
            )
        )
    }
}

// The structure of the data you'll be returning from finds
const fullSchema = catValuesSchema

// The values you will accept when creating a record
const createSchema = buildSchema({
    id: 'createCat',
    fields: {
        ...dropFields(fullSchema.fields, ['id']),
    },
})

// The values you will accept when updating a record
const updateSchema = buildSchema({
    id: 'updateCat',
    fields: {
        ...makeFieldsOptional(dropFields(fullSchema.fields, ['id'])),
    },
})

// The values you will actually save to the databases (in this case, makes id required)
const databaseSchema = buildSchema({
    id: 'databaseCat',
    fields: {
        ...fullSchema.fields,
        id: {
            type: 'id',
            isRequired: true,
        },
    },
})

type FullSchema = typeof fullSchema
type CreateSchema = typeof createSchema
type UpdateSchema = typeof updateSchema
type DatabaseSchema = typeof databaseSchema

// type Cat = SchemaValues<FullSchema>
type CreateCat = SchemaValues<CreateSchema>
type UpdateCat = SchemaValues<UpdateSchema>
type DatabaseCat = SchemaValues<DatabaseSchema>
// type QueryCat = Partial<Cat>

type CatStoreOptions = UniversalStoreOptions
