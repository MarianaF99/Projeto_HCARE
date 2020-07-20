import UserController from '../controllers/UserController.js'
import User from '../models/User.js'

export default class UserProfileView {
    constructor() {

        this.userController = new UserController();

        /* User Profile Form */
        this.userProfileFirstName = document.querySelector("#userProfileFirstName")
        this.userProfileSurname = document.querySelector("#userProfileSurname")
        this.userProfileAddress = document.querySelector("#userProfileAddress")
        this.userProfilePhone = document.querySelector("#userProfilePhone")
        this.userProfileAvatarPhoto = document.querySelector("#userProfileAvatarPhoto")
        this.userLevel = document.querySelector("#userLevel")
        this.userLevelExperiencePercentage = document.querySelector("#userLevelExperiencePercentage")
        this.userLevelExperienceValue = document.querySelector("#userLevelExperienceValue")
        this.FillUserProfileDataInForm()
    }

    FillUserProfileDataInForm() {

        let user = this.userController.GetUserLoggedData()

        if (user != null) {
            this.userProfileFirstName.value = user.firstName
            this.userProfileSurname.value = user.surname
            this.userProfileAddress.value = user.address
            this.userProfilePhone.value = user.phone
            this.userProfileAvatarPhoto.src = user.avatarSourceImage
            this.userLevel.innerHTML = user.userLevel.toString() + "/10"
            this.userLevelExperiencePercentage.innerHTML = `<div class="progress-bar progress-bar-striped bg-info" role="progressbar" style="width: ${user.userLevelExperience}%" aria-valuenow="${user.userLevelExperience}" aria-valuemin="0" aria-valuemax="100"></div>`
            this.userLevelExperienceValue.innerHTML = user.userLevelExperience.toString() + "%"
        }
    }

  }