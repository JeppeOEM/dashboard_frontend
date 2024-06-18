import { InputGroup, InputLeftElement, Input } from "@chakra-ui/react";
import { useRef } from "react";
import { BsSearch } from "react-icons/bs";

import { useNavigate } from "react-router-dom";
import coinQueryStore from "../../stores/coinQueryStore";


const SearchCoin = () => {
  const ref = useRef<HTMLInputElement>(null);
  const setSearchText = coinQueryStore((state) => state.setSearchText);
  const navigate = useNavigate();

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        setSearchText(ref.current?.value ?? "");
        navigate("/");
      }}
    >
      <InputGroup>
        <InputLeftElement pointerEvents="none">
          <BsSearch />
        </InputLeftElement>
        <Input
          ref={ref}
          borderRadius={20}
          placeholder="Search coins"
          variant="filled"
        />
      </InputGroup>
    </form>
  );
};

export default SearchCoin;
