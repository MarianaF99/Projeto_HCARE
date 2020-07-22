import DoctorController from '../controllers/DoctorController.js'


export default class RatingsView {
 ratings = {
    Claire: 0,
    Harry: 0,
    James: 0,
    Josh: 0,
    Taylor: 0
  }

  doctor=null;
    constructor() {

        this.doctorController = new DoctorController();
        /*this.doctorController.updateScore("Harry",1);*/
        
        this.getRatings();

        this.doctorSelect = document.getElementById('doctor-select');
        this.ratingControl = document.getElementById('rating-control');

        this.binddoctorSelect();
        this.bindratingControl();
    }
    
    binddoctorSelect()
    {
     this.doctorSelect.addEventListener('change', event => {  //modificaçao do doctor select/selecionar medico
      event.preventDefault();
        this.doctor = event.target.value;  //guarda o medico que escolheu
        // Enable rating control
        this.ratingControl.disabled = false;
        this.ratingControl.value = this.ratings[this.doctor];  //rating atual do medico (na pagina)
      });
    
    }

    // Rating control change
    bindratingControl(){
      if (this.ratingControl != null) {
    this.ratingControl.addEventListener('blur', event => {  //elemento deixa de estar selecionado
    event.preventDefault()
    const rating = event.target.value;

    // Make sure 5 or under
    if (rating > 5) {
      alert('Please rate 1 - 5');
      return;
    }

    // Change rating
    this.ratings[this.doctor] = rating;  //guarda o novo rating na const ratings
    //console.log(rating)
    //console.log(this.doctor)
    this.doctorController.updateScore(this.doctor,rating)  //altera o score do medico
    this.getRatings(); //atualiza as estrelas
  });}
}

  // Get ratings
   getRatings() {
    const starsTotal = 5;
    for (let rating in this.ratings) {
      // Get percentage
      const starPercentage = (this.ratings[rating] / starsTotal) * 100;

      // Round to nearest 10
      const starPercentageRounded = `${Math.round(starPercentage / 10) * 10}%`;

      // Set width of stars-inner to percentage
      document.querySelector(`.${rating} .stars-inner`).style.width = starPercentageRounded;

      // Add number rating
      document.querySelector(`.${rating} .number-rating`).innerHTML = this.ratings[rating];
    }
  }


    
}