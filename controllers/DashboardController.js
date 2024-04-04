const SmallApplication = require("../models/SmallApplication");
const mongoose = require("mongoose");
const generatePdf = require("../utils/generatepdf");

//GET PAGES CONTROLLERS

exports.get_company_details = (req, res) => {
  pathToAttachment = `../${__dirname}`;
  console.log(pathToAttachment);
  res.render("dashboard/others/company_details");
};

exports.get_application_introduction = (req, res) => {
  res.render("dashboard/others/application_introduction");
};

exports.get_environment_energy = (req, res) => {
  res.render("dashboard/environment/environment_energy");
};

exports.get_environment_natural_resource = (req, res) => {
  res.render("dashboard/environment/environment_natural_resource");
};

exports.get_environment_travel = (req, res) => {
  res.render("dashboard/environment/environment_travel");
};

exports.get_environment_supply_chain_management = (req, res) => {
  res.render("dashboard/environment/environment_supply_chain_management");
};

exports.get_environment_waste = (req, res) => {
  res.render("dashboard/environment/environment_waste");
};

exports.get_environment_supporting_documents = (req, res) => {
  res.render("dashboard/environment/environment_supporting_documents");
};

exports.get_notes = (req, res) => {
  res.render("dashboard/others/notes");
};

exports.get_workplace = (req, res) => {
  res.render("dashboard/workplace/workplace");
};

exports.get_workplace_supporting_documents = (req, res) => {
  res.render("dashboard/workplace/workplace_supporting_documents");
};

exports.get_community = (req, res) => {
  res.render("dashboard/community/community");
};

exports.get_community_supporting_documents = (req, res) => {
  res.render("dashboard/community/community_supporting_documents");
};

exports.get_philanthropy = (req, res) => {
  res.render("dashboard/philanthropy/philanthropy");
};

exports.get_philanthropy_supporting_documents = (req, res) => {
  res.render("dashboard/philanthropy/philanthropy_supporting_documents");
};

exports.further_info = (req, res) => {
  res.render("dashboard/further_information/further_information");
};

exports.submit = (req, res) => {
  res.render("dashboard/submit/submit");
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
