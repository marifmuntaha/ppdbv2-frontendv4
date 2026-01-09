import {achievementChamp, achievementLevel, achievementType} from "@/helpers";
import ImageContainer from "@/components/images";
import {ButtonGroup} from "reactstrap";
import {Button, Icon} from "@/components";
import type {StudentAchievementType} from "@/types";

const AchievementTable = ({
                              achievements,
                              withImage,
                              withAction,
                              withAdd,
                              setAchievement,
                              setModal,
                              setLoadData,
                              destroyAchievement
                          }: {
    achievements: StudentAchievementType[] | undefined,
    withImage: boolean,
    withAction: boolean,
    withAdd: boolean,
    setAchievement?: any,
    setModal?: any,
    setLoadData?: any,
    destroyAchievement?: any
}) => {
    return (
        <div className="table-responsive">
            <table className="table table-bordered table-responsive">
                <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Tingkat</th>
                    <th scope="col">Juara</th>
                    <th scope="col">Jenis</th>
                    <th scope="col">Nama Event</th>
                    {withImage && <th scope="col">Berkas</th>}
                    {withAction && <th scope="col">Aksi</th>}
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
                        {withImage && (<td><ImageContainer isIcon img={item.file}/></td>)}
                        {withAction && (
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
                        )}
                    </tr>
                ))}
                </tbody>
                <tfoot>
                {withAdd && (
                    <tr>
                        <td colSpan={7}>
                            <center>
                                <Button
                                    className="btn btn-outline-primary btn-sm"
                                    onClick={() => setModal(true)}>
                                    Tambah
                                </Button>
                            </center>
                        </td>
                    </tr>
                )}
                </tfoot>
            </table>
        </div>
    )
}

export default AchievementTable;