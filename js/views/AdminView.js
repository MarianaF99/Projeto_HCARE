import AdminController from '../controllers/AdminController.js'
import UserController from '../controllers/UserController.js'
import DoctorController from '../controllers/DoctorController.js'

export default class AdminView {
    constructor() {

        this.adminController = new AdminController()
        this.userController = new UserController()
        this.doctorController = new DoctorController()

        /* Admin Content Display */
        this.contentDisplay = document.querySelector("#contentDisplay")

        /* Admin Login Modal */
        this.adminModal = document.querySelector("#adminModal")

        /* Admin Login Form */
        this.adminForm = document.querySelector("#adminForm")
        this.adminEmail = document.querySelector("#adminEmail")
        this.adminPassword = document.querySelector("#adminPassword")
        this.adminMessage = document.querySelector("#adminMessage")
        this.BindAdminLoginForm()
        this.UpdateAdminModalState()
        this.AdminPageContentSetDisplay()

        /* Manage Users */
        this.adminUsersVisualization = document.querySelector("#adminUsersVisualization")
        this.adminFilterUsers = document.querySelector("#adminFilterUsers")
        this.BindFilterUsers()
        this.UpdateUsersVisualization("")


        /*Manage Doctors */
        this.btnAddDoctor = document.querySelector("#btnAddDoctor")
        this.adminDoctorsVisualization = document.querySelector('#adminDoctorsVisualization')
        this.UpdateDoctorsVisualization()

    }


    AdminPageContentSetDisplay() {
        this.contentDisplay.style.className = '' /* Remove all classes */

        if (this.adminController.IsAdminLogged() === true) {
            this.contentDisplay.className = "visible";

        } else {
            this.contentDisplay.className = "invisible";
        }
    }

    UpdateUsersVisualization(filterFirstName) {

        if (this.adminController.IsAdminLogged() === true) {

            let users = this.userController.GetAllUsers()

            if (filterFirstName !== "") {
                users = users.filter(user => user.firstName.toUpperCase().startsWith(filterFirstName.toUpperCase()))
            }

            this.adminUsersVisualization.innerHTML = ""

            for (let i = 0; i < users.length; i++) {
                this.adminUsersVisualization.innerHTML += `
                        <div class="main-section text-center">
                        <div class="user-detail">
                            <div class="col-lg-12 col-sm-12 col-12">
                                <img src="${users[i].avatarSourceImage}" class="rounded-circle img-thumbnail">
                                <h5>${users[i].firstName} ${users[i].surname}</h5>
                                <p ><i class="fa fa-envelope" aria-hidden="true"></i> ${users[i].email}</p>
                                <hr>
                                <a href="#" name="${users[i].email}" class="btn btn-warning btn-sm adminAction blockUnlockUserAction">
                                ${this.GetBlockUnlockTextByState(users[i].blockState)}
                                </a>
                                <a href="#" name="${users[i].email}" class="btn btn-danger btn-sm adminAction deleteUserAction">Delete</a>
                            </div>
                        </div>
                    </div> `
            }
        }

        this.BindDeleteUserButton()
        this.BindBlockUnlockUserButton()
    }

    GetBlockUnlockTextByState(blockState) {
        return (blockState === false) ? "Block" : "Unblock"
    }

    BindFilterUsers() {
        adminFilterUsers.addEventListener('input', event => {
            event.preventDefault()
            this.UpdateUsersVisualization(adminFilterUsers.value)
        })
    }

    BindBlockUnlockUserButton() {
        for (const blockUnlockButton of document.getElementsByClassName("blockUnlockUserAction")) {
            blockUnlockButton.addEventListener('click', event => {
                event.preventDefault()

                let blockState = this.BlockUnlockUser(event.target.name)
                event.target.innerHTML = this.GetBlockUnlockTextByState(blockState)
            })
        }
    }

    BlockUnlockUser(email) {
        return this.userController.BlockUnlockUser(email)
    }

    BindDeleteUserButton() {
        for (const deleteButton of document.getElementsByClassName("deleteUserAction")) {
            deleteButton.addEventListener('click', event => {
                event.preventDefault()

                this.DeleteUser(event.target.name)
                event.target.parentElement.parentElement.parentElement.remove();
            })
        }
    }

    DeleteUser(email) {
        this.userController.DeleteUser(email)
    }


    OpenAdminLoginModal() {
        if (this.adminModal != null) {
            this.adminModal.style.display = "block";
        }
    }

    CloseAdminLoginModal() {
        if (this.adminModal != null) {
            this.adminModal.style.display = "none";
        }
    }

    UpdateAdminModalState() {
        if (this.adminController.IsAdminLogged() === true) {
            this.CloseAdminLoginModal()
        } else {
            this.OpenAdminLoginModal()
        }
    }

    BindAdminLoginForm() {
        if (this.adminForm != null) {
            this.adminForm.addEventListener("submit", event => {
                event.preventDefault()
                try {
                    this.adminController.AdminLogin(this.adminEmail.value, this.adminPassword.value)
                } catch (exception) {
                    this.AdminLoginMessageHandler(exception, 'danger')
                }
            });
        }
    }

    AdminLoginMessageHandler(message, type) {
        this.adminMessage.innerHTML = `<div class="alert alert-${type}" role="alert">${message}</div>`
    }

    UpdateDoctorsVisualization() {

        if (this.adminController.IsAdminLogged() === true) {

            let doctors = this.doctorController.getAllDoctors()


            this.adminDoctorsVisualization.innerHTML = ""

            for (let i = 0; i < doctors.length; i++) {
                this.adminDoctorsVisualization.innerHTML += `
                        <div class="main-section text-center">
                        <div class="user-detail">
                            <div class="col-lg-12 col-sm-12 col-12">
                                <img src="${doctors[i].photo}" class="rounded-circle img-thumbnail">
                                <h5>${doctors[i].firstName} ${doctors[i].lastName}</h5>
                                <h7>${doctors[i].specialty} </h7>
                                <p ><i class="fa fa-envelope" aria-hidden="true"></i> ${doctors[i].email}</p>
                                <a href="#" name="${doctors[i].email}" class="btn btn-danger btn-sm remove">Delete</a>
                            </div>
                        </div>
                    </div> `
            }
        }
        this.bindDeleteDoctorButton()

    }


    bindDeleteDoctorButton() {
        for (const deleteButton of document.getElementsByClassName("remove")) {
            deleteButton.addEventListener('click', event => {
                event.preventDefault()

                this.deleteDoctor(event.target.name)
                event.target.parentElement.parentElement.parentElement.remove();
            })
        }
    }

    deleteDoctor(email) {
        this.doctorController.removeDoctor(email)
    }

}