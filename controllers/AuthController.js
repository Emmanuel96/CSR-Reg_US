const bcrypt = require("bcryptjs");
const User = require("../models/User");
const Application = require("../models/Application");
const crypto = require("crypto");
const { promisify } = require("util");

const { sendMail } = require("../mail/mail");
const sgMail = require("@sendgrid/mail");

require("dotenv").config();

//GET controllers

exports.get_login = (req, res) => {
  res.render("auth/login");
};

exports.get_register = (req, res) => {
  res.render("auth/register");
};

exports.get_complete_registration = (req, res) => {
  res.render("auth/complete_registration")
}

exports.get_forgot_password = (req, res) => {
  res.render("auth/forgot_password");
};
exports.get_reset_password = (req, res, next) => {
  let usersArray = [];

  User.find({}).then((users) => {
    usersArray = users;

    const thisUser = usersArray.find(
      (user) =>
        user.resetPasswordExpires > Date.now() &&
        crypto.timingSafeEqual(
          Buffer.from(user.resetPasswordToken),
          Buffer.from(req.params.token)
        )
    );

    if (!thisUser) {
      return res
        .status(404)
        .send(
          `
        <div style="text-align: center;">
          <h1 style="font-size: 1.87rem; color: #555A6E; padding: 2.5rem; font-weight: bold;" >
          Password reset token is invalid or has <span style="color: rgb(146, 29, 29)">expired.</span>
          </h1>
    
          <button style="border: none; background-color: #00A19A; padding-top: 0.75rem; padding-bottom: 0.75rem; padding-left: 1.7rem; padding-right: 1.7rem; border-radius: 0.25rem; color: white;">
            <a style="text-decoration: none; color: white" href="/forgot_password">Request new link</a
          </button>
        </div>
        `
        )
        .end();
    }
    res.render("auth/reset_password");
  });
};

//Post controllers

