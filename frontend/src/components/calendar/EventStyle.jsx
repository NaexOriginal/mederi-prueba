
export const eventStyle = (event) => {
  const style = {
    backgroundColor: event.status === "activo" ? "#EE3F00" : "#999",
    borderRadius: "5px",
    opacity: 0.8,
    color: "white",
    border: "none",
    display: "block",
  };
  return { style };
};
