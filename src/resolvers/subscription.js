// subscription models
const subscriptions = {
    messages: {
        subscribe(parent, args, { isAuth, pubsub }) {
            if (!isAuth) {
                throw new Error('Unauthorized Access !')
            }
            return pubsub.asyncIterator('messages');
        }
    }
}

export default subscriptions