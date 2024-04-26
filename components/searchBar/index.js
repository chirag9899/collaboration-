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
      <i className="icon-search"></i>
      <SearchBarInput
        type="search"
        value={search}
        onChange={onSearchChange}
        {...restProps}
      />
      {dropdown && (
        <SearchDropdownWrapper>
          <DropDown
            options={dropDownOptions}
            onSelect={onSelectOption}
            selected={dropDownOptions[0].label}
          />
        </SearchDropdownWrapper>
      )}
      {suffix && <Suffix>{suffix}</Suffix>}
    </SearchBarWrapper>
  );
}

export default SearchBar;
