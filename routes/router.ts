import {Router, Request, Response} from 'express';
import Server from "../classes/Server";

const router = Router();

router.get('/mensajes', (req: Request, res: Response) => {
  res.json({
    ok: true,
    msg: 'All its ok'
  });
});

router.post('/mensajes', (req: Request, res: Response) => {
  const cuerpo = req.body.cuerpo;
  const de = req.body.de;

  const server = Server.instance;
  const payload = {
    de,
    cuerpo
  };
  //in sirver para mandar mensaje a una persona que esta en una sala en particular
  server.io.emit('mensaje-nuevo', payload);

  res.json({
    ok: true,
    msg: cuerpo,
    de
  });
});

router.post('/mensajes/:id', (req: Request, res: Response) => {
  const cuerpo = req.body.cuerpo;
  const de = req.body.de;
  const id = req.params.id;

  const payload = {
    de,
    cuerpo
  };

  const server = Server.instance;
  //in sirver para mandar mensaje a una persona que esta en una sala en particular
  server.io.in(id).emit('mensaje-privado', payload);

  // si no usamos el in lo enviara a todos los usuarios o clientes conectados
  // server.io.emit('mensaje-privado', payload);

  res.json({
    ok: true,
    msg: cuerpo,
    de,
    id
  });
});

export default router;
