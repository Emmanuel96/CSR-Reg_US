const SmallApplication = require("../models/SmallApplication");
const mongoose = require("mongoose");
const generatePdf = require("../utils/generatepdf");
const { error } = require("console");
const path = require("path");
const { application } = require("express");

//GET PAGES CONTROLLERS

exports.create_read_only_link = async (req, res) => {
  try {
    if (!req.user?._id) {
      return res.status(401).json({ success: false, error: 'User not authenticated' });
    }
    console.log('User ID from req.user._id:', req.user._id);


    // const userId = req.user._id.toString();
    const userId = new mongoose.Types.ObjectId(req.user._id);

    const application = await SmallApplication.findOne({ owner: userId })
      .sort({ createdAt: -1 })
      .select('_id');

    if (!application) {
      return res.status(404).json({ success: false, error: 'No applications found' });
    }

    const baseUrl = process.env.BASE_URL || 'http://localhost:3000';
    const applicationId = application._id.toString();

    const readOnlyLinks = {
      company_details: `${baseUrl}/company_details?readOnly=true&applicationId=${applicationId}`,
      notes: `${baseUrl}/notes?readOnly=true&applicationId=${applicationId}`,
      application_introduction: `${baseUrl}/application_introduction?readOnly=true&applicationId=${applicationId}`,
      environment_energy: `${baseUrl}/environment_energy?readOnly=true&applicationId=${applicationId}`,
      environment_natural_resource: `${baseUrl}/environment_natural_resource?readOnly=true&applicationId=${applicationId}`,
      environment_travel: `${baseUrl}/environment_travel?readOnly=true&applicationId=${applicationId}`,
      environment_supply_chain_management: `${baseUrl}/environment_supply_chain_management?readOnly=true&applicationId=${applicationId}`,
      environment_waste: `${baseUrl}/environment_waste?readOnly=true&applicationId=${applicationId}`,
      environment_supporting_documents: `${baseUrl}/environment_supporting_documents?readOnly=true&applicationId=${applicationId}`,
      workplace: `${baseUrl}/workplace?readOnly=true&applicationId=${applicationId}`,
      workplace_supporting_documents: `${baseUrl}/workplace_supporting_documents?readOnly=true&applicationId=${applicationId}`,
      community: `${baseUrl}/community?readOnly=true&applicationId=${applicationId}`,
      community_supporting_documents: `${baseUrl}/community_supporting_documents?readOnly=true&applicationId=${applicationId}`,
      philanthropy: `${baseUrl}/philanthropy?readOnly=true&applicationId=${applicationId}`,
      philanthropy_supporting_documents: `${baseUrl}/philanthropy_supporting_documents?readOnly=true&applicationId=${applicationId}`,
      further_information: `${baseUrl}/further_information?readOnly=true&applicationId=${applicationId}`,
      submit: `${baseUrl}/submit?readOnly=true&applicationId=${applicationId}`
    };

    res.status(201).json({
      success: true,
      message: 'Read-only links generated',
      readOnlyLinks
    });

  } catch (err) {
    console.error('Error creating read-only links:', err);
    res.status(500).json({ success: false, message: 'Failed to create read-only links', error: err.message });
  }
};

  exports.submit_link = async (req, res) => {
    try {
      if (!req.user?._id) {
        console.error('No user ID found in request');
        return res.render('error', { error: { message: 'User not authenticated' } });
      }
  
      const userId = req.user._id.toString();
      console.log('Fetching applications for user ID:', userId);
  
      const applications = await SmallApplication.find({ owner: userId })
        .sort({ createdAt: -1 })
        .select('organisation_name _id createdAt');
  
      console.log('Applications:', applications);
  
      const baseUrl = process.env.BASE_URL || 'http://localhost:3000';
  
      const routes = [
        
        'dashboard/others/application_introduction',
        'dashboard/others/company_details',
        'dashboard/others/notes',
        'dashboard/environment/environment_energy',
        'dashboard/environment/environment_natural_resource',
        'dashboard/environment/environment_supply_chain_management',
        'dashboard/environment/environment_supporting_documents',
        'dashboard/environment/environment_waste',
        'dashboard/environment/environment_travel',
        'dashboard/further_information/further_information',
        'dashboard/workplace/workplace',
        'dashboard/workplace/workplace_supporting_documents',
        'dashboard/community/community',
        'dashboard/community/community_supporting_documents',
        'dashboard/philanthropy/philanthropy',
        'dashboard/philanthropy/philanthropy_supporting_documents',
        'dashboard/submit/submit'
      ];
  
      const applicationsWithLinks = applications.map(app => {
        const readOnlyLinks = routes.map(route => {
          const name = route.split('/').slice(-1)[0].replace(/_/g, ' ');
          return {
            name,
            url: `${baseUrl}/${route}/?readOnly=true&applicationId=${app._id}`
          };
        });
  
        return {
          ...app._doc,
          readOnlyLinks
        };
      });

    } catch (error) {
      console.error('Error in submit_link:', error);
      res.render('error', { error: { message: error.message || 'Failed to load submit page' } });
    }
  };


  exports.get_company_details = async (req, res) => {
  const applicationId = req.query.applicationId;

  let application;

 // Check if the request is a read-only view and has an applicationId in the query string
if (req.isReadOnly && applicationId) {
  // Fetch the application directly by its ID (used for readonly links)
  application = await SmallApplication.findOne({ _id: applicationId });

// If the user has a reference to a small business application on their account
} else if (req.user?.smallBusinessApplication) {
  // Fetch that specific application using the reference ID
  application = await SmallApplication.findOne({ _id: req.user.smallBusinessApplication });

// If the user is logged in and we have their user ID
} else if (req.user?._id) {
  // Find the most recently created application owned by the user
  application = await SmallApplication.findOne({ owner: req.user._id }).sort({ createdAt: -1 });

// If none of the above conditions are met (no read-only link, no user, or no application ref)
} else {
  // Redirect the user to the login page (probably not authenticated)
  return res.redirect('/login');
}

  res.render("dashboard/others/company_details", {
    application,
    isReadOnly: req.isReadOnly
  });
};

