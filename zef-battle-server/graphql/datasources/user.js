import { BatchedSQLDataSource } from '@nic-jennings/sql-datasource'

const TTL = 1 // Time To Live: 1 minute

class User extends BatchedSQLDataSource {
	tableName = 'user'

	constructor(options) {
		super(options)
		this.connection = options.knexConfig.connection
	}

	async findAll() {
		return this.db.query
			.connection(this.connection)
			.select('*')
			.from(this.tableName)
			.cache(TTL)
	}

	async findByPk(id) {
		return this.db.query
			.connection(this.connection)
			.select('*')
			.from(this.tableName)
			.where({ id })
			.cache(TTL)
	}

	async findByName(name) {
		return this.db.query
			.connection(this.connection)
			.select('*')
			.from(this.tableName)
			.where({ name })
			.cache(TTL)
	}

	async isUnique({ id, name }) {
		return this.db.query
			.connection(this.connection)
			.select('*')
			.from(this.tableName)
			.where({ name })
			.andWhereNot({ id })
			.cache(TTL)
	}

	async insert(user) {
		return this.db.write
			.connection(this.connection)
			.insert(user)
			.into(this.tableName)
			.returning('*')
	}

	async update(id, updates) {
		return this.db.write
			.connection(this.connection)
			.from(this.tableName)
			.where({ id })
			.update(updates)
			.returning('*')
	}

	async delete(id) {
		return this.db.write
			.connection(this.connection)
			.from(this.tableName)
			.where({ id })
			.del()
	}
}

export default User
