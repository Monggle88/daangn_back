const { SalePosts, Wishes, TransactionList } = require('../models');
const { Op } = require('sequelize');


class PostRepository {
  // 위치별 거래글 조회
  findPostByLoc = async (locationId) => {
    const locationPost = await SalePosts.findAll({
      where: { locationId },
      order: [['updatedAt', 'DESC']],
    });

    return locationPost;
  };

  // 카테고리별 거래글 조회
  findPostByCat = async (categoryId) => {
    const categoryPost = await SalePosts.findAll({
      where: { categoryId },
      order: [['createdAt', 'DESC']],
    });

    return categoryPost;
  };

  // 제목검색 거래글 조회
  findPostByTitle = async (title) => {
    const titlePost = await SalePosts.findAll({
      where: { title: { [Op.like]: `%${title}%` } },
      order: [['updatedAt', 'DESC']],
    });

    return titlePost;
  };

  // 사용자별 거래글 조회
  findPostByUser = async (userId, postId) => {
    const otherPosts = await SalePosts.findAll({
      attributes: [postId, title, price, postImgUrl],
      where: { userId },
      order: [['updatedAt', 'DESC']],
      limit: 4,
    });

    return otherPosts;
  };

  // 거래글 상세 조회
  findOnePost = async (postId) => {
    const findOnePost = await SalePosts.findOne({
      where: { postId: postId },
    });

    return findOnePost;
  };

  // 찜 여부 확인
  isWish = async (postId) => {
    const isWish = await Wishes.findOne({ where: { postId } });

    return isWish;
  };

  // 거래글 생성
  createPost = async (post) => {
    const createPost = await SalePosts.create({
      ...post,
      createdAt: String(Date.now()),
      updatedAt: String(Date.now()),
    });

    return createPost;
  };

  // 거래글 수정
  updatePost = async (post) => {
    const updatePost = await SalePosts.update(
      {
        ...post,
        updatedAt: String(Date.now()),
      },
      { where: { postId: post.postId } }
    );

    if (updatePost) {
      return { message: '거래글이 수정되었습니다.' };
    } else {
      return { message: '수정 실패' };
    }
  };

  // 거래글 status 수정
  updateStatus = async (post) => {
    const updateStatus = await SalePosts.update(
      {
        ...post,
        updatedAt: String(Date.now()),
      },
      { where: { postId: post.postId } }
    );

    if (updateStatus) {
      return { message: '상태가 수정되었습니다.' };
    } else {
      return { message: '수정 실패' };
    }
  };

  // 판매글 삭제
  deletePost = async (post) => {
    const deletePost = await SalePosts.destroy({
      where: { userId: post.userId, postId: post.postId },
    });

    if (deletePost) {
      return { message: '거래글이 삭제되었습니다.' };
    } else {
      return { message: '삭제 실패' };
    }
  };
}

// 찜목록
wishList = async (userId) => {
  const wishList = await Wishes.findAll({
    where: { userId: userId },
  });

  console.log('repo wishList');

  return wishList;
};

// findWish
findWish = async (userId, postId) => {
  const updateWish = await Wishes.findOne({
    where: { userId: userId, postId: postId },
  });

  console.log('repo findWish');

  return updateWish;
};

// 찜하기
createWish = async (postId, userId) => {
  const createWish = await Wishes.create(postId, userId);

  console.log('repo createWish');

  return createWish;
};

// 찜하기 취소
deleteWish = async (postId, userId) => {
  const deleteWish = await Wishes.destroy({
    where: postId,
    userId,
  });

  console.log('repo deleteWish');

  return deleteWish;
};

// wishCount 증가
increment = async (postId) => {
  const increment = await SalePosts.increment(
    { wishCount: 1 },
    { where: postId }
  );

  console.log('repo increment');

  return increment;
};

// wishCount 감소
decrement = async (postId) => {
  const decrement = await SalePosts.decrement(
    { wishCount: 1 },
    { where: postId }
  );

  return decrement;
};

// 거래내역 추가
createTransaction = async (postId, userId) => {
  const createTransaction = await TransactionList.create(postId, userId);

  return createTransaction;
};
module.exports = PostRepository;