exports.post_complete_registration = async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ email: email })

  if (user) {
    bcrypt.genSalt(10, async (err, salt) => {
      bcrypt.hash(password, salt, async (err, hash) => {
        if (err) throw err;
        user.password = hash
        await user.save()
        res.status(200).json({ response: "Successfully Updated", success: true })
      })
    })
  } else {
    res.status(404).json({response: "This user does not exist", success: false})
  }
}


  exports.post_register = async function (req, res, next) {
    var firstName = req.body.firstName;
    var lastName = req.body.lastName;
    var email = req.body.email.toLowerCase();
    var password = req.body.password;
    var orgName = req.body.orgName

    const newUser = new User({
      firstName,
      lastName,
      orgName,
      email,
      password,
    });

    User.findOne({ email: email }).then((user) => {
      if (!user) {
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then((savedUser) => {
                //Application variables
                let owner = savedUser._id;
                let contact_person = null;
                let organisation_name = orgName;
                let organisation_address = null;
                let organisation_nationality = null;
                let telephone_number = null;
                let soleTraderMicro = null;
                let charity = null;
                let mobile_number = null;
                let postal_code = null;
                let email_address = req.body.email.toLowerCase();
                let company_details_completed = false;
                let introduction = null;
                let introduction_completed = false;
                let env_energy = null;
                let env_energy_completed = false;
                let env_natural_resource = null;
                let env_natural_resource_completed = false;
                let env_travel = null;
                let env_travel_completed = false;
                let env_supply_chain_management = null;
                let env_supply_chain_management_completed = false;
                let env_waste = null;
                let env_waste_completed = false;
                let workplace = null;
                let workplace_completed = false;
                let community = null;
                let community_completed = false;
                let philanthropy = null;
                let philanthropy_completed = false;
                let phil_other_information = null;
                let phil_future_planning = null;
                let further_info_completed = false;
                let notes = false
                let finished = false;
                let scoredByAssessors = false;

                const newApplication = new Application({
                  owner,
                  contact_person,
                  organisation_name,
                  organisation_address,
                  organisation_nationality,
                  postal_code,
                  email_address,
                  telephone_number,
                  mobile_number,
                  charity,
                  soleTraderMicro,
                  company_details_completed,
                  introduction,
                  introduction_completed,
                  env_energy,
                  env_energy_completed,
                  env_natural_resource,
                  env_natural_resource_completed,
                  env_travel,
                  env_travel_completed,
                  env_supply_chain_management,
                  env_supply_chain_management_completed,
                  env_waste,
                  env_waste_completed,
                  workplace,
                  workplace_completed,
                  community,
                  community_completed,
                  philanthropy,
                  philanthropy_completed,
                  phil_other_information,
                  phil_future_planning,
                  further_info_completed,
                  finished,
                  scoredByAssessors,
                  notes,
                });

                sendMail(
                  `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"><html xmlns="http://www.w3.org/1999/xhtml"><head>
    <title>
    </title>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <meta name="viewport" content="width=device-width">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.2/css/all.css" integrity="sha384-fnmOCqbTlWIlj8LyTjo7mOUStjsKC4pOpQbqyi7RrhN7udi9RwhKkMHpvLbHG9Sr" crossorigin="anonymous">
    <style type="text/css">body, html {
      margin: 0px;
      padding: 0px;
      -webkit-font-smoothing: antialiased;
      text-size-adjust: none;
      width: 100% !important;
    }
      table td, table {
      }
      #outlook a {
        padding: 0px;
      }
      .ExternalClass, .ExternalClass p, .ExternalClass span, .ExternalClass font, .ExternalClass td, .ExternalClass div {
        line-height: 100%;
      }
      .ExternalClass {
        width: 100%;
      }
      @media only screen and (max-width: 480px) {
        table, table tr td, table td {
          width: 100% ;
        }
        table tr td table.edsocialfollowcontainer  {
          width: auto;
        }
        img {
          width: inherit;
        }
        .layer_2 {
          max-width: 100% !important;
        }
        .edsocialfollowcontainer table {
          max-width: 25% !important;
        }
        .edsocialfollowcontainer table td {
          padding: 10px !important;
        }
        .edsocialfollowcontainer table {
          max-width: 25% !important;
        }
        .edsocialfollowcontainer table td {
          padding: 10px !important;
        }
      }
    </style>
    <link href="https://fonts.googleapis.com/css?family=Open+Sans:400,400i,600,600i,700,700i &subset=cyrillic,latin-ext" data-name="open_sans" rel="stylesheet" type="text/css">
    <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/spectrum/1.8.0/spectrum.min.css">
  </head><body style="padding:0; margin: 0;background: #e4e6ec">
    <table style="height: 100%; width: 100%; background-color: #e4e6ec;" align="center">
      <tbody>
        <tr>
          <td valign="top" id="dbody" data-version="2.31" style="width: 100%; height: 100%; padding-top: 50px; padding-bottom: 50px; background-color: #e4e6ec;">
            <!--[if (gte mso 9)|(IE)]><table align="center" style="max-width:600px" width="600" cellpadding="0" cellspacing="0" border="0"><tr><td valign="top"><![endif]-->
            <table class="layer_1" align="center" border="0" cellpadding="0" cellspacing="0" style="max-width: 600px; box-sizing: border-box; width: 100%; margin: 0px auto;">
              <tbody>
                
                
                
                
                
                
                
                <tr>
                  <td class="drow" valign="top" align="center" style="background-color: #f4f4f3; box-sizing: border-box; font-size: 0px; text-align: center;">
                    <!--[if (gte mso 9)|(IE)]><table width="100%" align="center" cellpadding="0" cellspacing="0" border="0"><tr><td valign="top"><![endif]-->
                    <div class="layer_2" style="max-width: 596px; display: inline-block; vertical-align: top; width: 100%;">
                      <table border="0" cellspacing="0" class="edcontent" style="border-collapse: collapse;width:100%">
                        <tbody>
                          <tr>
                            <td valign="top" class="edtext" style="padding: 48px; text-align: left; color: #5f5f5f; font-size: 12px; font-family: &quot;Open Sans&quot;, &quot;Helvetica Neue&quot;, Helvetica, Arial, sans-serif; word-break: break-word; direction: ltr; box-sizing: border-box;">
                              <p class="style2" style="margin: 0px; padding: 0px; color: #000000; font-size: 22px; font-family: &quot;Open Sans&quot;, &quot;Helvetica Neue&quot;, Helvetica, Arial, sans-serif;"><span style="font-size: 14px;"><strong>You have successfully created your CSR accreditation application account</strong>.</span>
                              </p>
                              <p style="margin: 0px; padding: 0px;">
                                <br>
                              </p>
                              <p style="margin: 0px; padding: 0px;">
                              </p>
                              <p style="margin: 0px; padding: 0px;"><span style="font-size: 12px;">Please retain your login details as you will need them each time you begin a new <br>session on our application portal. Please ensure that your application is complete <br>before you click  ‘Submit Application’ as we are unable to accept additions or <br></span><span style="font-size: 12px;">amendments post final application submission.</span></p><p style="margin: 0px; padding: 0px;"><br></p><p style="margin: 0px; padding: 0px;">We look forward to receiving your application submission. If you have any further <br>questions please contact Jennifer Clark jennifer@csr-accreditation.co.uk</p>
                              <p style="margin: 0px; padding: 0px;">
                                <br>
                              </p>
                              <p style="margin: 0px; padding: 0px;">
                              </p>
                              <p style="margin: 0px; padding: 0px;">Kind Regards,<br>The CSR-A Team<br></p>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <!--[if (gte mso 9)|(IE)]></td></tr></table><![endif]-->
                  </td>
                </tr>
                
                
                
                <tr>
                  <td class="drow" valign="top" align="center" style="background-color: #ffffff; box-sizing: border-box; font-size: 0px; text-align: center;">
                    <!--[if (gte mso 9)|(IE)]><table width="100%" align="center" cellpadding="0" cellspacing="0" border="0"><tr><td valign="top"><![endif]-->
                    <div class="layer_2" style="max-width: 596px; display: inline-block; vertical-align: top; width: 100%;">
                      <table border="0" cellspacing="0" cellpadding="0" class="edcontent" style="border-collapse: collapse;width:100%">
                        <tbody>
                          <tr>
                            <td valign="top" class="edimg" style="padding: 0px; box-sizing: border-box; text-align: center;">
                              <img src="https://api.smtprelay.co/userfile/eada7289-1e79-4f31-8f68-be4f8fb9da28/Footer_(1).jpg" alt="Image" width="596" style="border-width: 0px; font-size: 12px; border-style: none; max-width: 596px; width: 100%;">
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <!--[if (gte mso 9)|(IE)]></td></tr></table><![endif]-->
                  </td>
                </tr>
                <tr>
                  <td class="drow" valign="top" align="center" style="background-color: #e4e6ec; box-sizing: border-box; font-size: 0px; text-align: center;">
                    <!--[if (gte mso 9)|(IE)]><table width="100%" align="center" cellpadding="0" cellspacing="0" border="0"><tr><td valign="top"><![endif]-->
                    <div class="layer_2" style="max-width: 596px; display: inline-block; vertical-align: top; width: 100%;">
                      <table border="0" cellspacing="0" cellpadding="0" class="edcontent" style="border-collapse: collapse;width:100%">
                        <tbody>
                          <tr>
                            <td valign="top" class="emptycell" style="padding: 20px;">
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <!--[if (gte mso 9)|(IE)]></td></tr></table><![endif]-->
                  </td>
                </tr>
                <tr>
                  <td class="drow text-center" valign="top" align="center" style="background-color: #e4e6ec; text-align: center; box-sizing: border-box; font-size: 0px;">
                    <!--[if (gte mso 9)|(IE)]><table width="100%" align="center" cellpadding="0" cellspacing="0" border="0"><tr><td valign="top"><![endif]-->
                    <div class="layer_2 text-center" style="max-width: 596px; text-align: center; display: inline-block; vertical-align: top; width: 100%;">
                      <table class="edcontent" style="border-collapse: collapse;width:100%" border="0" cellpadding="0" cellspacing="0">
                        <tbody>
                          <tr>
                            <td class="edtext text-center" valign="top" style="padding: 10px; text-align: center; color: #5f5f5f; font-size: 12px; font-family: &quot;Open Sans&quot;, &quot;Helvetica Neue&quot;, Helvetica, Arial, sans-serif; word-break: break-word; direction: ltr; box-sizing: border-box;">
                              <p style="font-size: 11px; margin: 0px; padding: 0px;">If you no longer wish to receive mail from us, you can&nbsp;
                                <a href="{unsubscribe}" style="background-color: initial; color: #828282; font-family: Helvetica, Arial, sans-serif; text-decoration: none;"><span style="font-size: 11px;"><u>unsubscribe</u></span></a> 
                                <br>{accountaddress}
                              </p>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <!--[if (gte mso 9)|(IE)]></td></tr></table><![endif]-->
                  </td>
                </tr>
              </tbody>
            </table>
            <!--[if (gte mso 9)|(IE)]></td></tr></table><![endif]-->
          </td>
        </tr>
      </tbody>
    </table>
  </body></html>`,
                  "CRSA Registration",
                  email
                );
                newApplication
                  .save()
                  .then((savedApplication) => {
                    newUser.application = savedApplication._id;
                    newUser.save();
                  })
                  .catch((err) => {
                    console.log("Failed to save!", err);
                  });
              })
              .then(async () => {
                let mailList = process.env.MAILIST.split(',')
                await sendMail(
                  `I'm excited to inform you that ${firstName} ${lastName} from ${orgName} has just registered on our application website.`,
                  "CSRA New Registration",
                  mailList
                );
                res.status(200).json({
                  message: "Successfully registered",
                  success: true,
                });
              })
              .catch((error) => {
                console.log("Error: ", error);
                return res
                  .status(404)
                  .send("There was an error with your registration");
              });
          });
        });
      } else {
        return res.status(200).json({
          success: false,
          message: "There's a user registered with this email already",
        });
      }
    });
  };

  exports.post_forgot_password = async (req, res, next) => {
    const token = (await promisify(crypto.randomBytes)(20)).toString("hex");

    User.findOne({ email: req.body.email }).then(async (user) => {
      if (!user) {
        return res.status(404).json({
          success: false,
          message: "No user with this email exists",
        });
      }

      user.resetPasswordToken = token;
      user.resetPasswordExpires = Date.now() + 3600000;
      user.save();

      const msg = `Hi ${user.firstName} <br> You are receiving this mail because you (or someone else) have requested to reset the password to your account. <br> Please click on the following link, or paste this into your browser to complete the process: <br> <br> http://${req.headers.host}/reset_password/${token} <br> <br> If you did not request this, please ignore this email and your password will remain unchanged.
        `;
      const subject = "Your Password Reset Link";
      const footer = "./Footer.jpg";
      try {
        await sendMail(msg, subject, user.email);
        res.status(200).json({
          success: true,
        });
      } catch (error) {
        console.log(error);
      }
    });
  };

  exports.post_reset_password = (req, res, next) => {
    let usersArray = [];

    User.find({}).then((users) => {
      usersArray = users;

      const thisUser = usersArray.find(
        (user) =>
          user.resetPasswordExpires > Date.now() &&
          crypto.timingSafeEqual(
            Buffer.from(user.resetPasswordToken),
            Buffer.from(req.params.token)
          )
      );

      if (!thisUser) return res.status(404).end();

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(req.body.password, salt, (err, hash) => {
          if (err) throw err;

          req.body.password = hash;

          let filter = { email: thisUser.email };
          let update = {
            password: req.body.password,
            resetPasswordToken: null,
            resetPasswordExpires: null,
          };

          User.findOneAndUpdate(filter, update)
            .then((feedback) => {
              console.log(feedback);

              console.log("Successfull password reset!");

              const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;

              sgMail.setApiKey(SENDGRID_API_KEY);

              const newPasswordConfirmation = {
                to: thisUser.email,
                from: "emmanuel@csr-accreditation.co.uk",
                subject: "Password Reset Successful!",
                html: `This is a confirmation that the password for your account "${thisUser.email}" has just been changed.
            `,
              };

              sgMail
                .send(newPasswordConfirmation)
                .then(() => {
                  res.status(200).json({
                    success: true,
                    message: "Your password was successfully updated",
                  });
                })
                .catch((err) => console.log("Failed to send confirmation", err));
            })
            .catch((err) => {
              res.status(400).json({
                success: false,
                message: "Failed to update",
              });
              console.log("Failed to update: ", err);
            });
        });
      });
    });
  };
