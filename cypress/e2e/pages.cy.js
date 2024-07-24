const {sendMail} = require("../../mail/mail")

describe('CSRA Test', () => {
  it('Forgot Password with registered User', () => {
    cy.visit('http://localhost:3000/')
    cy.get("#forgot_password").click()
    cy.get('#email').type("test@test.com")
    cy.get('#send_btn').click()
  })
})