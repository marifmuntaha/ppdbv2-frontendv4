import React, {useEffect, useState} from "react";
import {Button, Icon} from "@/components";
import {ButtonGroup} from "reactstrap";
import Partial from "./partial";
import type {StudentAchievementType} from "@/types";
import {get as getAchievement, destroy as destroyAchievement} from "@/common/api/student/achievement"
import {useAuthContext} from "@/common/hooks/useAuthContext";
import {achievementChamp, achievementLevel, achievementType} from "@/helpers";
import ImageContainer from "@/components/images";

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
            <table className="table table-bordered">
                <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Tingkat</th>
                    <th scope="col">Juara</th>
                    <th scope="col">Jenis</th>
                    <th scope="col">Nama Event</th>
                    <th scope="col">Berkas</th>
                    <th scope="col">Aksi</th>
                </tr>
                </thead>
                <tbody>
                {achievements?.map((item, idx) => (
                    <tr key={idx}>
                        <th scope="row">{idx + 1}</th>
                        <td>{achievementLevel(item.level)}</td>
                        <td>{achievementChamp(item.champ)}</td>
                        <td>{achievementType(item.type)}</td>
                        <td>{item.name}</td>
                        <td><ImageContainer isIcon img={item.file}/> </td>
                        <td>
                            <ButtonGroup size="sm">
                                <Button color="warning" outline><Icon name="edit" onClick={() => {
                                    setAchievement(item)
                                    setModal(true)
                                }}/></Button>
                                <Button color="danger" outline><Icon name="trash" onClick={() => {
                                    destroyAchievement(item.id).finally(() => setLoadData(true))
                                }}/></Button>
                            </ButtonGroup>
                        </td>
                    </tr>
                ))}
                </tbody>
                <tfoot>
                <tr>
                    <td colSpan={7}>
                        <center><Button className="btn btn-outline-primary btn-sm" onClick={() => setModal(true)}>Tambah</Button></center>
                    </td>
                </tr>
                </tfoot>
            </table>
            <Partial modal={modal} setModal={setModal} achievement={achievement} setAchievement={setAchievement}
                     setLoadData={setLoadData}/>
        </React.Fragment>
    )
}

export default Achievement