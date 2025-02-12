import React, { useEffect, useState } from 'react';
import GrassTitle from './GrassTitle';
import GrassInfoCard from './GrassInfoCard';
import { HStack, VStack } from '@/components/ui/index.ts';
import { GrassCardProps } from "@/src/components/types/ProfileType/ProfileType.ts";
import { GrassCardStyles } from "@/src/components/GrassCard/GrassCardStyle.ts";
import { useRecoilValue } from "recoil";
import authState from "@/src/recoil/authAtom.ts";
import { useQuery } from "@tanstack/react-query";
import { getMyPageRecord } from "@/src/api/myPageRecord.ts";

function calculateDaysPassed(createdDate: string): number {
    const formattedDate = createdDate
        .replace(/(\d+)년 /, '$1-')
        .replace(/(\d+)월 /, '$1-')
        .replace(/(\d+)일/, '$1')
        .trim();
    const createDate = new Date(formattedDate);

    if (isNaN(createDate.getTime())) { //날짜 안뜨면 111111 뜸
        return 111111;
    }
    const today = new Date();
    const timeDifference = today.getTime() - createDate.getTime();
    return Math.floor(timeDifference / (1000 * 60 * 60 * 24));
}

const GrassCard: React.FC<GrassCardProps> = ({ name }) => {
    const authInfo = useRecoilValue(authState);
    const [totalDays, setTotalDays] = useState<number>(0);
    const [totalTime, setTotalTime] = useState<number>(0);
    const [createDate, setCreateDate] = useState<string>('');
    const { data: recordData, error: recordDataError } = useQuery({
        queryKey: ['record'],
        queryFn: () => getMyPageRecord(authInfo.authToken),
    });

    useEffect(() => {
        if (recordData && recordData.success) {
            setTotalDays(recordData.response.totalStreak);
            setTotalTime(recordData.response.totalStudyTime);
            setCreateDate(recordData.response.createdDate);
        } else {
            console.log("error: 사용자 정보 없음");
        }
    }, [recordData, recordDataError]);

    return (
        <VStack style={GrassCardStyles.grassCardContainer}>
            <GrassTitle name={name} totalDays={totalDays} />
            <HStack style={GrassCardStyles.cardSet}>
                <GrassInfoCard type={1} highlightNumber={calculateDaysPassed(createDate)} createDate={createDate} />
                <GrassInfoCard type={2} highlightNumber={totalTime} />
            </HStack>
        </VStack>
    );
};

export default GrassCard;
