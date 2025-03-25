function Title(props) {
  return (
    <h1 className="text-3xl text-slate-100 font-bold text-center pt-5">
      {props.children}
    </h1>
  );
}

export default Title;
