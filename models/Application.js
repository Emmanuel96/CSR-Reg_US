const mongoose = require('mongoose');

const ApplicationSchema = new mongoose.Schema({
    owner: {
        type: String,
        ref: 'User'
    },

    scores: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Score'
    }],

    contact_person: {
        type: String
    },

    organisation_name: {
        type: String
    },

    organisation_address: {
        type: String
    },

    telephone_number: {
        type: String
    },

    organisation_nationality: {
        type: String
    },

    postal_code: {
        type: String,
    },

    email_address: {
        type: String,
        unique: true
    },

    mobile_number: {
        type: String,
    },

   soleTraderMicro: {
        type: String
    },

    charity: {
        type: String
    },

    company_details_completed: Boolean,

    introduction: {
        type: String
    },

    introduction_completed: Boolean,

    env_energy: {
        type: String
    },

    env_energy_completed: Boolean,

    env_natural_resource: {
        type: String,
    },

    env_natural_resource_completed: Boolean,

    env_travel: {
        type: String,
    },

    env_travel_completed: Boolean,

    env_supply_chain_management: {
        type: String,
    },

    env_supply_chain_management_completed: Boolean,

    env_waste: {
        type: String,
    },

    env_waste_completed: Boolean,

    workplace: {
        type: String
    },

    workplace_completed: Boolean,

    community: {
        type: String
    },

    community_completed: Boolean,

    philanthropy: {
        type: String
    },

    philanthropy_completed: Boolean,

    phil_other_information: {
        type: String
    },

    further_info_completed: Boolean,

    phil_future_planning: {
        type: String
    },

    assessments_and_tips_completed: Boolean,

    finished: Boolean,

    scoredByAssessors: Boolean,

    submission_date: {
        type: String
    }
});

ApplicationSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Application', ApplicationSchema);