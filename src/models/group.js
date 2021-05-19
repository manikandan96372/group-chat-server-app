import mongoose from 'mongoose';
const GroupSchema = new mongoose.Schema(
    {
        groupname: {
            type: String,
            required: true,
            index: { unique: true }
        },
        description: {
            type: String,
            required: false
        }
    },
    {
        timestamps: true
    }
);
const Group = mongoose.model('Group', GroupSchema);
export default Group;