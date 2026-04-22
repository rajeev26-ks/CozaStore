export default function Navbar() {
  return (
    <div style={styles.nav}>
      <h3>Admin Dashboard</h3>
    </div>
  );
}

const styles = {
  nav: {
    width: "100%",
    padding: "15px",
    background: "#f5f5f5",
    borderBottom: "1px solid #ddd",
  },
};