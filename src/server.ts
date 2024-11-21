import app from './app';
import { dbConn } from './config/dbConn';
const PORT = process.env.PORT || 3000;

dbConn()
  .then(() => {
    console.log('DB is connected');
    app.listen(PORT, () => {
      console.log(`Server is listening on http://localhost:${PORT}`);
    });
  })
  .catch(error => {
    console.log('Error during DB connection', error);
  });
