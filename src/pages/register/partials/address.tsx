import {Controller, useForm, useWatch} from "react-hook-form";
import {Button, Row, Spinner} from "reactstrap";
import type {OptionsType, StudentAddressFormType, StudentAddressType} from "@/types";
import {Icon, RSelect} from "@/components";
import React, {useEffect, useState} from "react";
import {useAuthContext} from "@/common/hooks/useAuthContext";
import {get as getAddress, store as storeAddress, update as updateAddress} from "@/common/api/student/address";

const Address = () => {
    const {user} = useAuthContext()
    const [loading, setLoading] = useState(false);
    const [provinceOptions, setProvinceOptions] = useState<OptionsType[]>()
    const [cityOptions, setCityOptions] = useState<OptionsType[]>()
    const [districtOptions, setDistrictOptions] = useState<OptionsType[]>()
    const [villageOptions, setVillageOptions] = useState<OptionsType[]>()
    const {handleSubmit, register, formState: {errors}, control, setValue} = useForm<StudentAddressFormType>();
    const onSubmit = (values: StudentAddressFormType) => {
        setLoading(true)
        const formData: StudentAddressType = {
            ...values,
            userId: user?.id,
            province: JSON.stringify(values.province),
            city: JSON.stringify(values.city),
            district: JSON.stringify(values.district),
            village: JSON.stringify(values.village),
        }
        if (formData.id === undefined) {
            storeAddress(formData).finally(() => setLoading(false))
        } else {
            updateAddress(formData).finally(() => setLoading(false))
        }
    }
    const provinceSelected = useWatch({control, name: 'province'})
    const citySelected = useWatch({control, name: 'city'})
    const districtSelected = useWatch({control, name: 'district'})
    useEffect(() => {
        getAddress({userId: user?.id}).then((resp) => {
            if (resp.length > 0) {
                const result = resp[0]
                setValue('id', result?.id)
                setValue('province', JSON.parse(result.province))
                setValue('city', JSON.parse(result.city))
                setValue('district', JSON.parse(result.district))
                setValue('village', JSON.parse(result.village))
                setValue('street', result.street)
                setValue('rt', result.rt)
                setValue('rw', result.rw)
                setValue('postal', result.postal)
            } else return
        })
    }, [user]);

    useEffect(() => {
        fetch(`https://marifmuntaha.github.io/api-wilayah-indonesia/api/provinces.json`)
            .then(response => response.json())
            .then((provinces) => {
                setProvinceOptions(() => {
                    return provinces.map((province: any) => {
                        return {value: province.id, label: province.name}
                    })
                });
            });
    }, []);
    useEffect(() => {
        if (provinceSelected) {
            fetch(`https://marifmuntaha.github.io/api-wilayah-indonesia/api/regencies/${provinceSelected.value}.json`)
                .then(response => response.json())
                .then((regencies) => {
                    setCityOptions(() => {
                        return regencies.map((regencies: any) => {
                            return {value: regencies.id, label: regencies.name}
                        })
                    })
                });
        }
    }, [provinceSelected])

    useEffect(() => {
        if (citySelected) {
            fetch(`https://marifmuntaha.github.io/api-wilayah-indonesia/api/districts/${citySelected.value}.json`)
                .then(response => response.json())
                .then((districts) => {
                    setDistrictOptions(() => {
                        return districts.map((district: any) => {
                            return {value: district.id, label: district.name}
                        })
                    })
                });
        }
    }, [citySelected])

    useEffect(() => {
        if (districtSelected) {
            fetch(`https://marifmuntaha.github.io/api-wilayah-indonesia/api/villages/${districtSelected.value}.json`)
                .then(response => response.json())
                .then((villages) => {
                    setVillageOptions(() => {
                        return villages.map((village: any) => {
                            return {value: village.id, label: village.name}
                        })
                    })
                });
        }
    }, [districtSelected]);

    return (
        <form className="is-alter" onSubmit={handleSubmit(onSubmit)}>
            <Row className="gy-1">
                <div className="form-group col-md-6">
                    <label className="form-label" htmlFor="province">Provinsi</label>
                    <div className="form-control-wrap">
                        <Controller
                            name="province"
                            control={control}
                            rules={{required: 'Provinsi tidak boleh kosong'}}
                            render={({field: {onChange, value}}) => (
                                <React.Fragment>
                                    <RSelect
                                        id="province"
                                        options={provinceOptions}
                                        value={value}
                                        onChange={(val) => onChange(val)}
                                        placeholder="Pilih Provinsi"
                                    />
                                    <input type="hidden" className="form-control" id="province"/>
                                    {errors.province && <span className="invalid">{errors.province.message}.</span>}
                                </React.Fragment>
                            )}
                        />
                    </div>
                </div>
                <div className="form-group col-md-6">
                    <label className="form-label" htmlFor="city">Kota/Kabupaten</label>
                    <div className="form-control-wrap">
                        <Controller
                            name="city"
                            control={control}
                            rules={{required: 'Kota/Kabupaten tidak boleh kosong'}}
                            render={({field: {onChange, value}}) => (
                                <React.Fragment>
                                    <RSelect
                                        id="city"
                                        options={cityOptions}
                                        value={value}
                                        onChange={(val) => onChange(val)}
                                        placeholder="Pilih Kota/Kabupaten"
                                    />
                                    <input type="hidden" className="form-control" id="city"/>
                                    {errors.city && <span className="invalid">{errors.city.message}.</span>}
                                </React.Fragment>
                            )}
                        />
                    </div>
                </div>
                <div className="form-group col-md-6">
                    <label className="form-label" htmlFor="district">Kecamatan</label>
                    <div className="form-control-wrap">
                        <Controller
                            name="district"
                            control={control}
                            rules={{required: 'Kecamatan tidak boleh kosong'}}
                            render={({field: {onChange, value}}) => (
                                <React.Fragment>
                                    <RSelect
                                        id="district"
                                        options={districtOptions}
                                        value={value}
                                        onChange={(val) => onChange(val)}
                                        placeholder="Pilih Kecamatan"
                                    />
                                    <input type="hidden" className="form-control" id="district"/>
                                    {errors.district && <span className="invalid">{errors.district.message}.</span>}
                                </React.Fragment>
                            )}
                        />
                    </div>
                </div>
                <div className="form-group col-md-6">
                    <label className="form-label" htmlFor="village">Kelurahan/Desa</label>
                    <div className="form-control-wrap">
                        <Controller
                            name="village"
                            control={control}
                            rules={{required: 'Desa tidak boleh kosong'}}
                            render={({field: {onChange, value}}) => (
                                <React.Fragment>
                                    <RSelect
                                        id="village"
                                        options={villageOptions}
                                        value={value}
                                        onChange={(val) => onChange(val)}
                                        placeholder="Pilih Desa"
                                    />
                                    <input type="hidden" className="form-control" id="village"/>
                                    {errors.village && <span className="invalid">{errors.village.message}.</span>}
                                </React.Fragment>
                            )}
                        />
                    </div>
                </div>
                <div className="form-group">
                    <label className="form-label" htmlFor="street">Jalan/Gedung/Rumah</label>
                    <div className="form-control-wrap">
                        <input
                            type="text"
                            id="street"
                            className="form-control"
                            placeholder="Ex. Perum Mulia Indah Blok C No 9 Kragan"
                            {...register('street', {required: 'Kolom tidak boleh kosong'})}
                        />
                        {errors.street && <span className="invalid">{errors.street.message}</span>}
                    </div>
                </div>
                <div className="form-group col-md-4">
                    <label className="form-label" htmlFor="rt">RT</label>
                    <div className="form-control-wrap">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Ex. 01"
                            {...register('rt', {
                                required: false,
                            })}
                        />
                        {errors.rt && <span className="invalid">{errors.rt.message}</span>}
                    </div>
                </div>
                <div className="form-group col-md-4">
                    <label className="form-label" htmlFor="rw">RW</label>
                    <div className="form-control-wrap">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Ex. 01"
                            {...register('rw', {
                                required: 'Kolom tidak boleh kosong',
                                pattern: {
                                    value: /^\d{0,16}$/,
                                    message: "NIK tidak valid"
                                }
                            })}
                        />
                        {errors.rw && <span className="invalid">{errors.rw.message}</span>}
                    </div>
                </div>

                <div className="form-group col-md-4">
                    <label className="form-label" htmlFor="postal">Kodepos</label>
                    <div className="form-control-wrap">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Ex. 59463"
                            {...register('postal', {required: 'Kolom tidak boleh kosong',})}
                        />
                        {errors.postal && <span className="invalid">{errors.postal.message}</span>}
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

export default Address