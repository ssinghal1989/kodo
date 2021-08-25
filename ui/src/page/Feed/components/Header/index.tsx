import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import styles from './Header.module.css';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
type Props = {
  initialValues : {
    search: string;
    sortBy: string;
  }
}
export const Header: React.FC<Props> = (props) => {
  const [search, setSearch] = useState<string>(props.initialValues.search);
  const [sortBy, setSortBy] = useState<string>(props.initialValues.sortBy);
  const history = useHistory();
  useEffect(() => {
    const params = new URLSearchParams(history.location.search);
    if (search) {
      if (params.has("search")) {
        params.set("search", search);
      } else {
        params.append("search", search)
      }
    } else if (params.has("search")) {
      params.delete("search");
    }
    history.push({search: params.toString()})
  }, [search, history])
  useEffect(() => {
    if (sortBy) {
      const params = new URLSearchParams(history.location.search);
      if (params.has("sortBy")) {
        params.set("sortBy", sortBy);
      } else {
        params.append("sortBy", sortBy)
      }
      history.push({search: params.toString()})
    }
  }, [sortBy, history])
  return (
    <React.Fragment>
      <div className={styles.titleContainer}>
        <h3>Feed</h3>
      </div>
      <div className={styles.controls}>
        <div className={styles.searchBox}>
          <form>
            <input value={search} onChange={(e: ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)} type="text" placeholder="search..." />
          </form>
          <div className={styles.icon}>
            <FontAwesomeIcon icon={faSearch} />
          </div>
        </div>
        <div className={styles.sortControl}>
          <label>Sort By: </label>
          <select value={sortBy} onChange={(e: ChangeEvent<HTMLSelectElement>) => setSortBy(e.target.value)}>
            <option value="">Select...</option>
            <option value="name">Name</option>
            <option value="dateLastEdited">Modified Date</option>
          </select>
        </div>
      </div>
    </React.Fragment>
  )
}