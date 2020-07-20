import UserController from '../controllers/UserController.js'

export default class NavLinksView {
    constructor() {

        this.userController = new UserController();

        /* Login Modal */
        this.modal = document.getElementById("myModal");
        this.closeModal = document.querySelector(".closeModal");

        /* Nav Bar Navigation Links */
        this.loginStatusNavLink = document.querySelector('#loginStatusNavLink')
        this.registerNavLink = document.querySelector('#registerNavLink')
        this.userProfileNavLink = document.querySelector('#userProfileNavLink')
        this.searchDoctoNavLink = document.querySelector('#searchDoctoNavLink')

        this.loginTitle = "Login"
        this.logoutTitle = "Logout"
        this.editProfileTitle = "Profile"
        this.registerTitle = "Register"
        this.searchDoctorTitle = "Search Doctor"

        this.empty = ""
        this.UpdateNavLinksInformation()
        this.BindLoginLogoutLinks()

        /* Login Form */
        this.loginForm = document.querySelector("#loginForm")
        this.loginEmail = document.querySelector("#loginEmail")
        this.loginPassword = document.querySelector("#loginPassword")
        this.loginMessage = document.querySelector("#loginMessage")
        this.BindLoginForm()
    }

    OpenLoginModal() {
        if (this.modal != null) {
            this.modal.style.display = "block";
        }
    }

    CloseLoginModal() {
        if (this.modal != null) {
            this.modal.style.display = "none";
        }
    }

    BindLoginLogoutLinks() {

        if (!this.userController.IsUserLogged()) {
            /* Bind the button to login button click to open the modal */
            if (this.loginStatusNavLink != null) {
                this.loginStatusNavLink.addEventListener("click", event => {
                    this.OpenLoginModal()
                });
            }

            /* Bind the close icon click in modal to close modal */
            if (this.closeModal != null) {
                this.closeModal.addEventListener("click", event => {
                    this.CloseLoginModal()
                });
            }
        } else {
            if (this.loginStatusNavLink != null) {
                this.loginStatusNavLink.addEventListener("click", event => {
                    this.userController.Logout()
                });
            }
        }
    }

    UpdateNavLinksInformation() {
        if (this.userController.IsUserLogged()) {

            this.loginStatusNavLink.innerHTML = this.logoutTitle
            this.userProfileNavLink.classList.add("visible")

            this.registerNavLink.innerHTML = this.empty
            this.registerNavLink.classList.add("invisible")

            this.userProfileNavLink.innerHTML = this.editProfileTitle
            this.userProfileNavLink.classList.add("visible")

            this.searchDoctoNavLink.innerHTML = this.searchDoctorTitle
            this.searchDoctoNavLink.classList.add("visible")
        } else {

            this.loginStatusNavLink.innerHTML = this.loginTitle
            this.userProfileNavLink.classList.add("visible")

            this.registerNavLink.innerHTML = this.registerTitle
            this.registerNavLink.classList.add("visible")

            this.userProfileNavLink.innerHTML = this.empty
            this.userProfileNavLink.classList.add("invisible")

            this.searchDoctoNavLink.innerHTML = this.empty
            this.searchDoctoNavLink.classList.add("invisible")
        }
    }

    BindLoginForm() {
        if (this.loginForm != null) {
            this.loginForm.addEventListener("submit", event => {
                event.preventDefault()
                try {
                    this.userController.Login(this.loginEmail.value, this.loginPassword.value)
                } catch (exception) {
                    this.LoginMessageHandler(exception, 'danger')
                }
            });
        }
    }

    LoginMessageHandler(message, type) {
        this.loginMessage.innerHTML = `<div class="alert alert-${type}" role="alert">${message}</div>`
    }
}