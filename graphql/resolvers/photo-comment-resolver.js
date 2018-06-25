import PhotoComment from '../../models/photo-comment';
import { requireAuth } from '../../services/auth';
import Request from '../../models/request';
import Photo from '../../models/photo';


export default {

    getPhotoComments: async (_, args, { user }) => {
        try{
            await requireAuth(user);
            let photos = await Photo.findOne({_id:args.photo});
            await Photo.findByIdAndUpdate( args.photo , {view: parseInt(photos.view)+1});
            return PhotoComment.find({photo: args.photo})
        } catch (error){
            throw error;
        }
    },

    addPhotoComment: async (_, args, { user }) => {
        try {
         // await requireAuth(user);
          const duserid = user? user._id: user;
          if(duserid.toString() != args.photoCreator.toString()){
              await Request.create({receiverUser:args.photoCreator, senderUser:duserid,
                                    photo:args.photo, status:"Pending", request_type:"Comment"});
          }
          return PhotoComment.create({ ...args, user: duserid });
        } catch (error) {
          throw error;
        }
      },

    deletePhotoComment: async (_, { _id }, { user }) => {
        try {
            await requireAuth(user);
            const comment = await PhotoComment.findOne({ _id, user: user._id});

            if(!comment){
                throw new Error('Comment Not found!');
            }
            await comment.remove();
            return {
                message: 'Deleted Successfully!'
            }
        } catch (error) {
            throw error;
        }
    }

}