exports.get_application_introduction = async (req, res) => {
  const applicationId = req.query.applicationId;

  let application;

if (req.isReadOnly && applicationId) {
  application = await SmallApplication.findOne({ _id: applicationId });
} else if (req.user?.smallBusinessApplication) {
  application = await SmallApplication.findOne({ _id: req.user.smallBusinessApplication });
} else if (req.user?._id) {
  application = await SmallApplication.findOne({ owner: req.user._id }).sort({ createdAt: -1 });
} else {
  return res.redirect('/auth/login');
} 
  res.render("dashboard/others/application_introduction", {
    application,
    isReadOnly: req.isReadOnly
  });
};

exports.get_environment_energy = async (req, res) => {
  const applicationId = req.query.applicationId;

  let application;

 if (req.isReadOnly && applicationId) {
  application = await SmallApplication.findOne({ _id: applicationId });
} else if (req.user?.smallBusinessApplication) {
  application = await SmallApplication.findOne({ _id: req.user.smallBusinessApplication });
} else if (req.user?._id) {
  application = await SmallApplication.findOne({ owner: req.user._id }).sort({ createdAt: -1 });
} else {
  return res.redirect('/auth/login');
} 
  res.render("dashboard/environment/environment_energy",  {
    application,
    isReadOnly: req.isReadOnly
  });
};

exports.get_environment_natural_resource = async(req, res) => {
  const applicationId = req.query.applicationId;

  let application;

  if (req.isReadOnly && applicationId) {
  application = await SmallApplication.findOne({ _id: applicationId });
} else if (req.user?.smallBusinessApplication) {
  application = await SmallApplication.findOne({ _id: req.user.smallBusinessApplication });
} else if (req.user?._id) {
  application = await SmallApplication.findOne({ owner: req.user._id }).sort({ createdAt: -1 });
} else {
  return res.redirect('/auth/login');
} 
  res.render("dashboard/environment/environment_natural_resource",  {
    application,
    isReadOnly: req.isReadOnly
  });
};

exports.get_environment_travel = async (req, res) => {
  const applicationId = req.query.applicationId;

  let application;

  if (req.isReadOnly && applicationId) {
  application = await SmallApplication.findOne({ _id: applicationId });
} else if (req.user?.smallBusinessApplication) {
  application = await SmallApplication.findOne({ _id: req.user.smallBusinessApplication });
} else if (req.user?._id) {
  application = await SmallApplication.findOne({ owner: req.user._id }).sort({ createdAt: -1 });
} else {
  return res.redirect('/auth/login');
} 
  res.render("dashboard/environment/environment_travel",  {
    application,
    isReadOnly: req.isReadOnly
  });
};

