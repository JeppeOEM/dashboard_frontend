import { Box, Grid, GridItem, Show, Text } from "@chakra-ui/react"
import SideBar from "../components/navigationBars/SideBar"
import useStrategyQuery from "../hooks/useStrategyQuery"
import GridDashboard from "../components/GridDashboard/GridDashboard"
import IndicatorSection from "../components/strategy/IndicatorSection"
import SelectStratgyPanel from "../components/strategy/SelectStrategyPanel"
import SelectIndicators from "../components/strategy/SelectIndicators"
import CryptoCoinList from "../components/strategy/CryptoCoinList"
import strategyStore from "../stores/strategyStore"
import { get } from "http"
import StrategyName from "../components/strategy/StrategyName"
import { ChartComponent } from "../components/charting/ChartComponent"
import { useEffect, useState } from "react"
import priceStore from "../stores/priceStore"
import usePriceQuery from "../hooks/usePriceQuery"
import { Price } from "../models/Price"
import Timeseries from "../models/Timeseries"
import { useQueryClient } from "@tanstack/react-query"
// import strategyStore from "../stores/strategyStore"
function StrategyPage() {
  const {prices, selectedCoinId, results, setPrices, setNext, setPrevious, setResults, setPage, setCoinId, getByCoinId} = priceStore()
  const {getById, selectedId} = strategyStore()
  const {data: dataPrices, error: errorPrices, isLoading: isLoadingPrices} = usePriceQuery(selectedCoinId)
  

  const initialData = [
    { time: '2018-12-22', value: 32.51 },
    { time: '2018-12-23', value: 31.11 },
    { time: '2018-12-24', value: 27.02 },
    { time: '2018-12-25', value: 27.32 },
    { time: '2018-12-26', value: 25.17 },
    { time: '2018-12-27', value: 28.89 },
    { time: '2018-12-28', value: 25.46 },
    { time: '2018-12-29', value: 23.92 },
    { time: '2018-12-30', value: 22.68 },
    { time: '2018-12-31', value: 22.67 },
]
const [chartData, setChartData] = useState(initialData);
  const chartProps = {
    data: initialData, // replace with actual data
    colors: {
      backgroundColor: 'white',
      lineColor: '#2962FF',
      textColor: 'black',
      areaTopColor: '#2962FF',
      areaBottomColor: 'rgba(41, 98, 255, 0.28)',
    },
  }

  let otherData = [
    { time: '2019-01-01', value: 30.11 },
    { time: '2019-01-02', value: 32.43 },
    { time: '2019-01-03', value: 31.98 },
    // Add more data as needed
]

function formatPriceData(rawData : Price[] | null){
  return rawData.map(item => ({
    time: new Date(item.time).getTime() / 1000, // convert to Unix timestamp
    value: parseFloat(item.price) // convert price to a number
  }));
}
const queryClient = useQueryClient();

useEffect(() => {
  let l = getById(selectedId)
  console.log("L",l)
  queryClient.invalidateQueries(['prices']);
  console.log(selectedCoinId)
  console.log("DATAPRICES",dataPrices)
  if (dataPrices) {
  setNext(dataPrices.next) 
  setPrevious(dataPrices.previous)
  setResults(dataPrices.results)
  if (results !== null) {
    // Call dataprices directly as async madness
  const formatedData = formatPriceData(dataPrices.results)
  console.log("FORMATED DATA",formatedData)
  setChartData(formatedData)
  console.log("TEEEEST")
  }
  

  }
}, [selectedCoinId, dataPrices])


return (
<div>


<Grid
      templateAreas={{
        base: "main",
        lg: `"aside main"`,
      }}
      templateColumns={{
        base: "1fr",
        lg: "200px 1fr",
      }}
    >

      {/* <Show above="lg"> */}
        <GridItem gridArea={"aside"} paddingX={1}>
        <SideBar>
          <SelectStratgyPanel />
          <SelectIndicators />
          <CryptoCoinList />
        </SideBar>
        {/* <GridDashboard /> */}
        </GridItem>
      {/* </Show> */}
      <GridItem gridArea={"main"}>
        <StrategyName></StrategyName>
        <Box className="m-2.5">
        <Text>{}</Text>
        <ChartComponent data={chartData} ></ChartComponent>
        </Box>
        <IndicatorSection></IndicatorSection>
      </GridItem>

    </Grid>
    </div>
  )
}

export default StrategyPage