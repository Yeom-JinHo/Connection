package com.ssafy.connection.dto;

import com.ssafy.connection.entity.Problem;
import com.ssafy.connection.util.ModelMapperUtils;

public class ProblemDto {

    private long problemId;

    private String title;

    private boolean solvable; // 채점 가능 여부

    private int accepted; // 맞은 사람 수

    private int level; // 난이도

    private int tries; // 평균 시도 횟수

    public static ProblemDto of(Problem problemEntity) {
        ProblemDto problemDto = ModelMapperUtils.getModelMapper().map(problemEntity, ProblemDto.class);

        return problemDto;
    }
}