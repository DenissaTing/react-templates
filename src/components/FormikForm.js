import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

export const FormikForm = (props) => {
  const {
    values: { firstName, lastName, policy /*, email, password, confirmPassword*/ }, // Should list all the input fields
    errors,
    touched,
    handleSubmit,
    handleChange,
    isSubmitting,
    setFieldTouched,
    status
    } = props;
    
  const change = (name, e) => {
    e.persist();
    handleChange(e);
    setFieldTouched(name, true, false);
  };

  return (
    <form 
      onSubmit={handleSubmit}>
      <div className="input-row">
        <TextField
          variant='outlined'
          margin="dense"
          placeholder="Jane"
          id="firstName"
          name="firstName"
          helperText={touched.firstName ? errors.firstName : ""}
          error={touched.firstName && Boolean(errors.firstName)}
          value={firstName}
          onChange={change.bind(null, "firstName")}
          label="First Name"
        />
      </div>
      <div className="input-row">
        <TextField
          variant='outlined'
          margin="dense"
          placeholder="Doe"
          id="lastName"
          name="lastName"
          helperText={touched.lastName ? errors.lastName : ""}
          error={touched.lastName && Boolean(errors.lastName)}
          value={lastName}
          onChange={change.bind(null, "lastName")}
          label="Last Name"
        />
      </div>
      <div className="input-row">
        <TextField
          variant='outlined'
          margin="dense"
          placeholder="123456"
          id="policy"
          name="policy"
          label="Policy Number"
          helperText={touched.policy ? errors.policy  : "" }
          error={touched.policy && Boolean(errors.policy) || status }
          value={policy}
          onChange={change.bind(null, "policy")}
        />
        {status && 
          status.msg && 
            <div>
              <font color="red">
                {status.msg}
              </font>
            </div>
        }
        
      </div>
    {/* You can add more Input fields according to your application design. Examples: */}

    {/* <div className="input-row">
     <TextField
       id="email"
       name="email"
       helperText={touched.email ? errors.email : ""}
       error={touched.email && Boolean(errors.email)}
       value={email}
       onChange={change.bind(null, "email")}
       label="Email"
     />
    </div>

    <div className="input-row">
      <TextField
        id="password"
        name="password"
        helperText={touched.password ? errors.password : ""}
        error={touched.password && Boolean(errors.password)}
        value={password}
        onChange={change.bind(null, "password")}
        label="Password"
        type="password"
      />
    </div>

    <div className="input-row">
      <TextField
        id="confirmPassword"
        name="confirmPassword"
        helperText={touched.confirmPassword ? errors.confirmPassword : ""}
        error={touched.confirmPassword && Boolean(errors.confirmPassword)}
        value={confirmPassword}
        onChange={change.bind(null, "confirmPassword")}
        label="Confirm Password"
        type="password"
      />
    </div> */}

    <br/>
      <div className="input-row">
        <Button
          type="submit"
          variant="contained"
          color="primary"
          size="small"
          disabled={isSubmitting}
        >
        Login
        </Button>
      </div>
    <br/>
    </form>
 );
};
