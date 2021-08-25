import "./Highlight.css";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Highlight = () => {
    const [search, setSearch] = useState("");
    const [occurrences, setOccurrences] = useState(0);
    const { items } = useSelector(store => store);

    useEffect(() => {
        const tds = document.getElementsByTagName("td");

        for (const td of tds) {
            const searchArray = td.innerText.split(new RegExp(`(${search})`, 'gi'));
            const textItems = searchArray.map((part, i) =>
                `<span key={${i}} className="highlightedText" style="background-color: ${part.toLowerCase() === search.toLowerCase() ? 'yellow' : ''}">${part}</span>`
            );
            td.innerHTML = `<span>${textItems.join("")}</span>`;
        }

        if (search.trim().length === 0) return setOccurrences(0);

        const spans = document.querySelectorAll("span[classname='highlightedText']");
        setOccurrences(spans.length);
    }, [search]);

    return (
        <div className={"searchContainer"}>
            <input type="text" value={search} onChange={e => setSearch(e.target.value)}
                   placeholder={"Type value to find"} disabled={items?.length === 0} />
            <span className={"setOccurrences"}>{occurrences}</span>
        </div>
    );
};

export default Highlight;