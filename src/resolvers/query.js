// fetch list of groups using pagination
const groups = async (parent, { page, limit }, { req, models }) => {
    if (!req.isAuth) {
        throw new Error('Unauthorized Access !')
    }
    const groups = await models.Group.find().skip((page - 1) * limit).limit(limit)
    return groups
}

// fetch list of users using pagination
const users = async (parent, { page, limit }, { req, models }) => {
    if (!req.isAuth) {
        throw new Error('Unauthorized Access !')
    }
    const users = await models.User.find().skip((page - 1) * limit).limit(limit)
    return users
}

export default { groups, users }