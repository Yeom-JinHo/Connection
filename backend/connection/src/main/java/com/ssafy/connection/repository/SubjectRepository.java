package com.ssafy.connection.repository;

import com.ssafy.connection.entity.Study;
import com.ssafy.connection.entity.Subject;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface SubjectRepository extends JpaRepository<Subject, Long> {
    List<Subject> findAllByStudy(Study studyEntity);
    List<Subject> findAllByStudyAndDeadlineAfter(Study studyEntity, LocalDateTime localDateTime);

    @Query(value = "select a.user_id, a.name, a.problem_id, a.title, COUNT(solve_id) as solve\n" +
            "from (select u.user_id, u.name, s.problem_id, p.title \n" +
            "\tfrom user u, conn_study cs, subject s, problem p\n" +
            "\twhere u.user_id = cs.user_id\n" +
            "\t\t\tand cs.study_id = s.study_id\n" +
            "\t\t\tand cs.study_id = ?1\n" +
            "\t\t\tand s.problem_id = p.problem_id\n" +
            "\t\t\tand s.deadline > now()) a \n" +
            "\tleft join solve sv \n" +
            "\ton a.user_id = sv.user_id \n" +
            "\t\tand a.problem_id = sv.problem_id\n" +
            "where sv.status = 0 or isnull(sv.status) \n" +
            "group by a.user_id, a.problem_id\n" +
            "order by a.problem_id, a.user_id;", nativeQuery = true)
    List<Object[]> getTeamStatus(long studyId);

}
