import express from 'express';
import cors from 'cors';
import { join } from '@std/path';
import { closeConnection, testConnection } from './db/connect.ts';
import usersRouter from './routes/users.ts';

const app = express();
const apiPrefix = '/api/v1';
// global middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// healthy check route
app.get('/healthy', (req, res) => {
 const quries = req.query;
 console.log(quries);

 res.status(200).json({ message: 'Server is healthy' });
});
// static assets
const publicPath = join(Deno.cwd(), 'public');
app.use(express.static(publicPath));
// routes
app.use(`${apiPrefix}/users`, usersRouter);
//
const port = Deno.env.get('PORT') || 3000;
async function startServer() {
 try {
  const result = await testConnection();
  if (!result) {
   console.log('Failed to connect to database');
   Deno.exit(1);
  }
  app.listen(port, () => {
   console.log(`Server is running on port ${port}`);
  });
 } catch (error) {
  console.log(`failed to start server ${error}`);
  Deno.exit(1);
 }
}
startServer();

Deno.addSignalListener('SIGINT', async () => {
 console.log(`shutting down ...`);
 await closeConnection();
 Deno.exit(0);
});

//
