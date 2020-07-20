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

    //visibilidade do icon de feedback
    BindFeedbackIconBarVisibility() {
        if (this.userController.IsUserLogged()) { //se tiver login feito
            if(this.userController.FeedbackFromUserExists()) //verifica se utilizador deu feedback
            {
                this.feedbackIconBar.style.display = "none"; //nao mostra icon bar
            }
            else
            {
                this.feedbackIconBar.style.display = "block"; //mostra o elemento
            }
        } else {
            this.feedbackIconBar.style.display = "none";  //nao esta loggado logo nao mostra icon
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