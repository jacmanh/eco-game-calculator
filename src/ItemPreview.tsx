import React, { useEffect, useState } from "react";
import materials, { Ingredient, Material, Recipe } from "./Materials/Materials";
import {
  Divider,
  Grid,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@material-ui/core";
import styled from "styled-components";
import RawMaterials from "./Items/Raw";
import Ores from "./Items/Ores";
import Stones from "./Items/Stones";
import { useField } from "react-final-form";
import Wastes from "./Items/Wastes";
import Metals from "./Items/Metals";
import Woods from "./Items/Woods";

const ItemContainer = styled.div`
  width: 80%;
  margin: 20px auto;
  border: 2px solid #aeaeae;
  padding: 10px;
  box-sizing: border-box;
`;

type GetPricesProps = RawMaterials | Ores | Stones | Metals | Wastes | Woods;

interface ItemPreviewProps {
  item: Material;
  selectedRecipe: Recipe;
}

const ItemPreview = ({ item, selectedRecipe }: ItemPreviewProps) => {
  const fieldRaws = useField("raw");
  const [needList, setNeedList] = useState<any[]>([]);
  const [giveList, setGiveList] = useState<any[]>([]);

  const roundToDecimal = (value: number) => {
    return Math.round(value * 100) / 100;
  };

  const getPrice = (item: GetPricesProps, number: number): number => {
    const rawsPrices = fieldRaws.input.value;
    const priceItem = rawsPrices[item];
    if (priceItem) {
      return priceItem ? roundToDecimal(priceItem * number) : 0;
    } else {
      // Item not found in prices list, try in materials
      const materialItem = materials.find((material) => material.name === item);
      if (materialItem) {
        // @ts-ignore
        const recipe: Recipe = materialItem.recipes[0];
        if (!recipe) return 0;
        return recipe.needs.reduce((acc: number, ingredient: Ingredient) => {
          const price = getPrice(ingredient.name, ingredient.number) * number;
          return acc + roundToDecimal(price);
        }, 0);
      }
      // Nothing, return 0
      return 0;
    }
  };

  useEffect(() => {
    if (selectedRecipe) {
      const nList = selectedRecipe.needs.map((ingredient) => ({
        name: ingredient.name,
        number: ingredient.number,
        price: getPrice(ingredient.name, ingredient.number),
      }));
      const gList = selectedRecipe.gives.map((ingredient) => ({
        name: ingredient.name,
        number: ingredient.number,
        price: getPrice(ingredient.name, ingredient.number),
      }));
      setGiveList(gList);
      setNeedList(nList);
    }
  }, [selectedRecipe, fieldRaws.input.value]);

  return (
    <ItemContainer>
      <Typography variant="subtitle1">{item.name}</Typography>
      <Divider />

      <Grid container alignItems="flex-start" justify="space-between">
        <Grid item>Needs</Grid>
        <Grid item xs={8}>
          <List>
            {needList &&
              needList.map((ingredient, index: number) => (
                <ListItem key={index}>
                  <ListItemText>
                    {ingredient.number}x {ingredient.name} - Value:{" "}
                    {ingredient.price}
                  </ListItemText>
                </ListItem>
              ))}
          </List>
        </Grid>
      </Grid>
      <Divider />

      <Grid container alignItems="flex-start" justify="space-between">
        <Grid item>Gives</Grid>
        <Grid item xs={8}>
          <List>
            {giveList &&
              giveList.map((ingredient, index: number) => (
                <ListItem key={index}>
                  <ListItemText>
                    {ingredient.number}x {ingredient.name} - Value:{" "}
                    {ingredient.price}
                  </ListItemText>
                </ListItem>
              ))}
          </List>
        </Grid>
      </Grid>
    </ItemContainer>
  );
};
export default ItemPreview;
