import { Category } from "../types/meal";

interface Props {
  categories: Category[];
  selected: string[];
  onToggle: (c: string) => void;
}

export default function Filters({ categories, selected, onToggle }: Props) {
  return (
    <div>
      {categories.map(c => (
        <label key={c.idCategory} style={{ marginRight: "8px" }}>
          <input
            type="checkbox"
            checked={selected.includes(c.strCategory)}
            onChange={() => onToggle(c.strCategory)}
          />
          {c.strCategory}
        </label>
      ))}
    </div>
  );
}
