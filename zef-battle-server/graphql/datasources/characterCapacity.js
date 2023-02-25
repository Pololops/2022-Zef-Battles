import { BatchedSQLDataSource } from '@nic-jennings/sql-datasource'

const TTL = 1 // Time To Live: 1 minute

class CharacterCapacity extends BatchedSQLDataSource {
	tableName = 'character_has_capacity'

	constructor(options) {
		super(options)
		this.connection = options.knexConfig.connection
	}

	async findByPk(id) {
		return this.db.query
			.connection(this.connection)
			.select('*')
			.from(this.tableName)
			.where({ id })
			.cache(TTL)
	}

	async findCapacityCharacters(capacityId) {
		return this.db.query
			.connection(this.connection)
			.select('*')
			.from(this.tableName)
			.where({ capacity_id: capacityId })
			.cache(TTL)
	}

	async findCharacterCapacities(characterId) {
		return this.db.query
			.connection(this.connection)
			.select('*')
			.from(this.tableName)
			.where({ character_id: characterId })
			.cache(TTL)
	}

	// async insert(capacity) {
	// 	return this.knex(this.tableName)
	// 		.connection(this.connection)
	// 		.insert(capacity)
	// 		.returning('*')
	// }

	// async update(id, updates) {
	// 	return this.knex(this.tableName)
	// 		.connection(this.connection)
	// 		.where({ id })
	// 		.update(updates)
	// 		.returning('*')
	// }

	// async delete(id) {
	// 	return this.knex(this.tableName)
	// 		.connection(this.connection)
	// 		.where({ id })
	// 		.del()
	// }
}

export default CharacterCapacity
