const asyncHandler = require('express-async-handler');
const Post = require('../models/postModel');
const User = require('../models/userModel');

// GET all posts - public
const getPosts = asyncHandler(async (req, res) => {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.status(200).json(posts);
});

// GET single post - public
const getPost = asyncHandler(async (req, res) => {
    const post = await Post.findById(req.params.id);
    if (!post) {
        res.status(404);
        throw new Error('Postimi nuk u gjet');
    }
    res.status(200).json(post);
});

// GET my posts - protected
const getMyPosts = asyncHandler(async (req, res) => {
    const posts = await Post.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.status(200).json(posts);
});

// CREATE post - protected
const createPost = asyncHandler(async (req, res) => {
    const { title, content, category, image } = req.body;

    if (!title || !content) {
        res.status(400);
        throw new Error('Titulli dhe përmbajtja janë të detyrueshme');
    }

    const post = await Post.create({
        title,
        content,
        category: category || 'Të përgjithshme',
        image: image || '',
        user: req.user.id,
    });

    res.status(201).json(post);
});

// UPDATE post - protected
const updatePost = asyncHandler(async (req, res) => {
    const post = await Post.findById(req.params.id);
    if (!post) {
        res.status(404);
        throw new Error('Postimi nuk u gjet');
    }

    const user = await User.findById(req.user.id);
    if (!user) {
        res.status(401);
        throw new Error('Përdoruesi nuk u gjet');
    }

    if (post.user.toString() !== user.id) {
        res.status(401);
        throw new Error('Nuk jeni i autorizuar');
    }

    const updatedPost = await Post.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );

    res.status(200).json(updatedPost);
});

// DELETE post - protected
const deletePost = asyncHandler(async (req, res) => {
    const post = await Post.findById(req.params.id);
    if (!post) {
        res.status(404);
        throw new Error('Postimi nuk u gjet');
    }

    const user = await User.findById(req.user.id);
    if (!user) {
        res.status(401);
        throw new Error('Përdoruesi nuk u gjet');
    }

    if (post.user.toString() !== user.id) {
        res.status(401);
        throw new Error('Nuk jeni i autorizuar');
    }

    await Post.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: `Postimi ${req.params.id} u fshi.` });
});

module.exports = { getPosts, getPost, getMyPosts, createPost, updatePost, deletePost };
