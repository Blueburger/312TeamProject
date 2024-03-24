


function recipeHTML(recipeJSON){
    const username = recipeJSON.user;
    const recipeID = recipeJSON.id;
    const name = recipeJSON.name;
    const description = recipeJSON.description;
    const instructions = recipeJSON.instructions;
    const ingredients = recipeJSON.ingredients;
    // likes should be specific to the user loading the page
    const likes = recipeJSON.likes; 
    console.log('likes');
    console.log(likes);
    console.log('recipe ID');
    console.log(recipeID);
    let detailsHTML = "<span id='recipe_" + recipeID + "'><b>" + username + "</b> presents: " + name + "<br>Description:<br>" + description + "<br>Ingredients:<br>" + ingredients + "<br>Instructions:<br>" + instructions + "</span>";
    
    if (likes.includes(parseInt(recipeID, 10))) {
        detailsHTML += "<br><button onclick='likeRecipe(\"" + recipeID + "\")' class='like-buttonG'>👍</button><br>";
        console.log('button will be green');
    } else {
        console.log('button will be red');
        detailsHTML += "<br><button onclick='likeRecipe(\"" + recipeID + "\")' class='like-buttonR'>👍</button><br>";
    }
   
    
    
    return detailsHTML;
}


function addRecipiesToList(recipeJSON) {
    const recipes = document.getElementById("posted-recipes");
    recipes.innerHTML += recipeHTML(recipeJSON);
    recipes.scrollIntoView(false);
    recipes.scrollTop = recipes.scrollHeight - recipes.clientHeight;
}

function sendRecipe() {
    const recipeBox = document.getElementById("recipe-form");
    const recipe = recipeBox.value;
    recipeBox.value = "";

    const request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200){
            console.log(this.response)
        }
    }
    const recipeJSON = {"recipe": recipe}
    request.open("POST","/submit");
    request.send(JSON.stringify(recipeJSON));
    
    recipeBox.focus();

}

function clearRecipes() {
    const recipes = document.getElementById("posted-recipes");
    recipes.innerHTML = "";
}


function updateRecipes() {
    const request = new XMLHttpRequest();

    const scrollPosition = window.scrollY;

    request.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            clearRecipes();
            const recipes = JSON.parse(this.response);
            for (const recipe of recipes) {
                addRecipiesToList(recipe);
            }
            window.scrollTo(0, scrollPosition);       
        }
    } 
    request.open("GET", "/recipe");
    request.send();
}

function likeRecipe(recipeID) {
    const request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200){
            HTMLFormControlsCollection.log(this.response);
        }
    }
    request.open("POST", "/likeRecipe/" + recipeID);
    request.send();
}



function loginLoaded() {
    document.getElementById("words").innerHTML += "<br/> Javascript says healthy recipes are the foundation of a good diet";

}

function homeLoaded(){
    document.getElementById("jsText").innerHTML +="<br/> Have been waiting for you";

    updateRecipes();

    setInterval(updateRecipes, 5000);
}



