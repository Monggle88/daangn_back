const PostService = require('./post.service');

class PostController {
  postService = new PostService();

  // 위치별 거래글 조회
  findPostByLoc = async (req, res, next) => {
    try {
      const { locationId } = res.locals.user; // user랑 합치면 이걸로 돌려놔야함
      // const { locationId } = req.params; // 임시
      const locationPost = await this.postService.findPostByLoc(locationId);

      res.status(200).send({ data: locationPost });
    } catch (err) {
      next(err);
    }
  };

  // 카테고리별 거래글 조회
  findPostByCat = async (req, res, next) => {
    try {
      const { categoryId } = req.params;

      const categoryPost = await this.postService.findPostByCat(categoryId);

      res.status(200).send({ data: categoryPost });
    } catch (err) {
      next(err);
    }
  };

  // 제목검색 거래글 조회 검색기능 왜 잘될까?
  findPostByTitle = async (req, res, next) => {
    try {
      let { keyword } = req.query;

      keyword = keyword.trim();

      if (keyword < 1) throw new Error('키워드를 두 글자 이상 입력해주세요');

      const titlePost = await this.postService.findPostByTitle(keyword);

      res.status(200).send({ data: titlePost });
    } catch (err) {
      next(err);
    }
  };

  // 거래글 상세 조회
  findOnePost = async (req, res, next) => {
    try {
      const { postId } = req.params;
      if (typeof (postId / 1) === NaN || postId.search(/\s/) != -1)
        throw new error('postId가 잘못됐습니다.');

      const findOnePost = await this.postService.findOnePost(postId);

      const findPostByUser = await this.postService.findPostByUser(
        userId
      );

      res
        .status(200)
        .send({ data: findOnePost }, { otherPosts: findPostByUser });
    } catch (err) {
      next(err);
    }
  };

  // 거래글 생성
  createPost = async (req, res, next) => {
    try {
      await this.postService.createPost(req, res);

      res.status(200).send({ ok: 'true', message: '거래글이 생성되었습니다.' });
    } catch (err) {
      next(err);
    }
  };

  // 거래글 수정
  updatePost = async (req, res, next) => {
    try {
      await this.postService.updatePost(req, res);

      res.status(200).send({ ok: 'true', message: '거래글이 수정되었습니다.' });
    } catch (err) {
      next(err);
    }
  };

  // 거래글 status 수정
  updateStatus = async (req, res, next) => {
    try {
      await this.postService.udpateStatus(req, res);

      res.status(200).send({ ok: 'true', message: '상태가 변경되었습니다.' });
    } catch (err) {
      next(err);
    }
  };

  // 거래글 삭제
  deletePost = async (req, res, next) => {
    try {
      await this.postService.deletePost(req, res);

      res.status(200).send({ ok: 'true', message: '거래글이 삭제되었습니다.' });
    } catch (err) {
      next(err);
    }
  };

  // 찜 update
  updateWish = async (req, res, next) => {
    try {
      const { userId } = res.locals.user;
      const { postId } = req.params;

      const updateWish = await this.postService.updateWish(userId, postId);

      return res.status(200).json({ data: updateWish });
    } catch (err) {
      next(err);
    }
  };
}

module.exports = PostController;
