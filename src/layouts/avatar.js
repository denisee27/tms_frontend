import React from "react";
import { useUtilitiesService } from "../services/utilitiesservice";

const Avatar = ({ userData = {}, height = 32, width = 32 }) => {
    const { generateColor, getBWColor } = useUtilitiesService();
    const genStyle = () => {
        const bgCol = generateColor(userData.name);
        const txCol = getBWColor(bgCol);
        return {
            backgroundColor: bgCol,
            color: txCol,
            height: `${height}px`,
            width: `${width}px`,
        };
    };

    return (
        <>
            {!userData.profile_pic ? (
                <div
                    title={userData.name}
                    className="avatar rounded-circle d-flex justify-content-center align-items-center fw-bold shadow-sm"
                    style={genStyle()}
                >
                    {userData.initials}
                </div>
            ) : (
                <div
                    title={userData.name}
                    className="avatar rounded-circle d-flex justify-content-center align-items-center shadow-sm"
                    style={genStyle()}
                >
                    <img
                        src={userData.profile_pic}
                        alt={userData.name}
                        className="img-fluid h-100 w-100 rounded-circle"
                    />
                </div>
            )}
        </>
    );
};

export default Avatar;
