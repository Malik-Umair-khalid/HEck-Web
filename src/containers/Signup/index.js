import {
  Formik
} from "formik";
import * as Yup from 'yup';
import {
  useState
} from "react";
import {
  useHistory
} from "react-router-dom";
import {
  useStyles
} from "./styles.js";
import swal from 'sweetalert';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import {
  BasicTextField
} from "../../components/Input";
import {
  BasicButton
} from "../../components/Button";
import {
  Link
} from 'react-router-dom';
import {
  auth,
  createUserWithEmailAndPassword,
  db,
  collection,
  doc,
  setDoc
} from "../../config/Firebase/Firebase.js";

const SignupSchema = Yup.object().shape({
  firstName: Yup.string()
  .matches(/[a-zA-Z]/, 'Only use alphabets.')
  .min(2, 'Too Short!')
  .max(20, 'Too Long!')
  .required('Required'),
  lastName: Yup.string()
  .matches(/[a-zA-Z]/, 'Only use alphabets.')
  .min(2, 'Too Short!')
  .max(20, 'Too Long!')
  .required('Required'),
  username: Yup.string()
  .matches(/[a-zA-Z]/, 'Only use alphabets.')
  .min(2, 'Too Short!')
  .max(20, 'Too Long!')
  .required ('Required'),
  email: Yup.string()
  .email('Invalid email')
  .required('Required'),
  password: Yup.string()
  .required('Required')
  .matches(/[a-zA-Z]/, 'Only use alphabets.')
  .min(8, 'Too Short! - should be 8 chars minimum.')
});

const Signup = () => {
  const classes = useStyles();
  const [isLoading,
    setIsLoading] = useState("");
  let history = useHistory();
  const register = (values) => {
    setIsLoading(true);
    createUserWithEmailAndPassword(auth, values.email, values.password)
    .then(async (userCredential) => {
      const usersCol = collection(db, "users");
      const userDoc = doc(usersCol, `${userCredential.user.uid}`);
      await setDoc(userDoc, {
        ...values, uid: userCredential.user.uid
      });
      setIsLoading(false);
      swal({
        title: "Registration Successful!",
        icon: "success",
      });
      setTimeout(() => {
          history.push(`/profile`);
        }, 200);
    })
    .catch((error) => {
      setIsLoading(false);
      alert(error.message);
    })
  }
  return(
    <div>
      <AppBar>
        <Toolbar className={classes.toolbar}>
          <Typography variant="h5">Sign up</Typography>
        </Toolbar>
      </AppBar>
      <main className={classes.mainDiv}>
        <Grid justifyContent="center" container>
          <Grid md={4} item>
            <Card className={classes.card} raised>
            <Formik
      initialValues={ { firstName: '', lastName: '', username: '', email: '', password: '' }}
      validationSchema={SignupSchema}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          setSubmitting(false);
          register(values);
        }, 400);
      }}
      >
           {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
        /* and other goodies */
      }) => (
        <form onSubmit={handleSubmit}>
               <BasicTextField
          error={errors.firstName}
          helperText={errors.firstName}
          id={isSubmitting ? "outlined-error-helper-text": "outlined-basic"}
          label="First Name"
          type="text"
          name="firstName"
          value={values.firstName}
          onChange={handleChange('firstName')}
          onBlur={handleBlur('firstName')} />
               <BasicTextField
          error={errors.lastName}
          helperText={errors.lastName}
          label="Last Name"
          type="text"
          name="lastName"
          value={values.lastName}
          onChange={handleChange('lastName')}
          onBlur={handleBlur('lastName')} />
               <BasicTextField
          error={errors.username}
          helperText={errors.username}
          label="Username"
          type="text"
          name="username"
          value={values.username}
          onChange={handleChange('username')}
          onBlur={handleBlur('username')} />
               <BasicTextField
          error={errors.email}
          helperText={errors.email}
          label="Email"
          type="text"
          name="email"
          value={values.email}
          onChange={handleChange('email')}
          onBlur={handleBlur('email')} />
               <BasicTextField
          error={errors.password}
          helperText={errors.password}
          label="Password"
          type="text"
          name="password"
          value={values.password}
          onChange={handleChange('password')}
          onBlur={handleBlur('password')} />
               <BasicButton
          label={isSubmitting || isLoading ? "Loading...": "Register"}
          type="submit" />
        </form>
      )}
        </Formik>
              <div className={classes.linkDiv}>
                <Link className={classes.link} to="/">Click here to log in.</Link>
    </div>
            </Card>
          </Grid>
        </Grid>
      </main>
    </div>
  )
}

export default Signup;