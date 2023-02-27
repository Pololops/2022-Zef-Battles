import familyMutations from './familyMutation.js'
import characterMutations from './characterMutation.js'
import capacityMutations from './capacityMutation.js'
import userMutations from './userMutation.js'

export default {
	...familyMutations,
	...characterMutations,
	...capacityMutations,
	...userMutations
}
