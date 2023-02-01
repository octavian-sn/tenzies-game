function Die(props) {
  const styles = {
    backgroundColor: props.isHeld ? '#59E391' : 'white',
  };
  const dots = [];
  for (let i = 0; i < props.value; i++) {
    dots.push(<div className="dot"></div>);
  }

  return (
    <div
      className={`die with${props.value}`}
      style={styles}
      onClick={() => props.holdDie(props.id)}
    >
      {dots}
    </div>
  );
}

export default Die;
