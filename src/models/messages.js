import mongoose from 'mongoose';
const MessagesSchema = new mongoose.Schema(
    {
        body: {
            type: String,
            required: true
        },
        sender: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        group: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Group'
        }
    },
    {
        timestamps: true
    }
);
const Messages = mongoose.model('Messages', MessagesSchema);
export default Messages;