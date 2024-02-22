const api = require('../helpers/api')
const mongoose = require('mongoose')

describe ("Authentication Test", () => {
  test.only('signup user with right details', async () => {
    let payload = {
      firstName: 'Test',
      lastName: 'Integration',
      email: 'test@test.com',
      password: 'test@test.com'
    }

    await api
      .post('/register')
      .send(payload)
      .set("Accept", "application/json")
      .expect(response => {
        const data = response.json()
        console.log(data)
        return data
      })
      .expect(200)
  }, 50000)

  test('signup user with wrong details', async () => {
    let payload = {
      firstName: 'Test',
      // email missing on purpose
      lastName: 'Integration',
      password: 'test@test.com'
    }

    await api
      .post('/register')
      .send(payload)
      .set("Accept", "application/json")
      .expect(400)
  }, 50000)

  test('sigin user with correct credentials', async () => {
    let payload = {
      email: 'test@test.com',
      password: 'test@test.com'
    }

    await api
      .post('/login')
      .send(payload)
      .set("Accept", "application/json")
      const user = expect(response => response.json())
      .expect(user.userID).toBeInstanceOf(String)
      .expect(200)
  }, 50000)

  test('sigin user with wrong credentials', async () => {
    let payload = {
      email: 'test@test.com',
      password: 'i_am_a_wrong_password'
    }

    await api
      .post('/login')
      .send(payload)
      .set("Accept", "application/json")
      const user = expect(response => response.json())
      .expect(user.userID).toBeInstanceOf(String)
      .expect(200)
  }, 50000)

  afterAll(() => {
    mongoose.connection.close()
  })
})