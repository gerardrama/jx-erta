import {TaskActivity} from "../models/TaskActivity";
import {getCurrentUser} from "../service/currentUser";

export const taskActivityAudit = async (req, res) => {
    const currentUser = await getCurrentUser(req);

    const oldTask = req.body.oldTask;

    delete req.body.activity;
    delete req.body.oldTask;

    if (currentUser) {
        const params: Map<string, string> = req.body;

        try {
            for (const key of Object.keys(params)) {
                await TaskActivity.create({
                    editorId: currentUser.id,
                    taskId: oldTask.id,
                    activity: 'update',
                    field: key,
                    oldValue: oldTask[key]?.toString() || '',
                    newValue: params[key]?.toString() || ''
                });
            }

            return res.status(200).json({message: 'Task activity recorded successfully'});
        } catch (error) {
            return res.status(500).json({error: 'An error occurred while recording task activity', details: error});
        }

    } else {
        return res.status(401).json({message: 'Current user is missing to audit'});
    }
};
