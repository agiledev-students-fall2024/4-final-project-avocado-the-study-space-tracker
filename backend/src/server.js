import app from "./app.js";

// eslint-disable-next-line no-undef
const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
