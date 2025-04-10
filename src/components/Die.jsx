export default function Die(props) {
  const styles = {
    backgroundColor: props.obj.isHeld ? "#59E391" : "#FFFFFF",
  };

  return (
    <button className="die" style={styles} onClick={props.handleClick}>
      {props.obj.value}
    </button>
  );
}
