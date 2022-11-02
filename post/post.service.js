const PostRepository = require('./post.repository'); //리포지토리의 내용을 가져와야한다.
const UserRepository = require('../user/user.repository');
class PostService {
  postRepository = new PostRepository();
  userRepository = new UserRepository();

  // 위치별 거래글 조회
  findPostByLoc = async (locationId) => {
    const locationPost = await this.postRepository.findPostByLoc(locationId);
    if (locationPost.length < 1)
      throw new Error('해당 지역에는 거래글이 없습니다.');

    let result = [];
    locationPost.forEach((post) => {
      if (post.status < 2) {
        result.push(post);
      }
    });

    return result;
  };

  // 카테고리별 거래글 조회
  findPostByCat = async (categoryId) => {
    const categoryPost = await this.postRepository.findPostByCat(categoryId);
    if (!categoryPost) throw new error('해당 카테고리에는 거래글이 없습니다.');

    let result = [];
    categoryPost.forEach((post) => {
      result.push(post);
    });

    return result;
  };

  // 거래글 제목 검색
  findPostByTitle = async (title) => {
    const titlePost = await this.postRepository.findPostByTitle(title);
    if (!titlePost) throw new error('해당하는 타이틀의 거래글이 없습니다.');

    let result = [];
    titlePost.forEach((post) => {
      result.push(post);
    });

    return result;
  };

  // 거래글 상세조회
  findOnePost = async (postId) => {
    const findOnePost = await this.postRepository.findOnePost(postId);
    if (!findOnePost) throw new error('존재하지 않는 거래글입니다. servDetail');
    console.log('serv findOnePost', findOnePost);
    // 찜 여부 확인
    let isWish = await this.postRepository.isWish(postId);
    isWish ? (isWish = true) : (isWish = false);

    let result = [];
    findOnePost.forEach((post) => {
      result.push(post);
    });

    return isWish, result;
  };

  // 유저의 다른 글 보기
  findPostByUser = async (userId) => {
    await this.postRepository.findPostByUser(userId);
  };

  // 거래글 생성
  createPost = async (req, res) => {
    const { categoryId, title, content, postImgUrl, price } = req.body;
    const { userId, locationId, nickname, profileImage } = res.locals.user;
    // const userId = 1; // 임시
    // const locationId = 1; // 임시
    // const nickname = 'test1'; // 임시
    // const profileImage = 'test.png'; // 임시

    const post = {
      userId,
      nickname,
      profileImage,
      categoryId,
      locationId,
      title,
      content,
      postImgUrl,
      price,
    };

    await this.postRepository.createPost(post);
  };

  //거래글 수정
  updatePost = async (req, res) => {
    const { userId, locationId } = res.locals.user;

    const { postId } = req.params;

    const { categoryId, title, content, postImgUrl, price } = req.body;

    const post = {
      userId,
      categoryId,
      locationId,
      title,
      content,
      postImgUrl,
      price,
    };

    // title 없을 때
    if (!title) res.status(400).send({ message: '제목을 입력해주세요.' });
    // title 공백으로 시작할 때
    if (/^[\s]+/.test(title))
      res.status(400).send({ message: '제목은 공백으로 시작할 수 없습니다.' });

    const findOnePost = await this.postRepository.findOnePost(postId);
    if (!findOnePost) throw new error('존재하지 않는 게시글입니다.');
    if (findOnePost.userId !== userId) throw new error('수정 권한이 없습니다.');

    await this.postRepository.updatePost(postId, post);
  };

  // 거래글 status 수정
  updateStatus = async (req, res) => {
    const { userId } = res.locals.user;

    const { postId } = req.params;

    const { status } = req.body;

    const post = {
      postId,
      userId,
      status,
    };

    const findOnePost = await this.postRepository.findOnePost(postId);
    if (!findOnePost) throw new error('존재하지 않는 게시글입니다.');
    if (findOnePost.userId !== userId) throw new error('수정 권한이 없습니다.');

    await this.postRepository.updateStatus(post);
  };

  // 거래글 삭제
  deletePost = async (req, res) => {
    const { userId } = res.locals.user;
    // const userId = 1; // 임시

    const { postId } = req.params;

    const post = { userId, postId };

    const existPost = await this.postRepository.findOnePost(postId);
    if (!existPost) throw new Error('거래글이 존재하지 않습니다. serv delete');
    if (existPost.userId !== userId)
      throw new Error('삭제 권한이 없습니다. serv delete');

    await this.postRepository.deletePost(post);
  };

  //찜 update(추가삭제 동시)
  updateWish = async (userId, postId) => {
    const findWish = await this.postRepository.findWish(userId, postId);

    if (!findWish) {
      await this.postRepository.createWish(userId, postId);
      await this.postRepository.increment(postId);
      return { message: '찜목록에 추가하였습니다.' };
    } else {
      await this.postRepository.deleteWish(userId, postId);
      await this.postRepository.decrement(postId);
      return { message: '찜목록에서 삭제하였습니다.' };
    }
  };
}

module.exports = PostService;
