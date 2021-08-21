// https://script.google.com/macros/s/AKfycbxEbu2JguYgAqPIrw1Yws3hhedFGPrpzZlm2FKPUg_n4aF1P5UqoJDVAeI6rPcFkQwk/exec
console.log('Welcome to cv scanner');

//Getting elements from documents
const imgContainer = document.getElementById('img-container'); //getting place where profile photo will be placed
const tableBody = document.getElementById('table-body'); //getting table-body where whole details goes

//Getting next and previous button
const nextButton = document.getElementById('next-button');
const prevButton = document.getElementById('prev-button');

//Setting up iterator
function dataIterator(data) {
    let nextIndex = -1;
    return {
        next: function () {
            nextIndex += 1;
            if ((nextIndex) < data.length) {
                let result = {
                    value: data[nextIndex],
                    done: false,
                    index: nextIndex
                };
                
                return result;
            }
           
            else {
                return {
                    done: true
                };
            }
        },
        prev: function () {
            nextIndex -= 1;
            if (nextIndex < 0) {
                return {
                    done: true
                };
            }
            else {
                let result = {
                    value: data[nextIndex],
                    done: false,
                    index: nextIndex
                };
                return result;
            }
        }
    }

}

//Getting Api data using fetch api
async function getApiData() {
    const url = 'https://script.google.com/macros/s/AKfycbxEbu2JguYgAqPIrw1Yws3hhedFGPrpzZlm2FKPUg_n4aF1P5UqoJDVAeI6rPcFkQwk/exec';
    const response = await fetch(url);
    const data = await response.json();
    return data;
}

//Using promise from getApiData function and after completing promise then process will happen
getApiData().then((data) => {
    //Setting event listeners to both the buttons
    nextButton.addEventListener('click', nextResume);
    prevButton.addEventListener('click', prevResume);
    //calling iterator for data object
    const iterator = dataIterator(data);

    //Setting up function when previous button clicked
    function prevResume() {
        const resumeData = iterator.prev();
        checkDisabledButton(data, resumeData);

        if (resumeData.value) {
            const resume = resumeData.value;
            fillPage(resume);
        }
    }

    //Setting up function for next button clicked
    function nextResume() {
        const resumeData = iterator.next();
        checkDisabledButton(data, resumeData);

        if (resumeData.value) {
            const resume = resumeData.value;
            fillPage(resume);
        }
    }
    
    //For initial screen first data will show
    nextResume(); 
})


//Setting up function for editing html content
function fillPage(resume) {
    imgContainer.innerHTML = `<img src="${resume.image}" alt="">`;
            tableBody.innerHTML = `<tr>
                                        <th>Name</th>
                                        <td>${resume.name}</td>
                                    </tr>
                                    <tr>
                                        <th>Age</th>
                                        <td>${resume.age}</td>
                                    </tr>
                                    <tr>
                                        <th>Address</th>
                                        <td>${resume.address}</td>
                                    </tr>
                                    <tr>
                                        <th>Education</th>
                                        <td>${resume.education}</td>
                                    </tr>
                                    <tr>
                                        <th>Programming</th>
                                        <td>${resume.programming}</td>
                                    </tr>
                                    <tr>
                                        <th>Experience</th>
                                        <td>${resume.experience}</td>
                                    </tr>
                                    <tr>
                                        <th>Internship</th>
                                        <td>${resume.internship}</td>
                                    </tr>
                                    <tr>
                                        <th>Courses done</th>
                                        <td>${resume.courses}</td>
                                    </tr>
                                    <tr>
                                        <th>Hobbies</th>
                                        <td>${resume.hobbies}</td>
                                    </tr>`;
}

//Setting up function for checking wheather button should be disapbled or not
function checkDisabledButton(data, resumeData) {
    if (data.length == 1) {
        prevButton.disabled = true;
        nextButton.disabled = true;
    }
    else if (resumeData.index == 0) {
        prevButton.disabled = true;
        nextButton.disabled = false;
    }
    else if (resumeData.index == data.length - 1) {
        nextButton.disabled = true;
        prevButton.disabled = false;
    } else {
        prevButton.disabled = false;
        nextButton.disabled = false;
    }
}