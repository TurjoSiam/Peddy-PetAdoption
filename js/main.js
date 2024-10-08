// load category function
const loadCategories = () => {
    try {
        fetch('https://openapi.programming-hero.com/api/peddy/categories')
            .then(res => res.json())
            .then(data => displayCategories(data.categories));
    } 
    catch (error) {
        console.log(error);
    }
};

// load all pets function
const loadPets = () => {
    try {
        const petContainer = document.getElementById('pets-container');
        petContainer.innerHTML = "";
        document.getElementById('spinner').style.display = "block";

        fetch('https://openapi.programming-hero.com/api/peddy/pets')
            .then(res => res.json())
            .then(data => {

                setTimeout(function(){
                    displayPets(data.pets);
                }, 2000)
            });
    } 
    catch (error) {
        console.log(error);
    }
};

// load pet category wise function
const loadCategoryPets =(categoryName) =>{
    try {
        const petContainer = document.getElementById('pets-container');
        petContainer.innerHTML = "";
        document.getElementById('spinner').style.display = "block";

        fetch(`https://openapi.programming-hero.com/api/peddy/category/${categoryName}`)
            .then(res => res.json())
            .then(data => {
                removeActiveBtn();
                const activeBtn = document.getElementById(`btn-${categoryName}`);
                activeBtn.classList.add('active-btn')
                
                setTimeout(function() {
                    displayPets(data.data);
                }, 2000)
            });
    } 
    catch (error) {
        console.log(error);
    }
}

// active button class remove
const removeActiveBtn = () => {
    const buttons = document.getElementsByClassName('category-btn')
    for(let button of buttons){
        button.classList.remove('active-btn')
    }
}

// load pet details function
const loadPetDetails = async (petId) => {
    const uri = `https://openapi.programming-hero.com/api/peddy/pet/${petId}`
    const res = await fetch(uri);
    const data = await res.json();
    displayDetails(data.petData)
}

// liked pet function
const likedPet = (picture) => {
    const likedPetContainer = document.getElementById('liked-pet-container');
    const div = document.createElement('div')
    div.innerHTML = `
        <img src="${picture}" class="rounded-md" alt="liked pet">
    `
    likedPetContainer.append(div);
}









const displayDetails = (details) => {
    const detailsContainer = document.getElementById('modal-container');

    detailsContainer.innerHTML = `
    <div class="flex flex-col gap-5">
        <img src="${details.image}" class="rounded-lg" alt="pet photo">
        <div class="flex flex-col gap-3">
            <div>
                <h2 class="text-2xl font-extrabold">${details.pet_name}</h2>
            </div>
            <div class="flex items-center gap-7 border-b pb-3">
                <div>
                    ${details.breed == undefined? `<p class="text-gray-500 flex items-center gap-3"><span><i
                                class="fa-solid fa-table-cells-large"></i></span><span>Breed: Not available</span></p>` : `<p class="text-gray-500 flex items-center gap-3"><span><i class="fa-solid fa-table-cells-large"></i></span><span>Breed: ${details.breed}</span></p>`}

                    ${details.gender == undefined? `<p class="text-gray-500 flex items-center gap-3"><span><i
                                class="fa-solid fa-transgender"></i></span><span>Gender: Not available</span></p>` : `<p class="text-gray-500 flex items-center gap-3"><span><i class="fa-solid fa-transgender"></i></span><span>Gender: ${details.gender}</span></p>`}

                    ${details.vaccinated_status == undefined? `<p class="text-gray-500 flex items-center gap-3"><span><i class="fa-solid fa-syringe"></i></span><span>Gender: Not available</span></p>` : `<p class="text-gray-500 flex items-center gap-3"><span><i class="fa-solid fa-syringe"></i></span><span>Vaccinated status: ${details.vaccinated_status}</span></p>`}
                </div>
                <div>
                    ${details.date_of_birth == undefined? `<p class="text-gray-500 flex items-center gap-3"><span><i
                                class="fa-regular fa-calendar-days"></i></span><span>Birth: Not available</span></p>` : `<p class="text-gray-500 flex items-center gap-3"><span><i class="fa-regular fa-calendar-days"></i></span><span>Birth: ${details.date_of_birth}</span></p>`}

                    ${details.price == undefined? `<p class="text-gray-500 flex items-center gap-4"><span><i
                                class="fa-solid fa-dollar-sign"></i></span><span>Price: Not available</span></p>` : `<p class="text-gray-500 flex items-center gap-4"><span><i class="fa-solid fa-dollar-sign"></i></span><span>Price: ${details.price}</span></p>`}
                </div>
            </div>
            <div class="flex flex-col gap-2">
                <h3 class="font-bold">Details Information</h3>
                <p class="text-gray-500">${details.pet_details}</p>
            </div>
        </div>
    </div>
    `
    document.getElementById('modal').showModal()
}


