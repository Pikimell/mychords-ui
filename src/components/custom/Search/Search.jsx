import style from './Search.module.css';

const Search = ({ value, onChange, className, ...props }) => {
  return (
    <div className={style['search'] + ` ${className}`}>
      <input
        className={style['input']}
        type="text"
        onChange={e => onChange(e.target.value)}
        value={value}
        {...props}
      />
    </div>
  );
};

export default Search;
