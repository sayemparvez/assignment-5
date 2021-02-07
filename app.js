
const searchBtn = document.getElementById("search-btn");
const allItems = document.getElementById("food-items");
const singleItems = document.getElementById("single-item-details");

// get search results

searchBtn.addEventListener("click", function () {
    const inputFood = document.getElementById("input-food").value;
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${inputFood}`)
        .then(res => res.json())
        .then(foods => {
            if (inputFood == "" || inputFood == null){
                alert("Please Enter Your Meal.");
            }
            else{
                displayAllFoods(foods)
            }
        })
        .catch(error => alert("Sorry!! Recipe Not Found"))
});

// display all recipes

const displayAllFoods = food => {
    allItems.innerHTML = "";
    singleItems.innerHTML = "";
    food.meals.forEach(items => {

        const mealBox = document.createElement('div');
        mealBox.className = "meal-box";
        const mealInfo = `
                <img onclick="displaySingleItem('${items.idMeal}')" src="${items.strMealThumb}">
                <h4 onclick="displaySingleItem('${items.idMeal}')"> ${items.strMeal} </h4>
            `;
        mealBox.innerHTML = mealInfo;
        allItems.appendChild(mealBox);
    });

}

// single recipe item

const displaySingleItem = itemId => {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${itemId}`)
        .then(response => response.json())
        .then(data => singleItemDetails(data))
}

// single recipes details

const singleItemDetails = details => {
    singleItems.innerHTML = `
                <img src="${details.meals[0].strMealThumb}">
                <div class="details">
                    <h1> ${details.meals[0].strMeal} </h1>
                    <h4> Ingredient </h4>
                    <ul id="details-list"></ul>
                </div>
         `;
        countIngredient(details.meals[0]);
}


const countIngredient = details => {
    for(let i=1; i<=10; i++){
        let ingredient = `strIngredient${i}`;
        let measure = `strMeasure${i}`;
        if(details[ingredient] != ""){
            const li = document.createElement("li");
            li.innerHTML = `<p> <span class="sign"> &#10003;</span> ${details[measure]} <span>${details[ingredient]}</span> </p>`
            document.getElementById("details-list").appendChild(li);
        }
    }
}