// display category function
const displayCategories = (categories) => {
    const categoryContainer = document.getElementById('categories');

    categories.forEach(item => {
        // create a button
        const div = document.createElement('div');
        div.innerHTML = `
            <button id="btn-${item.category}" class="flex items-center gap-3 border px-14 rounded-xl py-3 category-btn" onclick="loadCategoryPets('${item.category}')">
                <img src="${item.category_icon}" class="w-10" alt="category icons">
                <h2 class="text-xl font-extrabold">${item.category}</h2>
            </button>
        `
        // add button to category container
        categoryContainer.append(div);
    })
};

// display all pets function
const displayPets = (pets) => {
    const petContainer = document.getElementById('pets-container');
    document.getElementById('spinner').style.display = "none";

    if(pets.length == 0){
        petContainer.classList.remove('grid');
        petContainer.innerHTML = `
            <div class="w-full px-0 lg:px-28 py-0 lg:py-24 flex flex-col items-center gap-5">
                <img src="./images/error.webp" alt="no content here">
                <h1 class="text-4xl font-extrabold text-center">No Information Available</h1>
                <p class="text-gray-500 text-center">Pet adoption is the process of transferring responsibility for a pet that was previously owned by another party sources for adoptable pets.</p>
            </div>`
        return
    }
    else{
        petContainer.classList.add('grid');
    }

    pets.forEach(item =>{
        const card = document.createElement('div');
        card.classList = 'p-5 flex flex-col items-start gap-5 rounded-xl border';
        card.innerHTML = `
            <div class="rounded-md">
                    <img src="${item.image}" class="rounded-md object-cover" alt="pet image">
                </div>
                <div class="flex flex-col items-start">
                    <h2 class="text-xl font-extrabold">${item.pet_name}</h2>

                    ${item.breed == undefined? `<p class="text-gray-500 flex items-center gap-3"><span><i class="fa-solid fa-table-cells-large"></i></span><span>Breed: Not available</span></p>` : `
                    <p class="text-gray-500 flex items-center gap-3"><span><i class="fa-solid fa-table-cells-large"></i></span><span>Breed: ${item.breed}</span></p>`
                    }
                    
                    ${item.date_of_birth == undefined? `<p class="text-gray-500 flex items-center gap-3"><span><i class="fa-regular fa-calendar-days"></i></span><span>Birth: Not available</span></p>` : `<p class="text-gray-500 flex items-center gap-3"><span><i class="fa-regular fa-calendar-days"></i></span><span>Birth: ${item.date_of_birth}</span></p>`
                    }

                    ${item.gender == undefined? `<p class="text-gray-500 flex items-center gap-3"><span><i class="fa-solid fa-transgender"></i></span><span>Gender: Not available</span></p>` : `<p class="text-gray-500 flex items-center gap-3"><span><i class="fa-solid fa-transgender"></i></span><span>Gender: ${item.gender}</span></p>`
                    }

                    ${item.price == undefined? `<p class="text-gray-500 flex items-center gap-4"><span><i class="fa-solid fa-dollar-sign"></i></span><span>Price: Not available</span></p>` : `<p class="text-gray-500 flex items-center gap-4"><span><i class="fa-solid fa-dollar-sign"></i></span><span>Price: ${item.price}</span></p>`
                    }
                </div>
                <div class="flex justify-between items-center w-full">
                    <button onclick="likedPet('${item.image}')"><div class="rounded-md border py-1 px-3 text-gray-500"><i class="fa-regular fa-thumbs-up"></i></i></div></button>
                    <button onclick="adoptedPet(${item.petId})" id="adopt-btn-${item.petId}"><div class="rounded-md border py-1 px-3 text-cyan-700 font-bold">Adopt</div></button>
                    <button onclick="loadPetDetails(${item.petId})"><div class="rounded-md border py-1 px-3 text-cyan-700 font-bold">Details</div></button>
                </div>
        `
        petContainer.append(card);
    })
}

// adopted pet function
const adoptedPet = (id) => {
    
    const adoptBtn = document.getElementById(`adopt-btn-${id}`)
    adoptBtn.setAttribute('disabled', true);
    adoptBtn.innerHTML = `<div class="rounded-md border py-1 px-3 text-cyan-700 font-bold bg-gray-300">Adopted</div>`

    const myModal = document.getElementById('my_modal_5');
    myModal.showModal();

    let counter = 3;
    const counterContainer = document.getElementById('counter-container');
    counterContainer.innerHTML = counter;

    const counterTimer = setInterval(() => {
        counter--;
        counterContainer.innerHTML = counter;

        if(counter === 0){
            clearInterval(counterTimer);
            myModal.close();
        }
    }, 1000);
}


loadCategories()
loadPets()