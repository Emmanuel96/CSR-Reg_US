const sgMail = require("@sendgrid/mail");
const Application = require("../models/Application");

exports.notify_completion = (req, res, next) => {
  Application.findOne({ owner: req.user._id.toString() })
    .then((doc) => {
      const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;

      sgMail.setApiKey(SENDGRID_API_KEY);

      let company = doc.organisation_name;

    let mailList = process.env.MAILIST
  
    const adminNotificationMessage = {
      to: mailList,
      from: 'emmanuel@csr-accreditation.co.uk',
      subject: `APPLICATION COMPLETION FROM ${company}`,
      html: `Hello, ${company} just completed their application. Sign in to the accessors portal to view. <br> <br> http://csra-assessors-site.herokuapp.com/applications/${doc._id}`
    }


      const companyNotificationMessage = {
        to: req.user.email,
        from: "emmanuel@csr-accreditation.co.uk",
        subject: `APPLICATION COMPLETED`,
        text: `Hello, ${req.user.firstName}, you have successfully completed your CSRA application. Our team will review your application and we will be in touch. Have a great day!`,
      };

      const companyNotificationMessage2 = {
        to: req.user.email,
        from: "emmanuel@csr-accreditation.co.uk",
        subject: `APPLICATION COMPLETED`,
        text: `
        <!DOCTYPE html
  PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">

<head>
  <title>
  </title>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
  <meta name="viewport" content="width=device-width">
  <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.2/css/all.css"
    integrity="sha384-fnmOCqbTlWIlj8LyTjo7mOUStjsKC4pOpQbqyi7RrhN7udi9RwhKkMHpvLbHG9Sr" crossorigin="anonymous">
  <style type="text/css">
    body,
    html {
      margin: 0px;
      padding: 0px;
      -webkit-font-smoothing: antialiased;
      text-size-adjust: none;
      width: 100% !important;
    }

    table td,
    table {}

    #outlook a {
      padding: 0px;
    }

    .ExternalClass,
    .ExternalClass p,
    .ExternalClass span,
    .ExternalClass font,
    .ExternalClass td,
    .ExternalClass div {
      line-height: 100%;
    }

    .ExternalClass {
      width: 100%;
    }

    @media only screen and (max-width: 480px) {

      table,
      table tr td,
      table td {
        width: 100%;
      }

      table tr td table.edsocialfollowcontainer {
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
  <link href="https://fonts.googleapis.com/css?family=Open+Sans:400,400i,600,600i,700,700i &subset=cyrillic,latin-ext"
    data-name="open_sans" rel="stylesheet" type="text/css">
  <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/spectrum/1.8.0/spectrum.min.css">
</head>

<body style="padding:0; margin: 0;background: #e4e6ec">
  <table style="height: 100%; width: 100%; background-color: #e4e6ec;" align="center">
    <tbody>
      <tr>
        <td valign="top" id="dbody" data-version="2.31"
          style="width: 100%; height: 100%; padding-top: 50px; padding-bottom: 50px; background-color: #e4e6ec;">
          <!--[if (gte mso 9)|(IE)]><table align="center" style="max-width:600px" width="600" cellpadding="0" cellspacing="0" border="0"><tr><td valign="top"><![endif]-->
          <table class="layer_1" align="center" border="0" cellpadding="0" cellspacing="0"
            style="max-width: 600px; box-sizing: border-box; width: 100%; margin: 0px auto;">
            <tbody>







              <tr>
                <td class="drow" valign="top" align="center"
                  style="background-color: #f4f4f3; box-sizing: border-box; font-size: 0px; text-align: center;">
                  <!--[if (gte mso 9)|(IE)]><table width="100%" align="center" cellpadding="0" cellspacing="0" border="0"><tr><td valign="top"><![endif]-->
                  <div class="layer_2"
                    style="max-width: 596px; display: inline-block; vertical-align: top; width: 100%;">
                    <table border="0" cellspacing="0" class="edcontent" style="border-collapse: collapse;width:100%">
                      <tbody>
                        <tr>
                          <td valign="top" class="edtext"
                            style="padding: 48px; text-align: left; color: #5f5f5f; font-size: 12px; font-family: &quot;Open Sans&quot;, &quot;Helvetica Neue&quot;, Helvetica, Arial, sans-serif; word-break: break-word; direction: ltr; box-sizing: border-box;">
                            <p class="style2"
                              style="margin: 0px; padding: 0px; color: #000000; font-size: 22px; font-family: &quot;Open Sans&quot;, &quot;Helvetica Neue&quot;, Helvetica, Arial, sans-serif;">
                              <span style="font-size: 14px;"><strong></strong>You have successfully submitted your CSR
                                accreditation application.</span>
                            </p>
                            <p style="margin: 0px; padding: 0px;">
                              <br>
                            </p>
                            <p style="margin: 0px; padding: 0px;">
                            </p>
                            <p style="margin: 0px; padding: 0px;">Your application submission and supporting
                              documentation has been transferred to <br>our assessment platform where it is now
                              available for scrutiny and scoring by three <br>members of our expert, independent
                              assessment panel.</p>
                            <p style="margin: 0px; padding: 0px;"><br></p>
                            <p style="margin: 0px; padding: 0px;">You will be notified by email of the results of your
                              application, which will include <br>your score as a percentage, your level of
                              accreditation (gold, silver, bronze), a brief <br>description of what your accreditation
                              pack will contain and an outline of some of our <br>membership benefits.</p>
                            <p style="margin: 0px; padding: 0px;"><br></p>
                            <p style="margin: 0px; padding: 0px;">A separate email will be sent to you with an attached
                              invoice for your accreditation <br>fee. Failure to pay the application fee within the 30
                              day period may result in your <br>accreditation being withdrawn.</p>
                            <p style="margin: 0px; padding: 0px;"><br></p>
                            <p style="margin: 0px; padding: 0px;">For applicants that have failed to reach sufficient
                              score for accreditation we provide a <br>short gap analysis and the chance to re-apply
                              within the next three months for just a <br>small administration fee.</p>
                            <p style="margin: 0px; padding: 0px;"><br></p>
                            <p style="margin: 0px; padding: 0px;">For those that wish to explore the results of a
                              successful application in more depth we <br>also provide a consultation gap analysis
                              service. Your consultant will provide summary <br>feedback from our independent assessors.
                              This feedback is supplemented by expert <br>analysis of your accreditation application.
                            </p>
                            <p style="margin: 0px; padding: 0px;"><br></p>
                            <p style="margin: 0px; padding: 0px;">Successful applicants will receive their bespoke
                              accreditation pack via email within <br>seven days of the result notification.</p>
                            <p style="margin: 0px; padding: 0px;"><br></p>
                            <p style="margin: 0px; padding: 0px;">If you have any further questions please contact
                              Jennifer Clark <br>jennifer@csr-accreditation.co.uk</p>
                            <p style="margin: 0px; padding: 0px;"><br></p>
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
                <td class="drow" valign="top" align="center"
                  style="background-color: #ffffff; box-sizing: border-box; font-size: 0px; text-align: center;">
                  <!--[if (gte mso 9)|(IE)]><table width="100%" align="center" cellpadding="0" cellspacing="0" border="0"><tr><td valign="top"><![endif]-->
                  <div class="layer_2"
                    style="max-width: 596px; display: inline-block; vertical-align: top; width: 100%;">
                    <table border="0" cellspacing="0" cellpadding="0" class="edcontent"
                      style="border-collapse: collapse;width:100%">
                      <tbody>
                        <tr>
                          <td valign="top" class="edimg"
                            style="padding: 0px; box-sizing: border-box; text-align: center;">
                            <img
                              src="https://api.smtprelay.co/userfile/eada7289-1e79-4f31-8f68-be4f8fb9da28/Footer_(1).jpg"
                              alt="Image" width="596"
                              style="border-width: 0px; font-size: 12px; border-style: none; max-width: 596px; width: 100%;">
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <!--[if (gte mso 9)|(IE)]></td></tr></table><![endif]-->
                </td>
              </tr>
              <tr>
                <td class="drow" valign="top" align="center"
                  style="background-color: #e4e6ec; box-sizing: border-box; font-size: 0px; text-align: center;">
                  <!--[if (gte mso 9)|(IE)]><table width="100%" align="center" cellpadding="0" cellspacing="0" border="0"><tr><td valign="top"><![endif]-->
                  <div class="layer_2"
                    style="max-width: 596px; display: inline-block; vertical-align: top; width: 100%;">
                    <table border="0" cellspacing="0" cellpadding="0" class="edcontent"
                      style="border-collapse: collapse;width:100%">
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
                <td class="drow text-center" valign="top" align="center"
                  style="background-color: #e4e6ec; text-align: center; box-sizing: border-box; font-size: 0px;">
                  <!--[if (gte mso 9)|(IE)]><table width="100%" align="center" cellpadding="0" cellspacing="0" border="0"><tr><td valign="top"><![endif]-->
                  <div class="layer_2 text-center"
                    style="max-width: 596px; text-align: center; display: inline-block; vertical-align: top; width: 100%;">
                    <table class="edcontent" style="border-collapse: collapse;width:100%" border="0" cellpadding="0"
                      cellspacing="0">
                      <tbody>
                        <tr>
                          <td class="edtext text-center" valign="top"
                            style="padding: 10px; text-align: center; color: #5f5f5f; font-size: 12px; font-family: &quot;Open Sans&quot;, &quot;Helvetica Neue&quot;, Helvetica, Arial, sans-serif; word-break: break-word; direction: ltr; box-sizing: border-box;">
                            <p style="font-size: 11px; margin: 0px; padding: 0px;">If you no longer wish to receive mail
                              from us, you can&nbsp;
                              <a href="{unsubscribe}"
                                style="background-color: initial; color: #828282; font-family: Helvetica, Arial, sans-serif; text-decoration: none;"><span
                                  style="font-size: 11px;"><u>unsubscribe</u></span></a>
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
</body>

</html>
        `,
      };

      sgMail.send(companyNotificationMessage2);
      sgMail.send(companyNotificationMessage);
      sgMail
        .send(adminNotificationMessage)
        .then(() => {
          res.status(200).end();
        })
        .catch((err) => {
          res.status(400).json(err);
        });
    })
    .catch(() => {
      res.status(404).end();
    });
};

