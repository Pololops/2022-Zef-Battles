export default {
	family: async (parent, _, { dataSources }) => {
		const family = await dataSources.family.findByPk(parent.family_id)
		return family[0];
	},
}
