const DelButton = ({ handleDelete }) => {
    return (
      <button onClick={handleDelete} className="bin-button">
        <img src="/item.svg" className="bin-top" />
        <img src="/item2.svg" className="bin-bottom" />
        <img src="/item3.svg" className="garbage" />
      </button>
    );
  };
  
  export default DelButton;