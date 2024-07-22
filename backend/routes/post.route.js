import express from 'express'
import { protectRoute } from '../middleware/protectRoute.js'
import { createPost, deletePost, commentOnPost, likeUnlikePost, getAllPosts, getLikedPosts, getFollowingPosts, getUserPosts, getTotalPosts } from '../controllers/post.controller.js'

const router = express.Router()

router.get('/all', protectRoute, getAllPosts)
router.get('/likes/:id', protectRoute, getLikedPosts)
router.get('/following', protectRoute, getFollowingPosts)
router.get('/totalPosts/:userId', protectRoute, getTotalPosts)
router.get('/user/:username', protectRoute, getUserPosts)
router.post('/create', protectRoute, createPost)
router.delete('/:id', protectRoute, deletePost)
router.post('/comment/:id', protectRoute, commentOnPost)
router.post('/like/:id', protectRoute, likeUnlikePost)

export default router