import Ores from "../Items/Ores";
import RawMaterials from "../Items/Raw";
import Stones from "../Items/Stones";
import Stations from "../Items/Stations";
import Metals from "../Items/Metals";
import Wastes from "../Items/Wastes";
import Woods from "../Items/Woods";

export type Ingredient = {
  name: RawMaterials | Ores | Stones | Metals | Wastes | Woods;
  number: number;
};

export type Recipe = {
  station?: Stations;
  needs: Ingredient[];
  gives: Ingredient[];
};

export type Material = {
  name: RawMaterials | Ores | Stones | Metals | Wastes | Woods;
  recipes: Recipe[];
};

const materials = [
  {
    name: Ores.CrushedIronOre,
    recipes: [
      {
        station: Stations.Arrastra,
        needs: [
          {
            name: RawMaterials.IronOre,
            number: 20,
          },
        ],
        gives: [
          {
            name: Ores.CrushedIronOre,
            number: 2,
          },
          {
            name: Stones.CrushedSandStone,
            number: 1,
          },
        ],
      },
      {
        station: Stations.StampMill,
        needs: [
          {
            name: RawMaterials.IronOre,
            number: 20,
          },
        ],
        gives: [
          {
            name: Ores.CrushedIronOre,
            number: 4,
          },
          {
            name: Stones.CrushedSandStone,
            number: 1,
          },
        ],
      },
    ],
  },
  {
    name: Stones.CrushedSandStone,
    recipes: [
      {
        station: Stations.Arrastra,
        needs: [
          {
            name: RawMaterials.SandStone,
            number: 12,
          },
        ],
        gives: [
          {
            name: Stones.CrushedSandStone,
            number: 3,
          },
        ],
      },
      {
        station: Stations.StampMill,
        needs: [
          {
            name: RawMaterials.SandStone,
            number: 20,
          },
        ],
        gives: [
          {
            name: Stones.CrushedSandStone,
            number: 5,
          },
        ],
      },
    ],
  },
  {
    name: Metals.IronConcentrate,
    recipes: [
      {
        station: Stations.RockerBox,
        needs: [
          {
            name: Ores.CrushedIronOre,
            number: 5,
          },
        ],
        gives: [
          {
            name: Metals.IronConcentrate,
            number: 1,
          },
          {
            name: Wastes.Tailing,
            number: 2,
          },
        ],
      },
    ],
  },
  {
    name: Metals.IronBar,
    recipes: [
      {
        station: Stations.Bloomery,
        needs: [
          {
            name: Metals.IronConcentrate,
            number: 2,
          },
        ],
        gives: [
          {
            name: Metals.IronBar,
            number: 3,
          },
          {
            name: Stones.Slag,
            number: 2,
          },
        ],
      },
    ],
  },
  {
    name: Woods.HewnLog,
    recipes: [
      {
        station: Stations.WorkBench,
        needs: [
          {
            name: Woods.Wood,
            number: 2,
          },
        ],
        gives: [
          {
            name: Woods.HewnLog,
            number: 1,
          },
        ],
      },
      {
        station: Stations.CarpentryTable,
        needs: [
          {
            name: Woods.Wood,
            number: 2,
          },
        ],
        gives: [
          {
            name: Woods.HewnLog,
            number: 1,
          },
        ],
      },
    ],
  },
  {
    name: Woods.Board,
    recipes: [
      {
        station: Stations.WorkBench,
        needs: [
          {
            name: Woods.Wood,
            number: 0.5,
          },
        ],
        gives: [
          {
            name: Woods.Board,
            number: 1,
          },
        ],
      },
      {
        station: Stations.CarpentryTable,
        needs: [
          {
            name: Woods.Wood,
            number: 0.5,
          },
        ],
        gives: [
          {
            name: Woods.Board,
            number: 1,
          },
        ],
      },
    ],
  },
];

export default materials;
