






/*********************************globe tooltip sync ******************************** */


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

