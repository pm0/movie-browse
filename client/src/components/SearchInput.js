import React, { useState, useEffect, useMemo } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import debounce from "debounce";
import Form from "react-bootstrap/Form";
import Badge from "react-bootstrap/Badge";
import { fetchSearchResults } from "../store/search";
import "./SearchInput.scss";

const mapStateToProps = (state, ownProps) => {
  return {
    searchResults: state.search.searchResults[ownProps.id],
    searchResultsLoading: state.search.searchResultsLoading[ownProps.id]
  };
};

const mapDispatchToProps = { fetchSearchResults };

function SearchResult(props) {
  const { data } = props;

  if (data.media_type === "movie") {
    return (
      <Link to={`/movie/${data.id}`} className="search-input-result">
        <span>
          <b>{data.title}</b>
          {data.release_date && ` (${data.release_date.substr(0, 4)})`}
        </span>
        <div className="search-input-badge-wrapper">
          <Badge variant="action">Movie</Badge>
        </div>
      </Link>
    );
  } else if (data.media_type === "person") {
    return (
      <Link to={`/actor/${data.id}`} className="search-input-result">
        <b>{data.name}</b>
        <div className="search-input-badge-wrapper">
          <Badge variant="action-alt">Actor</Badge>
        </div>
      </Link>
    );
  } else {
    return null;
  }
}

function SearchInput(props) {
  const {
    id,
    size,
    searchResults,
    searchResultsLoading,
    fetchSearchResults
  } = props;
  const [inputValue, setInputValue] = useState("");
  const [typing, setTyping] = useState(false);

  const debounceFetch = useMemo(
    () =>
      debounce(query => {
        fetchSearchResults({ query, id });
        setTyping(false);
      }, 300),
    [fetchSearchResults, id]
  );

  useEffect(() => {
    if (inputValue && inputValue.length > 2) {
      setTyping(true);
      debounceFetch(inputValue);
    }
  }, [inputValue, debounceFetch]);

  return (
    <>
      <Form.Control
        type="text"
        size={size || "md"}
        value={inputValue}
        onChange={e => setInputValue(e.target.value)}
        placeholder="Movies &amp; actors"
        className="search-input"
      />
      {inputValue &&
        !typing &&
        inputValue.length > 2 &&
        searchResultsLoading === "fetched" && (
          <div
            className={`search-input-results${
              size === "lg" ? " lg-input" : ""
            }`}
          >
            {searchResults.length === 0 && "No results"}
            {searchResults.map(result => (
              <SearchResult
                key={`${result.media_type}-${result.id}`}
                data={result}
              />
            ))}
          </div>
        )}
    </>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchInput);
