export interface MealsAPIProps {
  idMeal: string;
  strMeal: string;
  strCategory: string;
  strArea: string;
  strInstructions: string;
  strMealThumb: string;
  strTags: string;
  strYoutube: string;
  strIngredient: string[];
  strMeasure: string[];
  strSource: string;
}

export type PartialMealsAPIProps = Partial<MealsAPIProps>;
