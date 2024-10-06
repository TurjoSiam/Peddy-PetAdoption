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
        fetch('https://openapi.programming-hero.com/api/peddy/pets')
            .then(res => res.json())
            .then(data => displayPets(data.pets));
    } 
    catch (error) {
        console.log(error);
    }
};

const loadCategoryPets =(categoryName) =>{
    try {
        fetch(`https://openapi.programming-hero.com/api/peddy/category/${categoryName}`)
            .then(res => res.json())
            .then(data => displayPets(data.data));
    } 
    catch (error) {
        console.log(error);
    }
}






// display category function
const displayCategories = (categories) => {
    const categoryContainer = document.getElementById('categories');

    categories.forEach(item => {
        // create a button
        const div = document.createElement('div');
        div.innerHTML = `
            <button class="flex items-center gap-3 border px-14 rounded-xl py-3" onclick="loadCategoryPets('${item.category}')">
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
    petContainer.innerHTML = ""

    if(pets.length == 0){
        petContainer.classList.remove('grid');
        petContainer.innerHTML = `
            <div class="w-full px-28 py-24 flex flex-col items-center gap-5">
                <img src="./images/error.webp" alt="no content here">
                <h1 class="text-4xl font-extrabold text-center">No Information Available</h1>
                <p class="text-gray-500 text-center">Pet adoption is the process of transferring responsibility for a pet that was previously owned by another party sources for adoptable pets.</p>
            </div>
        `
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
                    <div class="rounded-md border py-1 px-3 text-gray-500"><i class="fa-regular fa-thumbs-up"></i></i></div>
                    <div class="rounded-md border py-1 px-3 text-cyan-700 font-bold">Adopt</div>
                    <div class="rounded-md border py-1 px-3 text-cyan-700 font-bold">Details</div>
                </div>
        `
        petContainer.append(card);
    })
}



loadCategories()
loadPets()