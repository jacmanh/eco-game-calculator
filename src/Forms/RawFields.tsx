import React from "react";
import { Paper, TextField } from "@material-ui/core";
import { Field } from "react-final-form";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

import RawMaterials from "../Items/Raw";
import prices from "../Prices/rawPrices";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      "& .MuiTextField-root": {
        margin: theme.spacing(1),
      },
    },
  })
);

const RawFields = () => {
  const classes = useStyles();
  return (
    <Paper className={classes.root}>
      {prices.map((item) => (
        <Field
          key={item.name}
          name={`raw[${item.name}]`}
          initialValue={item.price}
          render={({ input }) => (
            <TextField
              {...input}
              id={item.name}
              variant="outlined"
              label={item.name}
            />
          )}
        />
      ))}
    </Paper>
  );
};

export default RawFields;
