import { Field, Form, Formik, ErrorMessage } from "formik";
import css from "./GuestRegistrationForm.module.css";
import { useEffect, useId, useState } from "react";
import { createEventGuest } from "../../services/eventsAPI.js";
import toast from "react-hot-toast";
import FormDatePicker from "../FormDatePicker/FormDatePicker";
import { guestValidationSchema } from "../../helpers/guestValidationSchema";
import { useNavigate } from "react-router-dom";

const initialValues = {
  name: "",
  email: "",
  birthDate: new Date("1990-01-01"),
  source: "",
};

const GuestRegistrationForm = ({ eventId, title }) => {
  const nameFieldId = useId();
  const emailFieldId = useId();
  const birthDateFieldId = useId();
  const sourceGroupId = useId();
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (values, actions) => {
    values.name = values.name.trim();
    values.email = values.email.trim();

    try {
      setError(null);
      const newGuest = await createEventGuest(eventId, values);
      toast.success(`${newGuest.result.name} was successfully registered`);
      navigate(`/${eventId}/guests`, { state: { eventId, title } });
    } catch (error) {
      setError(error.message);
    }

    actions.resetForm();
  };

  useEffect(() => {
    if (!error) return;
    toast.error(`Something went wrong: ${error}`);
  }, [error]);

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={guestValidationSchema}
    >
      <Form className={css.form}>
        <div className={css.input}>
          <label htmlFor={nameFieldId}>Full Name</label>
          <Field name="name" id={nameFieldId} />
          <ErrorMessage className={css.error} name="name" component="span" />
        </div>

        <div className={css.input}>
          <label htmlFor={emailFieldId}>Email</label>
          <Field name="email" id={emailFieldId} />
          <ErrorMessage className={css.error} name="email" component="span" />
        </div>

        <div className={css.input}>
          <label htmlFor={birthDateFieldId}>Date of Birth</label>
          <FormDatePicker name="birthDate" id={birthDateFieldId} />
          <ErrorMessage
            className={css.error}
            name="birthDate"
            component="span"
          />
        </div>

        <div id={sourceGroupId}>Where did you hear about this event?</div>
        <div
          className={css.radios}
          role="group"
          aria-labelledby={sourceGroupId}
        >
          <label>
            <Field type="radio" name="source" value="social" />
            Social Media
          </label>
          <label>
            <Field type="radio" name="source" value="friends" />
            Friends
          </label>
          <label>
            <Field type="radio" name="source" value="myself" />
            Found Myself
          </label>
        </div>
        <ErrorMessage className={css.error} name="source" component="span" />

        <button className="cta" type="submit">
          Add to Guest List
        </button>
      </Form>
    </Formik>
  );
};

export default GuestRegistrationForm;
