const mongoose = require('mongoose')
const { registerUser } = require('../../src/controller/auth.controller')
const { userRegistrationSchema } = require('../../src/utils/validators')
const User = require('../../src/models/user.model')

describe('User registration route unit test', ()=>{
    it('should return a status code of 400 if request body is empty or missing', async()=>{

        const request = {}
        const response = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        }
        await registerUser(request, response)
        expect(response.status).toHaveBeenCalledWith(400)
        expect(response.json).toHaveBeenCalledWith({error: 'Request body can not be empty'})
    })
    it('should return a status code of 422 if a user input validation fails', async()=>{

        const request = {
            body: {
                firstName: 'Itadori',
                lastName: 'Yuji',
                email: 'yuji@itadori',
                password: 'test12345.'
            }
        }

        const response = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        }

        const registartionValidation = jest.spyOn(userRegistrationSchema, 'validate')
        registartionValidation.mockReturnValueOnce({error: new Error('please provide the correct email formart')})

        await registerUser(request, response)
        expect(response.status).toHaveBeenCalledWith(422)
        expect(response.json).toHaveBeenCalledWith({error: 'please provide the correct email formart'})

    })

     it('should return a status code of 409 if email is already registered', async()=>{

        const request = {
            body: {
                firstName: 'Yuji',
                lastName: 'Itadori',
                email: 'yuji@gmail.com',
                password: 'test@12345.'
            }
        }

        const response = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        }

        const mockUserRecord = {
            _id: 'somerandomid',
            firstName: 'Yuji',
            lastName: 'Itadori',
            email: 'yuji@gmail.com',
            password: 'somehashedpassword'
        }

        const registartionValidation = jest.spyOn(userRegistrationSchema, 'validate')
        registartionValidation.mockReturnValueOnce({error: null})

        jest.spyOn(User, 'findOne').mockResolvedValueOnce(mockUserRecord)
        await registerUser(request, response)
        expect(response.status).toHaveBeenCalledWith(409)
        expect(response.json).toHaveBeenCalledWith({error: 'This email is registered'})
     })

     
})