export default class User {
    constructor(firstName, surname, email, dateOfBirth, gender, address, phone, password, avatarSourceImage, blockState = false) {
        this.firstName = firstName
        this.surname = surname
        this.email = email
        this.dateOfBirth = dateOfBirth
        this.gender = gender
        this.address = address
        this.phone = phone
        this.password = password
        this.avatarSourceImage = avatarSourceImage
        this.blockState = blockState
        this.userLevel = 1
        this.userLevelExperience = 0
        this.userGaveFeedbackAlready = false
    }
}