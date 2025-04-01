
const Button = ({ type, text, onClick, className }) => {
    return (
      <button
        type={type}
        onClick={onClick}
        className={className}
      >
        {text}
      </button>
    );
  };
  
  export default Button;
  