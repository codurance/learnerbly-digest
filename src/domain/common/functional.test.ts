import { xprod } from "./functional";

test("xprod should return all the possible pairs between two arrays", () => {
  const countries = ["ES", "PT"];
  const timeFrames = ["2020", "2021", "2022"];

  expect(xprod(countries, timeFrames)).toEqual([
    ["ES", "2020"],
    ["ES", "2021"],
    ["ES", "2022"],
    ["PT", "2020"],
    ["PT", "2021"],
    ["PT", "2022"],
  ]);
});
