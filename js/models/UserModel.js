import User from '../models/User.js'

export default class LoginModel {
    constructor() { //listas de utilizadores e de consultas
        this.users = this.GetAllUsersFromLocalStorage() //vai buscar os users
        this.appointments = this.GetAllAppointmentsFromLocalStorage() //vai buscar todos os appointments
    }

    Logout() {
        sessionStorage.removeItem("loggedUser");
    }

    Login(email) {
        /* Store the session to know that user is logged in */
        sessionStorage.setItem("loggedUser", email);
        /* Remove the session for the admin as pre-caution */
        sessionStorage.removeItem("loggedAdmin");
    }

    IsUserLogged() {
        return sessionStorage.getItem("loggedUser") !== null ? true : false
    }

    //funcao que aumenta a experiencia do utilizador quando é dado feedback
    GiveUserFeedback(email) {
        this.UpdateAllUsersFromLocalStorage()
        for (var i = 0; i < this.users.length; i++) {
            if (this.users[i].email === email) {
                this.users[i].userGaveFeedbackAlready = true

                this.users[i].userLevelExperience = parseInt(this.users[i].userLevelExperience) + 20
                if (parseInt(this.users[i].userLevelExperience) >= 100) {
                    this.users[i].userLevelExperience = 0
                    this.users[i].userLevel = parseInt(this.users[i].userLevel) + 1
                }

                this._Persist()
                break
            }
        }
    }

    //Aumenta a experiencia do utilizador
    IncreaseUserLevelExperience(email) {
        this.UpdateAllUsersFromLocalStorage()
        for (var i = 0; i < this.users.length; i++) {
            if (this.users[i].email === email) {
                if (parseInt(this.users[i].userLevel) < 10) {
                    this.users[i].userLevelExperience = parseInt(this.users[i].userLevelExperience) + 10

                    if (parseInt(this.users[i].userLevelExperience) >= 100) {
                        this.users[i].userLevelExperience = 0
                        this.users[i].userLevel = parseInt(this.users[i].userLevel) + 1
                        
                    }
                    this._Persist()
                    break
                }
            }
        }
    }

    // bloqueia/desbloqueia o utilizador
    BlockUnlockUser(email) {
        let blockState = false
        this.UpdateAllUsersFromLocalStorage()

        for (var i = 0; i < this.users.length; i++) {
            if (this.users[i].email === email) {
                this.users[i].blockState = !this.users[i].blockState
                blockState = this.users[i].blockState
                break
            }
        }
        this._Persist()

        return blockState
    }

    //Apaga o utilizador
    DeleteUser(email) {
        this.users = this.users.filter(user => user.email != email)
        this._Persist()
    }

    //vai buscar o email do utilizador
    GetUserLoggedData() {
        let userLoggedEmail = this.GetUserLoggedEmail()
        return this.users.find(user => user.email === userLoggedEmail)
    }

    //Atualiza dados do utilizador
    UpdateUser(email, firstName, surname, address, phone, password, changePasswordState) {
        this.UpdateAllUsersFromLocalStorage()
        for (var i = 0; i < this.users.length; i++) {
            if (this.users[i].email === email) {
                this.users[i].firstName = firstName
                this.users[i].password = (changePasswordState === true) ? password : this.users[i].password
                this.users[i].surname = surname
                this.users[i].address = address
                this.users[i].phone = phone
                this._Persist()
                break
            }
        }
    }

    GetUserLoggedEmail() {
        let email = ""
        let auxiliar = sessionStorage.getItem("loggedUser")

        if (auxiliar !== null) {
            email = auxiliar
        }
        return email
    }

    GetAllUsersFromLocalStorage() {
        return JSON.parse(localStorage.getItem('users')) || []
    }

    UpdateAllUsersFromLocalStorage() {
        this.users = this.GetAllUsersFromLocalStorage()
    }

    GetAllUsers() {
        this.UpdateAllUsersFromLocalStorage()
        return this.users
    }

    CreateUser(firstName, surname, email, dateOfBirth, gender, address, phone, password, avatarSourceImage) {
        this.UpdateAllUsersFromLocalStorage()
        var newUser = new User(firstName, surname, email, dateOfBirth, gender, address, phone, password, avatarSourceImage);
        this.users.push(newUser); //adiciona à lista de utilizadores um novo utilizador
        this._Persist();
    }

    _ClearPersistent() {
        this.users = []
        localStorage.setItem('users', JSON.stringify(this.users))
    }

    //mostra todos os utilizadores
    PrintAllUsersFromLocalStorage() {
        this.UpdateAllUsersFromLocalStorage()
        this.users.forEach(function(user, i) {
            console.log(i + " - " + user.firstName + " %% " + user.surname +
                " %% " + user.email + " %% " + user.dateOfBirth +
                " %% " + user.phone + " %% " + user.gender +
                " %% " + user.address + " %% " + user.password + " %% " + user.avatarSourceImage)
        });
    }

    _Persist() {
        localStorage.setItem('users', JSON.stringify(this.users))
    }

    //cria um agendamento, associa o utilizador e o medico
    createAppointment(user, doctorEmail, date, time) {
        const appointment = {
            user: user,
            doctorEmail: doctorEmail,
            date: date,
            time: time

        }
        this.appointments.push(appointment); //adiciona a uma lista appointments
        this._persistAppointment();

    }
    _persistAppointment() {
        localStorage.setItem('appointments', JSON.stringify(this.appointments))
    }

    GetAllAppointmentsFromLocalStorage() {
        return JSON.parse(localStorage.getItem('appointments')) || []
    }
}