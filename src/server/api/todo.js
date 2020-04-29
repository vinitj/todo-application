import express from 'express';
import ToDoItem from '../model/todo';

const toDoRouter = express.Router();

function callLog(req, res, next) {
    console.log(`Api Call - ${req.url} is called at ${Date.now()}`);
    next();
}

toDoRouter.param('id', (req, res, next, id) => {
    req.todo = {
        id: id,
    };
    next();
});

toDoRouter
    .route('/lists')
    .all(callLog)
    .get((req, res, next) => {
        ToDoItem.find({}, null, { sort: { createdAt: -1 } }, (error, todos) => {
            if (error) {
                return res.status(500).send({ error });
            }
            res.send(todos);
        });
    });

toDoRouter
    .route('/list/:id')
    .all(callLog)
    .get((req, res, next) => {
        res.json({ id: req.todo.id });
    })
    .post(function (req, res, next) {
        const text = req.body ? req.body.item || null : null;
        if (text && text.trim() !== '') {
            const time = Date.now();
            const newItem = new ToDoItem({ text, completed: false, createdAt: time, updatedAt: time });
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
    .put((req, res, next) => {
        if (req.body && req.todo.id) {
            const { _id, completed, text } = req.body;
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
    .delete((req, res, next) => {
        if (req.todo.id) {
            return ToDoItem.deleteOne({ _id: req.todo.id }, (error, item) => {
                if (error) {
                    return res.status(500).send({ error });
                }
                res.send({ status: true });
            });
        }
        res.status(500).send({ error: 'Body should be present' });
    });

export default toDoRouter;