exports.get_environment_supply_chain_management = async (req, res) => {
  const applicationId = req.query.applicationId;

  let application;

  if (req.isReadOnly && applicationId) {
  application = await SmallApplication.findOne({ _id: applicationId });
} else if (req.user?.smallBusinessApplication) {
  application = await SmallApplication.findOne({ _id: req.user.smallBusinessApplication });
} else if (req.user?._id) {
  application = await SmallApplication.findOne({ owner: req.user._id }).sort({ createdAt: -1 });
} else {
  return res.redirect('/auth/login');
} 
  res.render("dashboard/environment/environment_supply_chain_management",  {
    application,
    isReadOnly: req.isReadOnly
  });
};

exports.get_environment_waste = async (req, res) => {
  const applicationId = req.query.applicationId;

  let application;

  if (req.isReadOnly && applicationId) {
  application = await SmallApplication.findOne({ _id: applicationId });
} else if (req.user?.smallBusinessApplication) {
  application = await SmallApplication.findOne({ _id: req.user.smallBusinessApplication });
} else if (req.user?._id) {
  application = await SmallApplication.findOne({ owner: req.user._id }).sort({ createdAt: -1 });
} else {
  return res.redirect('/auth/login');
} 
  res.render("dashboard/environment/environment_waste",  {
    application,
    isReadOnly: req.isReadOnly
  });
};

exports.get_environment_supporting_documents = async (req, res) => {
  const applicationId = req.query.applicationId;

  let application;

  if (req.isReadOnly && applicationId) {
  application = await SmallApplication.findOne({ _id: applicationId });
} else if (req.user?.smallBusinessApplication) {
  application = await SmallApplication.findOne({ _id: req.user.smallBusinessApplication });
} else if (req.user?._id) {
  application = await SmallApplication.findOne({ owner: req.user._id }).sort({ createdAt: -1 });
} else {
  return res.redirect('/auth/login');
} 
  res.render("dashboard/environment/environment_supporting_documents",  {
    application,
    isReadOnly: req.isReadOnly
  });
};

exports.get_notes = async (req, res) => {
  const applicationId = req.query.applicationId;

  let application;

  if (req.isReadOnly && applicationId) {
  application = await SmallApplication.findOne({ _id: applicationId });
} else if (req.user?.smallBusinessApplication) {
  application = await SmallApplication.findOne({ _id: req.user.smallBusinessApplication });
} else if (req.user?._id) {
  application = await SmallApplication.findOne({ owner: req.user._id }).sort({ createdAt: -1 });
} else {
  return res.redirect('/auth/login');
} 
  res.render("dashboard/others/notes",  {
    application,
    isReadOnly: req.isReadOnly
  });
};

exports.get_workplace = async (req, res) => {
  const applicationId = req.query.applicationId;

  let application;

  if (req.isReadOnly && applicationId) {
  application = await SmallApplication.findOne({ _id: applicationId });
} else if (req.user?.smallBusinessApplication) {
  application = await SmallApplication.findOne({ _id: req.user.smallBusinessApplication });
} else if (req.user?._id) {
  application = await SmallApplication.findOne({ owner: req.user._id }).sort({ createdAt: -1 });
} else {
  return res.redirect('/auth/login');
} 
  res.render("dashboard/workplace/workplace",  {
    application,
    isReadOnly: req.isReadOnly
  });
};

exports.get_workplace_supporting_documents = async (req, res) => {
  const applicationId = req.query.applicationId;

  let application;

  if (req.isReadOnly && applicationId) {
  application = await SmallApplication.findOne({ _id: applicationId });
} else if (req.user?.smallBusinessApplication) {
  application = await SmallApplication.findOne({ _id: req.user.smallBusinessApplication });
} else if (req.user?._id) {
  application = await SmallApplication.findOne({ owner: req.user._id }).sort({ createdAt: -1 });
} else {
  return res.redirect('/auth/login');
} 
  res.render("dashboard/workplace/workplace_supporting_documents",  {
    application,
    isReadOnly: req.isReadOnly
  });
};

