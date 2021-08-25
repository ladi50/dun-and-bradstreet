import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import SearchIcon from '@material-ui/icons/Search';
import "./Search.css";
import { getQueryResults, postQueries } from "../../store/actions";

const Search = ({ clickedQuery }) => {
    const [input, setInput] = useState("");
    const dispatch = useDispatch();

    useEffect(() => {
        if (clickedQuery.trim().length > 0) {
            setInput(clickedQuery);
        }
    }, [clickedQuery]);

    const searchQuery = () => {
        dispatch(getQueryResults(input, true));
        dispatch(postQueries(input));
    };

    return (
        <div className={"searchContainer"}>
            <input type="text" value={input} onChange={e => setInput(e.target.value)}
                   onKeyDown={e => e.key === "Enter" && searchQuery()}
                   placeholder={"Type query to search"} />
            <SearchIcon onClick={searchQuery} />
        </div>
    );
};

export default Search;