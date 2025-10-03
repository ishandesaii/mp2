interface Props {
  sortKey: "name" | "area";
  setSortKey: (v: "name" | "area") => void;
  sortDir: "asc" | "desc";
  setSortDir: (v: "asc" | "desc") => void;
}

export default function SortControls({
  sortKey,
  setSortKey,
  sortDir,
  setSortDir
}: Props) {
  return (
    <div>
      <select value={sortKey} onChange={e => setSortKey(e.target.value as "name" | "area")}>
        <option value="name">Name</option>
        <option value="area">Area</option>
      </select>
      <select value={sortDir} onChange={e => setSortDir(e.target.value as "asc" | "desc")}>
        <option value="asc">Ascending</option>
        <option value="desc">Descending</option>
      </select>
    </div>
  );
}
