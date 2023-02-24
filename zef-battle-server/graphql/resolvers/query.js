export default {
	families: async (_, __, { dataSources }) => {
		return await dataSources.family.findAll()
	},

	family: async (_, { id }, { dataSources }) => {
		const family = await dataSources.family.findByPk(id)
		return family[0]
	},

	character: async (_, { id }, { dataSources }) => {
		const character = await dataSources.character.findByPk(id)
		return character[0]
	},

	capacities: async (_, __, { dataSources }) => {
		return await dataSources.capacity.findAll()
	},

	capacity: async (_, { id }, { dataSources }) => {
		const capacity = await dataSources.capacity.findByPk(id)
		return capacity[0]
	},
}
