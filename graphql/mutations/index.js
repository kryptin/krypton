import group from './group';
import comment from './comment';
import event from './event';
import auth from './auth/auth';



export default {
    ...group,
    ...comment,
    ...event,
    ...auth
};
