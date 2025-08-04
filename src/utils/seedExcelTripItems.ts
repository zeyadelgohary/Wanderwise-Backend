import xlsx from "xlsx";
import { Item } from "../tripItems/tripItem.model";
import { WeightedMood } from "../trips/trip.model";

export async function seedItems(filePath: any) {
  try {
    const workbook = xlsx.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const data: any = xlsx.utils.sheet_to_json(worksheet);

    const tripItems = data.map((item: any) => {
      const mood: WeightedMood[] = [
        {
          weight: item.Family,
          mood: "Family",
        },
        {
          weight: item.Sports,
          mood: "Sports",
        },
        {
          weight: item.Art,
          mood: "Art",
        },
        {
          weight: item.Entertainment,
          mood: "Entertainment",
        },
        {
          weight: item.History,
          mood: "History",
        },
        {
          weight: item.Adventure,
          mood: "Adventure",
        },
      ];
      const newItem = new Item({
        name: item.Trip_Title,
        city: item.Location,
        url: item.Link,
        image: item.Image,
        duration: item.Duration !== 11.20891 ? item.Duration : null,
        mood,
        price: item.Price !== 10379.066476313 ? item.Price : null,
        rating: item.Rating !== 4.670544 ? item.Rating : null,
        reviewCount:
          item["No. Of Rating"] !== 384.15909665033
            ? item["No. Of Rating"]
            : null,
        weightedRating:
          item.WeightedRating !== 4.66866595440475 ? item.WeightedRating : null,
        provider: item.Provider,
        category: item.Category,
        type: item.Type,
      });
      return newItem;
    });

    await Item.insertMany(tripItems);
  } catch (e: any) {
    console.log(e);
  }
}

export async function generateRandomWeights(filePath: string) {
  const workbook = xlsx.readFile(filePath);
  const sheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];
  const data: any = xlsx.utils.sheet_to_json(worksheet);

  const arr1 = [0.05, 0.2, 0.4, 0.6, 0.8];
  const arr2 = [0, 0.1, 0.2];

  const outArr = [];
  let j = 1;
  for (let i = 1; i < data.length; i++) {
    const randomInteraction = Math.floor(Math.random() * 5);
    const randomInteraction2 = Math.floor(Math.random() * 3);

    outArr.push({
      Title: data[i].Title,
      User: "User " + j,
      weight: arr1[randomInteraction] + arr2[randomInteraction2],
    });

    if (i % 38 === 0) j++;
  }

  // Convert the array of objects to a worksheet
  const outsheet = xlsx.utils.json_to_sheet(outArr);

  // Create a new workbook
  const out = xlsx.utils.book_new();

  // Add the outsheet to the out
  xlsx.utils.book_append_sheet(out, outsheet, "Sheet1");

  // Write the out to a file
  xlsx.writeFile(out, "users-interactions-with-topWeighted-items.xlsx");

  console.log("xlsx file has been written successfully.");
}

export async function seedHotels(filePath: any) {
  console.log("started");
  try {
    const workbook = xlsx.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const data: any = xlsx.utils.sheet_to_json(worksheet);

    const tripItems = data.map((item: any) => {
      const newItem = new Item({
        name: item.Name,
        city: item.Location,
        url: item.Link,
        price: item.Price,
        rating: item["Overall Rating"],
        reviewCount: item.Reviews,
        category: item.Category,
        type: "stay",
      });
      return newItem;
    });

    await Item.insertMany(tripItems);
    console.log("Done");
  } catch (e: any) {
    console.log(e);
  }
}
