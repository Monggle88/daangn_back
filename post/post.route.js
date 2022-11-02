const express = require('express');
const router = express.Router();

const Auth = require('../middlewares/authMiddleware');
const PostController = require('./post.controller');
const postController = new PostController();

// 불필요한 trycatch, console.log 삭제
// 위치별, 카테고리별 stauts가 2인 게시글 버리기
// 코드 정리

// 위치별 조회 ㅇ
router.get('/loc', Auth, postController.findPostByLoc);
// 카테고리별 조회 ㅇ
router.get('/cat/:categoryId', Auth, postController.findPostByCat);
// 타이틀 검색 (에러안뜸)
router.get('/search', Auth, postController.findPostByTitle);
// 상세 조회 (걍안댐)
router.get('/:postId', Auth, postController.findOnePost);
// 거래글 생성 (닉네임이 0)
router.post('/', Auth, postController.createPost);
// 거래글 수정 ㅇ
router.put('/:postId', Auth, postController.updatePost);
// 거래글 상태 수정 ㅇ
router.put('/status/:postId', Auth, postController.updateStatus);
// 거래글 삭제 ㅇ
router.delete('/:postId', Auth, postController.deletePost);
// 찜 추가, 삭제 ㅇ
router.put('/wish/:postId', Auth, postController.updateWish);

module.exports = router;
