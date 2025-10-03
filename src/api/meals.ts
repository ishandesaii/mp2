import { getCached } from "./axiosClient";
import type { Meal, Category } from "../types/meal";

type MealsResponse = { meals: Meal[] | null };
type CategoriesResponse = { categories: Category[] };

export async function searchMealsByName(q: string): Promise<Meal[]> {
  const data = await getCached<MealsResponse>(`search.php?s=${encodeURIComponent(q)}`);
  return data.meals ?? [];
}

export async function getCategories(): Promise<Category[]> {
  const data = await getCached<CategoriesResponse>("categories.php");
  return data.categories;
}

export async function filterByCategory(category: string): Promise<Meal[]> {
  const data = await getCached<MealsResponse>(`filter.php?c=${encodeURIComponent(category)}`);
  return data.meals ?? [];
}

export async function getMealById(id: string): Promise<Meal | null> {
  const data = await getCached<MealsResponse>(`lookup.php?i=${encodeURIComponent(id)}`);
  return (data.meals ?? [])[0] ?? null;
}
