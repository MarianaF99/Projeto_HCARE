import NavLinksView from './views/NavLinksView.js'
import AdminView from './views/AdminView.js'
import RegisterView from './views/RegisterView.js'
import EditProfileView from './views/EditProfileView.js'
import UserProfileView from './views/UserProfileView.js'
import AddDoctorView from '../js/views/AddDoctorView.js'
import SearchDoctorView from '../js/views/SearchDoctorView.js'
import AppointmentsView from '../js/views/AppointmentsView.js'
import FeedbackView from '../js/views/FeedbackView.js'

class App {
    constructor() {
        this._InstantiateView()
        this._importDoctorsData()
    }

    _InstantiateView() {
        const webPath = window.location.pathname
        const htmlFile = webPath.substr(webPath.lastIndexOf('/') + 1)

        switch (htmlFile) {
            case '':
            case 'index.html':
                new NavLinksView()
                new FeedbackView()
                break;
            case 'userProfile.html':
                new UserProfileView()
                new NavLinksView()
                new FeedbackView()
                break;
            case 'editProfile.html':
                new EditProfileView()
                new NavLinksView()
                break;
            case 'register.html':
                new NavLinksView()
                new RegisterView()
                break;
            case 'admin.html':
                new AdminView()
                break;
            case 'ratings.html':
                new EditProfileView()
                new NavLinksView()
                break;
            case 'addDoctor.html':
                new AddDoctorView()
                break;
            case 'searchdoctor.html':
                new NavLinksView()
                new SearchDoctorView()
                break;
            case 'appointments.html':
                new NavLinksView()
                new AppointmentsView()
                break;
            default:
                break;
        }
    }
    _importDoctorsData() {
        const doctors = [{
                firstName: 'Claire',
                lastName: 'Cardwell',
                photo: 'https://images.theconversation.com/files/304957/original/file-20191203-66986-im7o5.jpg',
                email: 'claire@gmail.com',
                dateOfBirth: '27/07/1990',
                gender: 'Female',
                adress: 'Rua Óscar da Silva, Porto',
                phone: '912364798',
                specialty: 'Dermatologist'
            },
            {
                firstName: 'Harry',
                lastName: 'Thompson',
                photo: 'https://hcplive.s3.amazonaws.com/v1_media/_image/happydoctor.jpg',
                email: 'harry@gmail.com',
                dateOfBirth: '15/11/1970',
                gender: 'Male',
                adress: 'Rua da Constituição, Porto',
                phone: '912864778',
                specialty: 'Dermatologist'
            },
            {
                firstName: 'James',
                lastName: 'Park',
                photo: 'https://www.pinnaclecare.com/wp-content/uploads/2017/12/bigstock-African-young-doctor-portrait-28825394-300x425.jpg',
                email: 'james@gmail.com',
                dateOfBirth: '02/02/1985',
                gender: 'Male',
                adress: 'Rua da Alegria, Porto',
                phone: '962486778',
                specialty: 'Pediatrician'
            },
            {
                firstName: 'Josh',
                lastName: 'Smith',
                photo: 'https://img.medscape.com/thumbnail_library/dt_140605_serious_male_doctor_hospital_800x600.jpg',
                email: 'josh@gmail.com',
                dateOfBirth: '27/07/1988',
                gender: 'Male',
                adress: 'Avenida Júlio Saúl Dias, Vila do Conde',
                phone: '962486778',
                specialty: 'Pediatrician'
            },
            {
                firstName: 'Taylor',
                lastName: 'Evans',
                photo: 'https://health.gov/sites/default/files/styles/myhf_topics_header_image/public/2020-01/cadqt.png?itok=0orSgv3W',
                email: 'taylor@gmail.com',
                dateOfBirth: '30/05/1984',
                gender: 'Female',
                adress: 'Avenida Doutor António Bento Martins Júnior, Vila do Conde',
                phone: '962486778',
                specialty: 'Psychiatrist'
            }
        ];

        if (!localStorage.doctors) {
            localStorage.setItem('doctors', JSON.stringify(doctors));
        }

    }
}

new App()