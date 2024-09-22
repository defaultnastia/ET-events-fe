import css from "./EventsSortInput.module.css";

const EventsSortInput = ({ setSortField, sortField, setPage }) => {
  const handleSortChange = (e) => {
    if (e.target.value == "null") return;

    setSortField(e.target.value);
    setPage(1);
  };

  return (
    <div className="col-sm-4 form-inline" id="sort-grid">
      <div className={css.selector}>
        <label htmlFor="list-sorting" className={css.label}>
          Sort by{" "}
        </label>
        <select
          id="list-sorting"
          defaultValue={sortField}
          onChange={handleSortChange}
        >
          <option disabled value={"null"} key="notSelected">
            Choose Sorting
          </option>
          <option value={"title"} key="title">
            Title
          </option>
          <option value={"organizer"} key="organizer">
            Organizer
          </option>
          <option value={"eventDate"} key="eventDate">
            Event Date
          </option>
        </select>
      </div>
    </div>
  );
};

export default EventsSortInput;
