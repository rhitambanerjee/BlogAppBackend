import Post from '../model/post.js';
import { validationResult, check } from 'express-validator';

export const createPost = async (request, response) => {
    try {
        const errors = validationResult(request);
        if (!errors.isEmpty()) {
            return response.status(400).json({ errors: errors.array() });
        }

        const post = await new Post(request.body);
        post.save();

        response.status(200).json('Post saved successfully');
    } catch (error) {
        response.status(500).json(error);
    }
}

export const updatePost = async (request, response) => {
    try {
        const errors = validationResult(request);
        if (!errors.isEmpty()) {
            return response.status(400).json({ errors: errors.array() });
        }

        const post = await Post.findById(request.params.id);

        if (!post) {
            response.status(404).json({ msg: 'Post not found' });
        }

        await Post.findByIdAndUpdate(request.params.id, { $set: request.body });

        response.status(200).json('Post updated successfully');
    } catch (error) {
        response.status(500).json(error);
    }
}

export const deletePost = async (request, response) => {
    try {
        const post = await Post.findById(request.params.id);

        if (!post) {
            response.status(404).json({ msg: 'Post not found' });
        }

        await post.delete();

        response.status(200).json('Post deleted successfully');
    } catch (error) {
        response.status(500).json(error);
    }
}

export const getPost = async (request, response) => {
    try {
        const errors = validationResult(request);
        if (!errors.isEmpty()) {
            return response.status(400).json({ errors: errors.array() });
        }

        const post = await Post.findById(request.params.id);

        if (!post) {
            response.status(404).json({ msg: 'Post not found' });
        }

        response.status(200).json(post);
    } catch (error) {
        response.status(500).json(error);
    }
}

export const getAllPosts = async (request, response) => {
    let username = request.query.username;
    let category = request.query.category;

    try {
        // Sanitize user input
        if (username) {
            username = username.replace(/[$]/g, ''); // Remove any unwanted characters
        }

        if (category) {
            category = category.replace(/[$]/g, ''); // Remove any unwanted characters
        }

        const posts = await Post.find({ username, categories: category });

        response.status(200).json(posts);
    } catch (error) {
        response.status(500).json(error);
    }
}

// Validation and sanitation rules for createPost, updatePost, getPost, and getAllPosts
export const createUpdateValidationRules = () => [
    check('title').isString().trim().escape(),
    check('content').isString().trim().escape(),
];

export const getValidationRules = () => [
    check('id').isMongoId(),
];
