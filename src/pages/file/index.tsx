import React, {useEffect, useState} from "react";
import Head from "@/layout/head";
import Content from "@/layout/content";
import {Block, BlockHead, BlockHeadContent, BlockTitle, Col, PreviewCard, Row} from "@/components";
import {useForm} from "react-hook-form";
import type {StudentFileFormType, StudentFileType} from "@/types";
import {Button, Spinner} from "reactstrap";
import {get as getFile, store as storeFile, update as updateFile} from "@/common/api/student/file"
import {useAuthContext} from "@/common/hooks/useAuthContext";

const File = () => {
    const {user} = useAuthContext()
    const [loading, setLoading] = useState(false)
    const [file, setFile] = useState<StudentFileType>();
    const {handleSubmit, register, formState: {errors}, setValue} = useForm<StudentFileFormType>();
    const onSubmit = (values: StudentFileFormType) => {
        setLoading(true)
        const formData: StudentFileFormType = {
            ...values,
            id: file?.id ? file.id : undefined,
            userId: user?.id,
            imageKk: values.imageKk[0],
            imageKtp: values.imageKtp[0],
            imageAkta: values.imageAkta[0],
            imageIjazah: values.imageIjazah[0],
            imageSkl: values.imageSkl[0],
            imageKip: values.imageKip[0],
        }
        if (file?.id) updateFile(formData).finally(() => setLoading(false))
        else storeFile(formData).finally(() => setLoading(false))
    }
    const validateImage = (images: FileList | null): true | string => {
        if (!images || images.length === 0) return true;
        const file = images[0];
        const validFormats = ["image/jpeg", "image/png", "image/jpg"];
        if (!validFormats.includes(file.type)) return "Hanya gambar JPG, JPEG, atau PNG yang diperbolehkan";

        const maxSize = 1024 * 1024;
        if (file.size > maxSize) return "Gambar terlalu besar, ukuran maksimal 1MB";
        return true;
    };

    useEffect(() => {
        getFile({userId: user?.id}).then((resp) => {
            if (resp.length > 0) {
                const result = resp[0]
                setValue('numberAkta', result.numberAkta)
                setValue('numberIjazah', result.numberIjazah)
                setValue('numberSkl', result.numberSkl)
                setValue('numberKip', result.numberKip)
                setFile(result);
            }
        })
    }, []);

    return (
        <React.Fragment>
            <Head title="Unggah Berkas"/>
            <Content>
                <Block size="lg">
                    <BlockHead>
                        <BlockHeadContent>
                            <BlockTitle tag="h5">Unggah Berkas</BlockTitle>
                            <p>
                                Textual form controls—like <code className="code-tag">&lt;input&gt;</code>s,{" "}
                                <code className="code-tag">&lt;select&gt;</code>s, and{" "}
                            </p>
                        </BlockHeadContent>
                    </BlockHead>
                </Block>
                <Row className="gy-0 mt-3">
                    <Col md={8}>
                        <PreviewCard>
                            <form className="is-alter" onSubmit={handleSubmit(onSubmit)}>
                                <Row className="gy-0">
                                    <div className="form-group col-md-6">
                                        <label className="form-label" htmlFor="imageKk">Foto/Scan Kartu Keluarga</label>
                                        <div className="form-control-wrap">
                                            <input
                                                type="file"
                                                id="imageKk"
                                                className="form-control"
                                                {...register("imageKk", {
                                                    required: !file?.fileKk && "Berkas tidak boleh kosong.",
                                                    validate: validateImage
                                                })}
                                            />
                                            {errors.imageKk && <span className="invalid">{String(errors.imageKk.message)}</span>}
                                        </div>
                                        {file?.fileKk && (
                                            <div className="form-note">
                                                Berkas sudah diunggah, silahkan lihat <a target="_blank" href={file.fileKk}>disini</a>
                                            </div>
                                        )}
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label className="form-label" htmlFor="imageKtp">Foto/Scan KTP Wali</label>
                                        <div className="form-control-wrap">
                                            <input
                                                type="file"
                                                id="imageKtp"
                                                className="form-control"
                                                {...register("imageKtp", {
                                                    required: !file?.fileKtp && "Berkas tidak boleh kosong.",
                                                    validate: validateImage
                                                })}
                                            />
                                            {errors.imageKtp &&
                                                <span className="invalid">{String(errors.imageKtp.message)}</span>}
                                        </div>
                                        {file?.fileKtp && (
                                            <div className="form-note">
                                                Berkas sudah diunggah, silahkan lihat <a target="_blank" href={file.fileKtp}>disini</a>
                                            </div>
                                        )}
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label className="form-label" htmlFor="numberAkta">Nomor Akta Kelahiran</label>
                                        <div className="form-control-wrap">
                                            <input
                                                type="text"
                                                id="numberAkta"
                                                className="form-control"
                                                placeholder="Ex. 1234/ABC/2025/02/01"
                                                {...register('numberAkta', {required: !file?.numberAkta && 'Kolom tidak boleh kosong'})}
                                            />
                                            {errors.numberAkta &&
                                                <span className="invalid">{errors.numberAkta.message}</span>}
                                        </div>
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label className="form-label" htmlFor="imageAkta">Foto/Scan Akta Kelahiran</label>
                                        <div className="form-control-wrap">
                                            <input
                                                type="file"
                                                id="imageAkta"
                                                className="form-control"
                                                {...register("imageAkta", {
                                                    required: !file?.fileAkta && "Berkas tidak boleh kosong.",
                                                    validate: validateImage
                                                })}
                                            />
                                            {errors.imageAkta &&
                                                <span className="invalid">{String(errors.imageAkta.message)}</span>}
                                        </div>
                                        {file?.fileAkta && (
                                            <div className="form-note">
                                                Berkas sudah diunggah, silahkan lihat <a target="_blank" href={file.fileAkta}>disini</a>
                                            </div>
                                        )}
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label className="form-label" htmlFor="numberIjazah">Nomor Ijazah</label>
                                        <div className="form-control-wrap">
                                            <input
                                                type="text"
                                                id="numberIjazah"
                                                className="form-control"
                                                placeholder="Ex. 1234/5678/09.1/2025"
                                                {...register('numberIjazah', {required: false})}
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label className="form-label" htmlFor="imageIjazah">Foto/Scan Ijazah</label>
                                        <div className="form-control-wrap">
                                            <input
                                                type="file"
                                                id="imageIjazah"
                                                className="form-control"
                                                {...register("imageIjazah", {validate: validateImage})}
                                            />
                                            {errors.imageIjazah &&
                                                <span className="invalid">{String(errors.imageIjazah.message)}</span>}
                                        </div>
                                        {file?.fileIjazah && (
                                            <div className="form-note">
                                                Berkas sudah diunggah, silahkan lihat <a target="_blank" href={file.fileIjazah}>disini</a>
                                            </div>
                                        )}
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label className="form-label" htmlFor="numberSkl">Nomor Skl</label>
                                        <div className="form-control-wrap">
                                            <input
                                                type="text"
                                                id="numberSkl"
                                                className="form-control"
                                                placeholder="Ex. 001/01.1/MTs.SH/IV/2026"
                                                {...register('numberSkl', {required: false})}
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label className="form-label" htmlFor="imageSkl">Foto/Scan Skl</label>
                                        <div className="form-control-wrap">
                                            <input
                                                type="file"
                                                id="imageSkl"
                                                className="form-control"
                                                {...register("imageSkl", {validate: validateImage})}
                                            />
                                            {errors.imageSkl &&
                                                <span className="invalid">{String(errors.imageSkl.message)}</span>}
                                        </div>
                                        {file?.fileSkl && (
                                            <div className="form-note">
                                                Berkas sudah diunggah, silahkan lihat <a target="_blank" href={file.fileSkl}>disini</a>
                                            </div>
                                        )}
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label className="form-label" htmlFor="numberKip">Nomor Kip</label>
                                        <div className="form-control-wrap">
                                            <input
                                                type="text"
                                                id="numberKip"
                                                className="form-control"
                                                placeholder="Ex. 1234567891011121"
                                                {...register('numberKip', {required: false})}
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label className="form-label" htmlFor="imageKip">Foto/Scan Kip</label>
                                        <div className="form-control-wrap">
                                            <input
                                                type="file"
                                                id="imageKip"
                                                className="form-control"
                                                {...register("imageKip", {validate: validateImage})}
                                            />
                                            {errors.imageKip && <span className="invalid">{String(errors.imageKip.message)}</span>}
                                        </div>
                                        {file?.fileKip && (
                                            <div className="form-note">
                                                Berkas sudah diunggah, silahkan lihat <a target="_blank" href={file.fileKip}>disini</a>
                                            </div>
                                        )}
                                    </div>
                                    <div className="form-group">
                                        <Button color="primary" type="submit" size="md">
                                            {loading ? <Spinner size="sm"/> : 'SIMPAN'}
                                        </Button>
                                    </div>
                                </Row>
                            </form>
                        </PreviewCard>
                    </Col>
                </Row>
            </Content>
        </React.Fragment>
    )
}

export default File;