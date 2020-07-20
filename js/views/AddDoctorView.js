import DoctorController from '../controllers/DoctorController.js'


export default class DoctorAddView {
    constructor() {
        this.doctorController = new DoctorController();


        // add doctor DOM

        this.addDoctorForm = document.getElementById('addDoctorForm');
        this.doctorFirstName = document.getElementById('doctorFirstName');
        this.doctorLastName = document.getElementById('doctorLastName');
        this.doctorPhoto = document.getElementById('doctorPhoto');
        this.doctorEmail = document.getElementById('doctorEmail');
        this.doctorDateOfBirth = document.getElementById('doctorDateOfBirth');
        this.doctorGender = document.getElementById('doctorGender');
        this.doctorAddress = document.getElementById('doctorAddress');
        this.doctorPhone = document.getElementById('doctorPhone');
        this.doctorSpecialty = document.getElementById('doctorSpecialty');
        this.addDoctorMessage = document.getElementById('addDoctorMessage');


        this.bindAddDoctorForm();
    }



    bindAddDoctorForm() {
        this.addDoctorForm.addEventListener('submit', event => {
            event.preventDefault();

            try {
                this.doctorController.addDoctor(
                    this.doctorFirstName.value,
                    this.doctorLastName.value,
                    this.doctorPhoto.value,
                    this.doctorEmail.value,
                    this.doctorDateOfBirth.value,
                    this.doctorGender.value,
                    this.doctorAddress.value,
                    this.doctorPhone.value,
                    this.doctorSpecialty.value,

                );
                this.displayAddDoctorMessage('Doctor added with success!', 'success');


            } catch (e) {
                this.displayAddDoctorMessage(e, 'danger');
            }
        });
    }

    displayAddDoctorMessage(message, type) {
        this.addDoctorMessage.innerHTML =
            `<div class="alert alert-${type}" role="alert">${message}</div>`;
    }
}