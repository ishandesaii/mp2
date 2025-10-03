import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { getMealById } from "../api/meals";
import { Meal } from "../types/meal";
import { useSelection } from "../context/SelectionContext";
import styles from "./DetailView.module.css";

export default function DetailView() {
  const { id } = useParams<{ id: string }>();
  const [meal, setMeal] = useState<Meal | null>(null);
  const { list } = useSelection();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) getMealById(id).then(setMeal);
  }, [id]);

  if (!meal) return <p className={styles.loading}>Loading...</p>;

  const idx = list.findIndex(m => m.idMeal === id);

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.heading}>Meal Directory</h1>

      {/* Tabs for navigation consistency */}
      <div className={styles.tabs}>
        <Link to="/" className={styles.tab}>Search</Link>
        <Link to="/gallery" className={styles.tab}>Gallery</Link>
      </div>

      {/* Grey content card */}
      <div className={styles.card}>
        <h2 className={styles.title}>{meal.strMeal}</h2>
        <img
          src={meal.strMealThumb || ""}
          alt={meal.strMeal}
          className={styles.image}
        />

        <p><b>Category:</b> {meal.strCategory}</p>
        <p><b>Area:</b> {meal.strArea}</p>
        <p className={styles.instructions}>
          {meal.strInstructions?.slice(0, 400)}...
        </p>

        <div className={styles.buttons}>
          <button
            disabled={idx <= 0}
            onClick={() => navigate(`/meal/${list[idx - 1].idMeal}`)}
          >
            Previous
          </button>
          <button
            disabled={idx < 0 || idx >= list.length - 1}
            onClick={() => navigate(`/meal/${list[idx + 1].idMeal}`)}
          >
            Next 
          </button>
        </div>
      </div>
    </div>
  );
}