exports.notify_update = (req, res, next) => {
  Application.findOne({ owner: req.user._id.toString() })
    .then((doc) => {
      const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;

      sgMail.setApiKey(SENDGRID_API_KEY);

      let company = doc.organisation_name;

    let mailList = [
      'kole.audu@gmail.com',
      'csraccreditation@gmail.com',
      'jennifer@csr-accreditation.co.uk',
      'rich@csr-accreditation.co.uk',
      'paul@csr-accreditation.co.uk',
      'phillipa@csr-accreditation.co.uk'
    ]
  
    const adminNotificationMessage = {
      to: mailList,
      from: 'emmanuel@csr-accreditation.co.uk',
      subject: `APPLICATION UPDATE FROM ${company}`,
      html: `Hello, ${company} just updated their application. Sign in to the accessors portal to view the changes. <br> <br> http://csra-assessors-site.herokuapp.com/applications/${doc._id}`
    }

      const companyNotificationMessage = {
        to: req.user.email,
        from: "info@csr-accreditation.co.uk",
        subject: `UPDATED APPLICATION`,
        text: `Hello, ${req.user.firstName}, you have successfully updated your CSRA application. Our team will review your changes. Have a great day!`,
      };

      sgMail.send(companyNotificationMessage);
      sgMail
        .send(adminNotificationMessage)
        .then(() => {
          res.status(200).end();
        })
        .catch((err) => {
          res.staus(400).json(err);
        });
    })
    .catch(() => {
      res.status(404).end();
    });
};
