import {Controller, useForm} from "react-hook-form";
import {Button, Row, Spinner} from "reactstrap";
import type {StudentPersonalFormType, StudentPersonalType} from "@/types";
import {Icon, RSelect} from "@/components";
import {GENDER_OPTIONS} from "@/common/constants";
import React, {useEffect, useState} from "react";
import DatePicker, {registerLocale} from "react-datepicker";
import {id} from "date-fns/locale/id";
import {useAuthContext} from "@/common/hooks/useAuthContext";
import {get as getPersonal, store as storePersonal, update as updatePersonal} from "@/common/api/student/personal";
import moment from "moment/moment";

registerLocale('id', id)

const Personal = () => {
    const {user} = useAuthContext()
    const [loading, setLoading] = useState(false);
    const {handleSubmit, register, formState: {errors}, control, setValue} = useForm<StudentPersonalFormType>();
    const onSubmit = (values: StudentPersonalFormType) => {
        setLoading(true)
        const formData: StudentPersonalType = {
            userId: user?.id,
            id: values.id,
            name: values.name,
            nisn: values.nisn,
            nik: values.nik,
            gender: values.gender?.value,
            birthPlace: values.birthPlace,
            birthDate: moment(values.birthDate).format("YYYY-MM-DD"),
            phone: values.phone,
            birthNumber: values.birthNumber,
            sibling: values.sibling
        }
        if (formData.id === undefined) {
            storePersonal(formData).finally(() => setLoading(false))
        } else {
            updatePersonal(formData).finally(() => setLoading(false))
        }
    }

    useEffect(() => {
        getPersonal({userId: user?.id}).then((resp) => {
            if (resp.length > 0) {
                const result = resp[0]
                setValue('id', result?.id)
                setValue('name', result.name)
                setValue('nisn', result.nisn)
                setValue('nik', result.nik)
                setValue('gender', GENDER_OPTIONS.find((item) => item.value === result.gender))
                setValue('birthPlace', result.birthPlace)
                setValue('birthDate', moment(result.birthDate, 'YYYY-MM-DD').toDate())
                setValue('phone', result.phone)
                setValue('birthNumber', result.birthNumber)
                setValue('sibling', result.sibling)
            }
            else return
        })
    }, [user]);
    return (
        <form className="is-alter" onSubmit={handleSubmit(onSubmit)}>
            <Row className="gy-1">
                <div className="form-group col-md-12">
                    <label className="form-label" htmlFor="name">Nama Lengkap</label>
                    <div className="form-control-wrap">
                        <input
                            type="text"
                            id="name"
                            className="form-control"
                            placeholder="Ex. Achmad Wikramawardhana"
                            {...register('name', {required: 'Kolom tidak boleh kosong'})}
                        />
                        {errors.name && <span className="invalid">{errors.name.message}</span>}
                    </div>
                </div>
                <div className="form-group col-md-6">
                    <label className="form-label" htmlFor="nisn">NISN</label>
                    <div className="form-control-wrap">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Ex. 1234567890"
                            {...register('nisn', {
                                required: false,
                                pattern: {
                                    value: /^\d{0,10}$/,
                                    message: "NISN tidak valid"
                                }
                            })}
                        />
                        {errors.nisn && <span className="invalid">{errors.nisn.message}</span>}
                    </div>
                </div>
                <div className="form-group col-md-6">
                    <label className="form-label" htmlFor="nik">NIK</label>
                    <div className="form-control-wrap">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Ex. 1234512345123456"
                            {...register('nik', {
                                required: 'Kolom tidak boleh kosong',
                                pattern: {
                                    value: /^\d{0,16}$/,
                                    message: "NIK tidak valid"
                                }
                            })}
                        />
                        {errors.nik && <span className="invalid">{errors.nik.message}</span>}
                    </div>
                </div>
                <div className="form-group col-md-4">
                    <label className="form-label" htmlFor="gender">Jenis Kelamin</label>
                    <div className="form-control-wrap">
                        <Controller
                            name="gender"
                            control={control}
                            rules={{required: 'Jenis Kelamin tidak boleh kosong'}}
                            render={({field: {onChange, value}}) => (
                                <React.Fragment>
                                    <RSelect
                                        id="gender"
                                        options={GENDER_OPTIONS}
                                        value={value}
                                        onChange={(val) => onChange(val)}
                                        placeholder="Pilih Jenis Kelamin"
                                    />
                                    <input type="hidden" className="form-control" id="gender"/>
                                    {errors.gender && <span className="invalid">{errors.gender.message}.</span>}
                                </React.Fragment>
                            )}
                        />
                    </div>
                </div>
                <div className="form-group col-md-4">
                    <label className="form-label" htmlFor="birthPlace">Tempat Lahir</label>
                    <div className="form-control-wrap">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Ex. Jepara"
                            {...register('birthPlace', {required: 'Kolo tidak boleh kosong',})}
                        />
                        {errors.birthPlace && <span className="invalid">{errors.birthPlace.message}</span>}
                    </div>
                </div>
                <div className="form-group col-md-4">
                    <label className="form-label" htmlFor="birthdate">Tanggal Lahir</label>
                    <div className="form-control-wrap">
                        <Controller
                            name="birthDate"
                            control={control}
                            rules={{required: 'Kolom tidak boleh kosong'}}
                            render={({field: {onChange, value}}) => (
                                <React.Fragment>
                                    <DatePicker
                                        locale="id"
                                        selected={value}
                                        onChange={(e) => onChange(e)}
                                        dateFormat={"dd/MM/yyyy"}
                                        className="form-control date-picker"
                                        placeholderText="Pilih Tanggal Lahir"
                                    />
                                    <input type="hidden" className="form-control" id="birthDate"/>
                                    {errors.birthDate && <span className="invalid">{errors.birthDate.message}</span>}
                                </React.Fragment>
                            )}
                        />
                    </div>
                </div>
                <div className="form-group col-md-4">
                    <label className="form-label" htmlFor="phone">Nomor HP</label>
                    <div className="form-control-wrap">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Ex. 6282229366509"
                            {...register('phone', {required: 'Kolom tidak boleh kosong'})}
                        />
                        {errors.phone && <span className="invalid">{errors.phone.message}</span>}
                    </div>
                </div>
                <div className="form-group col-md-4">
                    <label className="form-label" htmlFor="birthNumber">Anak Ke-</label>
                    <div className="form-control-wrap">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Ex. 1"
                            {...register('birthNumber', {required: 'Kolom tidak boleh kosong'})}
                        />
                        {errors.birthNumber && <span className="invalid">{errors.birthNumber.message}</span>}
                    </div>
                </div>
                <div className="form-group col-md-4">
                    <label className="form-label" htmlFor="sibling">Jumlah Saudara</label>
                    <div className="form-control-wrap">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Ex. 2"
                            {...register('sibling', {required: 'Kolom tidak boleh kosong'})}
                        />
                        {errors.sibling && <span className="invalid">{errors.sibling.message}</span>}
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

export default Personal