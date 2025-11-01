"use client"

import styles from "./Transactions.module.css"
import { useGetUserTransactions } from "../../core/services/query"
import { formatDate, formatTime } from "../../core/utils/formatDate";

function Transactions() {

  const { data, isPending } = useGetUserTransactions()

 
  return (
    <div className={styles.wrapper}>
      <table className={styles.table}>

        <thead>
          <tr>
            <th>تاریخ و ساعت</th>
            <th>مبلغ (تومان)</th>
            <th>شماره سفارش</th>
          </tr>
        </thead>
        <tbody>
          {
            data?.map(transactions => {

              const ObjDate = new Date(transactions.createdAt)
              console.log(ObjDate);

              return (
                <tr key={transactions.id}>
                  <td>{formatTime(ObjDate)} {formatDate(ObjDate)}</td>
                  <td>{transactions.amount.toLocaleString("fa-IR")}</td>
                  <td>{transactions.id.slice(0, 8)}</td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
    </div>
  );
}

export default Transactions