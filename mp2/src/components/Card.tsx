import { Meal } from "../types/meal";
import { useNavigate } from "react-router-dom";
import { useSelection } from "../context/SelectionContext";
import styles from "./Card.module.css";

interface Props {
  meal: Meal;
  list: Meal[];
}

export default function Card({ meal, list }: Props) {
  const navigate = useNavigate();
  const { setList } = useSelection();

  const onClick = () => {
    setList(list);
    navigate(`/meal/${meal.idMeal}`);
  };

  return (
    <div className={styles.card} onClick={onClick}>
      <img src={meal.strMealThumb || ""} alt={meal.strMeal} />
      <h3>{meal.strMeal}</h3>
      <p>{meal.strArea}</p>
    </div>
  );
}
