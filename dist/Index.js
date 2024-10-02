


/*********************************************the facts box content change************************************************************* */

let facts=[" 27 football fields of forest cleared","2.4 million pounds of carbon dioxide released","Sea levels rise by 0.2 milimiters","consume  60,000 barrels of oil","Over 3,000 tons of plastic waste enter the oceans","Approximately 1 million tons of ice melt from the Greenland ice sheet","The ocean absorbs 2.5 million tons of carbon dioxide","Around 5,000 hectares of wetlands are drained","about 100,000 liters of freshwater are consumed","60 Species go Extinct" ]
const factsbox= document.querySelector('#factsdiv')
let x=0;

changetext();

function changetext(){

    // letting it fade out while the other element is added
    factsbox.classList.add("fade-out")
    
    setTimeout(() => {
        factsbox.innerText = facts[x];
        // removing it after changing the content
         factsbox.classList.remove('fade-out');
        x = (x + 1) % facts.length;
    }, 1000);
      

    }

    // running it every 5s
setInterval(changetext,5000)



/************************************************************Scoll into View******************************************************** */

//scroll into view
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry)=> {
        
    
    if (entry.isIntersecting) {
        entry.target.classList.add('show');
        
    }
    else{
        entry.target.classList.remove('show');
    }

})
}
,{
    threshold:.4,
});

const hiddenElements = document.querySelectorAll('.card');
hiddenElements.forEach((el)=>observer.observe(el));


// for the quotes
const quoteElement = document.querySelector('#quotes');

const observer2 = new IntersectionObserver(entries => {
    
    entries.forEach(entry => {
        
        if (entry.isIntersecting) {
            quoteElement.classList.add('visible');
            observer2.unobserve(entry.target);  // Unobserve after first intersection
        }
    });
});

observer2.observe(quoteElement);



/*******************************************globe tooltip sync ********************************************** */


        //loading the tooltip

        
        const tooltipF = document.querySelector("#callout-freeze");
        const tooltipH = document.querySelector("#callout-heat");
        const tooltipT = document.querySelector("#callout-tree");

    //running an angle increment at the same speed of globe rotation        

        let angle = 0;

        const checkAngle = () => {
            
            angle = (angle + 9) % 360; // Increment angle, keep within 0-359 degrees

            if (angle == 36) {
                
                tooltipF.classList.add("tooltip-show");

            }

            if (angle > 100) {
                tooltipF.classList.remove("tooltip-show");

            }

            if(angle>140 && angle<200){
                
                tooltipT.style.clipPath="circle(20rem at center)";
            }
            else{
                tooltipT.style.clipPath="circle(0rem at center)";
            }
           
            if (angle > 240) {
                
                tooltipH.classList.add("tooltip-show");

            }

            if (angle > 300) {
                tooltipH.classList.remove("tooltip-show");

            }

        }



        setInterval(checkAngle, 1000); // Run checkAngle every 111ms (360 degrees / 40s = 9 degrees/s)



        

