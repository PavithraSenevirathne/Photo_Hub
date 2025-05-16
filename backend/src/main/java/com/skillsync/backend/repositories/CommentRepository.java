package com.skillsync.backend.repositories;

import com.skillsync.backend.models.Comment;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
//comment repository
@Repository
public interface CommentRepository extends MongoRepository<Comment, String> {
    List<Comment> findByPostId(String postId);
    List<Comment> findByPostIdAndParentCommentId(String postId, String parentCommentId);
    List<Comment> findByUserId(String userId);
    List<Comment> findByParentCommentId(String parentCommentId);
}