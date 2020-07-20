import DoctorController from '../controllers/DoctorController.js'
import UserController from '../controllers/UserController.js'


export default class SearchDoctorView {
    constructor() {
        this.doctorController = new DoctorController();
        this.userController = new UserController();


        this.filterDoctorSpecialty = document.getElementById('filterDoctorSpeciality')
        this.filterDoctorName = document.getElementById('filterDoctorName')
        this.btnSearch = document.querySelector('#btnSearch')
        this.doctorOptions = document.getElementById('doctorOptions')
        this.btnCallDoctor = document.querySelector('#btnCallDoctor')
        this.doctorMessage = document.querySelector("#doctorMessage")


        this.initMap()
        this.fillDoctorsOptions()
        this.bindAppointmentBtn()




    }

    bindAppointmentBtn() {
        this.btnCallDoctor.addEventListener('click', () => {
            this.createAppointment();
        })
    }

    createAppointment() {
        let user = this.userController.GetUserLoggedEmail();

        var today = new Date();
        var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

        var e = document.getElementById("doctorOptions");
        var doctorEmail = e.options[e.selectedIndex].value;

        console.log(doctorEmail);

        try {
            this.userController.createAppointments(user, doctorEmail, date, time);
            this.callDoctorMessageHandler("Doctor has been called", 'success')

        } catch (exception) {
            this.callDoctorMessageHandler(exception, 'danger')



        }
    }

    fillDoctorsOptions() {
        let doctors = this.doctorController.getAllDoctors();
        for (let i = 0; i < doctors.length; i++) {
            var option = document.createElement('option')
            option.innerHTML = doctors[i].firstName + " " + doctors[i].lastName;
            option.value = doctors[i].email;
            this.doctorOptions.appendChild(option)
        }

    }






    callDoctorMessageHandler(message, type) {
        this.doctorMessage.innerHTML = `<div class="alert alert-${type}" role="alert">${message}</div>`
    }










    geocodeAddress = function(geocoder, resultsMap) {

        let doctors = this.doctorController.getDoctors(this.filterDoctorName.value, this.filterDoctorSpecialty.value);

        for (let i = 0; i < doctors.length; i++) {

            geocoder.geocode({ 'address': doctors[i].adress },
                (results, status) => {
                    if (status === 'OK') {


                        var markers = new google.maps.Marker({
                            map: resultsMap,
                            position: results[0].geometry.location,
                            icon: "https://img.icons8.com/fluent/32/000000/medical-doctor.png",
                            content: `
                            <div class="main-section text-center">
                            <div class="user-detail">
                            <br>
                                <div class="col-lg-12 col-sm-12 col-12">
                                    <img src="${doctors[i].photo}" class="rounded-circle img-thumbnail">
                                    <h5>${doctors[i].firstName} ${doctors[i].lastName}</h5>
                                    <h7>${doctors[i].specialty}</h7>
                                </div>
                            </div>
                        </div> `,

                        });




                        var doctorWindow = new google.maps.InfoWindow({
                            content: markers.content
                        });

                        markers.addListener('click', function() {
                            doctorWindow.open(map, markers)

                        })




                    } else {
                        alert('Geocode was not successful for the following reason: ' + status);
                    }


                });

        }






    }





    initMap = function() {



        let map = new google.maps.Map(document.getElementById('map'), {
            center: {
                lat: 41.14961,
                lng: -8.61099
            },
            zoom: 12,

        });


        let infoWindow = new google.maps.InfoWindow;

        var contentString = '<h5>Your Position</h5>';



        const userInfo = new google.maps.InfoWindow({
            content: contentString,
        });


        const geocoder = new google.maps.Geocoder();

        this.btnSearch.addEventListener('click', () => {
            this.geocodeAddress(geocoder, map)
        })








        if (navigator.geolocation) {

            // returns the current position of the user 

            navigator.geolocation.getCurrentPosition(
                position => {
                    const pos = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    };
                    infoWindow.setPosition(pos);
                    infoWindow.setContent('Location found!');
                    infoWindow.open(map);
                    map.setCenter(pos);


                    const marker = new google.maps.Marker({
                        position: pos,
                        map: map,
                        icon: "https://img.icons8.com/fluent/32/000000/cottage.png"

                    });

                    marker.addListener('click', function() {
                        userInfo.open(map, marker);
                    });


                },
                () => handleLocationError(true, infoWindow, map.getCenter())
            );
        } else {
            // Browser doesn't support Geolocation
            handleLocationError(false, infoWindow, map.getCenter());
        }


    }



    handleLocationError(browserHasGeolocation, infoWindow, pos) {
        infoWindow.setPosition(pos);
        infoWindow.setContent(browserHasGeolocation ?
            'Error: The Geolocation service failed.' :
            'Error: Your browser doesn\'t support geolocation.');
        infoWindow.open(map);
    }




}