export default class DoctorModel {
    constructor() {
        this.doctors = localStorage.doctors ? JSON.parse(localStorage.doctors) : [];
    }

    getAll() {
        return this.doctors;
    }

    create(firstName, lastName, photo, email, dateOfBirth, gender, adress, phone, specialty) {
        const doctor = {
            firstName: firstName,
            lastName: lastName,
            photo: photo,
            email: email,
            dateOfBirth: dateOfBirth,
            gender: gender,
            adress: adress,
            phone: phone,
            specialty: specialty
        }
        this.doctors.push(doctor);
        this._persist();
    }



    remove(email) {
        this.doctors = this.doctors.filter(doctor => doctor.email != email)
        this._persist()
    }

    _persist() {
        localStorage.setItem('doctors', JSON.stringify(this.doctors));
    }


}