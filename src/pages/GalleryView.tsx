import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getCategories, filterByCategory } from "../api/meals";
import { Meal, Category } from "../types/meal";
import Filters from "../components/Filters";
import Card from "../components/Card";
import styles from "./ListView.module.css"; 

export default function GalleryView() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selected, setSelected] = useState<string[]>([]);
  const [meals, setMeals] = useState<Meal[]>([]);

  useEffect(() => {
    getCategories().then(setCategories);
  }, []);

  useEffect(() => {
    if (selected.length === 0) {
      setMeals([]);
      return;
    }
    Promise.all(selected.map(c => filterByCategory(c)))
      .then(results =>
        setMeals(
          Array.from(new Map(results.flat().map(m => [m.idMeal, m])).values())
        )
      );
  }, [selected]);

  const toggle = (c: string) => {
    setSelected(prev =>
      prev.includes(c) ? prev.filter(x => x !== c) : [...prev, c]
    );
  };

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.heading}>Meal Directory</h1>

      {/* Tabs */}
      <div className={styles.tabs}>
        <Link to="/" className={styles.tab}>Search</Link>
        <Link to="/gallery" className={styles.tab}>Gallery</Link>
      </div>

      {/* Gray card with filters */}
      <div className={styles.card}>
        <p><b>Select categories:</b></p>
        <Filters categories={categories} selected={selected} onToggle={toggle} />
      </div>

      {meals.length > 0 ? (
        <div className={styles.grid}>
          {meals.map(m => (
            <Card key={m.idMeal} meal={m} list={meals} />
          ))}
        </div>
      ) : (
        <p className={styles.placeholder}>Choose a category to see meals...</p>
      )}
    </div>
  );
}
