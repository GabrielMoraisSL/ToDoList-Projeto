function Button(props) {
  return (
    <button
      className="bg-blue-700 text-white p-2 rounded-md"
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
}

export default Button;
