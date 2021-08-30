import React from 'react'
import { FeedItem } from '../../types'
import styles from './FeedTableView.module.css'

type Props = {
  items: Array<FeedItem>
}
export const FeedTableView: React.FC<Props> = ({ items }) => {
  return (
    <div className={styles.container}>
      <table className={styles.table} data-testid="feedTable">
        <thead>
          <tr>
            <th>Name</th>
            <th>Image</th>
            <th>Description</th>
            <th>Last Modified At</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item: FeedItem) => (
            <tr key={item.dateLastEdited}>
              <td className={styles.header}>{item.name}</td>
              <td className={styles.header}>{item.image}</td>
              <td className={styles.header}>{item.description}</td>
              <td className={styles.header}>{item.dateLastEdited}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}