exports.get_community = async (req, res) => {
  const applicationId = req.query.applicationId;

  let application;

  if (req.isReadOnly && applicationId) {
  application = await SmallApplication.findOne({ _id: applicationId });
} else if (req.user?.smallBusinessApplication) {
  application = await SmallApplication.findOne({ _id: req.user.smallBusinessApplication });
} else if (req.user?._id) {
  application = await SmallApplication.findOne({ owner: req.user._id }).sort({ createdAt: -1 });
} else {
  return res.redirect('/auth/login');
} 
  res.render("dashboard/community/community",  {
    application,
    isReadOnly: req.isReadOnly
  });
};

exports.get_community_supporting_documents = async (req, res) => {
  const applicationId = req.query.applicationId;

  let application;

 if (req.isReadOnly && applicationId) {
  application = await SmallApplication.findOne({ _id: applicationId });
} else if (req.user?.smallBusinessApplication) {
  application = await SmallApplication.findOne({ _id: req.user.smallBusinessApplication });
} else if (req.user?._id) {
  application = await SmallApplication.findOne({ owner: req.user._id }).sort({ createdAt: -1 });
} else {
  return res.redirect('/auth/login');
} 
  res.render("dashboard/community/community_supporting_documents",  {
    application,
    isReadOnly: req.isReadOnly
  });
};

exports.get_philanthropy = async (req, res) => {  
  const applicationId = req.query.applicationId;

  let application;

  if (req.isReadOnly && applicationId) {
  application = await SmallApplication.findOne({ _id: applicationId });
} else if (req.user?.smallBusinessApplication) {
  application = await SmallApplication.findOne({ _id: req.user.smallBusinessApplication });
} else if (req.user?._id) {
  application = await SmallApplication.findOne({ owner: req.user._id }).sort({ createdAt: -1 });
} else {
  return res.redirect('/auth/login');
} 
  res.render("dashboard/philanthropy/philanthropy",  {
    application,
    isReadOnly: req.isReadOnly
  });
};

exports.get_philanthropy_supporting_documents = async (req, res) => {
  const applicationId = req.query.applicationId;

  let application;

  if (req.isReadOnly && applicationId) {
  application = await SmallApplication.findOne({ _id: applicationId });
} else if (req.user?.smallBusinessApplication) {
  application = await SmallApplication.findOne({ _id: req.user.smallBusinessApplication });
} else if (req.user?._id) {
  application = await SmallApplication.findOne({ owner: req.user._id }).sort({ createdAt: -1 });
} else {
  return res.redirect('/auth/login');
} 
  res.render("dashboard/philanthropy/philanthropy_supporting_documents",  {
    application,
    isReadOnly: req.isReadOnly
  });
};

exports.further_info = async (req, res) => {
  const applicationId = req.query.applicationId;

  let application;

  if (req.isReadOnly && applicationId) {
  application = await SmallApplication.findOne({ _id: applicationId });
} else if (req.user?.smallBusinessApplication) {
  application = await SmallApplication.findOne({ _id: req.user.smallBusinessApplication });
} else if (req.user?._id) {
  application = await SmallApplication.findOne({ owner: req.user._id }).sort({ createdAt: -1 });
} else {
  return res.redirect('/auth/login');
} 
  res.render("dashboard/further_information/further_information",  {
    application,
    isReadOnly: req.isReadOnly
  });
};

exports.submit = async (req, res) => {
  const applicationId = req.query.applicationId;

  let application;

  if (req.isReadOnly && applicationId) {
  application = await SmallApplication.findOne({ _id: applicationId });
} else if (req.user?.smallBusinessApplication) {
  application = await SmallApplication.findOne({ _id: req.user.smallBusinessApplication });
} else if (req.user?._id) {
  application = await SmallApplication.findOne({ owner: req.user._id }).sort({ createdAt: -1 });
} else {
  return res.redirect('/auth/login');
} 
  res.render("dashboard/submit/submit",  {
    application,
    isReadOnly: req.isReadOnly
  });
};

//PUT CONTROLLERS

