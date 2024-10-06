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

// "id": 1,
// "category": "Cat",
// "category_icon": "https://i.ibb.co.com/N7dM2K1/cat.png"


// display category function
const displayCategories = (categories) => {
    const categoryContainer = document.getElementById('categories');

    categories.forEach(item => {
        console.log(item);
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



loadCategories()