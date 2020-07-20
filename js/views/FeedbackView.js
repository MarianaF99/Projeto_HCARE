import UserController from '../controllers/UserController.js'

export default class FeedbackView {
    constructor() {

        this.userController = new UserController();

        /* Feedback Icon Bar on left side in each page */
        this.feedbackIconBar = document.querySelector(".feedbackIconBar");
        this.BindFeedbackIconBarVisibility()

        /* Feedback Button Action */
        this.feedbackRating = document.getElementsByName('rating');
        this.feedbackErrorMessage = document.querySelector('#feedbackErrorMessage');
        this.feedbackButton = document.querySelector("#feedbackButton")
        this.BindFeedbackButtonAction()
    }

    BindFeedbackIconBarVisibility() {
        if (this.userController.IsUserLogged()) {
            if(this.userController.FeedbackFromUserExists())
            {
                this.feedbackIconBar.style.display = "none";
            }
            else
            {
                this.feedbackIconBar.style.display = "block";
            }
        } else {
            this.feedbackIconBar.style.display = "none";
        }
    }

    VerifyRatingValue()
    {
        let radioButtonSelected = false
        for (var i = 0, length = this.feedbackRating.length; i < length; i++) {
            if (this.feedbackRating[i].checked)
            {
                radioButtonSelected = true
                break;
            }
        }

        if(radioButtonSelected == false){
            throw Error("Rating must be choosen.")
        }
    }

    BindFeedbackButtonAction() {
            this.feedbackButton.addEventListener("click", event => {
                event.preventDefault()
                try {
                   this.VerifyRatingValue()
                   this.userController.GiveUserFeedback()
                   location.reload();
                } catch (exception) {
                    this.FeedbackMessageHandler(exception, 'danger')
                }
            });
    }

    FeedbackMessageHandler(message, type) {
        this.feedbackErrorMessage.innerHTML = `<div class="alert alert-${type}" role="alert">${message}</div>`
    }
    
}