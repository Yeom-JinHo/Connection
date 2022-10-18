package com.ssafy.connection.service;

import com.ssafy.connection.dto.ProblemDto;
import com.ssafy.connection.entity.Problem;
import com.ssafy.connection.repository.ProblemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProblemServiceImpl implements ProblemService{

    private final ProblemRepository problemRepository;

    public ProblemServiceImpl(ProblemRepository problemRepository){
        this.problemRepository = problemRepository;
    }

    @Override
    public void save(ProblemDto problemDto) {
        problemRepository.save(Problem.of(problemDto));
    }
}
