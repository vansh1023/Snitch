import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },

    contact: {
        type: Number,
        required: false
    },
    password: {
        type: String,
        required: function(){
            return !this.googleId
        }
    },
    role: {
        type: String,
        enum: ["buyer", "seller"],
        default: "buyer"
    },
    googleId: {
        type: String
    }
});

userSchema.pre('save', async function() {
    if (!this.isModified('password')) return;
    this.password = await bcrypt.hash(this.password, 10);
});


userSchema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password, this.password)
}


// userSchema.index({ email: 1 }, { unique: true });

export default mongoose.model('users', userSchema);
