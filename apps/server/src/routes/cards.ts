import express, { Request, Response, Router } from 'express';
import svg_generator from '../cards/svg_generator';

const router: Router = express.Router();

router.get('/', (req: Request, res: Response) => {
    return res.status(200).send(svg_generator({ data: 'sample' }));
});

export default router;