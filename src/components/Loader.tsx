const Loader = () => {
    return (
      <div style={styles.loaderContainer}>
        <div style={styles.loader}></div>
      </div>
    );
  };
  
  const styles = {
    loaderContainer: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    //   height: "100vh",
    },
    loader: {
      width: "25px",
      height: "25px",
      border: "3px solid #f3f3f3",
      borderTop: "3px solid #3498db",
      borderRadius: "50%",
      animation: "spin 1s linear infinite",
    },
  };
  
  export default Loader;
  