import { NextFunction, Request, Response } from 'express';

export default (req: Request, res: Response, next: NextFunction) => {
  if (!req.secure) {
    return res.redirect(301, 'https://' + req.hostname + req.url);
  }

  next();
};
