
//********************************************scroll to top button************************** */
const scrollbtn = document.getElementById("top-btn")
const scrollThreshold = 300;  //this is the number of pixels that we have to scroll before appearing the button on page

function handleScroll() {
    if (window.scrollY > scrollThreshold) {
        scrollbtn.classList.add('visible');
    } else {
        scrollbtn.classList.remove('visible');
    }
}

window.addEventListener('scroll', handleScroll);

scrollbtn.addEventListener('click', function () {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    })
})


/********************getting and displaying current date***********************************/


const datetext = document.getElementById('date')

const today = new Date();
let date = today.getDate();
let Month = today.getMonth();
let year = today.getFullYear();
let dateAbb = findDayAbb(date)
let hourOfTheDay = today.getHours()


function getmonthname(mnth) {
    switch (mnth) {
        case 0:
            return 'January';
        case 1:
            return 'February';
        case 2:
            return 'March';
        case 3:
            return 'April';
        case 4:
            return 'May';
        case 5:
            return 'June';
        case 6:
            return 'July';
        case 7:
            return 'August';
        case 8:
            return 'September';
        case 9:
            return 'October';
        case 10:
            return 'November';
        case 11:
            return 'December';
    }
}

let monthName = getmonthname(Month)



// getting the date for today
datetext.innerText = `${date + dateAbb} of ${monthName} ${year} `;


function findDayAbb(day) {
    if (day == 1) {
        return 'st'
    } else if (day == 2) {
        return 'nd'
    } else if (day == 3) {
        return 'rd'
    } else {
        return 'th'
    }
}



/*************redbound animations upon scroll*************************************** */


const tempCard = document.querySelector('#tempcard')
const redBounds = document.querySelectorAll('.rounded-bound');

function callback(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            for (round of redBounds) {
                round.classList.add('circle-size');
            }
        }
        else {
            for (round of redBounds) {
                round.classList.remove('circle-size')
            }
        }
    })
}

const options = {
    threshold: 1
}

const observer = new IntersectionObserver(
    callback,
    options
)


observer.observe(tempCard)


/************setting weather data********************* */

const col_temp = document.querySelector('#coltemp')
const jaf_temp = document.querySelector('#jaftemp')
const gal_temp = document.querySelector('#galtemp')


const colIcon = document.querySelector('#col-ico')
const jafIcon = document.querySelector('#jaf-ico')
const galIcon = document.querySelector('#gal-ico')



function getWeatherIco(data) {
    if (hourOfTheDay >= 19 || hourOfTheDay <= 5) { return 'fa-moon' }
    else if (data == 1) { return 'fa-cloud' }
    else if (data == 2) { return 'fa-sun' }
    else if (data == 3) { return 'fa-smog' }
    else if (data >= 61 || data <= 67) { return 'fa-cloud-showers-heavy' }
    else if (data >= 51 || data <= 55) { return 'fa-cloud-sun-rain' }
    else if (data >= 80 || data <= 83) { return 'fa-cloud-showers-heavy' }
    else if (data >= 95 || data <= 99) { return 'fa-cloud-bolt' }
    else { return 'fa-sun'; }
}



function convertToJson(data) {
    return data.json()
}

function handleError(err) {
    console.error("error fetching data" + err)
}


/*******************fetching data for the weather ***************************/

fetch("https://api.open-meteo.com/v1/forecast?latitude=6.9355&longitude=79.8487&current=temperature_2m,weather_code&timezone=auto")
    .then(convertToJson)
    .then(data => {
        col_temp.innerHTML = ` ${data.current.temperature_2m} <sup>0</sup> C `;
        let currentWeather = data.current.weather_code;
        let iconStyle = getWeatherIco(currentWeather);
        colIcon.classList.add(iconStyle);
    })
    .catch(handleError);

fetch("https://api.open-meteo.com/v1/forecast?latitude=9.6684&longitude=80.0074&current=temperature_2m,weather_code&timezone=auto")
    .then(convertToJson)
    .then(data => {
        jaf_temp.innerHTML = ` ${data.current.temperature_2m} <sup>0</sup> C `;
        let currentWeather = data.current.weather_code;
        let iconStyle = getWeatherIco(currentWeather);
        jafIcon.classList.add(iconStyle);
    })
    .catch(handleError);


