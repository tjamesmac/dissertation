import mongoose, { Schema } from 'mongoose';

interface IUser extends mongoose.Document {
  username: string;
}
const userSchema: Schema = new mongoose.Schema({
  username: {
    
  },
});

const User: any = mongoose.model('User', userSchema);

export default User;
