let mainSection = document.getElementById("data-list-wrapper");

// pitch
let pitchTitleInput = document.getElementById("pitch-title");
let pitchImageInput = document.getElementById("pitch-image");
let pitchCategoryInput = document.getElementById("pitch-category");
let pitchfounderInput = document.getElementById("pitch-founder");
let pitchPriceInput = document.getElementById("pitch-price");
let pitchCreateBtn = document.getElementById("add-pitch");

// Update pitch
let updatePitchIdInput = document.getElementById("update-pitch-id");
let updatePitchTitleInput = document.getElementById("update-pitch-title");
let updatePitchImageInput = document.getElementById("update-pitch-image");
let updatePitchfounderInput = document.getElementById("update-pitch-founder");
let updatePitchCategoryInput = document.getElementById("update-pitch-category");
let updatePitchPriceInput = document.getElementById("update-pitch-price");
let updatePitchBtn = document.getElementById("update-pitch");

// Update price
let updatePricePitchId = document.getElementById("update-price-pitch-id");
let updatePricePitchPrice = document.getElementById("update-price-pitch-price");
let updatePricePitchPriceButton = document.getElementById("update-price-pitch");

//sort and filter
let sortAtoZBtn = document.getElementById("sort-low-to-high");
let sortZtoABtn = document.getElementById("sort-high-to-low");
let filterFood = document.getElementById("filter-Food");
let filterElectronics = document.getElementById("filter-Electronics");
let filterPersonalCare = document.getElementById("filter-Personal-Care");

//Search by title/founder

let searchBySelect = document.getElementById("search-by-select");
let searchByInput = document.getElementById("search-by-input");
let searchByButton = document.getElementById("search-by-button");



// FETCH:-

let productdata = []

function Fetchdata() {
    fetch("https://add-to-cart-backend-1-zim1.onrender.com/pitches")
        .then((res) => res.json())
        .then((data) => {
            Cardlist(data)
            productdata = data
        })
        .catch((err) => console.error(err)); // Changed console.log to console.error for better indication of errors
}

Fetchdata();

function Cardlist(data) {
    const store = data.map((el) => Card(el.id, el.image, el.title, el.price, el.founder, el.category));
    const mainSection = document.getElementById('data-list-wrapper');
    mainSection.innerHTML = store.join("");

}

function Card(id, image, title, price, founder, category) {
    let singlecard = `
    <a href="descripation.html?title=${encodeURIComponent(title)}&image=${encodeURIComponent(image)}&price=${encodeURIComponent(price)}&founder=${encodeURIComponent(founder)}&category=${encodeURIComponent(category)}id
    =${encodeURIComponent(id)}">
        <div class="card" data-id=${id}>
            <div class="card-img">
                <img src=${image} alt="pitch">
            </div>
            <div class="card-body">
                <h4 class="card-title">${title}</h4>
                <p class="card-founder">${founder}</p>
                <p class="card-category">${category}</p>
                <p class="card-price">${price}</p>
                <a href="#" data-id=${id} class="card-link">Edit</a>
                <button data-id=${id} class="card-button">Delete</button>
            </div>
        </div>
        </a>
    `;
    return singlecard;
}




// POST PART:-

pitchCreateBtn.addEventListener("click", () => {
    let product = {
        image: pitchImageInput.value,
        price: pitchPriceInput.value,
        founder: pitchfounderInput.value,
        category: pitchCategoryInput.value,
        title: pitchTitleInput.value,
    };

    fetch("https://add-to-cart-backend-1-zim1.onrender.com/pitches", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
    })
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            alert("Product added...");
        })
        .catch((err) => {
            console.log(err);
            alert("Something went wrong");
        });
});




// DELETE PART:-

document.addEventListener("click", (e) => {
    if (e.target.classList.contains("card-button")) {
        DeleteProduct(e.target.dataset.id);
    }
});

function DeleteProduct(id) {
    fetch(`https://add-to-cart-backend-1-zim1.onrender.com/pitches/${id}`, {
        method: "DELETE"
    }).then((res) => res.json())
        .then((data) => {
            alert("deleted...");
            console.log(data);
        })
        .catch((err) => console.error(err));
}




//  filter :-

filterFood.addEventListener("click", () => {

    let filterFood = productdata.filter((el) => el.category === "Food")
    console.log(filterFood)
    Cardlist(filterFood)

})

filterElectronics.addEventListener("click", () => {

    let filterElectronics = productdata.filter((el) => el.category === "Electronics")
    console.log(filterElectronics)
    Cardlist(filterElectronics)

})

filterPersonalCare.addEventListener("click", () => {

    let filterPersonalCare = productdata.filter((el) => el.category === "Personal Care")
    console.log(filterPersonalCare)
    Cardlist(filterPersonalCare)

})




// SORTING PART low to high

sortAtoZBtn.addEventListener("click", () => {

    const sortAtoZdata = productdata.sort((a, b) => a.price - b.price)
    Cardlist(sortAtoZdata)

})




// SORTING PART high to low

sortZtoABtn.addEventListener("click", () => {

    const sortZtoAdata = productdata.sort((a, b) => b.price - a.price)
    Cardlist(sortZtoAdata)

})

//  update pitches

document.addEventListener("click", (e) => {
    if (e.target.classList.contains("card-link")) {
        let id = e.target.dataset.id;
        PopulateForm(id);
    }
});

function PopulateForm(id) {
    fetch(`https://add-to-cart-backend-1-zim1.onrender.com/pitches/${id}`)
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            updatePitchTitleInput.value = data.title;
            updatePitchImageInput.value = data.image;
            updatePitchfounderInput.value = data.founder;
            updatePitchCategoryInput.value = data.category;
            updatePitchPriceInput.value = data.price;
            updatePitchIdInput.value = data.id;
        })
        .catch((err) => console.log(err));
}

updatePitchBtn.addEventListener("click", () => {
    console.log(updatePitchPriceInput.value)
    let updateProductData = {
        title: updatePitchTitleInput.value,
        image: updatePitchImageInput.value,
        founder: updatePitchfounderInput.value,
        category: updatePitchCategoryInput.value,
        price: updatePitchPriceInput.value,
        id: updatePitchIdInput.value
    }

    fetch(`https://add-to-cart-backend-1-zim1.onrender.com/pitches/${updateProductData.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(updateProductData)
    })
        .then((res) => res.json())
        .then((data) => {
            alert("Data updated...!!");
        })
        .catch((err) => console.log(err));

})




// serach :-

searchByButton.addEventListener('click', () => {
    let searchTerm = searchByInput.value.toLowerCase();
    let filteredData = productdata.filter((el) => {
        return el.title.toLowerCase().includes(searchTerm) || el.founder.toLowerCase().includes(searchTerm);
    });

    Cardlist(filteredData);
});




// only update-price :-

updatePricePitchPriceButton.addEventListener("click", () => {
    let id = updatePricePitchId.value;
    let newPrice = updatePricePitchPrice.value;

    fetch(`https://add-to-cart-backend-1-zim1.onrender.com/pitches/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ price: newPrice }) 
    })
        .then((res) => res.json())
        .then((data) => {
            alert("Price updated successfully!");
        })
        .catch((err) => {
            console.error("Error updating price:", err);
            alert("Failed to update price. Please try again later.");
        });
});

