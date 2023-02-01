import React from "react";
import preview from "../../../../images/PhonePreviewImage.png";
import closeIcon from "../../../../images/closeTabForPreview.png";

type Props = {
    photoPath?: string;
};

function PreviewComponent({ photoPath }: Props) {
    return (
        <div className="relative">
            <img
                src={preview}
                style={{
                    minWidth: "462px",
                    minHeight: "768px",
                }}
            />

            <img
                src={photoPath}
                className="absolute rounded-lg"
                style={{
                    height: "348px",
                    width: "213px",
                    top: "190px",
                    left: "131px",
                    display: !photoPath ? "none" : "inherit",
                }}
            />
            <img
                src={closeIcon}
                className="absolute"
                style={{
                    height: "15px",
                    width: "15px",
                    top: "192px",
                    left: "325px",
                    display: !photoPath ? "none" : "inherit",
                }}
            />
        </div>
    );
}

export default PreviewComponent;
