const red    = document.querySelector('.red');
const orange = document.querySelector('.orange');
const green  = document.querySelector('.green');

const url = 'https://xompasssuiteadminstg.z20.web.core.windows.net/semaphore.json';

/** Fetch data from url to get json with traffic light info 
 *  Green => Orange/Yellow => Red 
*/

fetch(url)
.then(response => response.json())
.then(data => {
	// console.log(data)
    let currentLightColor = data['currentLightColor'];
    let counter = 0

	const lights = data['lights'];
	
    /** Set first light in ON */
    // console.log('First Light' + currentLightColor);
    if (currentLightColor === "green"){
        green.classList.add('green-on');            
    }
    else if (currentLightColor === "orange"){
        orange.classList.add('orange-on');
    } 
    else if (currentLightColor === "red"){
        red.classList.add('red-on');
    }

    /** Loop to change lights ON and OFF
     *  Interval of 1000ms = 1s 
     *  Each increase of counter is 1s. Then counter = 5 means 5s
    */
	setInterval( () => {
        /** Update current light in ON */
        currentLightColor = data['currentLightColor'];
		//console.log('Current Light' + currentLightColor);
	
		/** Check current light and light duration 
         * if counter is equal to the light duration then turn off current light and update to the next one
        */
        if (currentLightColor === "green" && counter === lights[2]["duration"]){
			/** Change from green to orange */
            data['currentLightColor'] = 'orange';	
            green.classList.remove('green-on');
            orange.classList.add('orange-on');
            counter = 0;
		}
		else if (currentLightColor === "orange" && counter === lights[1]["duration"] ){
            /** Change from orange/yellow to red */
			data['currentLightColor'] = 'red';
			orange.classList.remove('orange-on');
            red.classList.add('red-on');
            counter = 0;
		} 
		else if (currentLightColor === "red" && counter === lights[0]["duration"] ){
            /** Change from red to green */
            data['currentLightColor'] = 'green';
            red.classList.remove('red-on');
            green.classList.add('green-on');
            counter = 0;
		}

        counter += 1
	}, 1000); 
	});