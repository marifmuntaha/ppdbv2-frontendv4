import {useForm} from "react-hook-form";
import {Button, Row, Spinner} from "reactstrap";
import type {StudentOriginType} from "@/types";
import {Icon} from "@/components";
import React, {useEffect, useState} from "react";
import {useAuthContext} from "@/common/hooks/useAuthContext";
import {get as getOrigin, store as storeOrigin, update as updateOrigin} from "@/common/api/student/origin";

const Origin = () => {
    const {user} = useAuthContext()
    const [loading, setLoading] = useState(false);
    const {handleSubmit, register, formState: {errors}, setValue} = useForm<StudentOriginType>();
    const onSubmit = (values: StudentOriginType) => {
        setLoading(true)
        const formData: StudentOriginType = {
            ...values,
            userId: user?.id
        }
        if (formData.id === undefined) {
            storeOrigin(formData).finally(() => setLoading(false))
        } else {
            updateOrigin(formData).finally(() => setLoading(false))
        }
    }

    useEffect(() => {
        getOrigin({userId: user?.id}).then((resp) => {
            if (resp.length > 0) {
                const result = resp[0]
                setValue('id', result?.id)
                setValue('name', result.name)
                setValue('npsn', result.npsn)
                setValue('address', result.address)
            }
            else return
        })
    }, [user]);
    return (
        <form className="is-alter" onSubmit={handleSubmit(onSubmit)}>
            <Row className="gy-1">
                <div className="form-group col-md-6">
                    <label className="form-label" htmlFor="name">Nama Sekolah/Madrasah Asal</label>
                    <div className="form-control-wrap">
                        <input
                            type="text"
                            id="name"
                            className="form-control"
                            placeholder="Ex. MI Darul Hikmah Menganti"
                            {...register('name', {required: 'Kolom tidak boleh kosong'})}
                        />
                        {errors.name && <span className="invalid">{errors.name.message}</span>}
                    </div>
                </div>
                <div className="form-group col-md-6">
                    <label className="form-label" htmlFor="npsn">NPSN</label>
                    <div className="form-control-wrap">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Ex. 1234567890"
                            {...register('npsn', {
                                required: false,
                                pattern: {
                                    value: /^\d{0,8}$/,
                                    message: "NPSN tidak valid"
                                }
                            })}
                        />
                        {errors.npsn && <span className="invalid">{errors.npsn.message}</span>}
                    </div>
                </div>
                <div className="form-group col-md-12">
                    <label className="form-label" htmlFor="address">Alamat Sekolah/Madrasah Asal</label>
                    <div className="form-control-wrap">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Ex. Jl. Raya Jepara-Bugel KM 07 Menganti"
                            {...register('address', {
                                required: 'Kolom tidak boleh kosong',
                            })}
                        />
                        {errors.address && <span className="invalid">{errors.address.message}</span>}
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

export default Origin