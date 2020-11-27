import { createStyles, makeStyles, Theme } from "@material-ui/core";

export const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {},
        section: {
            margin: theme.spacing(4)
        }
      })
);