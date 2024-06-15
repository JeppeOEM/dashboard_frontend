import Tag from './Tag';
import Indicator from './Indicator';
export default interface Strategy {
    base: string;
    coins: string;
    tags: Tag[];
    indicators: Indicator[];
}

