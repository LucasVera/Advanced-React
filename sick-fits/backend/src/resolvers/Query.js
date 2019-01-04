const { forwardTo } = require('prisma-binding');

// forwardTo connects the prisma generated stuff to the resolver, so everytime
// the frontend calls an "items" query, it gets mapped to the exact same resolver
// that was generated for "items" by prisma. note that this will not handle
// auth, cookies, etc because it's accessing the prisma api directly (db)

const Query = {
  items: forwardTo('db')
  /*
  async items(parent, args, context, info) {
    const items = await context.db.query.items();
    return items;
  }
  */
};

module.exports = Query;
