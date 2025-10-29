import { useEffect, useState } from "react";
import { useRouter } from 'next/router'
import { DatePicker } from "zaman";
import Select from 'react-select';
import styles from "./SearchForm.module.css";
import QueryString from "qs";


function SearchForm() {

  const [query, setQuery] = useState({
    originId: "",
    destinationId: "",
    startDate: "",
    endDate: ""
  });

  const router = useRouter()



  useEffect(() => {

    const { originId, destinationId, startDate, endDate } = router.query;

    setQuery({
      originId: originId || "",
      destinationId: destinationId || "",
      startDate: startDate || "",
      endDate: endDate || ""
    });
  }, [router.query]);


  const handleSelectChange = (selectedOption, { name }) => {
    setQuery({ ...query, [name]: selectedOption?.value })
  }

  const dateHandler = (e) => {
    setQuery({ ...query, startDate: e.from, endDate: e.to })
  }

  const sendHandler = (e) => {
    e.preventDefault()
    const queryString = QueryString.stringify(query)
    router.push(`/?${queryString}`)
  }


  const optionsTagMb = [
    { value: '', label: 'مبدا' },
    { value: '1', label: 'تهران' },
    { value: '2', label: 'سنندج' },
    { value: '3', label: 'مادرید' },
    { value: '4', label: 'اصفهان' },
    { value: '5', label: 'سلیمانیه' },
    { value: '6', label: 'هولر' },
    { value: '7', label: 'مازندران' },
    { value: '8', label: 'گیلان' },
    { value: '9', label: 'ایتالیا' }
  ]

  const optionsTagMg = [
    { value: '', label: 'مقصد' },
    { value: '1', label: 'تهران' },
    { value: '2', label: 'سنندج' },
    { value: '3', label: 'مادرید' },
    { value: '4', label: 'اصفهان' },
    { value: '5', label: 'سلیمانیه' },
    { value: '6', label: 'هولر' },
    { value: '7', label: 'مازندران' },
    { value: '8', label: 'گیلان' },
    { value: '9', label: 'ایتالیا' }
  ]


  const customStyles = {
    control: (provided) => ({
      ...provided,
      border: 'none',
      borderRadius: '19px',
      boxShadow: 'none',
      minWidth: '160px',
      minHeight: '44px',
      backgroundColor: 'transparent',
      paddingLeft: 0,
      paddingRight: 0,
    }),
    valueContainer: (provided) => ({
      ...provided,
      padding: '0 8px',
    }),
    dropdownIndicator: () => ({ display: 'none' }),
    indicatorSeparator: () => ({ display: 'none' }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? '#28a745' : 'white',
      borderRadius: '12px',
      color: state.isFocused ? 'white' : 'black',
      color: 'black',
      cursor: 'pointer',
    }),

  }

  return (

    <div className={styles.wrapper}>
      <form className={styles.form}>
        <div className={styles.wrapper_select}>
          <div className={styles.test}>
            <img className={styles.icon} src="/icon/location.svg" />
            <Select
              styles={customStyles}
              options={optionsTagMb}
              placeholder="مبدا"
              name="originId"
              className={styles.select}
              value={optionsTagMb.find(item => item.value === query.originId)}
              onChange={(option, meta) => handleSelectChange(option, meta)}
            />
          </div>
          <div className={styles.test}>
            <img className={styles.icon} src="/icon/location.svg" />
            <Select
              styles={customStyles}
              options={optionsTagMg} placeholder="مقصد"
              name="destinationId"
              className={styles.select}
              value={optionsTagMg.find(item => item.value === query.destinationId)}
              onChange={(option, meta) => handleSelectChange(option, meta)}
            />
          </div>
        </div>
        <div className={styles.date_section}>
          <div className={styles.datePicker}>
            <img src="/icon/calendar.svg" />
            <span>
              تاریخ
            </span>
            <DatePicker
              inputClass={styles.date}
              onChange={dateHandler} range
              defaultValue={query.endDate && query.startDate ? { from: query.startDate, to: query.endDate } : null}
            />
          </div>
          <button onClick={sendHandler} className={styles.search_btn}>جستجو</button>
        </div>


      </form>
    </div>
  );
}


export default SearchForm;