exports.put_company_details = async function (req, res, next) {
  var body = req.body;

  const company_details = {
    contact_person: body.contact_person,
    organisation_name: body.organisation_name,
    organisation_address: body.organisation_address,
    organisation_nationality: body.organisation_nationality,
    postal_code: body.postal_code,
    telephone_number: body.telephone_number,
    mobile_number: body.mobile_number,
    email_address: body.email_address,
    soleTraderMicro: body.soleTraderMicro,
    charity: body.charity,
    company_details_completed: true,
  };

  SmallApplication.findOneAndUpdate({ owner: req.params.id }, company_details, {
    new: true,
    runValidators: true,
    context: "query",
  })
    .then(() => {
      // generatePdf(company_details, body.email_address);
      res.status(200).json({
        success: true,
        message: "Successfully updated company_details",
      });
    })
    .catch((error) => {
      res.status(400).json({
        success: false,
        message: "Failed to update company_details",
        error: error,
      });
    });
};

exports.put_application_introduction = async function (req, res) {
  let body = req.body;

  const introduction = {
    introduction: body.introduction,
    introduction_completed: true,
  };

  SmallApplication.findOneAndUpdate({ owner: req.params.id }, introduction, {
    new: true,
    runValidators: true,
    context: "query",
  })
    .then(() => {
      res.status(200).json({
        success: true,
        message: "Successfully updated application_introduction",
      });
      console.log("Successfully updated application_introduction");
    })
    .catch((error) => {
      res.status(400).json({
        success: false,
        message: "Failed to update application_introduction",
        error: error,
      });
    });
};

