import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { searchMealsByName } from "../api/meals";
import { Meal } from "../types/meal";
import SearchBar from "../components/SearchBar";
import SortControls from "../components/SortControls";
import Card from "../components/Card";
import styles from "./ListView.module.css";

export default function ListView() {
  const [query, setQuery] = useState("");
  const [raw, setRaw] = useState<Meal[]>([]);
  const [sortKey, setSortKey] = useState<"name" | "area">("name");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");

  useEffect(() => {
    if (query.trim() === "") {
      setRaw([]);
      return;
    }
    searchMealsByName(query).then(setRaw);
  }, [query]);

  const filtered = raw.filter(m =>
    m.strMeal.toLowerCase().includes(query.toLowerCase())
  );

  const sorted = [...filtered].sort((a, b) => {
    const av = sortKey === "name" ? a.strMeal : a.strArea || "";
    const bv = sortKey === "name" ? b.strMeal : b.strArea || "";
    return sortDir === "asc" ? av.localeCompare(bv) : bv.localeCompare(av);
  });

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.heading}>Meal Directory</h1>

      {/* Tabs */}
      <div className={styles.tabs}>
        <Link to="/" className={styles.tab}>Search</Link>
        <Link to="/gallery" className={styles.tab}>Gallery</Link>
      </div>

      {/* Gray card with controls */}
      <div className={styles.card}>
        <SearchBar value={query} onChange={setQuery} />
        <div className={styles.sortRow}>
          <label>Sort by:</label>
          <SortControls
            sortKey={sortKey}
            setSortKey={setSortKey}
            sortDir={sortDir}
            setSortDir={setSortDir}
          />
        </div>
      </div>

      {query.trim() === "" ? (
        <p className={styles.placeholder}>Start typing to search for meals...</p>
      ) : sorted.length > 0 ? (
        <div className={styles.grid}>
          {sorted.map(m => (
            <Card key={m.idMeal} meal={m} list={sorted} />
          ))}
        </div>
      ) : (
        <p className={styles.placeholder}>No results found.</p>
      )}
    </div>
  );
}


