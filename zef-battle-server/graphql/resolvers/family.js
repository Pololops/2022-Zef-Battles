export default {
	characters: async (parent, __, { dataSources }) => {
		return await dataSources.character.findAllByFamilyId(parent.id)
	},
}
