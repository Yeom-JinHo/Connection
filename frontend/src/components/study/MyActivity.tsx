import React, { useState, useEffect } from "react";
import { Box, Button, Center, Text } from "@chakra-ui/react";
import { getMyActivity } from "../../api/study";
import { GaugeChart } from "@toast-ui/chart";

function MyActivity() {
  const [mySubject, setMySubject] = useState(0); // 과제
  const [myProblems, setmMyProblems] = useState(0); // 스터디 전체 문제

  const getMyActivityApi = async () => {
    const {
      data: {
        solvedStudyProblem,
        totalStudyProblem,
        solvedSubject,
        totalSubject
      }
    } = await getMyActivity();
    setMySubject((solvedSubject / totalSubject) * 100);
    setmMyProblems((solvedStudyProblem / totalStudyProblem) * 100);
  };

  useEffect(() => {
    getMyActivityApi();
  }, []);

  useEffect(() => {
    console.log(mySubject);
    console.log(myProblems);
  }, [mySubject, myProblems]);

  const data = {
    series: [
      {
        name: "Speed",
        data: [80]
      }
    ]
  };
  const options = {
    chart: { title: "Speedometer", width: 550, height: 500 },
    series: {
      solid: true,
      dataLabels: {
        visible: true,
        offsetY: -30,
        formatter: (value: number) => `${value}%`
      }
    },
    theme: {
      circularAxis: {
        lineWidth: 0,
        strokeStyle: "rgba(0, 0, 0, 0)",
        tick: {
          lineWidth: 0,
          strokeStyle: "rgba(0, 0, 0, 0)"
        },
        label: {
          color: "rgba(0, 0, 0, 0)"
        }
      },
      series: {
        dataLabels: {
          fontSize: 40,
          fontFamily: "Impact",
          fontWeight: 600,
          color: "#00a9ff",
          textBubble: {
            visible: false
          }
        }
      }
    }
  };

  return (
    <Box>
      <Center>
        과제
        {/* <GaugeChart data={data} options={options} /> */}
      </Center>
      <Center>문제</Center>
    </Box>
  );
}

export default MyActivity;
