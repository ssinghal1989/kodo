import React from 'react'
import styles from './Pagination.module.css'
type Props = {
  currentPage: number,
  totalPages: number,
  goToPage: (pageNumber: number) => void,
}

export const Pagination: React.FC<Props> = (props) => {
  /**
   * Method to generate steps for pagination 
   * @returns {Array<number>} array to steps to show in pagination
   */
  const getSteps = (): Array<number> => {
    // If total pages are not more than 5 
    if (props.totalPages <= 5) {
      let steps: Array<number> = [];
      for (let i = 1; i <= props.totalPages; i++) {
        steps.push(i);
      }
      return steps;
    }
    // If total pages are more than 5
    const possibleNextSteps = props.totalPages - props.currentPage;
    const startingPage = possibleNextSteps > 3 ? props.currentPage : props.currentPage - (4 - possibleNextSteps);
    let steps: Array<number> = [];
    for (let i = 0; i < 5; i++) {
      steps.push(i + startingPage);
    }
    return steps;
  }
  /**
   * Mehtod to handle click on prev button
   */
  const onPrevClick = () => {
    if (props.currentPage <= 1) {
      return;
    }
    props.goToPage(props.currentPage - 1);
  }
  /**
   * Mehtod to handle click on next button
   */
   const onNextClick = () => {
    if (props.currentPage === props.totalPages) {
      return;
    }
    props.goToPage(props.currentPage + 1);
  }
  /**
   * Mehtod to handle click on step button
   * @param {number} pageNumber
   */
   const onStepClick = (pageNumber: number) => {
    if (pageNumber === props.currentPage) {
      return;
    }
    props.goToPage(pageNumber);
  }
  return (
    <div className={styles.container}>
      <div className={styles.button} onClick={props.goToPage.bind(null, 1)}>First</div>
      <div className={styles.button} onClick={onPrevClick}>Prev</div>
      {getSteps().map((pageNumber) => <div key={pageNumber} onClick={onStepClick.bind(null, pageNumber)} className={pageNumber === props.currentPage ? `${styles.button} ${styles.current}` : `${styles.button}`}>{pageNumber}</div>)}
      <div className={styles.button} onClick={onNextClick}>Next</div>
      <div className={styles.button} onClick={props.goToPage.bind(null, props.totalPages)}>Last</div>
    </div>
  )
}