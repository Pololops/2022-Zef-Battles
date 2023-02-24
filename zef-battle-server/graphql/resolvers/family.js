export default {
	characters: async (parent, _, { dataSources }) => {
		const characters = await dataSources.character.findAllByFamilyId(parent.id)
		return characters
	},
}
