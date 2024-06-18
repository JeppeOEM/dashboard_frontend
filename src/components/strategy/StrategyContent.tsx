import { Grid, GridItem, Show } from "@chakra-ui/react";

import { useEffect, useState } from "react";
import strategyStore from "../../stores/strategyStore";
import Strategy from "../../models/Strategy";
import priceStore from "../../stores/priceStore";
import usePriceQuery from "../../hooks/usePriceQuery";

// import strategyStore from "../stores/strategyStore";
function StrategyContent() {
const { strategies, selectedId, setStrategies, setStrategyId, getById } = strategyStore();
const {prices, selectedCoinId, setPrices, setCoinId, getByCoinId} = priceStore();
const [strategy, setStrategy] = useState<Strategy>()


useEffect(() => {
    if (selectedId) {

        const strategy = getById();
        console.log(strategy);
        setStrategy(strategy); // If strategy is undefined, set it to null
        setPrices(prices);
    }
}, [selectedId, selectedCoinId]);

return (
<div>
<h2>Hej</h2>
{strategy && <div>{strategy.name}</div>}

</div>
  );
}

export default StrategyContent;