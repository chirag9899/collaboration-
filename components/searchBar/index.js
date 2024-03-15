import {
  SearchBarWrapper,
  SearchBarInput,
  Suffix,
  SearchBarButton,
  SearchDropdownWrapper,
} from "./styled";
import { ReactComponent as Search } from "../../public/imgs/icons/search.svg";
import DropDown from "../DropdownMenu";

/**
 * @param {import("./types").InputProps} props
 */
function SearchBar(props) {
  const {
    suffix,
    search,
    onSearchChange,
    dropdown,
    dropDownOptions,
    onSelectOption,
    ...restProps
  } = props ?? {};
  return (
    <SearchBarWrapper>
      <SearchBarInput
        type="search"
        value={search}
        onChange={onSearchChange}
        {...restProps}
      />
      <Search />
      {dropdown && (
        <SearchDropdownWrapper>
          <DropDown options={dropDownOptions} onSelect={onSelectOption} />
        </SearchDropdownWrapper>
      )}
      {suffix && <Suffix>{suffix}</Suffix>}
    </SearchBarWrapper>
  );
}

export default SearchBar;