fetch("https://api.open-meteo.com/v1/forecast?latitude=6.0461&longitude=80.2103&current=temperature_2m,weather_code&timezone=auto")
    .then(convertToJson)
    .then(data => {
        gal_temp.innerHTML = ` ${data.current.temperature_2m} <sup>0</sup> C `;
        let currentWeather = data.current.weather_code;
        let iconStyle = getWeatherIco(currentWeather);

        galIcon.classList.add(iconStyle);
    })
    .catch(handleError);


/*************************************the annual emissions by country***************************  */

const percents = document.querySelectorAll('.percent');
const emissioncard = document.getElementById('emissionsByCountry')



function runcountNumbers() {
    percents.forEach((percent) => {
        let x = percent.textContent;
        x = parseInt(x.substring(0, 2))
        let y = 0;
        function countNumbers() {
            if (y <= x) {
                percent.innerText = ` ${y} % `
                y++;
                setTimeout(countNumbers, 200);  // Recursively calling setTimeout
            }
        }
        countNumbers()

    })
}



function incrementCounter(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {

            runcountNumbers()
            observer2.unobserve(entry.target)
        }
    })
}

const observer2 = new IntersectionObserver(
    incrementCounter,
    {
        threshold: .8,
    })
observer2.observe(emissioncard)

//emissions cards hover animation
const cards = document.querySelectorAll('.EC');

cards.forEach(card => {

    card.addEventListener('mouseover', () => {
        card.classList.add('colordemu');  // Add class on hover
    });

    card.addEventListener('mouseout', () => {
        card.classList.remove('colordemu');  // Remove class when hover ends
    });

})


/********************Greenhouse Emissions by Sector pie chart**************** */


const ctx2 = document.getElementById('emissions-Sector');

const chart2 = new Chart(ctx2, {
    type: 'pie',
    data: {
        labels: [
            'Agriculture',
            'Waste',
            'Chemical & Cement Industry',
            'Energy in Buildings',
            'Energy in Transport',
            'Energy use in Industry',
            'Fuel Leakage',
            'Other Industrial Processes'
        ],
        datasets: [{
            label: 'Greenhouse Emissions',
            data: [18.4, 3.2, 5.2, 17.5, 16.2, 24.2, 5.8, 10],
            backgroundColor: [  // Add colors for each segment
                '#34AC64',
                '#E88A76',
                '#E9F55F',
                '#A078D3',
                '#7D2C1B',
                '#65A0F9',
                '#F0C556',
                '#00648E',
                '#001F8E',

            ],
            hoverOffset: 20,  // Segment expansion on hover
            borderColor: 'black',
            borderWidth: 1,
            hoverBorderWidth: 3,  // Hover border size
        }]
    },
    options: {
        plugins: {
            legend: {
                display: true,
                position: 'bottom',
                align: 'start',
                labels: {
                    font: {
                        family: 'Lato',  // Set font family here
                        size: 12,
                        weight: 'bold'
                    },
                    padding: 5,

                },
            },

        },
        layout: {
            padding: {
                right: 20,
                left: 20,
                top: 20,
                bottom: 20  // Legend padding example
            },

        },
        maintainAspectRatio: false,  // Disable aspect ratio
        responsive: true,

    }
});


fetch('data/srilanka monthly data.csv')  // Replace 'data.csv' with your CSV file path
    .then(response => response.text())
    .then(csvData => {
        Highcharts.chart('airTempChart', {
            data: {
                csv: csvData
            },
            chart: {
                type: 'line'
            },
            title: {
                text: 'Monthly Surface Air Temperatures in Sri lanka'
            },
            series: [{
                name: 'Data from CSV',
            }]
        });
    });


fetch('data/temperature_anomalies.csv')  
.then(response => response.text())
.then(csvData => {
        Highcharts.chart('tempAnomaliesChart', {
            data: {
                csv: csvData
            },
            chart: {
                type: 'line'
            },
            title: {
                text: 'Global Temperature Anomalies 1880-2024'
            },
            series: [{
                name: 'Temp anomaly',
                color: '#60b86a',
            }]
        });
    });
