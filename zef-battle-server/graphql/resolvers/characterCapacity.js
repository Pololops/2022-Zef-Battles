export default {
	capacity: async (parent, _, { dataSources }) => {
		const capacity = await dataSources.capacity.findByPk(parent.capacity_id)
		return capacity[0]
	},

	character: async (parent, _, { dataSources }) => {
		const character = await dataSources.character.findByPk(parent.character_id)
		return character[0]
	},
}
