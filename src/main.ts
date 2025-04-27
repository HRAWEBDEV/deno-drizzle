import express from 'express';
import cors from 'cors';
import { join } from '@std/path';
import { testConnection } from './db/connect.ts';

const app = express();
// global middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// healthy check route
app.get('/healthy', (_, res) => {
 res.status(200).json({ message: 'Server is healthy' });
});
// static assets
const publicPath = join(Deno.cwd(), 'public');
app.use(express.static(publicPath));
// routes
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
