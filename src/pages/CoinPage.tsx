
import { useParams } from 'react-router-dom';
export default function Coinpage() {
    // gives auto completion for id
    const params = useParams<{id: string}>();
    console.log(params);
  return (
    <div>
        {<h1>Coin {params.id}</h1>}
    </div>
  );
}
