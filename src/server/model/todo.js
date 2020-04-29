import mongoose from 'mongoose';

const ToDoItem = new mongoose.Schema({
    text: String,
    completed: { type: Boolean, default: false },
    updatedAt: Date,
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export default mongoose.model('ToDoItem', ToDoItem);

export { ToDoItem };
