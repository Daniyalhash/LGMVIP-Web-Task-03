const skillCheckBox = document.querySelectorAll('input[name="selected-options[]"]');
const genderOptions = document.querySelectorAll('input[name="selected-option"]');
const imageUrl = document.querySelector("#image-url");
const name = document.querySelector("#name");
const Email = document.querySelector("#Email");
const Website = document.querySelector("#Website");
const clear = document.querySelector('.clear')
const delAll =document.querySelector('.fas')

document.querySelector("form").addEventListener("submit", function(event) {
    event.preventDefault();
    const randomId = Math.floor(Math.random() * 1000000); // Change 1000000 to your desired range

    //radio
    let selectedGender;
    genderOptions.forEach((option) => {
    if (option.checked) {
        selectedGender = option.value;
    }
    })
    // Checkbox
    const selectedSkills = [];
    skillCheckBox.forEach((checkbox) => {
        if (checkbox.checked) {
            selectedSkills.push(checkbox.value);
        }
    });
    //create an object for the person
    const personalData = {
        id:randomId,
        name:this.name.value,
        Email:Email.value,
        imageUrl:imageUrl.value,
        Website:Website.value,
        gender: selectedGender,
        skills: selectedSkills
    }
    
    
 // Get the existing data from local storage
 let mainArr = JSON.parse(localStorage.getItem('mainArr')) || [];
 // push
   mainArr.push(personalData)

    localStorage.setItem('mainArr',JSON.stringify(mainArr))
    showData();

    // imagePreview.innerHTML = `<img src="${imageUrl}" alt="User-provided image">`;
});

function showData(){
    const MainArray = JSON.parse(localStorage.getItem('mainArr'));

    const table = document.querySelector('.table');
    // Initialize an empty string to hold the HTML
    let tableHTML = '';
    MainArray.forEach((i)=>{
        const productHTML = `
        
        <tr>
        <td>
            <div class="inner-table">
                <p id="name-js">${i.name}</p>
                <p id="gender-js">${i.gender}</p>
                <p id="mail-js">${i.Email}</p>
                <p id="web-js"><a href="${i.Website}" target="_blank">${i.Website}</a></p>
                <p id="skil-js">${i.skills}</p>
            </div>
    
        </td>
        <td>
            <img src="${i.imageUrl}" class="img-des-js" alt="image-url">
        </td>
        <td>
        <i onclick="DelSingle(${i.id})" class="fas fa-trash"></i>        </td>
        </tr>
        `;
          // Append the productHTML to the tableHTML
          tableHTML += productHTML;
    })
  
    
    table.innerHTML = tableHTML;
    
}
document.addEventListener('DOMContentLoaded', showData);

clear.addEventListener('click',function(){
 // Clear input fields
 imageUrl.value = "";
 name.value = "";
 Email.value = "";
 Website.value = "";

 genderOptions.forEach((option) => {
     option.checked = false; // Uncheck all radio buttons
 });

 skillCheckBox.forEach((checkbox) => {
     checkbox.checked = false; // Uncheck all checkboxes
 });
})



//del single
delAll.addEventListener('click',DelSingle)

function DelSingle(id){
    const MainArray = JSON.parse(localStorage.getItem('mainArr'));
    let itemFound = false;
    for (let index = 0 ; index< MainArray.length;index++ ){
        if(MainArray[index].id === id){
            MainArray.splice(index,1)
            itemFound = true;
            break;
        }
    
    }
    if (itemFound){
        localStorage.setItem('mainArr',JSON.stringify(MainArray))
        showData()
    }else{
        alert('item not found : '+id)
    }
}

document.addEventListener('DOMContentLoaded', showData);
