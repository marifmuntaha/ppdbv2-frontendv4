import {Controller, useForm, useWatch} from "react-hook-form";
import {Button, Row, Spinner} from "reactstrap";
import type {OptionsType, StudentProgramType, InstitutionPeriodType} from "@/types";
import {Icon, RSelect} from "@/components";
import React, {useEffect, useState} from "react";
import {useAuthContext} from "@/common/hooks/useAuthContext";
import {useYearContext} from "@/common/hooks/useYearContext";
import {get as getInstitution} from "@/common/api/institution";
import {get as getInstitutionPrograms} from "@/common/api/institution/program";
import {get as getPeriod} from "@/common/api/institution/period"
import {get as getProgram, store as storeProgram, update as updateProgram} from "@/common/api/student/program";
import moment from "moment/moment";

const Program = () => {
    const {user} = useAuthContext()
    const year = useYearContext()
    const [loading, setLoading] = useState(false)
    const [institutionOptions, setInstitutionOptions] = useState<OptionsType[]>()
    const [programOptions, setProgramOptions] = useState<OptionsType[]>()
    const [boardingOptions, setBoardingOptions] = useState<OptionsType[]>()
    const [period, setPeriod] = useState<InstitutionPeriodType>()
    const {handleSubmit, formState: {errors}, control, setValue} = useForm<StudentProgramType>();
    const onSubmit = (values: StudentProgramType) => {
        setLoading(true)
        const formData: StudentProgramType = {
            ...values,
            id: values.id,
            userId: user?.id,
            yearId: year?.id,
            periodId: period?.id,
        }
        if (formData.id === undefined) {
            storeProgram(formData).finally(() => setLoading(false))
        } else {
            updateProgram(formData).finally(() => setLoading(false))
        }
    }
    const institutionSelected = useWatch({control, name: 'institutionId'})
    const programSelected = useWatch({control, name: 'programId'})

    useEffect(() => {
        getInstitution<OptionsType>({type: 'select'}).then((resp) => setInstitutionOptions(resp))
    }, []);

    useEffect(() => {
        if (institutionSelected) {
            getInstitutionPrograms<OptionsType>({
                institutionId: institutionSelected,
                type: 'select',
                with: 'boarding'
            }).then((resp) => setProgramOptions(resp))

            getPeriod({
                yearId: year?.id,
                institutionId: institutionSelected,
                date: moment().format('YYYY-MM-DD')
            }).then((resp) => setPeriod(resp[0]))
        }

    }, [institutionSelected]);

    useEffect(() => {
        const handleBoarding = () => {
            const boarding = programOptions?.find((item) => item.value === programSelected)
            if (boarding !== undefined) setBoardingOptions(JSON.parse(boarding?.data))
        }
        handleBoarding()
    }, [programSelected, programOptions]);

    useEffect(() => {
        getProgram({userId: user?.id}).then((resp) => {
            if (resp.length > 0) {
                const result = resp[0]
                setValue('id', result?.id)
                setValue('institutionId', result?.institutionId)
                setValue('programId', result?.programId)
                setValue('boardingId', result?.boardingId)
            } else return
        })
    }, [user]);

    return (
        <form className="is-alter" onSubmit={handleSubmit(onSubmit)}>
            <Row className="gy-1">
                <div className="form-group col-md-4">
                    <label className="form-label" htmlFor="institutionId">Lembaga</label>
                    <div className="form-control-wrap">
                        <Controller
                            name="institutionId"
                            control={control}
                            rules={{required: 'Lembaga tidak boleh kosong'}}
                            render={({field: {onChange, value}}) => (
                                <React.Fragment>
                                    <RSelect
                                        id="institutionId"
                                        options={institutionOptions}
                                        value={institutionOptions?.find((item) => item.value === value)}
                                        onChange={(val) => onChange(val?.value)}
                                        placeholder="Pilih Lembaga"
                                    />
                                    <input type="hidden" className="form-control" id="institutionId"/>
                                    {errors.institutionId && <span className="invalid">{errors.institutionId.message}.</span>}
                                </React.Fragment>
                            )}
                        />
                    </div>
                </div>
                <div className="form-group col-md-4">
                    <label className="form-label" htmlFor="programId">Program Madrasah</label>
                    <div className="form-control-wrap">
                        <Controller
                            name="programId"
                            control={control}
                            rules={{required: 'Program tidak boleh kosong'}}
                            render={({field: {onChange, value}}) => (
                                <React.Fragment>
                                    <RSelect
                                        id="programId"
                                        options={programOptions}
                                        value={programOptions?.find((item) => item.value === value)}
                                        onChange={(val) => onChange(val?.value)}
                                        placeholder="Pilih Program"
                                    />
                                    <input type="hidden" className="form-control" id="programId"/>
                                    {errors.programId && <span className="invalid">{errors.programId.message}.</span>}
                                </React.Fragment>
                            )}
                        />
                    </div>
                </div>
                <div className="form-group col-md-4">
                    <label className="form-label" htmlFor="boardingId">Program Boarding</label>
                    <div className="form-control-wrap">
                        <Controller
                            name="boardingId"
                            control={control}
                            rules={{required: 'Program tidak boleh kosong'}}
                            render={({field: {onChange, value}}) => (
                                <React.Fragment>
                                    <RSelect
                                        id="boardingId"
                                        options={boardingOptions}
                                        value={boardingOptions?.find((item) => item.value === value)}
                                        onChange={(val) => onChange(val?.value)}
                                        placeholder="Pilih Program"
                                    />
                                    <input type="hidden" className="form-control" id="boardingId"/>
                                    {errors.boardingId && <span className="invalid">{errors.boardingId.message}.</span>}
                                </React.Fragment>
                            )}
                        />
                    </div>
                </div>
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

export default Program