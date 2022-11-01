package com.ssafy.connection.service;

import com.ssafy.connection.entity.Problem;
import com.ssafy.connection.entity.Review;
import com.ssafy.connection.repository.ProblemRepository;
import com.ssafy.connection.repository.ReviewRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class ReviewServiceImpl implements ReviewService{
    private final ReviewRepository reviewRepository;
    private final ProblemRepository problemRepository;

    public ReviewServiceImpl(ReviewRepository reviewRepository, ProblemRepository problemRepository){
        this.reviewRepository = reviewRepository;
        this.problemRepository = problemRepository;
    }


    @Override
    public int saveReview(List<Map<String, Object>> map) {
        for(Map<String, Object> reviewInput : map){
            Review reviewEntity = new Review();
            long problemId = Long.parseLong((String) reviewInput.get("problemId"));
            int difficulty = Integer.parseInt((String) reviewInput.get("difficulty"));

            Optional<Problem> problemEntity = problemRepository.findById(problemId);
            if(problemEntity.isPresent()){
                reviewEntity.setDifficulty(difficulty);
                reviewEntity.setProblem(problemEntity.get());
                reviewRepository.save(reviewEntity);
            } else {
                return -1;
            }
        }
        return 1;
    }
}
