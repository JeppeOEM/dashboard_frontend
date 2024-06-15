import GridItem from "../models/GridItem";
import Strategy from "../models/Strategy";
import User from "../models/User";
import ApiClient from "./ApiClient";

export const GridItemClient = new ApiClient<GridItem>('grid/grids');
export const CreateUserClient = new ApiClient<User>('users/create');
export const StrategiesClient = new ApiClient<Strategy>('strategies');