const searchbox=document.querySelector('.searchbox');
const searchbutton=document.querySelector('.searchbutton');
const recipecontainer=document.querySelector('.recipecontainer');
const recipedetails=document.querySelector('.recipedetails');
const recipecontent=document.querySelector('.recipecontent');
const recipeclosebutton=document.querySelector('.recipeclosebutton');

//to get recipes function
const fetchrecipe = async (food) => {

    recipecontainer.innerHTML="<h2>fetching recipes...</h2>";
    try {
        const url=`https://www.themealdb.com/api/json/v1/1/search.php?s=${food}`;
    const data=await fetch(url);
    const response=await data.json();
   //console.log(response);

   recipecontainer.innerHTML="";
   response.meals.forEach(meal => {
    const recipediv=document.createElement('div');
    recipediv.classList.add('recipe');
    recipediv.innerHTML=`
      <img src="${meal.strMealThumb}">
      <h3>${meal.strMeal}</h3>
      <p>(${meal.strArea} dish)</p>
      <p>Belongs to: ${meal.strCategory} category</p>
    
    `
    const button= document.createElement('button');
    button.textContent = "view recipe";
    recipediv.appendChild(button);

    //adding eventlistener to recipe button
    button.addEventListener('click',()=>{
        openrecipepopup(meal);
    })


    recipecontainer.appendChild(recipediv);
    
   });
    } catch (error) {
        recipecontainer.innerHTML="<h3>error in fetching recipes! maybe, check the spelling of the word?</h3>";
    }
    
}

const fetchingredients=(meal)=>{
    let ingredientslist="";
    for (let i=1;i<=20;i++){
        const ingredient=meal[`strIngredient${i}`];
        if (ingredient){
            const measure=meal[`strMeasure${i}`];
            ingredientslist+= `<li>${measure} ${ingredient}</li>`;

        }
        else{
            break;
        }}
        return ingredientslist;
    }



const openrecipepopup=(meal)=>{
    recipecontent.innerHTML=`
    <h3>${meal.strMeal}</h3>
    <h4 style="text-decoration: underline">ingredients:</h4>
    <ul>${fetchingredients(meal)}</ul>
    <div>
    <h3>Instructions:</h3>
    <p>${meal.strInstructions}</p>
    </div>
    `
    recipecontent.parentElement.style.display="block";
}

recipeclosebutton.addEventListener('click', ()=>{
    recipecontent.parentElement.style.display="none";
})

searchbutton.addEventListener('click',(e)=>{
    e.preventDefault();
    //trim removes leading spaces
    const searchinput = searchbox.value.trim(); 
    if(!searchinput){
        recipecontainer.innerHTML=` <h3>type the meal in the search box please!</h3> `;
        return;
    }

    fetchrecipe(searchinput);
})
