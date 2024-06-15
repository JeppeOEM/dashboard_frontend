import  {NavLink, Outlet} from 'react-router-dom';

export default function CoinListPage() {
    const coins = [1, 2, 3, 4, 5];
  return (
    <div>
        {coins.map((coin) => (
            <NavLink className={({isActive})=>{
              return isActive ? 'text-red-500' : '';
            }} key={coin} to={`/coins/${coin}`}>{coin}</NavLink>
        ))}
        <Outlet />
    </div>
  );
}
