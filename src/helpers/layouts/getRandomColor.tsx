import {COLOR} from "@/common/constants";

const getRandomColor = () => {
    return COLOR[Math.floor(Math.random() * COLOR.length)];
}

export { getRandomColor };