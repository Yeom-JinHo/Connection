package com.ssafy.connection.service;

import com.ssafy.connection.dto.ResponseDto;
import com.ssafy.connection.dto.SubjectDto;
import com.ssafy.connection.entity.ConnStudy;
import com.ssafy.connection.entity.Solve;
import com.ssafy.connection.entity.Study;
import com.ssafy.connection.entity.Subject;
import com.ssafy.connection.repository.*;
import com.ssafy.connection.securityOauth.domain.entity.user.User;
import com.ssafy.connection.securityOauth.repository.user.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.sql.SQLException;
import java.util.*;

@Service
public class SubjectServiceImpl implements SubjectService{

    private final SubjectRepository subjectRepository;
    private final StudyRepository studyRepository;
    private final ProblemRepository problemRepository;
    private final ConnStudyRepository  connStudyRepository;
    private final UserRepository userRepository;
    private final SolveRepository solveRepository;

    public SubjectServiceImpl(SubjectRepository subjectRepository, StudyRepository studyRepository, ProblemRepository problemRepository,
                              ConnStudyRepository connStudyRepository, UserRepository userRepository, SolveRepository solveRepository){
        this.subjectRepository = subjectRepository;
        this.studyRepository = studyRepository;
        this.problemRepository = problemRepository;
        this.connStudyRepository = connStudyRepository;
        this.userRepository = userRepository;
        this.solveRepository = solveRepository;
    }

//    @Override
//    public void save(Subject subject) {
//        subjectRepository.save(subject);
//    }
    @Override
    public ResponseEntity makeSubject(SubjectDto subjectDto, Long userId){
        Optional<ConnStudy> connStudy = connStudyRepository.findByUser_UserId(userId);
        if(!connStudy.isPresent()) return new ResponseEntity<>(new ResponseDto("empty"), HttpStatus.CONFLICT);
        Study study = studyRepository.findByConnStudy(connStudy.get());

        List<Subject> list = new ArrayList<>();
        List<Long> problemList = subjectDto.getProblemList();

        for(int i = 0; i<problemList.size(); i++){
            Subject subject = new Subject();
            subject.setDeadline(subjectDto.getDeadline());
            subject.setStudy(study);
            try {
                subject.setProblem(problemRepository.getById(problemList.get(i)));
            }
            catch (Exception e){
                return new ResponseEntity<>(new ResponseDto("wrong parameter value"), HttpStatus.CONFLICT);
            }
            list.add(subject);
        }
        try {
            subjectRepository.saveAll(list);
        }
        catch (Exception e){
            return new ResponseEntity<>(new ResponseDto("wrong parameter value"), HttpStatus.CONFLICT);
        }

        return new ResponseEntity<>(new ResponseDto("success"), HttpStatus.OK);
    }

    @Override
    public Map<String, Object> getMyStatus(Long userId, List<Subject> totalSubjectList){
        Map<String, Object> returnMap = new HashMap<>();

        Study studyEntity = studyRepository.findByConnStudy(connStudyRepository.findByUser_UserId(userId).get());

        // 전체 과제 개수
        int totalSubjectSize = totalSubjectList.size();
        // 지금까지 푼 과제 개수
        int solvedSubjectCount = solveRepository.countsolvedSubject(userId, studyEntity.getStudyId());
        returnMap.put("totalSubject", totalSubjectSize);
        returnMap.put("solvedSubject", solvedSubjectCount);

        // 지금까지 푼 스터디 문제 개수
        int solvedStudyProblemCount = 0;

        List<ConnStudy> connStudyList = connStudyRepository.findAllByStudy_StudyId(studyEntity.getStudyId());
        List<User> userList = new ArrayList<>();
        for(ConnStudy connStudy : connStudyList){
            userList.add(connStudy.getUser());
        }

        HashSet<Long> studyProblemIdSet = new HashSet<Long>();
        for(User user : userList){
            List<Solve> solveList = solveRepository.findStudyProblemByUserId(user.getUserId());
            for(Solve solve : solveList){
                studyProblemIdSet.add(solve.getProblem().getProblemId());
                if(user.getUserId() == userId){
                    solvedStudyProblemCount++;
                }
            }
        }

        returnMap.put("totalStudyProblem", studyProblemIdSet.size());
        returnMap.put("solvedStudyProblem", solvedStudyProblemCount);

        return returnMap;
    }

    @Override
    public List<Subject> getTotalSubjectList(Long userId) {
        return subjectRepository.findAllByStudy(
                studyRepository.findByConnStudy(
                    connStudyRepository.findByUser(
                        userRepository.findById(userId).get())));
    }
}
