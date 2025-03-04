import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
    senderName: {
        type: String,
        minlength: [3, 'Name must be at least 3 characters long'],
        required: true
    },
    subject: {
        type: String,
        required: true,
        minlength: [5, 'Subject must be at least 5 characters long']
    },
    message: {
        type: String,
        required: true,
        minlength: [5, 'Message must be at least 5 characters long']
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

export const Message = mongoose.model('Message', messageSchema);