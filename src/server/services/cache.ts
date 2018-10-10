import { NextFunction, Request, Response } from 'express';
import Hash from 'node-object-hash';
import cache from 'memory-cache';

import config from '../config';

const htmlCache = new cache.Cache();

const getCacheKey = ({ path, query, cookies }: Request) => Hash().hash({ path, query, cookies });

type Renderer = (req: Request, res: Response) => Promise<string>;

export default (renderer: Renderer) => async (req: Request, res: Response, next: NextFunction) => {
  const key = getCacheKey(req);

  try {
    const cachedHtml = htmlCache.get(key);

    if (cachedHtml) {
      return cachedHtml;
    }

    const html = await renderer(req, res);
    htmlCache.put(key, html, config.renderCacheTTL);

    return html;
  } catch (error) {
    next(error);
  }
};
