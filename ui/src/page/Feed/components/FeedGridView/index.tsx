import { FeedItem as FeedItemType } from "../../types"
import { FeedItem } from "./components/FeedItem"
import styles from './FeedGridView.module.css'

type Props = {
  items: Array<FeedItemType>
}
export const FeedGridView: React.FC<Props> = (props) => {
  return (
    <>
      <div className={styles.container}>
        {props.items.map((feed: FeedItemType) => <FeedItem key={feed.dateLastEdited} feed={feed}/>)}
      </div>
    </>
  )
}