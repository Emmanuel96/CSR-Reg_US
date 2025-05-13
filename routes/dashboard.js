const express = require('express');
const router = express.Router();
const checkAuthenticated = require('../passport/checkAuthenticated');
const DashboardController = require('../controllers/DashboardController');
const { setReadOnly } = require('../middleware/auth');


//GET PAGES ROUTES

// router.get('/application/:id', DashboardController.get_application_document)
 

  
router.use(checkAuthenticated, setReadOnly);

router.get('/company_details', checkAuthenticated, DashboardController.get_company_details);

router.get('/notes', checkAuthenticated, DashboardController.get_notes);

router.get('/application_introduction', checkAuthenticated, DashboardController.get_application_introduction);

router.get('/environment_energy', checkAuthenticated, DashboardController.get_environment_energy);

router.get('/environment_natural_resource', checkAuthenticated, DashboardController.get_environment_natural_resource);

router.get('/environment_travel', checkAuthenticated, DashboardController.get_environment_travel);

router.get('/environment_supply_chain_management', checkAuthenticated, DashboardController.get_environment_supply_chain_management);

router.get('/environment_waste', checkAuthenticated, DashboardController.get_environment_waste);

router.get('/environment_supporting_documents', checkAuthenticated, DashboardController.get_environment_supporting_documents);

router.get('/workplace', checkAuthenticated, DashboardController.get_workplace);

router.get('/workplace_supporting_documents', checkAuthenticated, DashboardController.get_workplace_supporting_documents);

router.get('/community', checkAuthenticated, DashboardController.get_community);

router.get('/community_supporting_documents', checkAuthenticated, DashboardController.get_community_supporting_documents);

router.get('/philanthropy', checkAuthenticated, DashboardController.get_philanthropy);

router.get('/philanthropy_supporting_documents', checkAuthenticated, DashboardController.get_philanthropy_supporting_documents);

router.get('/further_information', checkAuthenticated, DashboardController.further_info);

router.get('/submit', checkAuthenticated, DashboardController.submit)


//PUT ROUTES

router.put('/company_details/:id', DashboardController.put_company_details)

router.put('/application_introduction/:id', DashboardController.put_application_introduction)

router.put('/environment_energy/:id', DashboardController.put_environment_energy)

router.put('/environment_natural_resource/:id', DashboardController.put_environment_natural_resource)

router.put('/environment_travel/:id', DashboardController.put_environment_travel)

router.put('/environment_supply_chain_management/:id', DashboardController.put_environment_supply_chain_management)

router.put('/environment_waste/:id', DashboardController.put_environment_waste)

router.put('/workplace/:id', DashboardController.put_workplace)

router.put('/community/:id', DashboardController.put_community)

router.put('/philanthropy/:id', DashboardController.put_philanthropy)

router.put('/philanthropy_supporting_info/:id', DashboardController.update_phil_supporting_info)

router.put('/notes/:id', DashboardController.notes)

router.put('/application_finished/:id', DashboardController.put_application_finished)

router.put('/further_information/:id', DashboardController.update_phil_supporting_info)

// Get application document route

router.get('/api/application/:id', DashboardController.get_application_document)

// Invitation link route
router.post('/create-read-only-link', DashboardController.create_read_only_link);

module.exports = router;