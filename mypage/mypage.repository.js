const { Users, TransactionList, Wishes, SalePosts } = require('../models');
const Sq = require('sequelize');
const Sequelize = Sq.Sequelize;

class MypageRepository {
  constructor() {}

  // getSaleslist 판매기록 조회
  getSaleslist = async (userId) => {
    return await SalePosts.findAll({
      where: { userId },
    });
  };

  // getBuyslist 구매기록 조회
  getBuyslist = async (userId) => {
    const transactionList = await TransactionList.findAll({
      where: { userId },
    });

    let buyList = [];

    for (let i = 0; i < transactionList.length; i++) {
      let tempPost = await SalePosts.findOne({
        where: { postId: transactionList[i].postId },
      });
      buyList.push(tempPost);
    }

    return buyList;
  };

  // getWishlist 찜 목록 조회
  getWishlist = async (userId) => {
    const wishes = await Wishes.findAll({
      attributes: ['postId'],
      where: { userId },
    });

    //createdBy정현
    const realWish = await Wishes.findAll({
      where: { userId },
      attributes: [
        [Sequelize.col('SalePost.postId'), 'postId'], //postId
        [Sequelize.col('SalePost.userId'), 'userId'], //userId
        [Sequelize.col('SalePost.nickname'), 'nickname'], //nickname
        [Sequelize.col('SalePost.profileImage'), 'profileImage'], //profileImage
        [Sequelize.col('SalePost.categoryId'), 'categoryId'], //cateroryId
        [Sequelize.col('SalePost.locationId'), 'locationId'], //locationId
        [Sequelize.col('SalePost.title'), 'title'], //title
        [Sequelize.col('SalePost.content'), 'content'], //content
        [Sequelize.col('SalePost.postImgUrl'), 'postImgUrl'], //postImgUrl
        [Sequelize.col('SalePost.price'), 'price'], //price
        [Sequelize.col('SalePost.status'), 'status'], //status
        [Sequelize.col('SalePost.wishCount'), 'wishCount'], //wishCount
        [Sequelize.col('SalePost.chatCount'), 'chatCount'], //chatCount
        [Sequelize.col('SalePost.createdAt'), 'createdAt'], //createdAt
        [Sequelize.col('SalePost.updatedAt'), 'updatedAt'],
      ],
      include: [
        {
          model: SalePosts,
          attributes: [],
        },
      ],
      order: [[{ model: SalePosts }, 'updatedAt', 'DESC']],
    });

    return realWish;
  };

  // changeProfileImg 프로필 이미지 변경
  async changeProfileImg(userId, profileImage) {
    await Users.update(
      { profileImage, updatedAt: Date.now() },
      { where: { userId } }
    );
  }

  // changeNickname 닉네임 변경
  changeNickname = async (userId, nickname) => {
    await Users.update(
      { nickname, updatedAt: Date.now() },
      { where: { userId } }
    );
  };

  // changePassword 비밀번호 변경
  changePassword = async (userId, password) => {
    await Users.update(
      { password, updatedAt: Date.now() },
      { where: { userId } }
    );
  };

  // locationId 변경
  changeLocationId = async (userId, locationId) => {
    await Users.update(
      { locationId, updatedAt: Date.now() },
      { where: { userId } }
    );
  };

  // getUserDetail 내 정보 조회
  getUserDetail = async (userId) => {
    return await Users.findOne({
      attributes: { exclude: ['email', 'password'] },
      where: { userId },
    });
  };

  // getMyHistory userId로 거래내역 조회
  getMyHistory = async (userId) => {
    return await TransactionList.findAll({
      where: { userId },
    });
  };

  // postId로 판매글 조회
  getSaleslistByPostId = async (postId) => {
    return await SalePosts.findOne({ where: { postId } });
  };

  // 아이디 비밀번호로 유저 정보 조회
  isUser = async (userId) => {
    return await Users.findOne({ where: { userId } });
  };
}

module.exports = MypageRepository;
