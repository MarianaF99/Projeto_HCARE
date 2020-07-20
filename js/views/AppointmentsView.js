import UserController from '../controllers/UserController.js'
import DoctorController from '../controllers/DoctorController.js'
import User from '../models/User.js'

export default class AppointmentsView {
    constructor() {

        this.userController = new UserController();
        this.doctorController = new DoctorController();

        this.appointmentsVisualizations = document.querySelector('#appointmentsVisualization')
        this.updateAppointmentsVisualization()

    }

    filterDoctorName(doctorEmail) {
        const doctors = this.doctorController.getAllDoctors()

        let doctorName;

        for (const doctor of doctors) {

            let doctorFirstName = false



            if ((doctor.email.includes(doctorEmail))) {
                doctorFirstName = true
            }



            if (doctorFirstName) {
                /*
                filteredAppointments.push(appointment)
                */
                doctorName = doctor.firstName + " " + doctor.lastName

            }



        }
        return doctorName
    }

    filterDoctorSpecialty(doctorEmail) {
        const doctors = this.doctorController.getAllDoctors()

        let doctorSpecialty;

        for (const doctor of doctors) {

            let doctorSpecialtybool = false



            if ((doctor.email.includes(doctorEmail))) {
                doctorSpecialtybool = true
            }



            if (doctorSpecialtybool) {

                doctorSpecialty = doctor.specialty

            }



        }
        return doctorSpecialty
    }



    updateAppointmentsVisualization() {
        let loggedUserEmail = this.userController.GetUserLoggedEmail()

        let user = this.userController.GetUserLoggedData()

        let appointments = this.userController.filterAppointments(loggedUserEmail)

        console.log(appointments)


        this.appointmentsVisualizations.innerHTML = ""
        if (user != null) {
            for (let i = 0; i < appointments.length; i++) {
                let doctorName = this.filterDoctorName(appointments[i].doctorEmail)
                let doctorSpecialty = this.filterDoctorSpecialty(appointments[i].doctorEmail)

                this.appointmentsVisualizations.innerHTML += `
                            <div class="main-section text-center">
                            <div class="user-detail">
                                <div class="col-lg-12 col-sm-12 col-12">
                                <br>
                                <br>
                                <br>
                                    <h5>${doctorName}</h5>
                                    <br>
                                    <h7>${doctorSpecialty}</h7>
                                    <br>
                                    <br>
                                    <h7>${appointments[i].date} ${appointments[i].time}</h7>
                                </div>
                            </div>
                        </div> `
            }

        }




    }


}