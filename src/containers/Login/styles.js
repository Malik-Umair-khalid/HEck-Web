import {makeStyles} from "@mui/styles";

const useStyles = makeStyles(() => ({
  toolbar: {
    backgroundColor: "black"
  },
  mainDiv: {
    marginTop: "80px"
  },
  card: {
    padding: "20px",
    backgroundColor: "white !important"
  },
  linkDiv: {
    textAlign: "center",
    paddingTop: "8px"
  },
  link: {
    color: "#ffffff",
    textDecoration: "none"
  }
}))

export {useStyles};