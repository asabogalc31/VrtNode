import * as fc from '../scripts/functions.js';

const fs = require('fs')

var userInfo = [
	{
		"name" : "Alejandra",
		"lastName" : "Sabogal",
		"mail": "aza@example.com", 
		"universityName": "Universidad del Rosario",
		"isMaster":true,
		"departmentName": "Jurisprudencia",
		"password": "Prueb41234",
		"acceptTerms": true
	},
	{
		"name" : null,
		"lastName" : null,
		"mail": "wrongemail@example.com", 
		"universityName":null,
		"departmentName": null,
		"password": "1234",
		"acceptTerms": false
	}
];
var teacherName = "Mario Linares Vasquez"

module.exports = (on, config) => {
  on('after:screenshot', (details) => {
    // details will look something like this:
    // {
    //   size: 10248
    //   takenAt: '2018-06-27T20:17:19.537Z'
    //   duration: 4071
    //   dimensions: { width: 1000, height: 660 }
    //   multipart: false
    //   pixelRatio: 1
    //   name: 'my-screenshot'
    //   specName: 'integration/my-spec.js'
    //   testFailure: true
    //   path: '/path/to/my-screenshot.png'
    //   scaled: true
    //   blackout: []
    // }

    // example of renaming the screenshot file

    const newPath = '/new/path/to/screenshot.png'

    return new Promise((resolve, reject) => {
      fs.rename(details.path, newPath, (err) => {
        if (err) return reject(err)

        // because we renamed/moved the image, resolve with the new path
        // so it is accurate in the test results
        resolve({ path: newPath })
      })
    })
  })
}

context('Home actions', function() {
	beforeEach(function() {
		cy.visit('https://losestudiantes.co')
		cy.contains('Cerrar').click()	
		cy.screenshot('my-screenshot', {
			onAfterScreenshot ($el, props) {
				
			},
		})
		
		fc.compareScreenshots()
	})
	
	afterEach(function() {
		cy.screenshot()
	})
  
	describe('Los estudiantes login', function() {
		it('Visits los estudiantes and fails at login', function() {
			// Does the login
			fc.doLogin(userInfo[1])
			cy.contains('El correo y la contraseña que ingresaste no figuran en la base de datos. Intenta de nuevo por favor.')
			cy.screenshot()
		})
		
		it.skip('Creates an account twice', function() {			
			cy.screenshot()
			// Create an account
			createAccount(userInfo[0])
			fc.assertRegistryMessage(
				'Registro exitoso!', 
				`Verifica tu correo y activa tu cuenta Con esto ya podrás calificar profesores.`
			)
			
			// Logout
			fc.doLogout()
			
			// Create an account with current login
			fc.createAccount(userInfo[0])			
			fc.assertRegistryMessage(
				'Ocurrió un error activando tu cuenta', 
				`Error: Ya existe un usuario registrado con el correo '${userInfo[0].mail}'`
			)
			cy.screenshot()
		})
	})

	describe('Teacher page actions', function() {
		let subject
			
		it.skip('Visits los estudiantes and look for a teacher', function() {
			cy.screenshot()
			// Does the login
			fc.doLogin(userInfo[0])
			
			// Looks for a teacher
			fc.lookForATeacher(teacherName)
			cy.get('div#react-select-required_error_checksum--option-0').eq(0)
			.should(($item) =>{
				expect($item).to.contain(teacherName)
			})
			cy.screenshot()
		})
		
		it.skip('Visits los estudiantes and goes for a teacher page', function() {
			cy.screenshot()
			// Does the login
			fc.doLogin(userInfo[0])
			
			// Looks for a teacher
			fc.lookForATeacher(teacherName)
			cy.get('div#react-select-required_error_checksum--option-0').eq(0).click()
			
			// Validates teacher name
			const commonClass = "jsx-1339787052"
			cy.get('.columnLeft')
			.find(`div[class='${commonClass} boxElement']`)
			.find(`div[class='${commonClass} infoProfesor']`)
			.find(`div[class='${commonClass} descripcionProfesor']`)
			.find(`h1[class='${commonClass} nombreProfesor']`)
			.should('have.text', teacherName)
			cy.screenshot()
		})
		
		it.skip('Visits los estudiantes and filter by subject', function() {
			cy.screenshot()
			// Does the login
			fc.doLogin(userInfo[0])
			
			// Looks for a teacher
			fc.lookForATeacher(teacherName)
			cy.get('div#react-select-required_error_checksum--option-0').eq(0).click()
			
			// Selects a random subject
			const commonClass = '.jsx-3367902293'			
			cy.get(`${commonClass}`).find('input').its('length').then(($lenght) => {
				const listElementNumber = Math.floor(Math.random() * $lenght)
				cy.get(`${commonClass}`).find('input').eq(listElementNumber)
				.parent().then(($checkbox) => {
					cy.get($checkbox).find('input').click()
					cy.get($checkbox).find('a').then(($textElement) => {
						subject = $textElement.text().trim()
					})					
				})
			})
			
			// Validates selection
			cy.wait(5000)
			cy.get('div[class="jsx-3672521041"]')
			.then(($existsComments) => {
				if ($existsComments.children().length > 0) {
					cy.get($existsComments)
					.find('div').eq(0)
					.find('li:visible')
					.find('div[class="jsx-1682178024 sobreCalificacion"]')
					.each(($title) => {
						cy.get($title)
						.find('a').eq(0)
						.should('have.text', subject.replace('.',''))
					})
				} else {
					expect($existsComments.children()).to.have.length(0)
				}
			})
			cy.screenshot()
		})
	})
})
