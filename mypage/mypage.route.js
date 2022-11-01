const express = require('express');
const router = express.Router();

const MypageController = require('./mypage.controller');
const mypageController = new MypageController();

// 내 판매기록 조회
router.get('/sale', mypageController.getSaleslist);
// 내 구매기록 조회
router.get('/buy', mypageController.getBuyslist);
// 내 찜 목록 조회
router.get('/wish', mypageController.getWishlist);
// 당근 가계부
router.get('/history', mypageController.getMyHistory);
// 프로필 이미지 변경
router.put('/img', mypageController.changeProfileImg);
// 닉네임 변경
router.put('/nickname', mypageController.changeNickname);
// 비밀번호 변경
router.put('/password', mypageController.changePassword);
// 유저 정보 조회
router.get('/:userId', mypageController.getDetailByUserId);
// 내 정보 조회
router.get('', mypageController.getMypage);

module.exports = router;
