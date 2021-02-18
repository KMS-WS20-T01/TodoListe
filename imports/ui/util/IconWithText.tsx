import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Tooltip from "@material-ui/core/Tooltip";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flexFlow: "row",
    },
  })
);

export interface IconWithTextProps {
  icon: JSX.Element;
  iconTooltip: string;
  text: string;
  textTooltip: string;
}

export const IconWithText: React.FC<IconWithTextProps> = ({
  icon,
  iconTooltip,
  text,
  textTooltip,
}) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Tooltip title={iconTooltip}>{icon}</Tooltip>
      <Tooltip title={textTooltip}>
        <Typography>{text}</Typography>
      </Tooltip>
    </div>
  );
};
