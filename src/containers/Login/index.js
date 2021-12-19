import { Formik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useStyles } from "./styles.js";
import swal from "sweetalert";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import { BasicTextField } from "../../components/Input";
import { BasicButton } from "../../components/Button";
import { Link } from "react-router-dom";
import {
  auth,
  signInWithEmailAndPassword,
} from "../../config/Firebase/Firebase.js";
import logo from "../../Assets/icon.png";
const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string()
    .required("Required")
});

const Login = () => {
  const classes = useStyles();
  const [isLoading, setIsLoading] = useState(false);
  let history = useHistory();
  const login = (values) => {
    setIsLoading(true);
    signInWithEmailAndPassword(auth, values.email, values.password)
      .then((userCredential) => {
        setIsLoading(false);
        swal({
          title: "Login Successful!",
          icon: "success",
        });
        setTimeout(() => {
          history.push(`/home`);
        }, 200);
      })
      .catch((error) => {
        setIsLoading(false);
        swal(error.message);
      });
  };
  return (
    <div>
      <AppBar>
        <Toolbar className={classes.toolbar}>
          <Typography variant="h5">Log in</Typography>
        </Toolbar>
      </AppBar>

      <main className={classes.mainDiv}>
        <Grid justifyContent="center" container>
          <img src={logo} alt="Logo" style={{ width: 300, height: "auto" }} />{" "}
          <Grid md={4} item>
            <Card className={classes.card} raised>
              <Formik
                initialValues={{ email: "", password: "" }}
                validationSchema={LoginSchema}
                onSubmit={(values, { setSubmitting }) => {
                  setTimeout(() => {
                    setSubmitting(false);
                    login(values);
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
                      error={errors.email}
                      helperText={errors.email}
                      label="Email"
                      type="text"
                      name="email"
                      value={values.email}
                      onChange={handleChange("email")}
                      onBlur={handleBlur("email")}
                    />
                    <BasicTextField
                      error={errors.password}
                      helperText={errors.password}
                      label="Password"
                      type="text"
                      name="password"
                      value={values.password}
                      onChange={handleChange("password")}
                      onBlur={handleBlur("password")}
                    />
                    <BasicButton
                      label={isSubmitting || isLoading ? "Loading..." : "Login"}
                      type="submit"
                    />
                  </form>
                )}
              </Formik>
            </Card>
          </Grid>
        </Grid>
      </main>
    </div>
  );
};

export default Login;
