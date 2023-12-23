import express from 'express';

import { createPost, updatePost, deletePost, getPost, getAllPosts,createUpdateValidationRules,getValidationRules, } from '../controller/post-controller.js';
import { uploadImage, getImage } from '../controller/image-controller.js';
import { newComment, getComments, deleteComment,commentValidationRules,deleteCommentValidationRules, } from '../controller/comment-controller.js';
import { loginUser, singupUser, logoutUser,validationRules } from '../controller/user-controller.js';
import { authenticateToken, createNewToken } from '../controller/jwt-controller.js';

import upload from '../utils/upload.js';

const router = express.Router();

router.post('/login', validationRules(),loginUser);
router.post('/signup', validationRules(),singupUser);
router.post('/logout', logoutUser);

router.post('/token', createNewToken);

router.post('/create', createUpdateValidationRules(),authenticateToken, createPost);
router.put('/update/:id', createUpdateValidationRules(),authenticateToken, updatePost);
router.delete('/delete/:id', authenticateToken, deletePost);

router.get('/post/:id',  getValidationRules(),authenticateToken, getPost);
router.get('/posts', authenticateToken, getAllPosts);

router.post('/file/upload', upload.single('file'), uploadImage);
router.get('/file/:filename', getImage);

router.post('/comment/new',commentValidationRules(), authenticateToken, newComment);
router.get('/comments/:id', authenticateToken, getComments);
router.delete('/comment/delete/:id',deleteCommentValidationRules(), authenticateToken, deleteComment);

export default router;