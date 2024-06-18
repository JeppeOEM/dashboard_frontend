import  {NavLink, Outlet} from 'react-router-dom';
import CoinList from '../components/coinList/ListCoins';
import { Box, Grid, List, ListItem, Spinner, Text } from "@chakra-ui/react";
import useCoinQuery from '../hooks/useCoinQuery';



export default function CoinListPage() {
  const { data, error, isLoading } = useCoinQuery();
  return (
    <div>
    <div>
          <>
          {isLoading && <Spinner />}
          {error && <div>{error.message}</div>}
            <List>

            {data?.map((coin) => (
                <ListItem key={coin.id}>
                 <NavLink key={coin.id} to={`/coins/${coin.name}`}>{coin.name}</NavLink>
                </ListItem>
            ))}
            </List>
          </>
    </div>
        {/* {coins.map((coin) => (
            <NavLink className={({isActive})=>{
              return isActive ? 'text-red-500' : '';
            }} key={coin} to={`/coins/${coin}`}>{coin}</NavLink>
        ))} */}
        <Outlet />
    </div>
  );
}
