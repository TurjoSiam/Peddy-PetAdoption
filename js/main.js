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

// display category function
const displayCategories = (categories) => {
    const categoryContainer = document.getElementById('categories');

    categories.forEach(item => {
        // create a button
        const div = document.createElement('div');
        div.classList = 'flex items-center gap-3 border px-14 rounded-xl py-3';
        div.innerHTML = `
            <img src="${item.category_icon}" class="w-10" alt="category icons">
            <h2 class="text-xl font-extrabold">${item.category}</h2>
        `
        // add button to category container
        categoryContainer.append(div);
    })
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

// "petId": 1,
// "breed": "Golden Retriever",
// "category": "Dog",
// "date_of_birth": "2023-01-15",
// "price": 1200,
// "image": "https://i.ibb.co.com/p0w744T/pet-1.jpg",
// "gender": "Male",
// "pet_details": "This friendly male Golden Retriever is energetic and loyal, making him a perfect companion for families. Born on January 15, 2023, he enjoys playing outdoors and is especially great with children. Fully vaccinated, he's ready to join your family and bring endless joy. Priced at $1200, he offers love, loyalty, and a lively spirit for those seeking a playful yet gentle dog.",
// "vaccinated_status": "Fully",
// "pet_name": "Sunny"


// display all pets function
const displayPets = (pets) => {
    const petContainer = document.getElementById('pets-container')

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