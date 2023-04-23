import * as React from "react";
import Image from 'next/image';
import { useRouter } from "next/router";


type Props = {
    key: string,
    imgName: string,
    imgPath: string,
    imgDescription: string
}


const Tile: React.FC<Props> = ({ key, imgName, imgPath, imgDescription }) => {
    let router = useRouter()

    const redirectToDetails = async () => { router.push(`/nft/${imgName}`) }

    return (
        <div className="col-6 col-md-4 bg-image hover-effect" key={key}>
            <Image className="w-full h-auto"
                src={imgPath}
                alt={imgDescription}
                width={1024}
                height={1024}
                onClick={redirectToDetails} />
        </div>
    );
};

export default Tile;