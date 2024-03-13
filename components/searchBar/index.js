import {
  SearchBarWrapper,
  SearchBarInput,
  Suffix,
  SearchBarButton,
} from "./styled";
import { ReactComponent as Search } from "../../public/imgs/icons/search.svg";

/**
 * @param {import("./types").InputProps} props
 */
function SearchBar(props) {
  const { suffix, search, onSearchChange, ...restProps } = props ?? {};

  return (
    <SearchBarWrapper>
      <SearchBarInput
        type="search"
        value={search}
        onChange={onSearchChange}
        {...restProps}
      />
      <Search />
      {suffix && <Suffix>{suffix}</Suffix>}
    </SearchBarWrapper>
  );
}

export default SearchBar;
