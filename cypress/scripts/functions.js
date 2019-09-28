const resemble = require('resemblejs');
const compare = require("resemblejs").compare;
const path = require('path');
const fs = require('fs')

export function doLogin (userAccount) {
	var loginBox = ".cajaLogIn"
	cy.contains('Ingresar').click()
	cy.get(loginBox).find('input[name="correo"]').click().type(userAccount.mail)
	cy.get(loginBox).find('input[name="password"]').click().type(userAccount.password)
	cy.get(loginBox).contains('Ingresar').click();
}

export function doLogout () {
	cy.get(".dropDown").find('button[id="cuenta"]').click()
	cy.get(".dropdown-menu").contains('Salir').click();
}

export function createAccount (userAccount) {
	const signUpBox = ".cajaSignUp"
	cy.contains('Ingresar').click()
	cy.get(signUpBox).find('input[name="nombre"]').click().type(userAccount.name)
	cy.get(signUpBox).find('input[name="apellido"]').click().type(userAccount.lastName)
	cy.get(signUpBox).find('input[name="correo"]').click().type(userAccount.mail)
	cy.get(signUpBox).find('select[name="idUniversidad"]').select(userAccount.universityName)
	cy.get(signUpBox).find('select[name="idDepartamento"]').select(userAccount.departmentName)
	cy.get(signUpBox).find('input[name="password"]').click().type(userAccount.password)
	
	if(userAccount.acceptTerms){
		cy.get(signUpBox).find('input[name="acepta"]').click();
	}
	
	cy.get(signUpBox).contains('Registrarse').click();
}

export function assertRegistryMessage(tittle, textMessage){
	// Validates pop up title
	cy.get('.sweet-alert')
	.find('h2')
	.should('have.text',tittle)
	
	// Validates pop up text
	cy.get('.sweet-alert')
	.find('div[class="text-muted lead"]')
	.should('have.text', textMessage)
	
	// Does clic on Ok button
	cy.contains('Ok').click()
}

export function lookForATeacher(teacherName){
	cy.get('#react-select-required_error_checksum--value > div.Select-input > input')
	.type(teacherName, { force: true })
}

export function compareScreenshots() {
	var currentImage = getMostRecentFileName('../screenshots/simple_spec.js/');
	console.log("Imagen actual" + currentImage);
	/*const expectedImage = path.join("./cypress/screenshots/expected.js", path.basename(currentImage));
	console.log("Imagen esperada" + currentImage);
    const options = {
        returnEarlyThreshold: 5
    };

    compare(currentImage, expectedImage, options, function(err, data) {
        if (err) {
            console.log("An error!");
        } else {
            console.log(data);
        }
    });
	*/
}

export function getMostRecentFileName(directory) {
	/*let files = fs.readdirSync(directory);
	console.log(files);
	return files;*/
}