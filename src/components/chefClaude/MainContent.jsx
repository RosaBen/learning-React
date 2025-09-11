import React from 'react';
import IngredientsList from './IngredientsList';
import ClaudeRecipe from './ClaudeRecipe';
import { getRecipeFromChefClaude, getRecipeFromMistral } from './ai';

console.log(getRecipeFromChefClaude);
export default function MainContent() {
  const [ingredients, setIngredients] = React.useState([
    'all the main spices',
    'pasta',
    'ground beef',
  ]);
  // const [recipe, setRecipeShown] = React.useState(false)

  const [recipe, setRecipe] = React.useState('');
  const recipeSection = React.useRef(null);

  React.useEffect(() => {
    if (recipe !== '' && recipeSection.current !== null) {
      recipeSection.current.scrollIntoView({ behavior: 'smooth' });
      //             const yCoord = recipeSection.current.getBoundingClientRect().top + window.scrollY
      // window.scroll({
      //     top: yCoord,
      //     behavior: "smooth"
      // })
    }
  }, [recipe]);

  async function getRecipe() {
    const recipeMd = await getRecipeFromMistral(ingredients);
    console.log(recipeMd);
    setRecipe(recipeMd);
  }

  // function toggleRecipeShown() {
  //     setRecipeShown(prevShown => !prevShown)
  // }

  // function handleSubmit(event) {
  //     event.preventDefault()
  //     const formData = new FormData(event.currentTarget)
  //     const newIngredient = formData.get("ingredient")
  //     setIngredients(prevIngredients => [...prevIngredients, newIngredient])
  // }
  function addIngredient(formData) {
    const ingredient = formData.get('ingredient');
    setIngredients(prevIngredient => [...prevIngredient, ingredient]);
  }

  return (
    <main>
      {/* <form onSubmit={handleSubmit} className="add-ingredient-form"> */}
      <form action={addIngredient} className="add-ingredient-form">
        <input
          type="text"
          placeholder="e.g. oregano"
          aria-label="Add ingredient"
          name="ingredient"
        />
        <button>Add ingredient</button>
      </form>
      {ingredients.length > 0 && (
        <IngredientsList
          ref={recipeSection}
          ingredients={ingredients}
          // toggleRecipeShown={toggleRecipeShown}
          getRecipe={getRecipe}
        />
      )}
      {/* {recipeShown && <ClaudeRecipe />} */}
      {recipe && <ClaudeRecipe recipe={recipe} />}
    </main>
  );
}
