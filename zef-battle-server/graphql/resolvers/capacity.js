export default {
	capacity_characters: async (parent, _, { dataSources }) => {
		return await dataSources.characterCapacity.findCapacityCharacters(parent.id)
	},
}
