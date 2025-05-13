const { default: mongoose } = require("mongoose");

const InvitationSchema = new mongoose.Schema({
    token: {
        type: String,
        required: true,
        unique: true
    },

    applicationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SmallApplication',
        required: true
    },

    expiresAt: {
        type: Date,
        required: true
    },

    used: {
        type: Boolean,
        default: false
    }
}, {timestamps: true}

);

InvitationSchema.index({token: 1});
InvitationSchema.index({expiresAt: -1}, {expireAfterSeconds: 0});

InvitationSchema.set('toJSON', {
    transform: (document, returnedObject) =>{
        delete returnedObject._v;
    }
});

module.exports = mongoose.model('Invitation', InvitationSchema);