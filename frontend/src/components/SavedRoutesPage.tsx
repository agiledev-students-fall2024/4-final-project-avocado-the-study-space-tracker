import React from "react";

// Mock data for testing
const mockRouteData = {
  stores: ["Store Name 1", "Store Name 2", "Store Name 3", "Store Name 4", "Store Name 5"],
};

const SavedRoutesPage = () => {
  const { stores } = mockRouteData;

  return (
    <div className="saved-routes-page" style={styles.container}>
      <header style={styles.header}>
        <h2>Your Shopping Route</h2>
      </header>

      <div style={styles.mapContainer}>
        <img src="/map-placeholder.png" alt="Map Placeholder" style={styles.mapImage} /> {/* use map-placeholder image to replace the interactive map for now */}
      </div>

      <ul style={styles.storeList}>
        {stores.map((store, index) => (
          <li key={index} style={styles.storeItem}>{index + 1}. {store}</li>
        ))}
      </ul>

      <div style={styles.buttonContainer}>
        <button style={styles.saveButton}>Save This Route</button>
        <button style={styles.backButton}>Back to Start</button>
      </div>
    </div>
  );
};

// Inline styles for simplicity; move to a CSS/SCSS file if preferred
const styles = {
  container: {
    textAlign: "center",
    padding: "20px",
    maxWidth: "500px",
    margin: "0 auto",
    backgroundColor: "#f0f0f0",
  },
  header: {
    marginBottom: "20px",
  },
  mapContainer: {
    border: "1px solid #ccc",
    padding: "20px",
    marginBottom: "20px",
  },
  mapImage: {
    width: "100%",
    height: "auto",
  },
  storeList: {
    listStyle: "none",
    padding: "0",
  },
  storeItem: {
    padding: "10px",
    borderBottom: "1px solid #ccc",
  },
  buttonContainer: {
    marginTop: "20px",
  },
  saveButton: {
    padding: "10px 20px",
    marginRight: "10px",
    backgroundColor: "#333",
    color: "#fff",
    border: "none",
    cursor: "pointer",
  },
  backButton: {
    padding: "10px 20px",
    backgroundColor: "#ccc",
    border: "none",
    cursor: "pointer",
  },
};

export default SavedRoutesPage;