exports.delete_user = async function (req, res) {
  const { id } = req.params;
  console.log(id);
  try {
    const app = SmallApplication.find({ organisation_name: id });
    if (!app) {
      res.status(404).send("invalid user");
    }
    const delete_app = SmallApplication.findOneAndDelete({
      organisation_name: id,
    });

    if (!delete_app) {
      res.status(404).send("Application not found");
    }
    return res.json({ message: "User deleted successfully", user: app });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

exports.put_environment_energy = async function (req, res, next) {
  var body = req.body;

  const env_energy = {
    env_energy: body.env_energy,
    env_energy_completed: true,
  };

  SmallApplication.findOneAndUpdate({ owner: req.params.id }, env_energy, {
    new: true,
    runValidators: true,
    context: "query",
  })
    .then(() => {
      res.status(200).json({
        success: true,
        message: "Successfully updated env_energy",
      });
    })
    .catch((error) => {
      res.status(400).json({
        success: false,
        message: "Failed to update env_energy",
        error: error,
      });
    });
};

exports.put_environment_natural_resource = async function (req, res, next) {
  var body = req.body;

  const env_natural_resource = {
    env_natural_resource: body.env_natural_resource,
    env_natural_resource_completed: true,
  };

  SmallApplication.findOneAndUpdate({ owner: req.params.id }, env_natural_resource, {
    new: true,
    runValidators: true,
    context: "query",
  })
    .then(() => {
      res.status(200).json({
        success: true,
        message: "Successfully environment_natural_resource",
      });
    })
    .catch((error) => {
      res.status(400).json({
        success: false,
        message: "Failed to update environment_natural_resource",
        error: error,
      });
    });
};

exports.put_environment_travel = async function (req, res, next) {
  var body = req.body;

  const env_travel = {
    env_travel: body.env_travel,
    env_travel_completed: true,
  };

  SmallApplication.findOneAndUpdate({ owner: req.params.id }, env_travel, {
    new: true,
    runValidators: true,
    context: "query",
  })
    .then(() => {
      res.status(200).json({
        success: true,
        message: "Successfully updated env_travel",
      });
    })
    .catch((error) => {
      res.status(400).json({
        success: false,
        message: "Failed to update env_travel",
        error: error,
      });
    });
};

exports.put_environment_supply_chain_management = async function (
  req,
  res,
  next
) {
  var body = req.body;

  const env_supply_chain_management = {
    env_supply_chain_management: body.env_supply_chain_management,
    env_supply_chain_management_completed: true,
  };

  SmallApplication.findOneAndUpdate(
    { owner: req.params.id },
    env_supply_chain_management,
    { new: true, runValidators: true, context: "query" }
  )
    .then(() => {
      res.status(200).json({
        success: true,
        message: "Successfully updated env_supply_chain_management",
      });
    })
    .catch((error) => {
      res.status(400).json({
        success: false,
        message: "Failed to update env_supply_chain_management",
        error: error,
      });
    });
};

exports.put_environment_waste = async function (req, res, next) {
  var body = req.body;

  const env_waste = {
    env_waste: body.env_waste,
    env_waste_completed: true,
  };

  SmallApplication.findOneAndUpdate({ owner: req.params.id }, env_waste, {
    new: true,
    runValidators: true,
    context: "query",
  })
    .then(() => {
      res.status(200).json({
        success: true,
        message: "Successfully updated env_waste",
      });
    })
    .catch((error) => {
      res.status(400).json({
        success: false,
        message: "Failed to update env_waste",
        error: error,
      });
    });
};

exports.put_workplace = async function (req, res, next) {
  var body = req.body;

  const wrk_training = {
    workplace: body.workplace,
    workplace_completed: true,
  };

  SmallApplication.findOneAndUpdate({ owner: req.params.id }, wrk_training, {
    new: true,
    runValidators: true,
    context: "query",
  })
    .then(() => {
      res.status(200).json({
        success: true,
        message: "Successfully updated workplace",
      });
    })
    .catch((error) => {
      res.status(400).json({
        success: false,
        message: "Failed to update workplace",
        error: error,
      });
    });
};

exports.put_community = async function (req, res, next) {
  var body = req.body;

  const com_engagement = {
    community: body.community,
    community_completed: true,
  };

  SmallApplication.findOneAndUpdate({ owner: req.params.id }, com_engagement, {
    new: true,
    runValidators: true,
    context: "query",
  })
    .then(() => {
      res.status(200).json({
        success: true,
        message: "Successfully updated community",
      });
    })
    .catch((error) => {
      res.status(400).json({
        success: false,
        message: "Failed to update community",
        error: error,
      });
    });
};

exports.put_philanthropy = async function (
  req,
  res,
  next
) {
  var body = req.body;

  const phil_charitable_involvement = {
    philanthropy: body.philanthropy,
    philanthropy_completed: true,
  };

  SmallApplication.findOneAndUpdate(
    { owner: req.params.id },
    phil_charitable_involvement,
    { new: true, runValidators: true, context: "query" }
  )
    .then(() => {
      res.status(200).json({
        success: true,
        message: "Successfully updated phil_charitable_involvement",
      });
    })
    .catch((error) => {
      res.status(400).json({
        success: false,
        message: "Failed to update phil_charitable_involvement",
        error: error,
      });
    });
};



exports.notes = async function (req, res, next) {

  SmallApplication.findOneAndUpdate({ owner: req.params.id }, {notes: true}, {
    new: true,
    runValidators: true,
    context: "query",
  })
    .then(() => {
      res.status(200).json({
        success: true,
        message: "Successfully updated assessments_and_tips_completed",
      });
    })
    .catch((error) => {
      res.status(400).json({
        success: false,
        message: "Failed to update assessments_and_tips_completed",
        error: error,
      });
    });
};

exports.update_phil_supporting_info = (req, res) => {
  let { phil_other_information, phil_future_planning, further_info_completed } =
    req.body;

  SmallApplication.findOneAndUpdate(
    { owner: req.params.id },
    { phil_other_information, phil_future_planning, further_info_completed },
    { new: true, runValidators: true, context: "query" }
  )
    .then(() => {
      res.status(200).json({
        success: true,
        message: "Successfully updated phil_supporting_info",
      });
    })
    .catch((error) => {
      res.status(400).json({
        success: false,
        message: "Failed to update phil_supporting_info",
        error: error,
      });
    });
};

exports.put_application_finished = (req, res) => {
  let date = new Date();
  // submission_date
  SmallApplication.findOneAndUpdate(
    { owner: req.params.id },
    { finished: true },
    { new: true, runValidators: true, context: "query" }
  )
    .then((application) => {
      application.submission_date = date.toLocaleDateString("en-US");

      console.log(date.toLocaleDateString("en-US"));
      application.save();

      console.log(application)
      res.status(200).json({
        success: true,
        message: "Successfully finished application",
      });
    })
    .catch((error) => {
      res.status(400).json({
        success: false,
        message: "Failed to finished application",
        error: error,
      });
    });
};


exports.get_application_document = function (req, res, next) {
  SmallApplication.findOne({ owner: req.params.id })
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => console.log("Error: ", err));
};
