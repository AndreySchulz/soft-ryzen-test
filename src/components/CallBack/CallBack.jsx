import * as Yup from 'yup';
import { Formik } from 'formik';

import contact from '../../assets/images/home/contact.jpg';
import contact2x from '../../assets/images/home/contact@2x.jpg';
import contactWeb from '../../assets/images/home/contact.webp';
import contact2xWeb from '../../assets/images/home/contact@2x.webp';
import { worning } from 'assets/images/icon';
import {
  CallBackImg,
  CallbackForm,
  CallbackHeader,
  CallBackField,
  SubmitBtn,
  CallbackBox,
  ErrorText,
  ErrorIcon,
} from './CallBack.styled';

const CallBackSchema = Yup.object().shape({
  name: Yup.string(),
  email: Yup.string()
    .email()
    .min(10, 'Email is too short, at least 10!')
    .matches(
      /^([a-zA-Z0-9]{1}[\w\-.]{0,}[a-zA-Z0-9]{1})+@([\w-]+.)+[\w]{2,4}$/,
      'Invalid email'
    )
    .max(63, 'Email is too long, at maximum 63!')
    .required('Enter email'),
});

const CallBack = () => {
  const encode = data => {
    return Object.keys(data)
      .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
      .join('&');
  };
  const onSubmit = (values, { setSubmitting, resetForm }) => {
    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encode({
        'form-name': 'contact',
        ...values,
      }),
    })
      .then(() => {
        alert('Success!');
        setSubmitting(false);
      })
      .catch(error => {
        alert('Error: Please Try Again!');
        setSubmitting(false);
      });
    resetForm();
  };

  return (
    <CallbackBox id="contact">
      <picture>
        <source
          srcSet={`${contactWeb} 1x, ${contact2xWeb} 2x`}
          type="image/webp"
        />
        <source srcSet={`${contact}1x, ${contact2x} 2x`} type="image/jpeg" />
        <CallBackImg src={contact} alt="Contact" />
      </picture>
      <Formik
        initialValues={{
          name: '',
          email: '',
        }}
        validationSchema={CallBackSchema}
        onSubmit={onSubmit}
      >
        {({
          handleChange,
          handleSubmit,
          handleReset,
          values,
          errors,
          touched,
        }) => (
          <CallbackForm
            name="contact"
            onSubmit={handleSubmit}
            onReset={handleReset}
            data-netlify="true"
            data-netlify-honeypot="bot-field"
          >
            <CallbackHeader>Request Callback</CallbackHeader>
            <CallBackField
              type="text"
              name="name"
              value={values.name}
              onChange={handleChange}
              placeholder="Enter your name"
            />
            <CallBackField
              type="email"
              name="email"
              value={values.email}
              onChange={handleChange}
              placeholder="Enter Email*"
              className={errors.email && touched.email ? 'error' : ''}
            />
            {errors.email && touched.email ? (
              <ErrorText>
                <ErrorIcon src={worning} width={16} height={15} />
                This is a required field
              </ErrorText>
            ) : null}
            <SubmitBtn type="submit">Send</SubmitBtn>
          </CallbackForm>
        )}
      </Formik>
    </CallbackBox>
  );
};

export default CallBack;
