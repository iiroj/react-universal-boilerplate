import cache from "memory-cache";
import Hash from "node-object-hash";

import config from "../config";

const htmlCache = new cache.Cache();

const getCacheKey = ({ path, query, cookies }) =>
  Hash().hash({ path, query, cookies });

export default renderer => async (req, res, next) => {
  const key = getCacheKey(req);

  try {
    const cachedHtml = htmlCache.get(key);

    if (cachedHtml) {
      return cachedHtml;
    }

    const html = await renderer(req, res);

    if (html && res.statusCode === 200) {
      htmlCache.put(key, html, config.renderCacheTTL);
    }

    return html;
  } catch (error) {
    next(error);
  }
};
