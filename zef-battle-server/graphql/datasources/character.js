import { SQLDataSource } from 'datasource-sql'

const TTL = 1 // Time To Live: 1 minute

class Character extends SQLDataSource {
	tableName = 'character'

	constructor(config) {
		super({ client: config.client })
		this.connection = config.connection
	}

	async findAll() {
		return this.knex
			.connection(this.connection)
			.select('*')
			.from(this.tableName)
			.cache(TTL)
	}

	async findByPk(id) {
		return this.knex
			.connection(this.connection)
			.select('*')
			.from(this.tableName)
			.where({ id })
			.cache(TTL)
	}

	async findByFamilyId(familyId) {
		return this.knex
			.connection(this.connection)
			.select('*')
			.from(this.tableName)
			.where('family_id', familyId)
			.cache(TTL)
	}

	async insert(character) {
		return this.knex(this.tableName)
			.connection(this.connection)
			.insert(character)
			.returning('*')
	}

	async update(id, updates) {
		return this.knex(this.tableName)
			.connection(this.connection)
			.where({ id })
			.update(updates)
			.returning('*')
	}

	async delete(id) {
		return this.knex(this.tableName)
			.connection(this.connection)
			.where({ id })
			.del()
	}
}

export default Character
