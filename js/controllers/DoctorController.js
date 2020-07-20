import DoctorModel from '../models/DoctorModel.js'

export default class DoctorController {
    constructor() {
        this.doctorModel = new DoctorModel()
    }

    addDoctor(firstName, lastName, photo, email, dateOfBirth, gender, adress, phone, specialty) {
        if (!this.doctorModel.getAll().some(doctor => doctor.email === email)) {
            this.doctorModel.create(
                firstName,
                lastName,
                photo,
                email,
                dateOfBirth,
                gender,
                adress,
                phone,
                specialty
            );
        } else {
            throw Error(`This email "${email}" already exists!`);
        }
    }
    getAllDoctors() {
        return this.doctorModel.getAll()
    }

    removeDoctor(email) {
        this.doctorModel.remove(email)
    }



    getDoctors(filterName = '', filterSpecialty = '') {
        const doctors = this.doctorModel.getAll()
        if (filterName === '' && filterSpecialty === '') {
            return doctors
        }
        let filteredDoctors = []

        for (const doctor of doctors) {
            let filterDoctorName = false,
                filterDoctorSpecialty = false

            if ((doctor.firstName.includes(filterName) && filterName != '') || filterName === '') {
                filterDoctorName = true
            }

            if ((doctor.specialty === filterSpecialty && filterSpecialty != '') || filterSpecialty === '') {
                filterDoctorSpecialty = true
            }

            if (filterDoctorName && filterDoctorSpecialty) {
                filteredDoctors.push(doctor)
            }


        }
        return filteredDoctors
    }
}