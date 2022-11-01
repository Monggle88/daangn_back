const PostService = require('./post.service');

class PostController {
  postService = new PostService();

  getPost = async (req, res, next) => {};

  test = async (req, res, next) => {
    try {
      const result = 'ok';
      res.send({ msg: result });
    } catch (error) {
      next(error);
    }
  };
}

module.exports = PostController;
