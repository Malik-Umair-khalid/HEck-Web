import {makeStyles} from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  toolbar: {
    backgroundColor: "#df4830"
  },
  mainDiv: {
    marginTop: "80px"
  },
  card: {
    padding: "20px",
    backgroundColor: "#e15b5b !important"
  },
  submitBtn: {
    width: "100%",
    height: "35px",
    fontWeight: "bolder",
    textTransform: "uppercase",
    border: "none",
    borderRadius: "5px",
    color: "#ffffff",
    backgroundColor: "#8c2626"
  },
  linkDiv: {
    textAlign: "center",
    paddingTop: "8px",
  },
  link: {
    color: "#ffffff",
    textDecoration: "none"
  }
}))

export {useStyles};