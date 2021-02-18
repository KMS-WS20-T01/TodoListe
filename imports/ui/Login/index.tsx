import React from "react";
import { Meteor } from "meteor/meteor";
import { LoginForm } from "./LoginForm";
import { useHistory } from "react-router-dom";
import { Button, Typography } from "@material-ui/core";
import { useStyles } from "./Login.style";

export const Login = () => {
  const classes = useStyles();
  const history = useHistory();
  const handleSignIn = (username: string, password: string) => {
      Meteor.loginWithPassword(username, password, (err) => {
      if (err) return console.log(err);

      history.push("/");
    });
  };

  return (
    <div className={classes.login}>
      <LoginForm
        title="TodoList"
        submitBtn={{ text: "Sign in", onClick: handleSignIn }}
      />
      <Typography component="div">
        New to TodoList?{" "}
        <Button color="primary" onClick={() => history.push("/register")}>
          Create an account.
        </Button>{" "}
      </Typography>
    </div>
  );
};
