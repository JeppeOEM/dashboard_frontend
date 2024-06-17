
import GridItem from "../models/GridItem";
import Indicator from "../models/Indicator";
import IndicatorList from "../models/IndicatorList";
import Strategy from "../models/Strategy";
import User from "../models/User";
import ApiClient from "./ApiClient";

export const GridItemClient = new ApiClient<GridItem>('grid/grids/');
export const CreateUserClient = new ApiClient<User>('users/create/');
export const StrategiesClient = new ApiClient<Strategy>('strategy/strategies/');
export const IndicatorTypesClient = new ApiClient<IndicatorList>('indicatortypes/');
export const IndicatorClient = new ApiClient<Indicator>('strategy/indicators/');
