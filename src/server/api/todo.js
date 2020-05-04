import express from 'express';
import ToDoItem from '../model/todo';
import { logMiddleware } from '../middleware';

const toDoRouter = express.Router();

toDoRouter.param('id', (req, res, next, id) => {
    req.todo = {
        id: id,
    };
    next();
});

toDoRouter
    .route('/lists')
    .all(logMiddleware)
    .get((req, res) => {
        ToDoItem.find({}, null, { sort: { createdAt: -1 } }, (error, todos) => {
            if (error) {
                return res.status(500).send({ error });
            }
            res.send(todos);
        });
    });

toDoRouter
    .route('/list/:id')
    .all(logMiddleware)
    .get((req, res) => {
        res.json({ id: req.todo.id });
    })
    .post(function (req, res) {
        const text = req.body ? req.body.item || null : null;
        if (text && text.trim() !== '') {
            const time = Date.now();
            const newItem = new ToDoItem({
                text,
                completed: false,
                createdAt: time,
                updatedAt: time,
            });
            newItem.save((error, item) => {
                if (error) {
                    return res.status(500).send({ error });
                }
                res.send(item);
            });
        } else {
            res.status(500).send({ error: 'Text should be present' });
        }
    })
    .put((req, res) => {
        if (req.body && req.todo.id) {
            const { completed, text } = req.body;
            return ToDoItem.findOneAndUpdate(
                { _id: req.todo.id },
                { completed, text, updatedAt: Date.now() },
                { new: true, omitUndefined: true },
                (error, item) => {
                    if (error) {
                        return res.status(500).send({ error });
                    }
                    res.send(item);
                },
            );
        }
        res.status(500).send({ error: 'Body should be present' });
    })
    .delete((req, res) => {
        if (req.todo.id) {
            return ToDoItem.deleteOne({ _id: req.todo.id }, (error) => {
                if (error) {
                    return res.status(500).send({ error });
                }
                res.send({ status: true });
            });
        }
        res.status(500).send({ error: 'Body should be present' });
    });

export default toDoRouter;
