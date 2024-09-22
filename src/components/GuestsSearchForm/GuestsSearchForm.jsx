import { Form, Field, Formik } from "formik";
import css from "./GuestsSearchForm.module.css";

const initialValues = {
  query: "",
};

const GuestsSearchForm = ({ setQuery, setPage }) => {
  const handleSubmit = (values, actions) => {
    const query = values.query.trim();

    setQuery(query);
    setPage(1);

    actions.resetForm();
  };

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      <Form className={css.search}>
        <Field name="query" required placeholder="Enter Email or Name" />
        <button className="cta" type="submit">
          Search
        </button>
      </Form>
    </Formik>
  );
};

export default GuestsSearchForm;
