export default class DoctorModel {
    constructor() {
        //array para armazenar os doctors
        this.doctors = localStorage.doctors ? JSON.parse(localStorage.doctors) : [];
    }

    //metodo que vai retornar lista de doctors
    getAll() {
        return this.doctors;
    }

    //cria objeto do tipo doctor e armazena na lista de doctors
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
            specialty: specialty,
            score: 0
        }
        this.doctors.push(doctor); //adiciona o medico à linha 4
        this._persist();
    }



    remove(email) {
        this.doctors = this.doctors.filter(doctor => doctor.email != email)
        this._persist()
    }

    _persist() {
        localStorage.setItem('doctors', JSON.stringify(this.doctors));
    }

    //Atualiza o score do médico
    updateScore(firstName,scoreUser)
    {
        for (const doctor of this.doctors) {  //percorrer array dos médicos
            
            if(doctor.firstName == firstName)  //firstname para identificar medico
            {
                if(doctor.score!=0)  //verifica se o score atual é diferente de 0
                {
                    doctor.score= (doctor.score+parseInt(scoreUser))/2 //media
                    console.log(doctor.score)
                    this._persist();
                }
                else
                {
                    doctor.score=parseInt(scoreUser)
                    console.log(doctor.score)
                    this._persist();
                }
            }
        }
    }


}