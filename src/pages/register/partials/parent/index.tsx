import {useForm} from "react-hook-form";
import {Button, Row, Spinner} from "reactstrap";
import type {StudentParentFormType, StudentParentType} from "@/types";
import {Col, Icon} from "@/components";
import React, {useEffect, useState} from "react";
import {useAuthContext} from "@/common/hooks/useAuthContext";
import {get as getParent, store as storeParent, update as updateParent} from "@/common/api/student/parent";
import moment from "moment/moment";
import {GUARD_STATUS, PARENT_JOB_OPTIONS, PARENT_STATUS, PARENT_STUDY_OPTIONS} from "@/common/constants";
import ParentFather from "@/pages/register/partials/parent/father";
import ParentMother from "@/pages/register/partials/parent/mother";
import ParentGuard from "@/pages/register/partials/parent/guard";

const Parent = () => {
    const {user} = useAuthContext()
    const [loading, setLoading] = useState(false);
    const methods = useForm<StudentParentFormType>();
    const {handleSubmit, setValue, register, formState: {errors}} = methods;
    const onSubmit = (values: StudentParentFormType) => {
        setLoading(true)
        const formData: StudentParentType = {
            ...values,
            userId: user?.id,
            fatherStatus: values.fatherStatus ? values.fatherStatus.value : 0,
            fatherBirthDate: moment(values.fatherBirthDate).format("YYYY-MM-DD"),
            fatherStudy: values.fatherStudy ? values.fatherStudy.value : 0,
            fatherJob: values.fatherJob ? values.fatherJob.value : 0,
            motherStatus: values.motherStatus ? values.motherStatus.value : 0,
            motherBirthDate: moment(values.motherBirthDate).format("YYYY-MM-DD"),
            motherStudy: values.motherStudy ? values.motherStudy.value : 0,
            motherJob: values.motherJob ? values.motherJob.value : 0,
            motherPhone: values.motherPhone,
            guardStatus: values.guardStatus ? values.guardStatus.value : 0,
            guardBirthDate: moment(values.guardBirthDate).format("YYYY-MM-DD"),
            guardStudy: values.guardStudy ? values.guardStudy.value : 0,
            guardJob: values.guardJob ? values.guardJob.value : 0,
        }
        if (formData.id === undefined) {
            storeParent(formData).finally(() => setLoading(false))
        } else {
            updateParent(formData).finally(() => setLoading(false))
        }
    }

    useEffect(() => {
        getParent({userId: user?.id}).then((resp) => {
            if (resp.length > 0) {
                const result = resp[0]
                setValue('id', result?.id)
                setValue('numberKk', result.numberKk)
                setValue('headFamily', result.headFamily)
                setValue('fatherStatus', PARENT_STATUS.find((item) => item.value === result.fatherStatus))
                setValue('fatherName', result.fatherName)
                setValue('fatherNik', result.fatherNik)
                setValue('fatherBirthPlace', result.fatherBirthPlace)
                setValue('fatherBirthDate', moment(result.fatherBirthDate, 'YYYY-MM-DD').toDate())
                setValue('fatherStudy', PARENT_STUDY_OPTIONS.find((item) => item.value === result.fatherStudy))
                setValue('fatherJob', PARENT_JOB_OPTIONS.find((item) => item.value === result.fatherJob))
                setValue('fatherPhone', result.fatherPhone)
                setValue('motherStatus', PARENT_STATUS.find((item) => item.value === result.motherStatus))
                setValue('motherName', result.motherName)
                setValue('motherNik', result.motherNik)
                setValue('motherBirthPlace', result.motherBirthPlace)
                setValue('motherBirthDate', moment(result.motherBirthDate, 'YYYY-MM-DD').toDate())
                setValue('motherStudy', PARENT_STUDY_OPTIONS.find((item) => item.value === result.motherStudy))
                setValue('motherJob', PARENT_JOB_OPTIONS.find((item) => item.value === result.motherJob))
                setValue('motherPhone', result.motherPhone)
                setValue('guardStatus', GUARD_STATUS.find((item) => item.value === result.guardStatus))
                setValue('guardName', result.guardName)
                setValue('guardNik', result.guardNik)
                setValue('guardBirthPlace', result.guardBirthPlace)
                setValue('guardBirthDate', moment(result.guardBirthDate, 'YYYY-MM-DD').toDate())
                setValue('guardStudy', PARENT_STUDY_OPTIONS.find((item) => item.value === result.guardStudy))
                setValue('guardJob', PARENT_JOB_OPTIONS.find((item) => item.value === result.guardJob))
                setValue('guardPhone', result.guardPhone)
            } else return
        })
    }, [user]);
    return (
        <form className="is-alter" onSubmit={handleSubmit(onSubmit)}>
            <Row className="gy-1">
                <div className="form-group col-md-6">
                    <label className="form-label" htmlFor="numberKk">Nomor KK</label>
                    <div className="form-control-wrap">
                        <input
                            type="text"
                            id="numberKk"
                            className="form-control"
                            placeholder="Ex. 1234512345123456"
                            {...register('numberKk', {required: 'Kolom tidak boleh kosong'})}
                        />
                        {errors.numberKk && <span className="invalid">{errors.numberKk.message}</span>}
                    </div>
                </div>
                <div className="form-group col-md-6">
                    <label className="form-label" htmlFor="headFamily">Kepala Keluarga</label>
                    <div className="form-control-wrap">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Ex. Muhammad Arif"
                            {...register('headFamily', {
                                required: 'Kolom tidak boleh kosong',
                            })}
                        />
                        {errors.headFamily && <span className="invalid">{errors.headFamily.message}</span>}
                    </div>
                </div>
                <hr/>
                <Col md={6}>
                    <ParentFather methods={methods} />
                </Col>
                <Col md={6} className="mb-3">
                    <ParentMother methods={methods} />
                </Col>
                <hr/>
                <Col md={12}>
                    <ParentGuard methods={methods}/>
                </Col>
                <div className="form-group">
                    <Button color="primary" type="submit" disabled={loading}>
                        {loading ? (<Spinner size="sm"/>) : (
                            <React.Fragment><Icon name="save"/> <span>SIMPAN</span></React.Fragment>
                        )}
                    </Button>
                </div>
            </Row>
        </form>
    )
}

export default Parent