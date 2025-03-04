import mongoose from 'mongoose';

const skillsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minlength: [2, 'Title must be at least 2 characters long'],
    },
    proficiency: {
        type: String,
        required: true
    },
    svg: {
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    }
})

export const Skills = mongoose.model('Skills', skillsSchema);