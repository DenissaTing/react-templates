import React, { Component } from "react";
import { Formik } from "formik";
import withStyles from "@material-ui/core/styles/withStyles";
import { FormikForm } from "./FormikForm";
import Paper from "@material-ui/core/Paper";
import * as Yup from "yup"
import axios from "axios"

const styles = theme => ({
 paper: {
   marginTop: theme.spacing.unit * 8,
   display: "flex",
   flexDirection: "column",
   alignItems: "center",
   padding: `${theme.spacing.unit * 5}px ${theme.spacing.unit * 5}px ${theme
     .spacing.unit * 5}px`
 },
 container: {
   maxWidth: "200px"
 }
});

// Regex expression for policy Number
// Policy number must be 6 digits
const policyRegExp = /^\d{6}$/;


//Yup Validation Schema 
const validationSchema = Yup.object({
  firstName: Yup.string("Enter a first name")
  .required("First name is required"),

  lastName: Yup.string("Enter a last name")
  .required("Last name is required"),

  policy: Yup.string("")
  .matches(policyRegExp, "Policy must contain 6 digit numbers")
  .required("Enter your policy number"),

  // You can add more validation according to your needs. Examples:

  // email: Yup.string("Enter your email")
  // .email("Enter a valid email")
  // .required("Email is required"),

  // password: Yup.string("")
  // .min(8, "Password must contain at least 8 characters")
  // .required("Enter your password"),

  // confirmPassword: Yup.string("Enter your password")
  // .required("Confirm your password")
  // .oneOf([Yup.ref("password")], "Password does not match")

})

// URL to AWS API Gateway, parameter is 'policyno'
let aws_api = "https://py6rabx9h7.execute-api.us-east-1.amazonaws.com/dev/policyauth"

const policyCheck = ({url, policy}) => 
  new Promise((resolve, reject)=> {
    axios.get(url, {
      params: {
        policyno: policy
      }
    })
    .then((response)=>{
      console.log(response.data)
      console.log(response.data.statusCode)
      return response.data.statusCode;
    })
    .then(statusCode => {
      setTimeout(()=>{
        if(statusCode !== 200){
          reject(new Error('This policy number does not exist'));
        }
        resolve(true);
      }
    ,1000)
    })
  })

class InputForm extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

 render() {
   const classes = this.props;
   const values = { firstName: "", lastName: "", policy: "" /* ,email: "",  confirmPassword: "", password: "" */ };
   return (
     <React.Fragment>
        <div className={classes.container}>
          <Paper elevation={1} className={classes.paper}>
            <Formik
              render={props => <FormikForm {...props} />}
              initialValues={values}
              validationSchema={validationSchema}
              onSubmit={async (values, actions) => {
                console.log(JSON.stringify(values))
                actions.setSubmitting(true);
                policyCheck({url: aws_api, policy: values.policy})
                .then(()=> {
                  actions.setStatus({msg: 'You are logged in!'});
                })
                .catch(error => {
                  actions.setStatus({msg: error.message});
                })
                .finally(()=>{
                  //actions.resetForm();
                  actions.setSubmitting(false);
                })
              }}
            />
          </Paper>
        </div>
     </React.Fragment>
   );
 }
}

export default withStyles(styles)(InputForm);
