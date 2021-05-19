import models from '../models/index.js'
import { groups } from '../constants/group.js'

const createGroups = async () => {
    try {
        const createdGroups = await models.Group.create(groups)
        return createdGroups
    }
    catch (err) {
        throw err
    }
}

const areGroupsAvailable = async () => {
    try {
        const groups = await models.Group.find({})
        if (groups.length === 0) {
            // if groups are unavailable, create groups from the available groups array
            await createGroups().catch((err) => {
                throw err
            })
            return true
        }
        return true
    }
    catch (err) {
        throw new Error('Error in validating groups !')
    }
}

export { areGroupsAvailable }