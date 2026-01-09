import React, {useEffect, useState} from "react";
import Partial from "./partial";
import type {StudentAchievementType} from "@/types";
import {get as getAchievement, destroy as destroyAchievement} from "@/common/api/student/achievement"
import {useAuthContext} from "@/common/hooks/useAuthContext";
import AchievementTable from "@/components/partials/achievement/table";

const Achievement = () => {
    const {user} = useAuthContext()
    const [modal, setModal] = useState(false)
    const [loadData, setLoadData] = useState(true)
    const [achievements, setAchievements] = useState<StudentAchievementType[]>()
    const [achievement, setAchievement] = useState<StudentAchievementType>({
        id: undefined,
        level: '',
        champ: '',
        type: '',
        name: '',
        file: ''
    })

    useEffect(() => {
        if (loadData) getAchievement({userId: user?.id})
            .then((resp) => setAchievements(resp))
            .finally(() => setLoadData(false))

    }, [loadData]);

    return (
        <React.Fragment>
            <AchievementTable
                achievements={achievements}
                withImage={true}
                withAction={true}
                withAdd={true}
                setAchievement={setAchievement}
                setModal={setModal}
                setLoadData={setLoadData}
                destroyAchievement={destroyAchievement}
            />
            <Partial modal={modal} setModal={setModal} achievement={achievement} setAchievement={setAchievement}
                     setLoadData={setLoadData}/>
        </React.Fragment>
    )
}

export default Achievement