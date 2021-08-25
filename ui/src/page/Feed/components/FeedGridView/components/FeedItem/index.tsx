import { FeedItem as FeedItemType } from '../../../../types'
import styles from './FeedItem.module.css'
type Props = {
  feed: FeedItemType
}
export const FeedItem: React.FC<Props> = ({ feed }) => {
  return (
    <div className={styles.container}>
      <img src={feed.image} alt={feed.name}/>
      <div className={styles.description}>
        <h5>{feed.name}</h5>
        <p>{feed.description}</p>
      </div>
    </div>
  )
}