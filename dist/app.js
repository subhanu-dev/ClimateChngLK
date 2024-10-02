/************************************************nav-dropdown******************************************* */

// hamburger animate

const hamburger = document.querySelector('#bars')
const navdrop = document.querySelector('#navdrop')
const topbar = document.querySelector('#topbar')
const navsvg = document.querySelector('#svg1')
const links = document.querySelectorAll('li a')






// gsap animations

// setting the gsap to paused will not activate them until we say it to play

let tl = gsap.timeline({ paused: true });

tl.to("#animatedCircle1", {
    duration: 2,
    attr: { r: 302 },
    ease: "power2.inOut"
}, "<")

    .to("#animatedCircle2", {
        duration: 3,
        attr: { r: 270 },
        ease: "power2.inOut"
    }, "<")

    .to("#animatedCircle3", {
        duration: 4,
        attr: { r: 200 },
        ease: "power2.inOut"
    }, "<")



// hamburger icon dropping down the nav section and related changes


hamburger.addEventListener('click', function () {

    //bringing the navbar down
    navdrop.classList.toggle('drop')

    // checking the size of the window
    const screenWidth = window.innerWidth;
    // if screenwidth is less than 800, the hamburger wont turn into white in transition
    if (screenWidth > 640) {
        hamburger.classList.toggle('change')
    }

    else {
        hamburger.classList.toggle('smallerChange')

    }

    // want to disable scrolling when the menu is dropped down.
    //setting the noscroll class on the root html element. applied it on the roothtml cuz 'document.body.style' settting didnt work.
    document.documentElement.classList.toggle('noscroll')




    // changing the color of the top svg bar elements based on the current color.
    const currentColor = getComputedStyle(topbar).backgroundColor;

if (currentColor == "rgb(255, 255, 255)") {

    topbar.style.backgroundColor = '#031806'
    navsvg.setAttribute('fill', '#031806')

}

else {
    topbar.style.backgroundColor = "white"

    navsvg.setAttribute('fill', 'white')

}

// playing the gsap animations by activating


tl.play();
   
  
})

// removed this feature because we added a preloader!

// //making the link navigation happen after completing the animation
// for(let link of links){
//     link.addEventListener('click', function(subhanu){
//         subhanu.preventDefault();

//         navdrop.classList.remove('drop');

//         // giving time for the transition to finish and then navigating to the link 
//         setTimeout(()=>
//         {
//             window.location.href = this.href;
//         },1000)    



//     })

//     }


// adding icon to the active page in nav

// Get the current URL path
const path = window.location.pathname;


// Extract the filename 
const page = path.split('/').pop();


// Select all navigation links
const navItems = document.querySelectorAll('#navitems li');


navItems.forEach(item => {

    const link = item.querySelector('a').getAttribute('href');
    if (link === page) {
        item.classList.add('active');
    }

});




/******************************************Preloader****************************************************/

var loader = document.getElementById('preloader')

function closepreloader() {

    // mehemth puluwn: document.getElementById("preloader").style.display = 'none';
    loader.classList.add("preloader-off")
}

window.addEventListener("load", function () {

    setTimeout(closepreloader, 1500);

});

// removing the element from the dom upon transition completion
loader.addEventListener('transitionend', () => {
    document.body.removeChild(loader);
})



