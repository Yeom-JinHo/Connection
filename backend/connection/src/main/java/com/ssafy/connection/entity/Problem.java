package com.ssafy.connection.entity;

import com.ssafy.connection.dto.ProblemDto;
import com.ssafy.connection.util.ModelMapperUtils;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "Problem")
public class Problem {
    @Id
    @Column(name = "problem_id")
    private long problemId;

    private String title;

    private boolean solvable; // 채점 가능 여부

    private long accepted; // 맞은 사람 수

    private long level; // 난이도

    private String tries; // 평균 시도 횟수



    /* 연관관계 매핑 */
    @OneToMany(mappedBy = "problem")
    List<Tag> tag = new ArrayList<>();

    @OneToMany(mappedBy = "problem")
    List<Review> review = new ArrayList<>();

    @OneToMany(mappedBy = "problem")
    List<Solve> solve = new ArrayList<>();

    @OneToMany(mappedBy = "problem")
    List<ConnWorkbook> connWorkbooks = new ArrayList<>();

    @OneToMany(mappedBy = "problem")
    List<Subject> subject = new ArrayList<>();

    public Problem(long problemId, String title, boolean solvable, long accepted, long level, String tries) {
    }

    public static Problem of(ProblemDto problemDto) {
        Problem problemEntity = ModelMapperUtils.getModelMapper().map(problemDto, Problem.class);

        return problemEntity;
    }
}
