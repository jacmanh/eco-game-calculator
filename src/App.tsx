import React from "react";
import "./App.css";

import RawFields from "./Forms/RawFields";
import { Box, Grid, Typography } from "@material-ui/core";
import OresFields from "./Forms/OresFields";
import { Form } from "react-final-form";

function App() {
  return (
    <div className="App">
      <Form
        onSubmit={() => {}}
        render={({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            {" "}
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Box pb={20}>
                  <Typography variant="h2">Eco Price Calculator</Typography>
                </Box>
              </Grid>
              <Grid item xs={2}>
                <Typography variant="subtitle1" component="h3">
                  Raw Materials Prices
                </Typography>
                <RawFields />
              </Grid>
              <Grid item xs={4}>
                <Typography variant="subtitle1" component="h3">
                  Select a product
                </Typography>
                <OresFields />
              </Grid>
            </Grid>
          </form>
        )}
      />
    </div>
  );
}

export default App;
