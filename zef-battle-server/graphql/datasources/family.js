import { SQLDataSource } from 'datasource-sql'

const TTL = 1 // Time To Live: 1 minute

class Family extends SQLDataSource {
	tableName = 'family'

	constructor(options) {
		super({ client: options.dbConfig.client })
		this.connection = options.dbConfig.connection
		this.initialize({ cache: options.cache })
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

	async findAllByUserId(userId) {
		return this.db.query
			.connection(this.connection)
			.select('*')
			.from(this.tableName)
			.where('user_id', userId)
			.cache(TTL)
	}

	async insert(family) {
		return this.knex(this.tableName)
			.connection(this.connection)
			.insert(family)
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

export default Family
