import { useState } from 'react';
import { NavLink } from 'react-router-dom';

export default function SearchCoin({ coins }) {
  const [search, setSearch] = useState('');

  const filteredCoins = coins.filter(coin: => 
    coin.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="w-1/4 bg-gray-200 h-screen overflow-auto">
      <input 
        type="text" 
        placeholder="Search..." 
        value={search} 
        onChange={e => setSearch(e.target.value)} 
        className="w-full p-2 mb-4"
      />
      <ul>
        {filteredCoins.map((coin) => (
          <li key={coin.id} className="p-4 hover:bg-gray-300">
            <NavLink className="block" to={`/coins/${coin.name}`}>{coin.name}</NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
}