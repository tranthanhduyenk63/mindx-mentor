import PostModel from "./post.model";

export const PostController = {
  getPosts: async (req, res) => {
    const {
      search,
      author,
      from,
      to,
      page = 1,
      pageSize = 10,
      sortBy,
      sortOrder, // desc -- asc
    } = req.query;

    const filter = {
      content: new RegExp(search),
      author: author,
      createdAt: {
        $gte: new Date(from), // $gte == greater than or equal + $gt == greater than
        $lte: new Date(to), // $lte == lesser than or equal + $lt == lesser than
      },
    };

    const totalItems = await PostModel.countDocuments(filter);
    const totalPages = Math.ceil(totalItems / pageSize);
    const skip = (page - 1) * pageSize;

    const sort = sortOrder === "asc" ? 1 : -1;

    const items = await PostModel.find(filter)
      .sort({ [sortBy]: sort })
      .skip(skip)
      .limit(pageSize);

    return res.send({
      items,
      totalItems,
      totalPages,
      page,
      pageSize,
    });
  },
};
