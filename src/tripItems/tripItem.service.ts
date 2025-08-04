import {AppError} from "../utils/AppError";
import { Item } from "./tripItem.model";
import { QueryParams } from "./tripItem.types";

class TripItemService {

  async getTripItem(queryparam: QueryParams) {
    const { query, skip = "0", take = "20", sort = "asc", type } = queryparam;
    const filter: Record<string, any> = {};
    if (query) {
      filter.name = { $regex: query, $options: "i" };
    }
    if (type) {
      filter.type = type;
    }
    const sortOrder = sort === "desc" ? 1 : -1;
    try {
      const tripItems = await Item.find(filter)
        .sort({ weightedRating: sortOrder })
        .skip(parseInt(skip))
        .limit(parseInt(take));
      return tripItems;
    } catch (error) {
      throw new AppError("error finding trip items", 400);
    }
  }

  async getTripItemById(id: string) {
    try {
      const tripItem = await Item.findById(id);

			if(!tripItem) throw new AppError("trip item not found", 404)

			const body = {
				tripTitles: [tripItem.name]
			}

			const res = await fetch('http://localhost:8000/tf-idf', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(body)
			})

			const similarItems= await res.json()

			return {tripItem, similarItems: similarItems};
    } catch (error) {
      throw new AppError("error finding trip item by id", 404);
    }
  }
}

export default new TripItemService();
