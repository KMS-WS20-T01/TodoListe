import { Button, Typography } from "@material-ui/core";
import React, { createRef } from "react";
import { useStyles } from "./Login.style";
import { UsernameInput } from "./UsernameInput";
import { PasswortInput } from "./PasswortInput";

export interface LoginFormProps {
  title: string;
  submitBtn: {
    text: string;
    onClick: (username: string, password: string) => void;
  };
}

export const LoginForm: React.FC<LoginFormProps> = ({ title, submitBtn }) => {
  const classes = useStyles();
  const username = createRef<HTMLInputElement>();
  const password = createRef<HTMLInputElement>();

  const handleOnClick = () => {
    if (!username.current?.value || !password.current?.value) return;

    submitBtn.onClick(username.current.value, password.current.value);
  };

  return (
    <div className={classes.root}>
      <Typography variant="h4">{title}</Typography>
      <UsernameInput inputRef={username} />
      <PasswortInput inputRef={password} />
      <Button variant="contained" color="primary" onClick={handleOnClick}>
        {submitBtn.text}
      </Button>
    </div>
  );
};
