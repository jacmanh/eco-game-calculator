import React, { useEffect, useState } from "react";
import {
  FormControl,
  FormGroup,
  InputLabel,
  MenuItem,
  Paper,
  Select,
} from "@material-ui/core";
import { Field, useField } from "react-final-form";
import materials, { Material, Recipe } from "../Materials/Materials";
import ItemPreview from "../ItemPreview";
import Stations from "../Items/Stations";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    margin: {
      margin: theme.spacing(1),
    },
  })
);

const OresFields = () => {
  const classes = useStyles();
  const fieldItem = useField("item");
  const fieldStation = useField("station");
  const [stations, setStations] = useState<Stations[]>();
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe>();
  const [selectedProduct, setSelectedProduct] = useState<
    Material | undefined
  >();

  useEffect(() => {
    const {
      input: { value },
    } = fieldItem;
    if (value) {
      const product = materials.find((item) => item.name === value);
      if (product) {
        let recipe = product.recipes[0];
        setSelectedRecipe(recipe);
      }
      setSelectedProduct(product);
    }
  }, [fieldItem]);

  useEffect(() => {
    const station = fieldStation.input.value;
    if (station && selectedProduct) {
      // @ts-ignore
      const list = selectedProduct.recipes.find(
        (item) => item.station === station
      );
      if (list) {
        setSelectedRecipe(list);
      }
    }
  }, [fieldStation]);

  useEffect(() => {
    // Update station
    const stationList: Stations[] = [];
    if (selectedProduct) {
      selectedProduct.recipes.forEach((item) => {
        if (item.station) {
          stationList.push(item.station);
        }
      });
    }
    setStations(stationList);
  }, [selectedProduct]);

  return (
    <Paper>
      <Field
        name="item"
        render={({ input }) => (
          <FormControl className={classes.margin} variant="outlined">
            <InputLabel>Item</InputLabel>
            <Select {...input}>
              {materials.map((item) => (
                <MenuItem key={item.name} id={item.name} value={item.name}>
                  {item.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
      />

      {stations && (
        <Field
          name="station"
          initialValue={stations[0]}
          render={({ input }) => (
            <FormControl className={classes.margin} variant="outlined">
              <InputLabel>Station</InputLabel>
              <Select {...input}>
                {stations.map((item) => (
                  <MenuItem key={item} id={item} value={item}>
                    {item}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
        />
      )}
      {selectedProduct && selectedRecipe && (
        <ItemPreview item={selectedProduct} selectedRecipe={selectedRecipe} />
      )}
    </Paper>
  );
};

export default OresFields;
