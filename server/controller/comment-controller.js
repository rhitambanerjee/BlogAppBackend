import Comment from '../model/comment.js';
import { validationResult, check } from 'express-validator';

export const newComment = async (request, response) => {
    try {
        const errors = validationResult(request);
        if (!errors.isEmpty()) {
            return response.status(400).json({ errors: errors.array() });
        }

        const comment = await new Comment(request.body);
        comment.save();

        response.status(200).json('Comment saved successfully');
    } catch (error) {
        response.status(500).json(error);
    }
}

export const getComments = async (request, response) => {
    try {
        const comments = await Comment.find({ postId: request.params.id });

        response.status(200).json(comments);
    } catch (error) {
        response.status(500).json(error);
    }
}

export const deleteComment = async (request, response) => {
    try {
        const errors = validationResult(request);
        if (!errors.isEmpty()) {
            return response.status(400).json({ errors: errors.array() });
        }

        const comment = await Comment.findById(request.params.id);
        if (!comment) {
            return response.status(404).json({ msg: 'Comment not found' });
        }

        await comment.delete();

        response.status(200).json('Comment deleted successfully');
    } catch (error) {
        response.status(500).json(error);
    }
}

// Validation and sanitation rules for newComment and deleteComment
export const commentValidationRules = () => [
    check('text').isString().trim().escape(),
    // Add more validation and sanitation rules as needed
];

export const deleteCommentValidationRules = () => [
    check('id').isMongoId(),
];
