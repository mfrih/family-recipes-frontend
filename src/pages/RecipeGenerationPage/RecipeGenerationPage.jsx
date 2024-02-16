import React, { useState } from "react";
import OpenAI from "openai";
import Slider from "../../components/Slider/Slider";
import "./RecipeGenerationPage.css";

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAIKEY,
  dangerouslyAllowBrowser: true,
});

function RecipeGenerationPage() {
  const [healthyValue, setHealthyValue] = useState(7);
  const [traditionalValue, setTraditionalValue] = useState(5);
  const [frenchValue, setFrenchValue] = useState(5);
  const [moroccanValue, setMoroccanValue] = useState(10);
  const [spicyValue, setSpicyValue] = useState(0);
  const [vegetarianValue, setVegetarianValue] = useState(5);
  const [recipe, setRecipe] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleHealthyChange = (e) => {
    setHealthyValue(e.target.value);
  };
  const handleTraditionalChange = (e) => {
    setTraditionalValue(e.target.value);
  };
  const handleFrenchChange = (e) => {
    setFrenchValue(e.target.value);
  };
  const handleMoroccanChange = (e) => {
    setMoroccanValue(e.target.value);
  };
  const handleSpicyChange = (e) => {
    setSpicyValue(e.target.value);
  };
  const handleVegetarianChange = (e) => {
    setVegetarianValue(e.target.value);
  };

  async function handleRecipeGeneration() {
    setIsLoading(true);
    try {
      const messageForAssistant = {
        healthy: healthyValue,
        traditional: traditionalValue,
        french: frenchValue,
        moroccan: moroccanValue,
        spicy: spicyValue,
        vegetarian: vegetarianValue,
      };
      const assistant = await openai.beta.assistants.retrieve(
        "asst_99IpTFCLwFOe8DZ1SvxVoBHl"
      );
      const completion = await openai.chat.completions.create({
        messages: [
          {
            role: "system",
            content: assistant.instructions,
          },
          { role: "user", content: JSON.stringify(messageForAssistant) },
        ],
        model: "gpt-3.5-turbo-1106",
        response_format: { type: "json_object" },
      });

      const returnedRecipe = JSON.parse(completion.choices[0].message.content);
      setRecipe(returnedRecipe);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="RecipeGenerationPage">
      <div className="recipe-gen-intro">
        <h2>Let our wonderful Mamette make the perfect recipe for you!</h2>
        <span className="mamette-emoji">👵🏼</span>
        <quote className="mamette-quote">
          "Hi I'm Mamette. So tell me what do you fancy and I'll try and imagine
          the tastiest recipe for you. Well I'm Franco-Moroccan so my recipes
          will probably have a hint of both gastronomies".
        </quote>
      </div>
      <div className="recipe-generation-wrapper">
        <div className="recipe-finetuning">
          <h3>Alors on mange quoi ?</h3>
          <div className="all-sliders">
            <Slider
              label="Sain (...pourtantle gras c'est la vie pourtant)"
              value={healthyValue}
              onChange={handleHealthyChange}
            />
            <Slider
              label="Traditionnel (...on est bien d'accord)"
              value={traditionalValue}
              onChange={handleTraditionalChange}
            />
            <Slider
              label="Français"
              value={frenchValue}
              onChange={handleFrenchChange}
            />
            <Slider
              label="Marocain"
              value={moroccanValue}
              onChange={handleMoroccanChange}
            />
            <Slider
              label="Épicé (...si tu choisis 10, ce sera bien bien pimenté)"
              value={spicyValue}
              onChange={handleSpicyChange}
            />

            <Slider
              label="Végétarien (...eh oui, j'évolue moi aussi)"
              value={vegetarianValue}
              onChange={handleVegetarianChange}
            />
          </div>
          <div className="generation-button">
            <button onClick={handleRecipeGeneration} disabled={isLoading}>
              Eh Mamette, t'aurais pas une petite recette pour moi !
            </button>
          </div>
        </div>
        <div className="recipe-wrapper">
          {isLoading && <p>Cooking 🥘...</p>}
          {recipe ? (
            <section className="recipe">
              <h3>{recipe.name}</h3>
              <p>Pour {recipe.servings} personnes</p>
              <h4>Ingredients</h4>
              <ul>
                {recipe.ingredients.map((ingredient, index) => (
                  <li key={index}>{ingredient}</li>
                ))}
              </ul>
              <h4>Instructions</h4>
              <ol>
                {recipe.instructions.map((instruction, index) => (
                  <li key={index}>{instruction}</li>
                ))}
              </ol>
              <p>{recipe.endSentence}</p>
            </section>
          ) : (
            <p className="mamette-waiting">
              Mamette attend... son stylo à la main!
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default RecipeGenerationPage;
