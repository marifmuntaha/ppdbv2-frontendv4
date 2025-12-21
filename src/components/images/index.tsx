import React, { useState } from "react";
import { Modal } from "reactstrap";

interface ImageContainerProps {
    img?: string;
}

const ImageContainer: React.FC<ImageContainerProps> = ({ img }) => {
    const [open, setOpen] = useState<boolean>(false);

    const toggle = (): void => {
        setOpen((prev) => !prev);
    };

    return (
        <a
            className="gallery-image popup-image"
            href={"#gallery"}
            onClick={(ev: React.MouseEvent<HTMLAnchorElement>) => {
                ev.preventDefault();
                toggle();
            }}
        >
            <img className="w-100 p-3 rounded-top" src={img} alt="" />

            <Modal isOpen={open} toggle={toggle} size="lg" contentClassName="rounded-5">
                <button type="button" className="mfp-close" onClick={toggle}>
                    ×
                </button>
                <img
                    className="w-100 rounded-5 p-3"
                    style={{ height: "100%" }}
                    src={img}
                    alt=""
                />
            </Modal>
        </a>
    );
};

export default ImageContainer;
